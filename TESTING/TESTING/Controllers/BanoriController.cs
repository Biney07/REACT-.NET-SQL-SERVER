using TESTING.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TESTING.Data;
using TESTING.Model;
using TESTING.RequestHelpers;
using System.Linq;
using System.Text.Json;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using TESTING.DTO;
using TESTING.Services;
using System.Net;

namespace TESTING.Controllers
{
    public class BanoretController : BaseApiController
    {
        private readonly AppDbContext _context;

        private readonly IMapper _mapper;
        private readonly ImageService _imageService;
        public BanoretController(AppDbContext context, IMapper mapper, ImageService imageService)
        {
            _imageService = imageService;
            _mapper = mapper;
            _context = context;
        }
        [HttpGet("{id}", Name = "GetBanori")]
        public async Task<ActionResult<Banori>> GetBanori(int id)
        {
            var banori = await _context.Banoret.FindAsync(id);
            var brands = await _context.Banoret.Select(p => p.Profesioni).Distinct().ToListAsync();

            return Ok(new { brands });
        }


        [HttpPost("createBanor")]
        public async Task<ActionResult<Banori>> CreateBanori([FromForm] CreateBanoriDto banoriDto)
        {
            var banori = _mapper.Map<Banori>(banoriDto);

            if (banoriDto.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(banoriDto.File);

                if (imageResult.Error != null)
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

                banori.PictureUrl = imageResult.SecureUrl.ToString();
                banori.CloudanaryPublicId = imageResult.PublicId;
            }

            _context.Banoret.Add(banori);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetBanori", new { Id = banori.Id }, banori);

            return BadRequest(new ProblemDetails { Title = "Problem creating new banori" });
        }


        [HttpPut("UpdateBanori/{id}")]
        public async Task<ActionResult<Banori>> UpdateBanori([FromForm] UpdateBanoriDTO banoriDto)
        {
            var banori = await _context.Banoret.FindAsync(banoriDto.Id);

            if (banori == null) return NotFound();

            _mapper.Map(banoriDto, banori);

            if (banoriDto.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(banoriDto.File);

                if (imageResult.Error != null)
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

                if (!string.IsNullOrEmpty(banori.CloudanaryPublicId))
                    await _imageService.DeleteImageAsync(banori.CloudanaryPublicId);

                    banori.PictureUrl = imageResult.SecureUrl.ToString();
                banori.CloudanaryPublicId = imageResult.PublicId;
            }

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(banori);

            return BadRequest(new ProblemDetails { Title = "Problem updating banori" });
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("banori/{id}")]
        public async Task<ActionResult> DeleteBanori(int id)
        {
            var banori = await _context.Banoret.FindAsync(id);

            if (banori == null) return NotFound();

            if (!string.IsNullOrEmpty(banori.CloudanaryPublicId))
                await _imageService.DeleteImageAsync(banori.CloudanaryPublicId);

            _context.Banoret.Remove(banori);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting banori" });
        }


        [HttpGet("GetAll")]
        public async Task<ActionResult<List<Banori>>> GetAllBanoret()
        {
            var banoret = await _context.Banoret.ToListAsync();
            return Ok(banoret);

        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Banori>>> GetAll([FromQuery] BanoriParams banoriParams)
        {
            var query = _context.Banoret
                .Sort(banoriParams.OrderBy)
                .Search(banoriParams.SearchTerm)
                .Filter(banoriParams.Profesionet)
                .AsQueryable();

            var banoret = await PagedList<Banori>.ToPagedList(query,
                banoriParams.PageNumber, banoriParams.PageSize);

            Response.AddPaginationHeader(banoret.MetaData);

            return banoret;
        }

        [HttpPut]
        [Route("api/banori/nominated/")]
        public async Task<ActionResult> updateNominated([FromBody] UpdateNominatedRequest request)
        {
            // First, find the Banori object with the specified ID in your data store
            Banori banoriToUpdate = await _context.Banoret.FindAsync(request.Id);

            // If the object doesn't exist, return a 404 Not Found response
            if (banoriToUpdate == null)
            {
                return NotFound();
            }

            // Otherwise, update the Nominated property of the Banori object
            banoriToUpdate.Nominated = request.Nominated;

            // Save the changes to your data store
            await _context.SaveChangesAsync();

            // Return a 204 No Content response to indicate that the update was successful
            return Ok();
        }
        [HttpPut]
        [Route("api/banori/Eleminated/")]
        public async Task<ActionResult> updateEleminated([FromBody] UpdateEleminated request)
        {
            // First, find the Banori object with the specified ID in your data store
            Banori banoriToUpdate = await _context.Banoret.FindAsync(request.Id);

            // If the object doesn't exist, return a 404 Not Found response
            if (banoriToUpdate == null)
            {
                return NotFound();
            }

            // Otherwise, update the Nominated property of the Banori object
            banoriToUpdate.Eleminuar = request.Eleminated;

            // Save the changes to your data store
            await _context.SaveChangesAsync();

            // Return a 204 No Content response to indicate that the update was successful
            return Ok();
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _context.Banoret.Select(p => p.Profesioni).Distinct().ToListAsync();

            return Ok(new { brands });
        }
    }
}

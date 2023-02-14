using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TESTING.Data;
using TESTING.DTO;
using TESTING.Model;
using TESTING.Services;

namespace TESTING.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SponzorsController : ControllerBase
    {

        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly ImageService _imageService;

        public SponzorsController(AppDbContext context, IMapper mapper, ImageService imageService) {
            _context = context;
            _mapper = mapper;
            _imageService = imageService;
        }

        [HttpGet]
        public async Task<IEnumerable<Sponzor>> GetSponzors()
        {
            var sponozors = await _context.Sponzors.ToListAsync();
            return sponozors.Select(sponzor => new Sponzor
            {
                Id= sponzor.Id,
                Name = sponzor.Name,
                Email = sponzor.Email,
                StartDate = sponzor.StartDate,
                EndDate = sponzor.EndDate,
                Notes = sponzor.Notes,
                PictureUrl= sponzor.PictureUrl,
                CloudanaryPublicId = sponzor.CloudanaryPublicId,

            });
        }

        [HttpGet ("{id}", Name = "GetSponzori")]
        public async Task<ActionResult<Sponzor>> GetSponzorByID(int id)
        {
            var sponzor = await _context.Sponzors.FindAsync(id);

            return Ok(sponzor);

        }



        [HttpPost]
        public async Task<ActionResult<Sponzor>> CreateSponzor([FromForm] SponzorDTO sponzorDTO)
        {
            
            var sponzor = _mapper.Map<Sponzor>(sponzorDTO);

            if (sponzorDTO.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(sponzorDTO.File);

                if (imageResult.Error != null)
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

                sponzor.PictureUrl = imageResult.SecureUrl.ToString();
                sponzor.CloudanaryPublicId = imageResult.PublicId;
            }

            _context.Sponzors.Add(sponzor);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetSponzori", new { Id = sponzor.Id }, sponzor);

            return BadRequest(new ProblemDetails { Title = "Problem creating new sponzor" });

        }


        [HttpPut("{id}")]
        public async Task<ActionResult<Sponzor>> UpdateSponzor([FromForm] UpdateSponzorDTO sponzorDto, int id)
        {
            //var originalSponzor = await _context.Sponzors.FindAsync(id);

            //if (originalSponzor == null)
            //{
            //    throw new ArgumentException("Sponzor not found");
            //}

            //originalSponzor.Name = sponzor.Name;
            //originalSponzor.Email = sponzor.Email;
            //originalSponzor.StartDate = sponzor.StartDate;
            //originalSponzor.EndDate = sponzor.EndDate;
            //originalSponzor.Notes = sponzor.Notes;

            //_context.Sponzors.Update(originalSponzor);
            //await _context.SaveChangesAsync();
            //return new OkObjectResult("Sponzor updated succesfully!");

            var sponzor = await _context.Sponzors.FindAsync(id);

            if (sponzor == null) return NotFound();

            _mapper.Map(sponzorDto, sponzor);

            if (sponzorDto.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(sponzorDto.File);

                if (imageResult.Error != null)
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

                if (!string.IsNullOrEmpty(sponzor.CloudanaryPublicId))
                    await _imageService.DeleteImageAsync(sponzor.CloudanaryPublicId);

                sponzor.PictureUrl = imageResult.SecureUrl.ToString();
                sponzor.CloudanaryPublicId = imageResult.PublicId;
            }

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(sponzor);

            return BadRequest(new ProblemDetails { Title = "Problem updating banori" });

        }

        [HttpDelete]
        public async Task<ActionResult> DeleteSponzor(int id)
        {
            //var originalSponzor = await _context.Sponzors.FindAsync(id);

            //if (originalSponzor == null)
            //{
            //    throw new ArgumentException("Sponzor not found");

            //}

            //_context.Sponzors.Remove(originalSponzor);
            //await _context.SaveChangesAsync();
            //return new OkObjectResult("Sponzor deleted succesfully!");

            var sponzor = await _context.Sponzors.FindAsync(id);

            if (sponzor == null) return NotFound();

            if (!string.IsNullOrEmpty(sponzor.CloudanaryPublicId))
                await _imageService.DeleteImageAsync(sponzor.CloudanaryPublicId);

            _context.Sponzors.Remove(sponzor);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting banori" });
        }



    }
}

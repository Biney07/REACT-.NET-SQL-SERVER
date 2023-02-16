using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TESTING.Data;
using TESTING.Model;
using TESTING.Services;

namespace TESTING.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class MomentsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public MomentsController(AppDbContext context)
        {
            _context = context;
           
        }

        [HttpGet]
        public async Task<IEnumerable<MomentDTO>> GetMoments()
        {
            var moments = await _context.Moments.ToListAsync();
            return moments.Select(moment => new MomentDTO
            {
               Id = moment.Id, 
               Title= moment.Title,
               Description= moment.Description,
               VideoURL= moment.VideoURL,
               Date= moment.Date,

            });
        }

        [HttpGet("{id}", Name = "GetMoment")]
        public async Task<ActionResult<Moment>> GetMomentByID(int id)
        {
            var moments = await _context.Moments.FindAsync(id);

            return Ok(moments);

        }

        [HttpPost("addMoment")]
        public async Task<ActionResult<MomentDTO>> CreateMoment(MomentDTO moment)
        {
            var newMoment = new Moment
            {
                Title = moment.Title,
                Description = moment.Description,
                VideoURL = moment.VideoURL,
                Date = moment.Date,
            };

            _context.Moments.Add(newMoment);
            await _context.SaveChangesAsync();
            return new OkObjectResult("Moment created succesfully!");

        }

        [HttpPut("updateMoment/{id}")]
        public async Task<ActionResult<MomentDTO>> UpdateMoment(UpdateMomentDTO moment, int id)
        {
            var originalMoment = await _context.Moments.FindAsync(id);

            if (originalMoment == null)
            {
                throw new ArgumentException("Moment not found");
            }

            originalMoment.Title = moment.Title;
            originalMoment.Description = moment.Description;
            originalMoment.VideoURL = moment.VideoURL;
            originalMoment.Date = moment.Date;




            _context.Moments.Update(originalMoment);
            await _context.SaveChangesAsync();
            return new OkObjectResult("Moment updated succesfully!");

        }


        [HttpDelete("delMoment/{id}")]
        public async Task<ActionResult> DeleteMoment(int id)
        {
            var originalMoment = await _context.Moments.FindAsync(id);

            if (originalMoment == null)
            {
                throw new ArgumentException("Moment not found");

            }

            _context.Moments.Remove(originalMoment);
            await _context.SaveChangesAsync();
            return new OkObjectResult("Moment deleted succesfully!");
        }

    }
}

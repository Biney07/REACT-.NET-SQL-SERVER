using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TESTING.Data;
using TESTING.Model;

namespace TESTING.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class PrimesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PrimesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<PrimeDTO>> GetPrimes()
        {
            var primes = await _context.Primes.ToListAsync();
            return primes.Select(prime => new PrimeDTO
            {
                Id = prime.Id,
                //clicks = moment.clicks,
                Title = prime.Title,
                week = prime.week,
                Lojrat= prime.Lojrat,
                Banoret= prime.Banoret,
                Description = prime.Description,
                VideoURL = prime.VideoURL,
                Date = prime.Date

            });
        }

        [HttpGet("{id}", Name = "GetPrime")]
        public async Task<ActionResult<Prime>> GetPrimeByID(int id)
        {
            var primes = await _context.Primes.FindAsync(id);

            return Ok(primes);

        }

        [HttpPost("addPrime")]
        public async Task<ActionResult<PrimeDTO>> CreatePrime(PrimeDTO prime)
        {
            var newPrime = new Prime
            {
                Title = prime.Title,
                week = prime.week,
                Lojrat = prime.Lojrat,
                Banoret = prime.Banoret,
                Description = prime.Description,
                VideoURL = prime.VideoURL,
                Date = prime.Date
            };

            _context.Primes.Add(newPrime);
            await _context.SaveChangesAsync();
            return new OkObjectResult("Prime created succesfully!");

        }

        [HttpPut("updatePrime/{id}")]
        public async Task<ActionResult<PrimeDTO>> UpdatePrime(UpdatePrimeDTO prime, int id)
        {
            var originalPrime = await _context.Primes.FindAsync(id);

            if (originalPrime == null)
            {
                throw new ArgumentException("Prime not found");
            }

            originalPrime.Title = prime.Title;
            originalPrime.Description = prime.Description;
            originalPrime.week = prime.week;
            originalPrime.VideoURL = prime.VideoURL;
            originalPrime.Banoret = prime.Banoret;
            originalPrime.Lojrat = prime.Lojrat;

            _context.Primes.Update(originalPrime);
            await _context.SaveChangesAsync();
            return new OkObjectResult("Prime updated succesfully!");

        }


        [HttpDelete("delPrime/{id}")]
        public async Task<ActionResult> DeletePrime(int id)
        {
            var originalPrime = await _context.Primes.FindAsync(id);

            if (originalPrime == null)
            {
                throw new ArgumentException("Prime not found");

            }

            _context.Primes.Remove(originalPrime);
            await _context.SaveChangesAsync();
            return new OkObjectResult("Prime deleted succesfully!");
        }
    }
}

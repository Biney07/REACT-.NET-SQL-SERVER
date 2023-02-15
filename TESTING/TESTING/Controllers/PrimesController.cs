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
                Title = prime.Title,
                week = prime.week,
                VideoURL = prime.VideoURL,

            });
        }

        [HttpGet("{id}", Name = "GetPrime")]
        public async Task<ActionResult<Prime>> GetPrimeByID(int id)
        {
            var primes = await _context.Primes.FindAsync(id);

            return Ok(primes);

        }

        [HttpPost]
        public async Task<ActionResult<PrimeDTO>> CreatePrime(PrimeDTO prime)
        {
            var newPrime = new Prime
            {

                Title = prime.Title,
                week = prime.week,
                VideoURL = prime.VideoURL,
            };

            _context.Primes.Add(newPrime);
            await _context.SaveChangesAsync();
            return new OkObjectResult("Prime created succesfully!");

        }

        [HttpPut]
        public async Task<ActionResult<PrimeDTO>> UpdatePrime(UpdatePrimeDTO prime, int id)
        {
            var originalPrime = await _context.Primes.FindAsync(id);

            if (originalPrime == null)
            {
                throw new ArgumentException("Prime not found");
            }

            originalPrime.Title = prime.Title;
            originalPrime.week = prime.week;
            originalPrime.VideoURL = prime.VideoURL;

            _context.Primes.Update(originalPrime);
            await _context.SaveChangesAsync();
            return new OkObjectResult("Prime updated succesfully!");

        }


        [HttpDelete]
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

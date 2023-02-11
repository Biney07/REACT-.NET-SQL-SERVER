using Microsoft.AspNetCore.Mvc;
using TESTING.Services;

namespace TESTING.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class PhotoController : ControllerBase
    {
        private readonly IImageService _imageService;
        public PhotoController(IImageService imageService)
        {
            _imageService = imageService;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadPhoto(IFormFile file)
        {
            var uploadResult = await _imageService.AddPhotoAsync(file);
            return Ok(new { publicId = uploadResult.PublicId });
        }
    }

}


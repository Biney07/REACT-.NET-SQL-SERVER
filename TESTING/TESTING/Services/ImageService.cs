

using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using TESTING.Helpers;

namespace TESTING.Services
{
    public class ImageService
    {
      
        public readonly Cloudinary _cloundinary;

        public ImageService(IOptions<CloudinarySettings> config)
        {
            var acc = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );
            _cloundinary = new Cloudinary(acc);
        }
        public async Task<ImageUploadResult> AddImageAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream)
                };
                uploadResult = await _cloundinary.UploadAsync(uploadParams);
            }

            return uploadResult;
        }

        public async Task<DeletionResult> DeleteImageAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);

            var result = await _cloundinary.DestroyAsync(deleteParams);

            return result;
        }
    }
}
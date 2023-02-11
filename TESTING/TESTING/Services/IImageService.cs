using CloudinaryDotNet.Actions;

namespace TESTING.Services
{
    public interface IImageService
    {

        Task<ImageUploadResult> AddPhotoAsync(IFormFile file);

        Task<DeletionResult> DeletePhotoAsync(string publicId);
    }
}

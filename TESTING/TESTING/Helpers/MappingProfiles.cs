using AutoMapper;
using TESTING.DTO;
using TESTING.Model;

namespace TESTING.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<CreateProductDto, Product>();
            CreateMap<UpdateProductDTO, Product>();
        }
    }
}

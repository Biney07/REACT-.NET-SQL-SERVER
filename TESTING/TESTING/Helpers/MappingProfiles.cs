using AutoMapper;
using TESTING.DTO;
using TESTING.Model;

namespace TESTING.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<CreateBanoriDto, Banori>();
            CreateMap<UpdateBanoriDTO, Banori>();
            CreateMap<SponzorDTO, Sponzor>();
            CreateMap<CreateSponzorDTO, Sponzor>();
            CreateMap<UpdateSponzorDTO, Sponzor>();
        }
    }
}

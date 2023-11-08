using AutoMapper;
using MsmtApp.Models;

namespace MsmtApp.AutoMaper
{
    public class AutoMaper_Profile : Profile
    {
        public AutoMaper_Profile()
        {
            CreateMap<Class_IndustrialUnit, IUnitEdit_ViewModel>();
            CreateMap<Class_Province, MapInfoViewModel>();
        }
    }
}

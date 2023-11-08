using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MsmtApp.Models;
using MsmtApp.Models.Repository;

namespace MsmtApp.Controllers
{
    public class MapPanelController : Controller
    {
        private Rep_IRepository IRepository;
        private readonly IMapper _mapper;

        public MapPanelController(Rep_IRepository _iRepository, IMapper mapper)
        {
            IRepository = _iRepository;
            _mapper = mapper;
        }
      
        //[Route("MapPanel/OLView")]
        public IActionResult OLView()
        {
            var GetAll_Province = IRepository.Rep_GetAllProvince();
            var IUnit_List = _mapper.Map<List<MapInfoViewModel>>(GetAll_Province);
            return View(IUnit_List);
        }              
    }
}
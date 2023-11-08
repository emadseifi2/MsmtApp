using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MsmtApp.Models;
using MsmtApp.Models.DTOs;
using MsmtApp.Models.Repository;
using Newtonsoft.Json.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using NetTopologySuite;
using NetTopologySuite.Geometries;
using NetTopologySuite.IO;

namespace MsmtApp.Controllers
{
    [Authorize]
    public class AreaManagementController : Controller
    {
        private Rep_IRepository IRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<AreaManagementController> _logger;
        public AreaManagementController(ILogger<AreaManagementController> logger, Rep_IRepository _iRepository, IMapper mapper)
        {
            _logger = logger;
            IRepository = _iRepository;
            _mapper = mapper;
        }

        #region ***************************************************** Province 
        public IActionResult Mange_Province()
        {
            return this.PartialView("/Views/AdminPanel/MangeProvince.cshtml");
        }

        [HttpPost]
        [AllowAnonymous]
        public JsonResult Add_Province([FromBody] List<Dto_AddProvince> Dto_AddProvince)
        {
            if (Dto_AddProvince == null)
            {
                return Json(new { message = "داده های ارسالی مشکل دارد" });
            }
            else
            {
                IRepository.Rep_AddProvince(Dto_AddProvince);
                return Json(new { message = "داده ها با موفقیت در بانک اطلاعاتی ذخیره شدند." });
            }
        }

        public IActionResult Find_Province(string _areaId)
        {
            var existingProvince = IRepository.Rep_FindProvince(_areaId);

            if (existingProvince != null)
            {
                // ایجاد و پر کردن ویو مدل
                var provinceViewModel = new ProvinceViewModel
                {
                    ProvinceId = existingProvince.ProvinceId,
                    ProvinceName = existingProvince.ProvinceName,
                    ProvinceAdminLevel= existingProvince.ProvinceAdminLevel,
                    ProvinceAreaId= existingProvince.ProvinceAreaId,
                    // تبدیل محدوده به لیستی از نقاط
                    PolygonCoordinates = IRepository.ConvertPolygonToViewModel(existingProvince.ProvinceCoordinates)
                };

                return Json(provinceViewModel);
            }

            return NotFound(); // یا مناسب دانسته شده   
        }
        #endregion

        #region ***************************************************** County    
        public IActionResult Mange_County()
        {
            var AllCounty = IRepository.Rep_GetAllCounty();
            return this.PartialView("/Views/AdminPanel/MangeCounty.cshtml", AllCounty);
        }

        [HttpPost]
        [AllowAnonymous]
        public JsonResult Add_County([FromBody] List<Dto_AddCounty> Dto_AddCounty)
        {
            if (Dto_AddCounty == null)
            {
                return Json(new { message = "داده های ارسالی مشکل دارد" });
            }
            else
            {
                IRepository.Rep_AddCounty(Dto_AddCounty);
                return Json(new { message = "داده ها با موفقیت در بانک اطلاعاتی ذخیره شدند." });
            }
        }
        #endregion
    }

    internal class GeoJsonWriter
    {
        public GeoJsonWriter()
        {
        }

        internal object Write(Polygon provinceCoordinates)
        {
            throw new NotImplementedException();
        }
    }
}
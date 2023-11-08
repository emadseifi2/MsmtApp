using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MsmtApp.Models;
using MsmtApp.Models.DTOs;
using MsmtApp.Models.Repository;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace MsmtApp.Controllers
{
    [Authorize]
    public class AdminPanelController : Controller
    {
        private Rep_IRepository IRepository;
        private readonly IMapper _mapper;

        private readonly ILogger<AdminPanelController> _logger;
        public AdminPanelController(ILogger<AdminPanelController> logger, Rep_IRepository _iRepository, IMapper mapper)
        {
            _logger = logger;
            IRepository = _iRepository;
            _mapper = mapper;
        }

        public async Task<IActionResult> Main()
        {
            ViewBag.Count_Group = await IRepository.GetCount_IGroupAsync();
            ViewBag.Count_Unite = await IRepository.GetCount_IUniteAsync();
            ViewBag.Count_UniteFixMe = await IRepository.GetCount_IUniteFixMeAsync();
            ViewBag.Count_Group4Digit = await IRepository.GetCount_IGroup4DigitAsync();
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }

        #region ***************************************************** IndustryGroup
        public IActionResult IGroup_All()
        {
            return this.PartialView("/Views/AdminPanel/IGroup_All.cshtml");
        }

        public IActionResult IGroup_AllMain()
        {
            var result = IRepository.GetAll_IGroup();
            var jsonResult = new JsonResult(result, new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve,
                WriteIndented = true
            });
            jsonResult.ContentType = "application/json";
            return jsonResult;
        }

        public IActionResult IGroup_Add()
        {
            return PartialView("/Views/AdminPanel/IGroup_Add.cshtml");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult IGroup_Add([Bind("IndustryGroupId,IndustryGroupTitle,IndustryGroupFullName,IndustryGroupCode,IndustryGroupColor")] Class_IndustryGroup _newGroup)
        {
            if (ModelState.IsValid)
            {
                IRepository.Add_IGroup(_newGroup);
                var name = _newGroup.IndustryGroupTitle;
                TempData["Operation"] = "create";
                TempData["Type"] = "گروه";
                TempData["Name"] = name;
                return RedirectToAction(nameof(Main));
            }
            return View();
        }

        public IActionResult IGroup_Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var IGroup = IRepository.IGroup_Find(id);

            if (IGroup == null)
            {
                return NotFound();
            }
            return this.PartialView("/Views/AdminPanel/IGroup_Edit.cshtml", IGroup);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult IGroup_Edit(int id, [Bind("IndustryGroupId,IndustryGroupTitle,IndustryGroupFullName,IndustryGroupCode,IndustryGroupColor")] Class_IndustryGroup _updateGroup)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    IRepository.IGroup_Update(_updateGroup, id);
                    var name = _updateGroup.IndustryGroupTitle;
                    TempData["Operation"] = "edite";
                    TempData["Type"] = "گروه";
                    TempData["Name"] = name;
                }
                catch (Exception)
                {
                    throw;
                }
                return RedirectToAction(nameof(Main));
            }
            return View(_updateGroup);
        }

        public IActionResult IGroup_Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var IGroupObject = IRepository.IGroup_Delete(id);
            if (IGroupObject == null)
            {
                return NotFound();
            }

            return PartialView(IGroupObject);
        }

        // POST: Oranos/Delete/5
        [HttpPost, ActionName("IGroup_Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult IGroup_DeleteConfirmed(int id)
        {
            var NameObject = IRepository.IGroup_Find(id);
            IRepository.IGroup_ConfarmDelete(id);
            TempData["Operation"] = "delete";
            TempData["Type"] = "گروه";
            TempData["Name"] = NameObject.IndustryGroupTitle;
            return RedirectToAction(nameof(Main));
        }
        #endregion

        #region ***************************************************** FourDigitActivityGroup
        public IActionResult FDAG_All()
        {
            return this.PartialView("/Views/AdminPanel/FDAG_All.cshtml");
        }

        public IActionResult FDAG_AllMain()
        {
            var result = IRepository.GetAll_FDAG();
            var jsonResult = new JsonResult(result, new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve,
                WriteIndented = true
            });
            jsonResult.ContentType = "application/json";
            return jsonResult;
        }

        public IActionResult FDAG_Add()
        {
            return PartialView("/Views/AdminPanel/IGroup_Add.cshtml");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult FDAG_Add([Bind("IndustryGroupId,IndustryGroupTitle,IndustryGroupFullName,IndustryGroupCode,IndustryGroupColor")] Class_IndustryGroup _newGroup)
        {
            if (ModelState.IsValid)
            {
                IRepository.Add_IGroup(_newGroup);
                var name = _newGroup.IndustryGroupTitle;
                TempData["Operation"] = "create";
                TempData["Type"] = "گروه";
                TempData["Name"] = name;
                return RedirectToAction(nameof(Main));
            }
            return View();
        }

        public IActionResult FDAG_Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var IGroup = IRepository.IGroup_Find(id);

            if (IGroup == null)
            {
                return NotFound();
            }
            return this.PartialView("/Views/AdminPanel/IGroup_Edit.cshtml", IGroup);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult FDAG_Edit(int id, [Bind("IndustryGroupId,IndustryGroupTitle,IndustryGroupFullName,IndustryGroupCode,IndustryGroupColor")] Class_IndustryGroup _updateGroup)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    IRepository.IGroup_Update(_updateGroup, id);
                    var name = _updateGroup.IndustryGroupTitle;
                    TempData["Operation"] = "edite";
                    TempData["Type"] = "گروه";
                    TempData["Name"] = name;
                }
                catch (Exception)
                {
                    throw;
                }
                return RedirectToAction(nameof(Main));
            }
            return View(_updateGroup);
        }

        public IActionResult FDAG_Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var IGroupObject = IRepository.IGroup_Delete(id);
            if (IGroupObject == null)
            {
                return NotFound();
            }

            return PartialView(IGroupObject);
        }

        // POST: Oranos/Delete/5
        [HttpPost, ActionName("IGroup_Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult FDAG_DeleteConfirmed(int id)
        {
            var NameObject = IRepository.IGroup_Find(id);
            IRepository.IGroup_ConfarmDelete(id);
            TempData["Operation"] = "delete";
            TempData["Type"] = "گروه";
            TempData["Name"] = NameObject.IndustryGroupTitle;
            return RedirectToAction(nameof(Main));
        }
        #endregion

        #region ***************************************************** IndustrialUnit
        public IActionResult IUnit_All()
        {
            var result = IRepository.GetAll_IGroup();
            return this.PartialView("/Views/AdminPanel/IUnit_All.cshtml", result);
        }

        public IActionResult IUnit_AddDragDrop()
        {
            return this.PartialView("/Views/AdminPanel/IUnit_AddDragDrop.cshtml");
        }

        [HttpPost]
        [AllowAnonymous]
        public JsonResult IUnit_AddExelData([FromBody] List<AddIndustrialUnitExelDTOs> AddIndustrialUnitExelDTOs)
        {
            if (AddIndustrialUnitExelDTOs == null)
            {
                return Json(new { message = "داده های ارسالی مشکل دارد" });
            }
            else
            {
                IRepository.IUnit_SaveExelData(AddIndustrialUnitExelDTOs);
                return Json(new { message = "داده ها با موفقیت در بانک اطلاعاتی ذخیره شدند." });
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public JsonResult IUnit_EditExelData([FromBody] List<EditIndustrialUnitExelDTOs> EditIndustrialUnitExelDTOs)
        {
            if (EditIndustrialUnitExelDTOs == null)
            {
                return Json(new { message = "داده های ارسالی مشکل دارد" });
            }
            else
            {
                IRepository.IUnit_UpdateExelData(EditIndustrialUnitExelDTOs);
                return Json(new { message = "داده ها با موفقیت در بانک اطلاعاتی ذخیره شدند." });
            }
        }

        public IActionResult IUnit_Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var IUnitFind = IRepository.IUnit_Find(id);
            var _editIUnitViewModel = _mapper.Map<IUnitEdit_ViewModel>(IUnitFind);
            return PartialView("/Views/AdminPanel/IUnit_Edit.cshtml", _editIUnitViewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult IUnit_Edit(int id, IUnitEdit_ViewModel _updateIUnit)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    IRepository.IUnit_Update(_updateIUnit, id);
                    var name = _updateIUnit.UnitName;
                    TempData["Operation"] = "edite";
                    TempData["Type"] = "گروه";
                    TempData["Name"] = name;
                }
                catch (Exception)
                {
                    throw;
                }
                return RedirectToAction(nameof(Main));
            }
            return View(_updateIUnit);
        }

        public IActionResult IUnit_Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var IGroupObject = IRepository.IUnit_Delete(id);
            if (IGroupObject == null)
            {
                return NotFound();
            }

            return PartialView(IGroupObject);
        }

        // POST: Oranos/Delete/5
        [HttpPost, ActionName("IUnit_Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult IUnit_DeleteConfirmed(int id)
        {
            var NameObject = IRepository.IUnit_Find(id);
            IRepository.IUnit_ConfarmDelete(id);
            TempData["Operation"] = "delete";
            TempData["Type"] = "واحد";
            TempData["Name"] = NameObject.UnitName;
            return RedirectToAction(nameof(Main));
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult IUnit_CollectionQuery(string ProviceCheck, string GroupCheck, string ProviceName, string CityName, string GroupName)
        {
            List<Class_IndustrialUnit> IUnitList = new List<Class_IndustrialUnit>();

            if (ProviceCheck == "Province")
            {
                if (GroupCheck == "AllGroup")
                {
                    IEnumerable<Class_IndustrialUnit> IUnit = IRepository.IUnitList_AllCityAndAllGroup(ProviceName);
                    IUnitList.AddRange(IUnit);
                }
                else if (GroupCheck == "MultiGrouph")
                {
                    string[] groupNameArray = GroupName.Split(',');
                    for (int i = 0; i < groupNameArray.Length; i++)
                    {
                        IEnumerable<Class_IndustrialUnit> IUnit = IRepository.IUnitList_AllCityAndMultiGroup(ProviceName, groupNameArray[i]);
                        IUnitList.AddRange(IUnit);
                    };
                };
            }
            else if (ProviceCheck == "City")
            {
                if (GroupCheck == "AllGroup")
                {
                    string[] CityNameArray = CityName.Split(',');
                    for (int i = 0; i < CityNameArray.Length; i++)
                    {
                        IEnumerable<Class_IndustrialUnit> IUnit = IRepository.IUnitList_MultiCityAndAllGroup(CityNameArray[i]);
                        IUnitList.AddRange(IUnit);
                    };
                }
                else if (GroupCheck == "MultiGrouph")
                {
                    string[] CityNameArray = CityName.Split(',');
                    for (int i = 0; i < CityNameArray.Length; i++)
                    {
                        string[] groupNameArray = GroupName.Split(',');
                        for (int u = 0; u < groupNameArray.Length; u++)
                        {
                            IEnumerable<Class_IndustrialUnit> IUnit = IRepository.IUnitList_MultiCityAndMultiGroup(CityNameArray[i], groupNameArray[u]);
                            IUnitList.AddRange(IUnit);
                        };
                    };
                };
            };
            var IUnitListCount = IUnitList;
            return new JsonResult(IUnitList);
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult IUnit_Details(int id)
        {
            var IUnitObj = IRepository.IUnit_Find(id);
            return new JsonResult(IUnitObj);
        }

        [HttpPost]
        public IActionResult IUnit_SearchByUnitName(string UnitName)
        {
            IEnumerable<Class_IndustrialUnit> FindByUnitName = new List<Class_IndustrialUnit>();

            FindByUnitName = IRepository.IUnit_SearchByName(UnitName);
            return new JsonResult(FindByUnitName);
        }
        #endregion

        #region ***************************************************** Industrial Report
        public IActionResult UnderConstruction()
        {
            return this.PartialView("/Views/AdminPanel/UnderConstruction.cshtml");
        }
        #endregion

        #region ***************************************************** Main Report
        public async Task<IActionResult> IUnit_NeedToFix()
        {
            var result = await IRepository.GetAll_UniteFixMeAsync();
            return new JsonResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> IUnit_ProvinceChart(string ProviceName)
        {
            return new JsonResult(await IRepository.GetAll_UnitProvinceAsync(ProviceName));
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult InitialGroups()
        {
            var AllGroup = IRepository.GetAllGroupAndSubGroup();
            return new JsonResult(AllGroup);
        }
        #endregion      
    }
}
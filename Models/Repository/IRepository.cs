using Microsoft.EntityFrameworkCore;
using MsmtApp.Models.DTOs;
using MsmtApp.Models.EntityFramework.DBContext;
using NetTopologySuite;
using NetTopologySuite.Geometries;
using NetTopologySuite.IO;

namespace MsmtApp.Models.Repository
{
    public interface Rep_IRepository
    {
        #region ***************************************************** IndustryGroup
        //Repository Methods for IndustryGroup Model
        IEnumerable<Class_IndustryGroup> GetAll_IGroup();
        void Add_IGroup(Class_IndustryGroup _newGroup);
        dynamic IGroup_Find(int? id);
        void IGroup_Update(Class_IndustryGroup _updateUnit, int id);
        object IGroup_Delete(int? id);
        void IGroup_ConfarmDelete(int id);
        #endregion

        #region ***************************************************** FourDigitActivityGroup
        //Repository Methods for IndustryGroup Model
        IEnumerable<Class_FourDigitActivityGroup> GetAll_FDAG();
        void Add_FDAG(Class_FourDigitActivityGroup _newGroup);
        dynamic Find_FDAG(int? id);
        void Update_FDAG(Class_FourDigitActivityGroup _updateUnit, int id);
        object Delete_FDAG(int? id);
        void ConfarmDelete_FDAG(int id);
        #endregion

        #region ***************************************************** IndustrialUnit
        //Repository Methods for IndustrialUnit Model
        IEnumerable<Class_IndustrialUnit> GetAll_IUnit();
        void IUnit_SaveExelData(List<AddIndustrialUnitExelDTOs> AddIndustrialUnitExelDTOs);
        void IUnit_UpdateExelData(List<EditIndustrialUnitExelDTOs> EditIndustrialUnitExelDTOs);
        void IUnit_Update(IUnitEdit_ViewModel _updateUnit, int id);
        Class_IndustrialUnit IUnit_Find(int? id);
        IEnumerable<Class_IndustrialUnit> IUnit_SearchByName(string _unitName);
        object IUnit_Delete(int? id);
        void IUnit_ConfarmDelete(int id);
        #endregion

        #region ***************************************************** Province
        List<PointViewModel> ConvertPolygonToViewModel(Geometry polygon);

        //Repository Methods for Province Model
        void Rep_AddProvince(List<Dto_AddProvince> Dto_AddProvince);
        IEnumerable<Class_Province> Rep_GetAllProvince();
        Class_Province Rep_FindProvince(string _areaId);

        //Repository Methods for County Model
        void Rep_AddCounty(List<Dto_AddCounty> Dto_AddCounty);
        IEnumerable<Class_County> Rep_GetAllCounty();
        #endregion       

        #region ***************************************************** All Query Withe Industrial Unit
        IEnumerable<Class_IndustrialUnit> IUnitList_AllCityAndAllGroup(string Provice);
        IEnumerable<Class_IndustrialUnit> IUnitList_AllCityAndMultiGroup(string? Provice, string Group);
        IEnumerable<Class_IndustrialUnit> IUnitList_MultiCityAndAllGroup(string? Provice);
        IEnumerable<Class_IndustrialUnit> IUnitList_MultiCityAndMultiGroup(string? Provice, string Group);
        IEnumerable<Class_IndustryGroup> GetAllGroupAndSubGroup();
        #endregion

        #region ***************************************************** User
        //Repository Methods for Users Model
        IEnumerable<Class_Users> Users_GetAll();
        bool User_IsExist(string _username);
        void User_Add(Register_ViewModel _user);
        Class_Users User_login(string _userName, string _password);
        #endregion

        #region ***************************************************** All Report
        Task<int> GetCount_IGroupAsync();
        Task<int> GetCount_IUniteAsync();
        Task<int> GetCount_IUniteFixMeAsync();
        Task<int> GetCount_IUniteComplateAsync();
        Task<int> GetCount_IGroup4DigitAsync();
        Task<IEnumerable<Class_IndustrialUnit>> GetAll_UniteFixMeAsync();
        Task<IEnumerable<Class_IndustrialUnit>> GetAll_UnitProvinceAsync(string _province);
        #endregion
    }

    public class rep_IRepository : Rep_IRepository
    {
        private MsmtDBContext _context;
        public rep_IRepository(MsmtDBContext context)
        {
            _context = context;
        }

        #region ***************************************************** IndustrialGroup
        public IEnumerable<Class_IndustryGroup> GetAll_IGroup()
        {
            return _context.DB_IndustryGroup.ToList();
        }

        public void Add_IGroup(Class_IndustryGroup _newGroup)
        {
            _context.Add(_newGroup);
            _context.SaveChanges();
        }

        public dynamic IGroup_Find(int? id)
        {
            return _context.DB_IndustryGroup.Find(id) ?? new object();
        }

        public void IGroup_Update(Class_IndustryGroup _updateGroup, int id)
        {
            var _ObjectIGroup = _context.DB_IndustryGroup
                .Find(id)!;

            _ObjectIGroup.IndustryGroupTitle = _updateGroup.IndustryGroupTitle;
            _ObjectIGroup.IndustryGroupFullName = _updateGroup.IndustryGroupFullName;
            _ObjectIGroup.IndustryGroupCode = _updateGroup.IndustryGroupCode;
            _ObjectIGroup.IndustryGroupColor = _updateGroup.IndustryGroupColor;
            _ObjectIGroup.IndustryRGB_R = _updateGroup.IndustryRGB_R;
            _ObjectIGroup.IndustryRGB_G = _updateGroup.IndustryRGB_G;
            _ObjectIGroup.IndustryRGB_B = _updateGroup.IndustryRGB_B;

            //Save new Charge Object
            _context.Update(_ObjectIGroup);
            _context.SaveChanges();
        }

        public object IGroup_Delete(int? id)
        {
            return _context.DB_IndustryGroup.FirstOrDefault(m => m.IndustryGroupId == id)!;
        }

        public void IGroup_ConfarmDelete(int id)
        {
            var unit_Find = _context.DB_IndustryGroup.Find(id)!;
            _context.DB_IndustryGroup.Remove(unit_Find);
            _context.SaveChanges();
        }

        #endregion

        #region ***************************************************** FourDigitActivityGroup
        public IEnumerable<Class_FourDigitActivityGroup> GetAll_FDAG()
        {
            return _context.DB_FourDigitActivityGroup.ToList();
        }

        public void Add_FDAG(Class_FourDigitActivityGroup _newGroup)
        {
            _context.Add(_newGroup);
            _context.SaveChanges();
        }

        public dynamic Find_FDAG(int? id)
        {
            return _context.DB_FourDigitActivityGroup.Find(id) ?? new object();
        }

        public void Update_FDAG(Class_FourDigitActivityGroup _updateFDAG, int id)
        {
            var _ObjectFDAG = _context.DB_FourDigitActivityGroup
                .Find(id)!;

            _ObjectFDAG.FDAG_Title = _updateFDAG.FDAG_Title;
            _ObjectFDAG.FDAG_FullName = _updateFDAG.FDAG_FullName;
            _ObjectFDAG.FDAG_Code = _updateFDAG.FDAG_Code;
            _ObjectFDAG.FDAG_Color = _updateFDAG.FDAG_Color;
            _ObjectFDAG.FDAG_RGB_R = _updateFDAG.FDAG_RGB_R;
            _ObjectFDAG.FDAG_RGB_G = _updateFDAG.FDAG_RGB_G;
            _ObjectFDAG.FDAG_RGB_B = _updateFDAG.FDAG_RGB_B;

            //Save new Charge Object
            _context.Update(_ObjectFDAG);
            _context.SaveChanges();
        }

        public object Delete_FDAG(int? id)
        {
            return _context.DB_FourDigitActivityGroup.FirstOrDefault(m => m.FDAG_id == id)!;
        }

        public void ConfarmDelete_FDAG(int id)
        {
            var FDAG_Find = _context.DB_FourDigitActivityGroup.Find(id)!;
            _context.DB_FourDigitActivityGroup.Remove(FDAG_Find);
            _context.SaveChanges();
        }

        #endregion

        #region ***************************************************** IndustrialUnit
        public IEnumerable<Class_IndustrialUnit> GetAll_IUnit()
        {
            var GetAll_IUnit = _context.DB_IndustrialUnit
                .ToList();

            return GetAll_IUnit;
        }

        public void IUnit_SaveExelData(List<AddIndustrialUnitExelDTOs> AddIndustrialUnitExelDTOs)
        {
            foreach (var item in AddIndustrialUnitExelDTOs)
            {
                // بررسی وجود واحد صنعتی با همین نام در دیتابیس
                var existingUnit = _context.DB_IndustrialUnit
                    .FirstOrDefault(u => u.UnitName == item.UnitName);

                var findID = _context.DB_FourDigitActivityGroup
                .FirstOrDefault(fi => fi.FDAG_Code == (item.FDAG_id).ToString());

                if (existingUnit == null)
                {
                    // اگر واحد صنعتی با همین نام در دیتابیس وجود نداشت، اطلاعات جدید ذخیره گردد
                    var entity = new Class_IndustrialUnit
                    {
                        UnitName = item.UnitName,
                        Province = item.Province,
                        City = item.City,
                        Phone = item.Phone,
                        ManagingName = item.ManagingName,
                        Longitude = item.Longitude,
                        Latitude = item.Latitude,
                        CentralOffice = item.CentralOffice,
                        FixMe = item.FixMe,
                        SourceData = item.SourceData,
                        FDAG_id = findID.FDAG_id
                    };
                    _context.Add(entity);
                }
            }
            _context.SaveChanges();
        }

        public void IUnit_UpdateExelData(List<EditIndustrialUnitExelDTOs> EditIndustrialUnitExelDTOs)
        {
            foreach (var item in EditIndustrialUnitExelDTOs)
            {
                Class_IndustrialUnit? ObjectIUnit = _context.DB_IndustrialUnit.FirstOrDefault(i => i.UnitName == item.UnitName);
                if (ObjectIUnit != null)
                {
                    ObjectIUnit.Province = item.Province;
                    ObjectIUnit.City = item.City;
                    ObjectIUnit.Phone = item.Phone;
                    ObjectIUnit.ManagingName = item.ManagingName;
                    ObjectIUnit.Longitude = item.Longitude;
                    ObjectIUnit.Latitude = item.Latitude;
                    ObjectIUnit.FixMe = item.FixMe;
                    _context.Update(ObjectIUnit);
                }
            }
            _context.SaveChanges();
        }

        public void IUnit_Update(IUnitEdit_ViewModel _updateUnit, int id)
        {
            //var ObjectIUnit = _context.DB_IndustrialUnit.Find(id);
            Class_IndustrialUnit? ObjectIUnit = _context.DB_IndustrialUnit.Find(id);

            if (ObjectIUnit != null)
            {
                ObjectIUnit.UnitName = _updateUnit.UnitName;
                ObjectIUnit.Province = _updateUnit.Province;
                ObjectIUnit.City = _updateUnit.City;
                ObjectIUnit.Phone = _updateUnit.Phone;
                ObjectIUnit.ManagingName = _updateUnit.ManagingName;
                ObjectIUnit.Longitude = _updateUnit.Longitude;
                ObjectIUnit.Latitude = _updateUnit.Latitude;
                ObjectIUnit.FixMe = _updateUnit.FixMe;

                //Save new Charge Object
                _context.Update(ObjectIUnit);
                _context.SaveChanges();
            }
        }

        public Class_IndustrialUnit IUnit_Find(int? id)
        {
            var industrialUnit = _context.DB_IndustrialUnit
        .Include(iu => iu.FourDigitActivityGroup)
        .SingleOrDefault(iu => iu.IndustryId == id);

            var result = new Class_IndustrialUnit
            {
                IndustryId = industrialUnit.IndustryId,
                UnitName = industrialUnit.UnitName,
                Province = industrialUnit.Province,
                City = industrialUnit.City,
                Phone = industrialUnit.Phone,
                ManagingName = industrialUnit.ManagingName,
                Longitude = industrialUnit.Longitude,
                Latitude = industrialUnit.Latitude,
                CentralOffice = industrialUnit.CentralOffice,
                FixMe = industrialUnit.FixMe,
                SourceData = industrialUnit.SourceData,
                FourDigitActivityGroup = new Class_FourDigitActivityGroup
                {
                    FDAG_id = industrialUnit.FourDigitActivityGroup.FDAG_id,
                    FDAG_Title = industrialUnit.FourDigitActivityGroup.FDAG_Title,
                    FDAG_FullName = industrialUnit.FourDigitActivityGroup.FDAG_FullName,
                    FDAG_Code = industrialUnit.FourDigitActivityGroup.FDAG_Code,
                    FDAG_Color = industrialUnit.FourDigitActivityGroup.FDAG_Color,
                    FDAG_RGB_R = industrialUnit.FourDigitActivityGroup.FDAG_RGB_R,
                    FDAG_RGB_G = industrialUnit.FourDigitActivityGroup.FDAG_RGB_G,
                    FDAG_RGB_B = industrialUnit.FourDigitActivityGroup.FDAG_RGB_B
                }
            };

            return result;
        }

        public object IUnit_Delete(int? id)
        {
            return _context.DB_IndustrialUnit.FirstOrDefault(m => m.IndustryId == id)!;
        }

        public void IUnit_ConfarmDelete(int id)
        {
            var unit_Find = _context.DB_IndustrialUnit.Find(id)!;
            _context.DB_IndustrialUnit.Remove(unit_Find);
            _context.SaveChanges();
        }
        #endregion

        #region *****************************************************  Net Topology Methods
        public List<PointViewModel> ConvertPolygonToViewModel(Geometry polygon)
        {
            if (polygon is Polygon poly)
            {
                List<PointViewModel> points = new List<PointViewModel>();

                foreach (var point in poly.ExteriorRing.Coordinates)
                {
                    points.Add(new PointViewModel { Latitude = point.Y, Longitude = point.X });
                }

                return points;
            }

            return null; // یا مناسب دانسته شده
        }

        //Repository Methods for Province Model 
        public void Rep_AddProvince(List<Dto_AddProvince> Dto_AddProvince)
        {
            #region ***************************************************** NetTopologySuite geometry 
            // ************ To create a point, we use the following code: ************
            // var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);
            // var currentLocation = geometryFactory.CreatePoint(new NetTopologySuite.Geometries.Coordinate(5, 3));


            // ************ We use the following code to create a line: ************
            // var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid:   4326);
            // Coordinate[] LineStringArray = new Coordinate[3];
            // LineStringArray[0] = new Coordinate(51.242079734802246, 35.63340706937167);
            // LineStringArray[1] = new Coordinate(51.23916149139404, 35.63082591309715);
            // LineStringArray[2] = new Coordinate(51.23504161834717, 35.633720988098574);
            // var LineString = geometryFactory.CreateLineString(LineStringArray);


            // ************ To create Poygon, we use the following code: ************
            // var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);
            // Coordinate[] polygonArray = new Coordinate[5];
            // polygonArray[0] = new Coordinate(51.394686698913574, 35.718608138232895);
            // polygonArray[1] = new Coordinate(51.392154693603516, 35.71808549588366);
            // polygonArray[2] = new Coordinate(51.39271259307861, 35.715507076789464);
            // polygonArray[3] = new Coordinate(51.395244598388665, 35.71655239188316);
            // polygonArray[4] = new Coordinate(51.394686698913574, 35.718608138232895);
            // var polygone = geometryFactory.CreatePolygon(polygonArray);
            #endregion

            foreach (var item in Dto_AddProvince)
            {
                var existingUnit = _context.DB_Province
                    .FirstOrDefault(u => u.ProvinceName == item.ProvinceName);

                if (existingUnit == null)
                {
                    var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);
                    var _coordinate = item.ProvinceCoordinates;
                    Coordinate[] polygonArray = new Coordinate[_coordinate.Count];

                    for (int c = 0; c < _coordinate.Count; c++)
                    {
                        var LatAndLon = _coordinate[c];
                        polygonArray[c] = new Coordinate(LatAndLon[0], LatAndLon[1]);
                    }
                    var polygone = geometryFactory.CreatePolygon(polygonArray);

                    var entity = new Class_Province
                    {
                        ProvinceName = item.ProvinceName,
                        ProvinceAdminLevel = item.ProvinceAdminLevel,
                        ProvinceAreaId = item.ProvinceAreaId,
                        ProvinceCoordinates = polygone
                    };
                    _context.Add(entity);
                }
            }
            _context.SaveChanges();
        }
        public IEnumerable<Class_Province> Rep_GetAllProvince()
        {
            var AllProvince = _context.DB_Province
                //.Include(iu => iu.FourDigitActivityGroup) // لینک کردن جدول Class_IndustrialUnit با جدول Class_IndustryGroup
                //.Where(iu => iu.Province == province) // فیلتر کردن داده‌ها براساس استان
                .Select(p => new Class_Province
                {
                    ProvinceId = p.ProvinceId,
                    ProvinceName = p.ProvinceName,
                    ProvinceAdminLevel = p.ProvinceAdminLevel,
                    ProvinceAreaId = p.ProvinceAreaId,
                    ProvinceCoordinates = p.ProvinceCoordinates
                })
                .ToList();

            return AllProvince;
        }
        public Class_Province Rep_FindProvince(string areaId)
        {
            var ExistingProvince = _context.DB_Province.FirstOrDefault(u => u.ProvinceAreaId == areaId);

            if (ExistingProvince != null)
            {
                Class_Province ResultProvince = new Class_Province
                {
                    ProvinceId = ExistingProvince.ProvinceId,
                    ProvinceName = ExistingProvince.ProvinceName,
                    ProvinceAdminLevel = ExistingProvince.ProvinceAdminLevel,
                    ProvinceAreaId = ExistingProvince.ProvinceAreaId,
                    ProvinceCoordinates = ExistingProvince.ProvinceCoordinates
                };

                if (ExistingProvince.ProvinceCoordinates is Polygon)
                {
                    // اگر مختصات به عنوان یک محدوده ذخیره شده باشد، می‌توانید از آن‌ها برای عملیاتی مانند نمایش یا محاسبات مکانی استفاده کنید
                    // اینجا ممکن است نیاز به محاسبات بیشتری برای مختصات داشته باشید
                    Polygon polygonCoordinates = (Polygon)ExistingProvince.ProvinceCoordinates;
                    var vertices = polygonCoordinates.ExteriorRing.Coordinates;

                    // اینجا می‌توانید به تمام نقاط محدوده دسترسی پیدا کرده و از آن‌ها برای عملیات استفاده کنید
                    // به عنوان مثال، می‌توانید مختصات هر رأس محدوده را بررسی کنید و از آن‌ها برای اهداف خود استفاده کنید
                }

                return ResultProvince;
            }

            return null; // اگر هی
        }

        //Repository Methods for County Model 
        public void Rep_AddCounty(List<Dto_AddCounty> Dto_AddCounty)
        {
            #region ***************************************************** NetTopologySuite geometry 
            // ************ To create a point, we use the following code: ************
            // var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);
            // var currentLocation = geometryFactory.CreatePoint(new NetTopologySuite.Geometries.Coordinate(5, 3));


            // ************ We use the following code to create a line: ************
            // var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid:   4326);
            // Coordinate[] LineStringArray = new Coordinate[3];
            // LineStringArray[0] = new Coordinate(51.242079734802246, 35.63340706937167);
            // LineStringArray[1] = new Coordinate(51.23916149139404, 35.63082591309715);
            // LineStringArray[2] = new Coordinate(51.23504161834717, 35.633720988098574);
            // var LineString = geometryFactory.CreateLineString(LineStringArray);


            // ************ To create Poygon, we use the following code: ************
            // var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);
            // Coordinate[] polygonArray = new Coordinate[5];
            // polygonArray[0] = new Coordinate(51.394686698913574, 35.718608138232895);
            // polygonArray[1] = new Coordinate(51.392154693603516, 35.71808549588366);
            // polygonArray[2] = new Coordinate(51.39271259307861, 35.715507076789464);
            // polygonArray[3] = new Coordinate(51.395244598388665, 35.71655239188316);
            // polygonArray[4] = new Coordinate(51.394686698913574, 35.718608138232895);
            // var polygone = geometryFactory.CreatePolygon(polygonArray);
            #endregion

            foreach (var item in Dto_AddCounty)
            {
                var existingCounty = _context.DB_County
                    .FirstOrDefault(u => u.CountyName == item.CountyName);

                if (existingCounty == null)
                {
                    var FkProvainc = _context.DB_Province
               .FirstOrDefault(fk => fk.ProvinceName == item.ProvinceName);
                    var test = FkProvainc;

                    var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);
                    var _coordinate = item.CountyCoordinates;
                    Coordinate[] polygonArray = new Coordinate[_coordinate.Count];

                    for (int c = 0; c < _coordinate.Count; c++)
                    {
                        var LatAndLon = _coordinate[c];
                        polygonArray[c] = new Coordinate(LatAndLon[0], LatAndLon[1]);
                    }
                    var polygone = geometryFactory.CreatePolygon(polygonArray);

                    Class_County County = new Class_County
                    {
                        CountyName = item.CountyName,
                        CountyAdminLevel = item.CountyAdminLevel,
                        CountyAreaId = item.CountyAreaId,
                        CountyCoordinates = polygone,
                        ProvinceId = FkProvainc.ProvinceId
                    };
                    _context.Add(County);
                }
            }
            _context.SaveChanges();
        }
        public IEnumerable<Class_County> Rep_GetAllCounty()
        {
            var AllCounty = _context.DB_County
                .Include(p => p.Province) // لینک کردن جدول Class_IndustrialUnit با جدول Class_IndustryGroup
                                          //.Where(iu => iu.Province == province) // فیلتر کردن داده‌ها براساس استان
                .Select(c => new Class_County
                {
                    CountyId = c.CountyId,
                    CountyName = c.CountyName,
                    CountyAdminLevel = c.CountyAdminLevel,
                    CountyAreaId = c.CountyAreaId,
                    CountyCoordinates = c.CountyCoordinates,
                    Province = new Class_Province // ایجاد یک شیء از نوع Class_IndustryGroup و پر کردن آن با اطلاعات مربوطه
                    {
                        ProvinceId = c.Province.ProvinceId,
                        ProvinceName = c.Province.ProvinceName,
                        ProvinceAdminLevel = c.Province.ProvinceAdminLevel,
                        ProvinceAreaId = c.Province.ProvinceAreaId,
                        ProvinceCoordinates = c.Province.ProvinceCoordinates
                    }
                })
                .ToList();

            return AllCounty;
        }
        #endregion      

        #region ***************************************************** All Query Withe Industrial Unit
        public IEnumerable<Class_IndustrialUnit> IUnitList_AllCityAndAllGroup(string province)
        {
            var collectionUnit = _context.DB_IndustrialUnit
                .Include(iu => iu.FourDigitActivityGroup) // لینک کردن جدول Class_IndustrialUnit با جدول Class_IndustryGroup
                .Where(iu => iu.Province == province) // فیلتر کردن داده‌ها براساس استان
                .Select(iu => new Class_IndustrialUnit
                {
                    IndustryId = iu.IndustryId,
                    UnitName = iu.UnitName,
                    Province = iu.Province,
                    City = iu.City,
                    Phone = iu.Phone,
                    ManagingName = iu.ManagingName,
                    Longitude = iu.Longitude,
                    Latitude = iu.Latitude,
                    CentralOffice = iu.CentralOffice,
                    FixMe = iu.FixMe,
                    SourceData = iu.SourceData,
                    FourDigitActivityGroup = new Class_FourDigitActivityGroup // ایجاد یک شیء از نوع Class_IndustryGroup و پر کردن آن با اطلاعات مربوطه
                    {
                        FDAG_id = iu.FourDigitActivityGroup.FDAG_id,
                        FDAG_Title = iu.FourDigitActivityGroup.FDAG_Title,
                        FDAG_FullName = iu.FourDigitActivityGroup.FDAG_FullName,
                        FDAG_Code = iu.FourDigitActivityGroup.FDAG_Code,
                        FDAG_Color = iu.FourDigitActivityGroup.FDAG_Color,
                        FDAG_RGB_R = iu.FourDigitActivityGroup.FDAG_RGB_R,
                        FDAG_RGB_G = iu.FourDigitActivityGroup.FDAG_RGB_G,
                        FDAG_RGB_B = iu.FourDigitActivityGroup.FDAG_RGB_B
                    }
                })
                .ToList();

            return collectionUnit;
        }
        public IEnumerable<Class_IndustrialUnit> IUnitList_AllCityAndMultiGroup(string? Provice, string Group)
        {
            var CollectionUnit = _context.DB_IndustrialUnit
               .Include(iu => iu.FourDigitActivityGroup) // لینک کردن جدول Class_IndustrialUnit با جدول Class_IndustryGroup
               .Where(u => (u.Province == Provice) && (u.FourDigitActivityGroup.FDAG_Title == Group)) // فیلتر کردن داده‌ها براساس استان
               .Select(iu => new Class_IndustrialUnit
               {
                   IndustryId = iu.IndustryId,
                   UnitName = iu.UnitName,
                   Province = iu.Province,
                   City = iu.City,
                   Phone = iu.Phone,
                   ManagingName = iu.ManagingName,
                   Longitude = iu.Longitude,
                   Latitude = iu.Latitude,
                   CentralOffice = iu.CentralOffice,
                   FixMe = iu.FixMe,
                   SourceData = iu.SourceData,
                   FourDigitActivityGroup = new Class_FourDigitActivityGroup // ایجاد یک شیء از نوع Class_IndustryGroup و پر کردن آن با اطلاعات مربوطه
                   {
                       FDAG_id = iu.FourDigitActivityGroup.FDAG_id,
                       FDAG_Title = iu.FourDigitActivityGroup.FDAG_Title,
                       FDAG_FullName = iu.FourDigitActivityGroup.FDAG_FullName,
                       FDAG_Code = iu.FourDigitActivityGroup.FDAG_Code,
                       FDAG_Color = iu.FourDigitActivityGroup.FDAG_Color,
                       FDAG_RGB_R = iu.FourDigitActivityGroup.FDAG_RGB_R,
                       FDAG_RGB_G = iu.FourDigitActivityGroup.FDAG_RGB_G,
                       FDAG_RGB_B = iu.FourDigitActivityGroup.FDAG_RGB_B
                   }
               })
               .ToList();

            return CollectionUnit;
        }
        public IEnumerable<Class_IndustrialUnit> IUnitList_MultiCityAndAllGroup(string? Provice)
        {
            var CollectionUnit = _context.DB_IndustrialUnit
               .Include(iu => iu.FourDigitActivityGroup) // لینک کردن جدول Class_IndustrialUnit با جدول Class_IndustryGroup
               .Where(iu => iu.City == Provice)  // فیلتر کردن داده‌ها براساس استان
               .Select(iu => new Class_IndustrialUnit
               {
                   IndustryId = iu.IndustryId,
                   UnitName = iu.UnitName,
                   Province = iu.Province,
                   City = iu.City,
                   Phone = iu.Phone,
                   ManagingName = iu.ManagingName,
                   Longitude = iu.Longitude,
                   Latitude = iu.Latitude,
                   CentralOffice = iu.CentralOffice,
                   FixMe = iu.FixMe,
                   SourceData = iu.SourceData,
                   FourDigitActivityGroup = new Class_FourDigitActivityGroup // ایجاد یک شیء از نوع Class_IndustryGroup و پر کردن آن با اطلاعات مربوطه
                   {
                       FDAG_id = iu.FourDigitActivityGroup.FDAG_id,
                       FDAG_Title = iu.FourDigitActivityGroup.FDAG_Title,
                       FDAG_FullName = iu.FourDigitActivityGroup.FDAG_FullName,
                       FDAG_Code = iu.FourDigitActivityGroup.FDAG_Code,
                       FDAG_Color = iu.FourDigitActivityGroup.FDAG_Color,
                       FDAG_RGB_R = iu.FourDigitActivityGroup.FDAG_RGB_R,
                       FDAG_RGB_G = iu.FourDigitActivityGroup.FDAG_RGB_G,
                       FDAG_RGB_B = iu.FourDigitActivityGroup.FDAG_RGB_B
                   }
               })
               .ToList();

            return CollectionUnit;
        }
        public IEnumerable<Class_IndustrialUnit> IUnitList_MultiCityAndMultiGroup(string? Provice, string Group)
        {
            var CollectionUnit = _context.DB_IndustrialUnit
               .Include(iu => iu.FourDigitActivityGroup) // لینک کردن جدول Class_IndustrialUnit با جدول Class_IndustryGroup
               .Where(u => (u.City == Provice) && (u.FourDigitActivityGroup.FDAG_Title == Group)) // فیلتر کردن داده‌ها براساس استان
               .Select(iu => new Class_IndustrialUnit
               {
                   IndustryId = iu.IndustryId,
                   UnitName = iu.UnitName,
                   Province = iu.Province,
                   City = iu.City,
                   Phone = iu.Phone,
                   ManagingName = iu.ManagingName,
                   Longitude = iu.Longitude,
                   Latitude = iu.Latitude,
                   CentralOffice = iu.CentralOffice,
                   FixMe = iu.FixMe,
                   SourceData = iu.SourceData,
                   FourDigitActivityGroup = new Class_FourDigitActivityGroup // ایجاد یک شیء از نوع Class_IndustryGroup و پر کردن آن با اطلاعات مربوطه
                   {
                       FDAG_id = iu.FourDigitActivityGroup.FDAG_id,
                       FDAG_Title = iu.FourDigitActivityGroup.FDAG_Title,
                       FDAG_FullName = iu.FourDigitActivityGroup.FDAG_FullName,
                       FDAG_Code = iu.FourDigitActivityGroup.FDAG_Code,
                       FDAG_Color = iu.FourDigitActivityGroup.FDAG_Color,
                       FDAG_RGB_R = iu.FourDigitActivityGroup.FDAG_RGB_R,
                       FDAG_RGB_G = iu.FourDigitActivityGroup.FDAG_RGB_G,
                       FDAG_RGB_B = iu.FourDigitActivityGroup.FDAG_RGB_B
                   }
               })
               .ToList();

            return CollectionUnit;
        }
        public IEnumerable<Class_IndustrialUnit> IUnit_SearchByName(string _unitName)
        {
            var FindByUnitName = _context.DB_IndustrialUnit
                 .Include(iu => iu.FourDigitActivityGroup) // لینک کردن جدول Class_IndustrialUnit با جدول Class_IndustryGroup
                .Where(u => u.UnitName == _unitName) // فیلتر کردن داده‌ها براساس استان
                .Select(iu => new Class_IndustrialUnit
                {
                    IndustryId = iu.IndustryId,
                    UnitName = iu.UnitName,
                    Province = iu.Province,
                    City = iu.City,
                    Phone = iu.Phone,
                    ManagingName = iu.ManagingName,
                    Longitude = iu.Longitude,
                    Latitude = iu.Latitude,
                    CentralOffice = iu.CentralOffice,
                    FixMe = iu.FixMe,
                    SourceData = iu.SourceData,
                    FourDigitActivityGroup = new Class_FourDigitActivityGroup // ایجاد یک شیء از نوع Class_IndustryGroup و پر کردن آن با اطلاعات مربوطه
                    {
                        FDAG_id = iu.FourDigitActivityGroup.FDAG_id,
                        FDAG_Title = iu.FourDigitActivityGroup.FDAG_Title,
                        FDAG_FullName = iu.FourDigitActivityGroup.FDAG_FullName,
                        FDAG_Code = iu.FourDigitActivityGroup.FDAG_Code,
                        FDAG_Color = iu.FourDigitActivityGroup.FDAG_Color,
                        FDAG_RGB_R = iu.FourDigitActivityGroup.FDAG_RGB_R,
                        FDAG_RGB_G = iu.FourDigitActivityGroup.FDAG_RGB_G,
                        FDAG_RGB_B = iu.FourDigitActivityGroup.FDAG_RGB_B
                    }
                })
                .ToList();

            return FindByUnitName;
        }
        public IEnumerable<Class_IndustryGroup> GetAllGroupAndSubGroup()
        {
            var collectionGroup = _context.DB_IndustryGroup
                .Include(f => f.Relation_FourDigitActivityGroup)
                .Select(f => new Class_IndustryGroup
                {
                    IndustryGroupId = f.IndustryGroupId,
                    IndustryGroupTitle = f.IndustryGroupTitle,
                    IndustryGroupFullName = f.IndustryGroupFullName,
                    IndustryGroupCode = f.IndustryGroupCode,
                    IndustryGroupColor = f.IndustryGroupColor,
                    IndustryRGB_B = f.IndustryRGB_B,
                    IndustryRGB_G = f.IndustryRGB_G,
                    IndustryRGB_R = f.IndustryRGB_R,
                    Relation_FourDigitActivityGroup = f.Relation_FourDigitActivityGroup.ToList()
                }).ToList();

            return collectionGroup;
        }
        #endregion

        #region ***************************************************** User
        public IEnumerable<Class_Users> Users_GetAll()
        {
            return _context.DB_Users.ToList();
        }

        public bool User_IsExist(string _username)
        {
            return _context.DB_Users.Any(p => p.username == _username);
        }

        public void User_Add(Register_ViewModel _newUsers)
        {
            Class_Users _addNewUser = new Class_Users()
            {
                name = _newUsers.name,
                username = _newUsers.username!.ToLower(),
                password = _newUsers.password
            };

            _context.Add(_addNewUser);
            _context.SaveChanges();
        }

        public Class_Users User_login(string _userName, string _password)
        {
            return _context.DB_Users
                .SingleOrDefault(u => u.username == _userName && u.password == _password)!;
        }
        #endregion

        #region ***************************************************** All Report

        public async Task<int> GetCount_IGroupAsync()
        {
            return await _context.DB_IndustryGroup.CountAsync();
        }

        public async Task<int> GetCount_IUniteAsync()
        {
            return await _context.DB_IndustrialUnit.CountAsync();
        }

        public async Task<int> GetCount_IUniteFixMeAsync()
        {
            return await _context.DB_IndustrialUnit
                .Where(u => u.FixMe == "yes")
                .CountAsync();
        }

        public async Task<int> GetCount_IUniteComplateAsync()
        {
            return await _context.DB_IndustrialUnit
                .Where(u => u.FixMe == "no")
                .CountAsync();
        }

        public async Task<int> GetCount_IGroup4DigitAsync()
        {
            return await _context.DB_FourDigitActivityGroup.CountAsync();
        }

        public async Task<IEnumerable<Class_IndustrialUnit>> GetAll_UniteFixMeAsync()
        {
            var countFixME = await _context.DB_IndustrialUnit
                .Include(iu => iu.FourDigitActivityGroup)
                .Where(u => u.FixMe.Trim().ToLower() == "yes")
                .Select(iu => new Class_IndustrialUnit
                {
                    IndustryId = iu.IndustryId,
                    UnitName = iu.UnitName,
                    Province = iu.Province,
                    City = iu.City,
                    Phone = iu.Phone,
                    ManagingName = iu.ManagingName,
                    Longitude = iu.Longitude,
                    Latitude = iu.Latitude,
                    CentralOffice = iu.CentralOffice,
                    FixMe = iu.FixMe,
                    SourceData = iu.SourceData,
                    FourDigitActivityGroup = new Class_FourDigitActivityGroup // ایجاد یک شیء از نوع Class_IndustryGroup و پر کردن آن با اطلاعات مربوطه
                    {
                        FDAG_id = iu.FourDigitActivityGroup.FDAG_id,
                        FDAG_Title = iu.FourDigitActivityGroup.FDAG_Title,
                        FDAG_FullName = iu.FourDigitActivityGroup.FDAG_FullName,
                        FDAG_Code = iu.FourDigitActivityGroup.FDAG_Code,
                        FDAG_Color = iu.FourDigitActivityGroup.FDAG_Color,
                        FDAG_RGB_R = iu.FourDigitActivityGroup.FDAG_RGB_R,
                        FDAG_RGB_G = iu.FourDigitActivityGroup.FDAG_RGB_G,
                        FDAG_RGB_B = iu.FourDigitActivityGroup.FDAG_RGB_B
                    }
                })
                .ToListAsync();
            return countFixME;
        }

        public async Task<IEnumerable<Class_IndustrialUnit>> GetAll_UnitProvinceAsync(string _province)
        {
            return await _context.DB_IndustrialUnit
                .Include(iu => iu.FourDigitActivityGroup)
                .Where(u => u.Province == _province)
                .Select(iu => new Class_IndustrialUnit
                {
                    IndustryId = iu.IndustryId,
                    UnitName = iu.UnitName,
                    Province = iu.Province,
                    City = iu.City,
                    Phone = iu.Phone,
                    ManagingName = iu.ManagingName,
                    Longitude = iu.Longitude,
                    Latitude = iu.Latitude,
                    CentralOffice = iu.CentralOffice,
                    FixMe = iu.FixMe,
                    SourceData = iu.SourceData,
                    FourDigitActivityGroup = new Class_FourDigitActivityGroup // ایجاد یک شیء از نوع Class_IndustryGroup و پر کردن آن با اطلاعات مربوطه
                    {
                        FDAG_id = iu.FourDigitActivityGroup.FDAG_id,
                        FDAG_Title = iu.FourDigitActivityGroup.FDAG_Title,
                        FDAG_FullName = iu.FourDigitActivityGroup.FDAG_FullName,
                        FDAG_Code = iu.FourDigitActivityGroup.FDAG_Code,
                        FDAG_Color = iu.FourDigitActivityGroup.FDAG_Color,
                        FDAG_RGB_R = iu.FourDigitActivityGroup.FDAG_RGB_R,
                        FDAG_RGB_G = iu.FourDigitActivityGroup.FDAG_RGB_G,
                        FDAG_RGB_B = iu.FourDigitActivityGroup.FDAG_RGB_B
                    }
                })
                .ToListAsync();
        }
        #endregion
    }
}
namespace MsmtApp.Models
{
    public class IUnitAdd_ViewModel
    {
        public Class_IndustrialUnit? Obj_IUnitVM { get; set; }
        public string SelectGroup_UnitVM { get; set; } = string.Empty;
    }

    public class IUnitEdit_ViewModel
    {
        //GET Object Industry Unit
        public int IndustryId { get; set; }
        public string UnitName { get; set; } = string.Empty;
        public string Province { get; set; } = string.Empty;
        public string? City { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string ManagingName { get; set; } = string.Empty;
        public string Longitude { get; set; } = string.Empty;
        public string Latitude { get; set; } = string.Empty;
        public string CentralOffice { get; set; } = string.Empty;
        public string DigitActivityGroup4 { get; set; } = string.Empty;
        public string FixMe { get; set; } = string.Empty;
        public string SourceData { get; set; } = string.Empty;

        //POST DATA
        public Class_IndustrialUnit? ObjPost_IUnitVM { get; set; }
        public string SelectGroup_UnitVM { get; set; } = string.Empty;
    }
}

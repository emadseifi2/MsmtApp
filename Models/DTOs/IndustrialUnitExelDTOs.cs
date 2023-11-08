namespace MsmtApp.Models.DTOs
{
    public class AddIndustrialUnitExelDTOs
    {
        public string UnitName { get; set; } 
        public string Province { get; set; } 
        public string City { get; set; } 
        public string Phone { get; set; } 
        public string ManagingName { get; set; } 
        public string Longitude { get; set; } 
        public string Latitude { get; set; } 
        public string CentralOffice { get; set; }
        public string FixMe { get; set; } 
        public string SourceData { get; set; }
        public int FDAG_id { get; set; }       
    }

    public class EditIndustrialUnitExelDTOs
    {
        public string UnitName { get; set; }
        public string Province { get; set; }
        public string City { get; set; }
        public string Phone { get; set; }
        public string ManagingName { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        public string CentralOffice { get; set; }
        public string FixMe { get; set; }
        public string SourceData { get; set; }
        public int FDAG_id { get; set; }
    }
}

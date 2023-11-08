namespace MsmtApp.Models.DTOs
{
    public class Dto_AddCounty
    {
        public string CountyName { get; set; }       
        public string CountyAdminLevel { get; set; }
        public string CountyAreaId { get; set; }
        public string ProvinceName { get; set; }
        public List<List<double>> CountyCoordinates { get; set; }
    }
}

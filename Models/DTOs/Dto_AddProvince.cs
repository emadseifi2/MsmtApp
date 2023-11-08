namespace MsmtApp.Models.DTOs
{
    public class Dto_AddProvince
    {
        public string ProvinceName { get; set; }       
        public string ProvinceAdminLevel { get; set; }
        public string ProvinceAreaId  { get; set; }
        public List<List<double>> ProvinceCoordinates { get; set; }
    }   
}

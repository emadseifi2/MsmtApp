using NetTopologySuite.Geometries;

namespace MsmtApp.Models
{
    public class MapInfoViewModel
    {
        //Post & Get DB IGroup************************************************************
        public string? ProvinceId { get; set; }       
        public string  ProvinceName { get; set; } = string.Empty;       
        public string  ProvinceAdminLevel { get; set; } = string.Empty;       
        public string  ProvinceAreaId { get; set; } = string.Empty;       
        public Polygon  ProvinceCoordinates { get; set; }
    }
}

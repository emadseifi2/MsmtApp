public class ProvinceViewModel
{
    public int ProvinceId { get; set; }
    public string? ProvinceName { get; set; }
    public string? ProvinceAdminLevel { get; set; }     
    public string? ProvinceAreaId { get; set; }     

    public List<PointViewModel>? PolygonCoordinates { get; set; }
}

public class PointViewModel
{
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}

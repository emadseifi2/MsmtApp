#region ***************************************************** Seed Data Provances
var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);
var provinces = new[]
{
                new Class_Province
                {
                    ProvinceId = 1,
                    ProvinceName = "استان تهران",
                    ProvinceLon = "51.388973",
                    ProvinceLat = "35.689198",
                    ProvinceZoomLevel = "10",
                    ProvinceAreaId = "1",
                    ProvinceBoundary = geometryFactory.CreatePolygon(new Coordinate[] {
                        new Coordinate(51.0, 35.0),
                        new Coordinate(52.0, 35.0),
                        new Coordinate(52.0, 36.0),
                        new Coordinate(51.0, 36.0),
                        new Coordinate(51.0, 35.0)
                    })
                },new Class_Province
                {
                    ProvinceId = 2,
                    ProvinceName = "استان تهران",
                    ProvinceLon = "51.388973",
                    ProvinceLat = "35.689198",
                    ProvinceZoomLevel = "10",
                    ProvinceAreaId = "1",
                    ProvinceBoundary = geometryFactory.CreatePolygon(new Coordinate[] {
                        new Coordinate(51.0, 35.0),
                        new Coordinate(52.0, 35.0),
                        new Coordinate(52.0, 36.0),
                        new Coordinate(51.0, 36.0),
                        new Coordinate(51.0, 35.0)
                    })
                }
            };

modelBuilder.Entity<Class_Province>().HasData(provinces);
         #endregion





using NetTopologySuite.Geometries;

var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);
var province = new Province
{
    ProvinceName = "استان تهران",
    ProvinceLon = "51.388973",
    ProvinceLat = "35.689198",
    ProvinceZoomLevel = "10",
    ProvinceAreaId = "1",
    ProvinceBoundary = geometryFactory.CreatePolygon(new Coordinate[] {
        new Coordinate(51.0, 35.0),
        new Coordinate(52.0, 35.0),
        new Coordinate(52.0, 36.0),
        new Coordinate(51.0, 36.0),
        new Coordinate(51.0, 35.0)
    })
};

using (var db = new MyDbContext())
{
    db.Provinces.Add(province);
    db.SaveChanges();
}

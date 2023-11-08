using Microsoft.EntityFrameworkCore;
using NetTopologySuite;
using NetTopologySuite.Geometries;

namespace MsmtApp.Models.EntityFramework.DBContext
{
    public class MsmtDBContext : DbContext
    {
        public MsmtDBContext(DbContextOptions<MsmtDBContext> options) : base(options)
        {
            //Location options
        }

        //DbSet For All User
        public DbSet<Class_Province> DB_Province { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);
            var provinces = new[]
            {
                new Province
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
                }
            };

            modelBuilder.Entity<Province>().HasData(provinces);

            base.OnModelCreating(modelBuilder);
        }
    }
}

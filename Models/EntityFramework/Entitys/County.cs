using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using NetTopologySuite.Geometries;

namespace MsmtApp.Models
{
    public class Class_County
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CountyId { get; set; }

        [DisplayName("نام:")]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        [MaxLength(100)]
        public string CountyName { get; set; } = string.Empty;     

        [DisplayName("زوم لول:")]
        [MaxLength(100)]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        public string CountyAdminLevel { get; set; } = string.Empty;

        [DisplayName("شناسه منطقه ای:")]
        [MaxLength(100)]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        public string CountyAreaId { get; set; } = string.Empty;

        [DisplayName("محدوده:")]       
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        [Column(TypeName = "geometry")]
        public Geometry? CountyCoordinates  { get; set; }

        public int ProvinceId { get; set; }
        [ForeignKey("ProvinceId")]
        public Class_Province? Province { get; set; }
    }
}




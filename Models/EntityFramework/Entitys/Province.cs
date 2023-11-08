using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using NetTopologySuite.Geometries;

namespace MsmtApp.Models
{
    public class Class_Province
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProvinceId { get; set; }

        [DisplayName("نام:")]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        [MaxLength(100)]
        public string ProvinceName { get; set; } = string.Empty;

        [DisplayName("زوم لول:")]
        [MaxLength(100)]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        public string ProvinceAdminLevel { get; set; } = string.Empty;        

        [DisplayName("کد رلیشن:")]
        [MaxLength(100)]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        public string ProvinceAreaId { get; set; } = string.Empty;         

        //[JsonIgnore]
        [DisplayName("محدوده:")]       
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        //[Column(TypeName = "geometry")]
        public Geometry? ProvinceCoordinates { get; set; }

        public ICollection<Class_County> Relation_County { get; set; }
            = new List<Class_County>();      
    }   
}




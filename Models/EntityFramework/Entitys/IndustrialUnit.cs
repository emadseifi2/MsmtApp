using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MsmtApp.Models
{
    public class Class_IndustrialUnit
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IndustryId { get; set; }       

        [DisplayName("نام:")]
        [MaxLength(100)]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        public string UnitName { get; set; } = string.Empty;

        [DisplayName("استان:")]
        [MaxLength(100)]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        public string Province { get; set; } = string.Empty;

        [DisplayName("شهر:")]
        [MaxLength(100)]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        public string? City { get; set; } = string.Empty;

        [DisplayName("تلفن:")]
        [MaxLength(100)]
        public string Phone { get; set; } = string.Empty;       

        [DisplayName("مدیرعامل:")]
        [MaxLength(100)]
        public string ManagingName { get; set; } = string.Empty;

        [DisplayName("طول جغرافیایی:")]
        [MaxLength(100)]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        public string Longitude { get; set; } = string.Empty;

        [DisplayName("عرض جغرافیایی:")]
        [MaxLength(100)]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        public string Latitude { get; set; } = string.Empty;

        [DisplayName("آدرس دفتر مرکزی:")]
        [MaxLength(250)]
        public string CentralOffice { get; set; } = string.Empty;       

        [MaxLength(100)]
        [DisplayName("نیاز به بازبینی")]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        public string FixMe { get; set; } = string.Empty;

        [MaxLength(100)]
        [DisplayName("منبع اطلاعات")]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        public string SourceData { get; set; } = string.Empty;

        public int FDAG_id { get; set; }
        [ForeignKey("FDAG_id")]
        public Class_FourDigitActivityGroup? FourDigitActivityGroup { get; set; }

    }
}

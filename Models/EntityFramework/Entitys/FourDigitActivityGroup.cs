using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MsmtApp.Models
{
    public class Class_FourDigitActivityGroup
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int FDAG_id { get; set; }

        [DisplayName("عنوان:")]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        [MaxLength(100)]
        public string FDAG_Title { get; set; } = string.Empty;

        [DisplayName("نام کامل:")]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        [MaxLength(100)]
        public string FDAG_FullName { get; set; } = string.Empty;

        [DisplayName("کد دورقمی:")]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        [MaxLength(50)]
        public string FDAG_Code { get; set; } = string.Empty;

        [DisplayName("رنگ گروه:")]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        [MaxLength(50)]
        public string FDAG_Color { get; set; } = string.Empty;

        [DisplayName("کد رنگ قرمز:")]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        [MaxLength(50)]
        public string FDAG_RGB_R { get; set; } = string.Empty;

        [DisplayName("کد رنگ سبز:")]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        [MaxLength(50)]
        public string FDAG_RGB_G { get; set; } = string.Empty;

        [DisplayName("کد رنگ آبی:")]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        [MaxLength(50)]
        public string FDAG_RGB_B { get; set; } = string.Empty;

        public ICollection<Class_IndustrialUnit> Relation_IndustrialUnit { get; set; } 
            = new List<Class_IndustrialUnit>();

        public int IndustryGroupId { get; set; }
        [ForeignKey("IndustryGroupId")]
        public Class_IndustryGroup? IndustryGroup { get; set; }
    }
}

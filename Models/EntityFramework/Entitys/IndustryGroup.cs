using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MsmtApp.Models
{
    public class Class_IndustryGroup
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IndustryGroupId { get; set; }

        [DisplayName("عنوان:")]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        [MaxLength(100)]
        public string IndustryGroupTitle { get; set; } = string.Empty;

        [DisplayName("نام کامل:")]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        [MaxLength(100)]
        public string IndustryGroupFullName { get; set; } = string.Empty;

        [DisplayName("کد دورقمی:")]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        [MaxLength(50)]
        public string IndustryGroupCode { get; set; } = string.Empty;

        [DisplayName("رنگ گروه:")]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        [MaxLength(50)]
        public string IndustryGroupColor { get; set; } = string.Empty;

        [DisplayName("کد رنگ قرمز:")]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        [MaxLength(50)]
        public string IndustryRGB_R { get; set; } = string.Empty;

        [DisplayName("کد رنگ سبز:")]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        [MaxLength(50)]
        public string IndustryRGB_G { get; set; } = string.Empty;

        [DisplayName("کد رنگ آبی:")]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        [MaxLength(50)]
        public string IndustryRGB_B { get; set; } = string.Empty;

        public ICollection<Class_FourDigitActivityGroup> Relation_FourDigitActivityGroup { get; set; } 
            = new List<Class_FourDigitActivityGroup>();
    }
}

using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MsmtApp.Models
{
    public class Register_ViewModel
    {
        [Required(ErrorMessage ="* لطفا این قسمت را تکمیل فرماید")]
        [MaxLength(250)]
        [DisplayName("نام:")]
        public string name { get; set; } = string.Empty;

        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        [MaxLength(250)]
        [DisplayName("نام کاربری:")]
        public string username { get; set; } = string.Empty;

        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        [MaxLength(50)]
        [DataType(DataType.Password)]
        [DisplayName("رمز عبور:")]
        public string password { get; set; } = string.Empty;

        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        [MaxLength(50)]
        [DataType(DataType.Password)]
        [Compare("password")]
        [DisplayName("تکرار رمز عبور:")]
        public string confirmPassword { get; set; } = string.Empty;
    }

    public class Login_ViewModel
    {
        [MaxLength(250)]
        [Display(Name = "نام کاربری")]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        public string username { get; set; } = string.Empty;

        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        [MaxLength(50)]
        [DataType(DataType.Password)]
        [Display(Name = "کلمه عبور")]
        public string password { get; set; } = string.Empty;

        [Display(Name = "مرا به خاطر بسپار ")]
        public bool rememberMe { get; set; }
    }
}

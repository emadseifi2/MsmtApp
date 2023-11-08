using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MsmtApp.Models
{
    public class Class_Users
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int userId { get; set; }

        [MaxLength(50)]
        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        [DisplayName("نام:")]
        public string name { get; set; } = string.Empty;

        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        [DisplayName("نام کاربری:")]
        [MaxLength(50)]
        public string username { get; set; } = string.Empty;

        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        [JsonIgnore]
        [StringLength(10, MinimumLength = 8, ErrorMessage = "رمز باید حداقل 8 کارکتر و حداکثر 10 کارکتر باشد")]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*\d).+$", ErrorMessage = "رمز عبور باید حداقل دارای یک حرف بزرگ و یک رقم باشد.")]
        [DisplayName("رمز عبور:")]
        public string password { get; set; } = string.Empty;

        [Required(ErrorMessage = "* لطفا این قسمت را تکمیل فرماید")]
        [EmailAddress(ErrorMessage = "لطفا یک آدرس ایمیل معتبر وارد کنید.")]
        [DisplayName("ایمیل :")]
        [MaxLength(50)]
        public string Email { get; set; } = string.Empty;

        public bool isAdmin { get; set; }
    }
}



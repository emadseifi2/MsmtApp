using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using MsmtApp.Models;
using MsmtApp.Models.Repository;
using System.Security.Claims;

namespace MsmtApp.Controllers
{
    public class AccountController : Controller
    {
        private Rep_IRepository IRepository;
        public AccountController(Rep_IRepository _iRepository)
        {
            IRepository = _iRepository;
        }

        public IActionResult UserManage()
        {
            return View(IRepository.Users_GetAll());
        }

        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Register(Register_ViewModel _register)
        {
            if (!ModelState.IsValid)
            {
                return View(_register);
            }

            if (IRepository.User_IsExist(_register.username.ToLower()))
            {
                ModelState.AddModelError("username", "نام کاربری وارد شده قبلا ثبت نام کرده است");
                return View(_register);
            }
            else
            {

                IRepository.User_Add(_register);
                TempData["OperationMessage"] = "success";
                TempData["NameMessage"] = _register.name;
                TempData["TypeMessage"] = "ثبت نام";
                return RedirectToAction("IntroMap", "MapPanel");
            }
        }

        //[Route("Login/{id}/{name}")]
        //[Route("Login")]
        //[Route("Account/Login")]
        public IActionResult Login()
        {
            return View();
        }       

        [HttpPost]
        public IActionResult Login(Login_ViewModel _loginUsers)
        {
            if (!ModelState.IsValid)
            {
                return View(_loginUsers);
            }
            var LoginUser = IRepository.User_login(_userName: _loginUsers.username.ToLower(), _loginUsers.password);
            if (LoginUser == null)
            {
                ModelState.AddModelError("username", "نام کاربری و یا رمز عبور شما اشتباه است");
                return View(_loginUsers);
            }
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, LoginUser.userId.ToString()),
                new Claim(ClaimTypes.Name, LoginUser.name),
                new Claim("UserName", LoginUser.username)
            };

            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var principal = new ClaimsPrincipal(identity);

            var properties = new AuthenticationProperties
            {
                IsPersistent = _loginUsers.rememberMe
            };

            HttpContext.SignInAsync(principal, properties);

            return RedirectToAction("OLView", "MapPanel");
        }       
       
        public IActionResult Logout()
        {
            HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Redirect("/Account/Login");
        }
    }
}
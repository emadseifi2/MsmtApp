using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using MsmtApp.Models.EntityFramework.DBContext;
using MsmtApp.Models.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

//const string ConnectionString = "Data Source =.\\MSSQLSERVER2017; Initial Catalog=msmtir_DB;User Id = msmtir_User; Password = Msmt@@1234;";
const string ConnectionString = "Data Source =.\\SQLEXPRESS;Initial Catalog=msmtir_DB;User Id = sa; Password = Amirhosein+6363";

builder.Services.AddDbContext<MsmtDBContext>(options =>
    options.UseSqlServer(ConnectionString, x => x.UseNetTopologySuite()));

builder.Services.AddScoped<Rep_IRepository, rep_IRepository>();
builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(option =>
    {
        option.LoginPath = "/Account/Login";
        option.LogoutPath = "/Account/Login";
        option.ExpireTimeSpan = TimeSpan.FromMinutes(15);
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Account}/{action=Login}/{id?}");

app.Run();

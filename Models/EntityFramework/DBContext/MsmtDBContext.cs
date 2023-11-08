using Microsoft.EntityFrameworkCore;

namespace MsmtApp.Models.EntityFramework.DBContext
{
   public class MsmtDBContext : DbContext
   {
      public MsmtDBContext(DbContextOptions<MsmtDBContext> options) : base(options)
      {
         //Location options
      }

      //DbSet For Industry
      public DbSet<Class_IndustryGroup> DB_IndustryGroup { get; set; } = null!;
      public DbSet<Class_FourDigitActivityGroup> DB_FourDigitActivityGroup { get; set; } = null!;
      public DbSet<Class_IndustrialUnit> DB_IndustrialUnit { get; set; } = null!;

      //DbSet For All User
      public DbSet<Class_Users> DB_Users { get; set; } = null!;

      //DbSet For All User
       public DbSet<Class_Province> DB_Province { get; set; } = null!;
       public DbSet<Class_County> DB_County { get; set; } = null!;

      protected override void OnModelCreating(ModelBuilder modelBuilder)
      {
         modelBuilder.Entity<Class_Users>().HasData(
         new Class_Users()
         {
            userId = 1,
            name = "admin",
            username = "admin",
            password = "123456",
            Email = "test@gmail.com",
            isAdmin = true
         });

         #region ***************************************************** Seed Data IndustryGroup
         modelBuilder.Entity<Class_IndustryGroup>().HasData(
         new Class_IndustryGroup()
         {
            IndustryGroupId = 33,
            IndustryGroupTitle = "ابزارپزشكي-اپتيكي-دقيق-ساعت",
            IndustryGroupFullName = "ابزارپزشكي-اپتيكي-دقيق-ساعت(33)",
            IndustryGroupCode = "33",
            IndustryGroupColor = "#de2727",
            IndustryRGB_B = "39",
            IndustryRGB_G = "39",
            IndustryRGB_R = "222"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 10,
            IndustryGroupTitle = "استخراج زغال سنگ ولينيت",
            IndustryGroupFullName = "استخراج زغال سنگ ولينيت ..(10)",
            IndustryGroupCode = "10",
            IndustryGroupColor = "#7e4f07",
            IndustryRGB_B = "7",
            IndustryRGB_G = "79",
            IndustryRGB_R = "126"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 14,
            IndustryGroupTitle = "استخراج سايرمعادن",
            IndustryGroupFullName = "استخراج سايرمعادن(14)",
            IndustryGroupCode = "14",
            IndustryGroupColor = "#d18d25",
            IndustryRGB_B = "37",
            IndustryRGB_G = "141",
            IndustryRGB_R = "209"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 22,
            IndustryGroupTitle = "انتشاروچاپ وتكثير",
            IndustryGroupFullName = "انتشاروچاپ وتكثير(22)",
            IndustryGroupCode = "22",
            IndustryGroupColor = "#7fcf1a",
            IndustryRGB_B = "26",
            IndustryRGB_G = "207",
            IndustryRGB_R = "127"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 37,
            IndustryGroupTitle = "بازيافت",
            IndustryGroupFullName = "بازيافت(37)",
            IndustryGroupCode = "37",
            IndustryGroupColor = "#cecf1a",
            IndustryRGB_B = "26",
            IndustryRGB_G = "207",
            IndustryRGB_R = "206"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 18,
            IndustryGroupTitle = "پوشاك وعمل آوردن پوست خز",
            IndustryGroupFullName = "پوشاك وعمل آوردن پوست خز(18)",
            IndustryGroupCode = "18",
            IndustryGroupColor = "#1acf96",
            IndustryRGB_B = "150",
            IndustryRGB_G = "207",
            IndustryRGB_R = "26"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 20,
            IndustryGroupTitle = "چوب ومحصولات چوبي بجزمبل",
            IndustryGroupFullName = "چوب ومحصولات چوبي بجزمبل(20)",
            IndustryGroupCode = "20",
            IndustryGroupColor = "#1ab9cf",
            IndustryRGB_B = "207",
            IndustryRGB_G = "185",
            IndustryRGB_R = "26"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 19,
            IndustryGroupTitle = "دباغي -چرم -كيف-چمدان-كفش",
            IndustryGroupFullName = "دباغي -چرم -كيف-چمدان-كفش(19)",
            IndustryGroupCode = "19",
            IndustryGroupColor = "#781acf",
            IndustryRGB_B = "207",
            IndustryRGB_G = "26",
            IndustryRGB_R = "120"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 32,
            IndustryGroupTitle = "راديوتلويزيون وسايل ارتباط",
            IndustryGroupFullName = "راديوتلويزيون وسايل ارتباط(32)",
            IndustryGroupCode = "32",
            IndustryGroupColor = "#cf1abc",
            IndustryRGB_B = "188",
            IndustryRGB_G = "26",
            IndustryRGB_R = "207"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 27,
            IndustryGroupTitle = "ساخت فلزات اساسي",
            IndustryGroupFullName = "ساخت فلزات اساسي(27)",
            IndustryGroupCode = "27",
            IndustryGroupColor = "#1e34af",
            IndustryRGB_B = "175",
            IndustryRGB_G = "52",
            IndustryRGB_R = "30"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 21,
            IndustryGroupTitle = "ساخت كاغذومحصولات كاغذي",
            IndustryGroupFullName = "ساخت كاغذومحصولات كاغذي(21)",
            IndustryGroupCode = "21",
            IndustryGroupColor = "#1eaf67",
            IndustryRGB_B = "130",
            IndustryRGB_G = "175",
            IndustryRGB_R = "30"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 29,
            IndustryGroupTitle = "ساخت ماشين آلات وتجهيزات",
            IndustryGroupFullName = "ساخت ماشين آلات وتجهيزات(29)",
            IndustryGroupCode = "29",
            IndustryGroupColor = "#2f83ff",
            IndustryRGB_B = "255",
            IndustryRGB_G = "131",
            IndustryRGB_R = "47"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 17,
            IndustryGroupTitle = "ساخت منسوجات",
            IndustryGroupFullName = "ساخت منسوجات(17)",
            IndustryGroupCode = "17",
            IndustryGroupColor = "#942fff",
            IndustryRGB_B = "255",
            IndustryRGB_G = "47",
            IndustryRGB_R = "148"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 24,
            IndustryGroupTitle = "ساخت موادومحصولات شيميائي",
            IndustryGroupFullName = "ساخت موادومحصولات شيميائي(24)",
            IndustryGroupCode = "24",
            IndustryGroupColor = "#9d6c33",
            IndustryRGB_B = "51",
            IndustryRGB_G = "108",
            IndustryRGB_R = "157"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 45,
            IndustryGroupTitle = "ساختمان",
            IndustryGroupFullName = "ساختمان(45)",
            IndustryGroupCode = "45",
            IndustryGroupColor = "#0a5687",
            IndustryRGB_B = "135",
            IndustryRGB_G = "86",
            IndustryRGB_R = "10"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 35,
            IndustryGroupTitle = "تجهيزات حمل ونقل",
            IndustryGroupFullName = "سايرتجهيزات حمل ونقل(35)",
            IndustryGroupCode = "35",
            IndustryGroupColor = "#0c4645",
            IndustryRGB_B = "69",
            IndustryRGB_G = "70",
            IndustryRGB_R = "12"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 74,
            IndustryGroupTitle = "فعاليتهاي خدمات مهندسي",
            IndustryGroupFullName = "سايرفعاليتهاي خدمات مهندسي(74)",
            IndustryGroupCode = "74",
            IndustryGroupColor = "#1acf96",
            IndustryRGB_B = "150",
            IndustryRGB_G = "207",
            IndustryRGB_R = "26"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 26,
            IndustryGroupTitle = "ساير محصولات كاني غيرفلزي",
            IndustryGroupFullName = "سايرمحصولات كاني غيرفلزي(26)",
            IndustryGroupCode = "26",
            IndustryGroupColor = "#1ab9cf",
            IndustryRGB_B = "207",
            IndustryRGB_G = "185",
            IndustryRGB_R = "26"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 63,
            IndustryGroupTitle = "پشتيباني حمل و نقل؛آژانسهاي مسافرتي",
            IndustryGroupFullName = "فعاليتهاي پشتيباني و كمكي حمل و نقل؛ فعاليتهاي آژانسهاي مسافرتي(63)",
            IndustryGroupCode = "63",
            IndustryGroupColor = "#781acf",
            IndustryRGB_B = "207",
            IndustryRGB_G = "26",
            IndustryRGB_R = "120"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 72,
            IndustryGroupTitle = "كامپيوتر و فعاليتهاي مربوطه",
            IndustryGroupFullName = "كامپيوتروفعاليتهاي مربوطه(72)",
            IndustryGroupCode = "72",
            IndustryGroupColor = "#cf1abc",
            IndustryRGB_B = "188",
            IndustryRGB_G = "26",
            IndustryRGB_R = "207"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 23,
            IndustryGroupTitle = "كك و فراورده هاي نفتی",
            IndustryGroupFullName = "كك وفراورده هاي حاصل ازنفت(23)",
            IndustryGroupCode = "23",
            IndustryGroupColor = "#1e34af",
            IndustryRGB_B = "175",
            IndustryRGB_G = "52",
            IndustryRGB_R = "30"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 30,
            IndustryGroupTitle = "ماشين آلات دفتري وحسابداري",
            IndustryGroupFullName = "ماشين آلات دفتري وحسابداري(30)",
            IndustryGroupCode = "30",
            IndustryGroupColor = "#1eaf67",
            IndustryRGB_B = "103",
            IndustryRGB_G = "175",
            IndustryRGB_R = "30"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 31,
            IndustryGroupTitle = "ماشين آلات و لوازم برقی",
            IndustryGroupFullName = "ماشين آلات ودستگاههاي برقي(31)",
            IndustryGroupCode = "31",
            IndustryGroupColor = "#2f83ff",
            IndustryRGB_B = "255",
            IndustryRGB_G = "131",
            IndustryRGB_R = "47"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 36,
            IndustryGroupTitle = "مبلمان ساير مصنوعات",
            IndustryGroupFullName = "مبلمان سايرمصنوعات(36)",
            IndustryGroupCode = "36",
            IndustryGroupColor = "#942fff",
            IndustryRGB_B = "255",
            IndustryRGB_G = "47",
            IndustryRGB_R = "148"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 16,
            IndustryGroupTitle = "توتون وتنباكو",
            IndustryGroupFullName = "محصولات ازتوتون وتنباكو(16)",
            IndustryGroupCode = "16",
            IndustryGroupColor = "#9d6c33",
            IndustryRGB_B = "51",
            IndustryRGB_G = "108",
            IndustryRGB_R = "157"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 25,
            IndustryGroupTitle = "لاستيك وپلاستيك",
            IndustryGroupFullName = "محصولات ازلاستيك وپلاستيك(25)",
            IndustryGroupCode = "25",
            IndustryGroupColor = "#0a5687",
            IndustryRGB_B = "135",
            IndustryRGB_G = "86",
            IndustryRGB_R = "10"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 15,
            IndustryGroupTitle = "غذائي وآشاميدنيها",
            IndustryGroupFullName = "محصولات غذائي وآشاميدنيها(15)",
            IndustryGroupCode = "15",
            IndustryGroupColor = "#0c4645",
            IndustryRGB_B = "69",
            IndustryRGB_G = "70",
            IndustryRGB_R = "12"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 28,
            IndustryGroupTitle = "فلزي فابريكي",
            IndustryGroupFullName = "محصولات فلزي فابريكي(28)",
            IndustryGroupCode = "28",
            IndustryGroupColor = "#1e34af",
            IndustryRGB_B = "175",
            IndustryRGB_G = "52",
            IndustryRGB_R = "30"
         }, new Class_IndustryGroup()
         {
            IndustryGroupId = 34,
            IndustryGroupTitle = "وسايل نقليه موتوري",
            IndustryGroupFullName = "وسايل نقليه موتوري(34)",
            IndustryGroupCode = "34",
            IndustryGroupColor = "#1eaf67",
            IndustryRGB_B = "103",
            IndustryRGB_G = "175",
            IndustryRGB_R = "30"
         });
         #endregion

         base.OnModelCreating(modelBuilder);
      }

   }
}



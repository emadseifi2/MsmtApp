using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;

#nullable disable

namespace MsmtApp.Migrations
{
    public partial class migrationsMsmt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DB_IndustryGroup",
                columns: table => new
                {
                    IndustryGroupId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IndustryGroupTitle = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    IndustryGroupFullName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    IndustryGroupCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    IndustryGroupColor = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    IndustryRGB_R = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    IndustryRGB_G = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    IndustryRGB_B = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DB_IndustryGroup", x => x.IndustryGroupId);
                });

            migrationBuilder.CreateTable(
                name: "DB_Province",
                columns: table => new
                {
                    ProvinceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProvinceName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ProvinceAdminLevel = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ProvinceAreaId = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ProvinceCoordinates = table.Column<Geometry>(type: "geography", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DB_Province", x => x.ProvinceId);
                });

            migrationBuilder.CreateTable(
                name: "DB_Users",
                columns: table => new
                {
                    userId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    password = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    isAdmin = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DB_Users", x => x.userId);
                });

            migrationBuilder.CreateTable(
                name: "DB_FourDigitActivityGroup",
                columns: table => new
                {
                    FDAG_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FDAG_Title = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    FDAG_FullName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    FDAG_Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FDAG_Color = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FDAG_RGB_R = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FDAG_RGB_G = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FDAG_RGB_B = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    IndustryGroupId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DB_FourDigitActivityGroup", x => x.FDAG_id);
                    table.ForeignKey(
                        name: "FK_DB_FourDigitActivityGroup_DB_IndustryGroup_IndustryGroupId",
                        column: x => x.IndustryGroupId,
                        principalTable: "DB_IndustryGroup",
                        principalColumn: "IndustryGroupId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DB_County",
                columns: table => new
                {
                    CountyId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CountyName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CountyAdminLevel = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CountyAreaId = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CountyCoordinates = table.Column<Geometry>(type: "geometry", nullable: false),
                    ProvinceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DB_County", x => x.CountyId);
                    table.ForeignKey(
                        name: "FK_DB_County_DB_Province_ProvinceId",
                        column: x => x.ProvinceId,
                        principalTable: "DB_Province",
                        principalColumn: "ProvinceId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DB_IndustrialUnit",
                columns: table => new
                {
                    IndustryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UnitName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Province = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    City = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ManagingName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Longitude = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Latitude = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CentralOffice = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    FixMe = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    SourceData = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    FDAG_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DB_IndustrialUnit", x => x.IndustryId);
                    table.ForeignKey(
                        name: "FK_DB_IndustrialUnit_DB_FourDigitActivityGroup_FDAG_id",
                        column: x => x.FDAG_id,
                        principalTable: "DB_FourDigitActivityGroup",
                        principalColumn: "FDAG_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "DB_IndustryGroup",
                columns: new[] { "IndustryGroupId", "IndustryGroupCode", "IndustryGroupColor", "IndustryGroupFullName", "IndustryGroupTitle", "IndustryRGB_B", "IndustryRGB_G", "IndustryRGB_R" },
                values: new object[,]
                {
                    { 10, "10", "#7e4f07", "استخراج زغال سنگ ولينيت ..(10)", "استخراج زغال سنگ ولينيت", "7", "79", "126" },
                    { 14, "14", "#d18d25", "استخراج سايرمعادن(14)", "استخراج سايرمعادن", "37", "141", "209" },
                    { 15, "15", "#0c4645", "محصولات غذائي وآشاميدنيها(15)", "غذائي وآشاميدنيها", "69", "70", "12" },
                    { 16, "16", "#9d6c33", "محصولات ازتوتون وتنباكو(16)", "توتون وتنباكو", "51", "108", "157" },
                    { 17, "17", "#942fff", "ساخت منسوجات(17)", "ساخت منسوجات", "255", "47", "148" },
                    { 18, "18", "#1acf96", "پوشاك وعمل آوردن پوست خز(18)", "پوشاك وعمل آوردن پوست خز", "150", "207", "26" },
                    { 19, "19", "#781acf", "دباغي -چرم -كيف-چمدان-كفش(19)", "دباغي -چرم -كيف-چمدان-كفش", "207", "26", "120" },
                    { 20, "20", "#1ab9cf", "چوب ومحصولات چوبي بجزمبل(20)", "چوب ومحصولات چوبي بجزمبل", "207", "185", "26" },
                    { 21, "21", "#1eaf67", "ساخت كاغذومحصولات كاغذي(21)", "ساخت كاغذومحصولات كاغذي", "130", "175", "30" },
                    { 22, "22", "#7fcf1a", "انتشاروچاپ وتكثير(22)", "انتشاروچاپ وتكثير", "26", "207", "127" },
                    { 23, "23", "#1e34af", "كك وفراورده هاي حاصل ازنفت(23)", "كك و فراورده هاي نفتی", "175", "52", "30" },
                    { 24, "24", "#9d6c33", "ساخت موادومحصولات شيميائي(24)", "ساخت موادومحصولات شيميائي", "51", "108", "157" },
                    { 25, "25", "#0a5687", "محصولات ازلاستيك وپلاستيك(25)", "لاستيك وپلاستيك", "135", "86", "10" },
                    { 26, "26", "#1ab9cf", "سايرمحصولات كاني غيرفلزي(26)", "ساير محصولات كاني غيرفلزي", "207", "185", "26" },
                    { 27, "27", "#1e34af", "ساخت فلزات اساسي(27)", "ساخت فلزات اساسي", "175", "52", "30" },
                    { 28, "28", "#1e34af", "محصولات فلزي فابريكي(28)", "فلزي فابريكي", "175", "52", "30" },
                    { 29, "29", "#2f83ff", "ساخت ماشين آلات وتجهيزات(29)", "ساخت ماشين آلات وتجهيزات", "255", "131", "47" },
                    { 30, "30", "#1eaf67", "ماشين آلات دفتري وحسابداري(30)", "ماشين آلات دفتري وحسابداري", "103", "175", "30" },
                    { 31, "31", "#2f83ff", "ماشين آلات ودستگاههاي برقي(31)", "ماشين آلات و لوازم برقی", "255", "131", "47" },
                    { 32, "32", "#cf1abc", "راديوتلويزيون وسايل ارتباط(32)", "راديوتلويزيون وسايل ارتباط", "188", "26", "207" },
                    { 33, "33", "#de2727", "ابزارپزشكي-اپتيكي-دقيق-ساعت(33)", "ابزارپزشكي-اپتيكي-دقيق-ساعت", "39", "39", "222" },
                    { 34, "34", "#1eaf67", "وسايل نقليه موتوري(34)", "وسايل نقليه موتوري", "103", "175", "30" },
                    { 35, "35", "#0c4645", "سايرتجهيزات حمل ونقل(35)", "تجهيزات حمل ونقل", "69", "70", "12" },
                    { 36, "36", "#942fff", "مبلمان سايرمصنوعات(36)", "مبلمان ساير مصنوعات", "255", "47", "148" },
                    { 37, "37", "#cecf1a", "بازيافت(37)", "بازيافت", "26", "207", "206" },
                    { 45, "45", "#0a5687", "ساختمان(45)", "ساختمان", "135", "86", "10" },
                    { 63, "63", "#781acf", "فعاليتهاي پشتيباني و كمكي حمل و نقل؛ فعاليتهاي آژانسهاي مسافرتي(63)", "پشتيباني حمل و نقل؛آژانسهاي مسافرتي", "207", "26", "120" },
                    { 72, "72", "#cf1abc", "كامپيوتروفعاليتهاي مربوطه(72)", "كامپيوتر و فعاليتهاي مربوطه", "188", "26", "207" },
                    { 74, "74", "#1acf96", "سايرفعاليتهاي خدمات مهندسي(74)", "فعاليتهاي خدمات مهندسي", "150", "207", "26" }
                });

            migrationBuilder.InsertData(
                table: "DB_Users",
                columns: new[] { "userId", "Email", "isAdmin", "name", "password", "username" },
                values: new object[] { 1, "test@gmail.com", true, "admin", "123456", "admin" });

            migrationBuilder.CreateIndex(
                name: "IX_DB_County_ProvinceId",
                table: "DB_County",
                column: "ProvinceId");

            migrationBuilder.CreateIndex(
                name: "IX_DB_FourDigitActivityGroup_IndustryGroupId",
                table: "DB_FourDigitActivityGroup",
                column: "IndustryGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_DB_IndustrialUnit_FDAG_id",
                table: "DB_IndustrialUnit",
                column: "FDAG_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DB_County");

            migrationBuilder.DropTable(
                name: "DB_IndustrialUnit");

            migrationBuilder.DropTable(
                name: "DB_Users");

            migrationBuilder.DropTable(
                name: "DB_Province");

            migrationBuilder.DropTable(
                name: "DB_FourDigitActivityGroup");

            migrationBuilder.DropTable(
                name: "DB_IndustryGroup");
        }
    }
}

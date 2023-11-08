let pro = ProvinceIran.features;
console.log(pro);
let Dto_AddProvince = [];
for (var i = 0; i < pro.length; i++) {
  let Coordinates = pro[i].geometry.coordinates[0];
  let StrCoordinates = "";
  for (var t = 0; t < Coordinates.length; t++) {
    StrCoordinates += Coordinates[t] + "/";
  }

  var Province = {
    ProvinceName: "استان " + pro[i].properties.name,
    ProvinceAdminLevel: String(pro[i].properties.zoomLevel),
    ProvinceAreaId: pro[i].properties.ProvinceAreaId,
    ProvinceCoordinates: pro[i].geometry.coordinates[0],
  };
  Dto_AddProvince.push(Province);
}
console.log(Dto_AddProvince);

$.ajax({
  type: "POST",
  url: "/AreaManagement/Add_Province/",
  dataType: "json",
  contentType: "application/json",
  data: JSON.stringify(Dto_AddProvince),
  success: function (result) {
    console.log(result);
  },
  error: function (xhr, status, error) {
    var strError = "";
    if (xhr.status == 0) {
      strError = "ارتباط با سرور قطع شده است";
    } else if (xhr.status == 404) {
      strError = "آدرس درخواست شده یافت نشد";
    } else if (xhr.status == 500) {
      strError = "خطایی در سمت سرور رخ داده است";
    } else {
      strError = xhr;
    }

    try {
      MainClieint.CeartMessage("error", "کاربر گرامی ...", strError);
    } catch (error) {
      LO.CeartMessage("error", "کاربر گرامی ...", strError);
    }
  },
});






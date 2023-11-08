
let Dto_AddCounty = [];
for (var i = 0; i < County.length; i++) { 
  var OneCounty = {
    CountyName: County[i].CountyName,    
    CountyAdminLevel: County[i].CountyAdminLevel,
    CountyAreaId: County[i].CountyAreaId,  
    ProvinceName : County[i].ProvinceID,
    CountyCoordinates: County[i].Coordinates[0]
  };
  Dto_AddCounty.push(OneCounty);
}
console.log(Dto_AddCounty);

$.ajax({
  type: "POST",
  url: "/AreaManagement/Add_County/",
  dataType: "json",
  contentType: "application/json",
  data: JSON.stringify(Dto_AddCounty),
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
    };

    try {
      MainClieint.CeartMessage("error","کاربر گرامی ...",strError);
    } catch (error) {
      LO.CeartMessage("error","کاربر گرامی ...",strError);
    };
  },
});

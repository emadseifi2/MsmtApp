var nameProvince = [
  {
    name: "استان خراسان شمالی"
  },
  {
    name: "استان کرمان"
  },
  {
    name: "استان ایلام"
  },
  {
    name: "استان لرستان"
  },
  {
    name: "استان مرکزی"
  },
  {
    name: "استان چهارمحال و بختیاری"
  },
  {
    name: "استان کرمانشاه"
  },
  {
    name: "استان همدان"
  },
  {
    name: "استان قزوین"
  },
  {
    name: "استان گیلان"
  },
  {
    name: "استان زنجان"
  },
  {
    name: "استان سمنان"
  },
  {
    name: "استان اصفهان"
  },
  {
    name: "استان کهگیلویه و بویر احمد"
  },
  {
    name: "استان کردستان"
  },
  {
    name: "استان آذربایجان غربی"
  },
  {
    name: "استان فارس"
  },
  {
    name: "استان بوشهر"
  },
  {
    name: "استان اردبیل"
  },
  {
    name: "استان مازندران"
  },
  {
    name: "استان گلستان"
  },
  {
    name: "استان خراسان رضوی"
  },
  {
    name: "استان خراسان جنوبی"
  },
  {
    name: "استان سیستان و بلوچستان"
  },
  {
    name: "استان تهران"
  },
  {
    name: "استان قم"
  },
  {
    name: "استان البرز"
  },
  {
    name: "استان آذربایجان شرقی"
  },
  {
    name: "استان یزد"
  },
  {
    name: "استان هرمزگان"
  },
  {
    name: "استان خوزستان"
  },
];

let AjaxUtils = {
  GetJSONAsync: function (_url) {
    return $.ajax({
      method: "GET",
      url: _url,
      contentType: "application/json",
    });
  },
  GetJSONPAsync: function (_url) {
    return $.ajax({
      method: "GET",
      url: _url,
      crossDomain: true,
      dataType: "jsonp",
      contentType: "application/json",
    });
  },
  PostJSONParamWithHeaderAsync: function (_url, _data, _token) {
    var headerValue = "Bearer " + _token;
    return $.ajax({
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", headerValue);
      },
      url: _url,
      data: JSON.stringify(_data),
      contentType: "application/json",
    });
  },
  PostJSONAsync: function (_url, _data) {
    return $.ajax({
      type: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: _url,
      data: JSON.stringify(_data),
    });
  },
};

var AddProvinceExelDTOs = [];
for (var i = 0; i < nameProvince.length; i++) {
  var _BaseUrlQueryOsm = "https://overpass-api.de/api/interpreter?data=";
  var _QueryPart_A = '[out:json];area["name"="';
  let ProvinceName = nameProvince[i].name;
  var _QueryPart_C =
    '"]["admin_level"="4"]->.tehran;relation["admin_level"="5"](area.tehran);out geom;';
  //[out:json];area["name"="استان تهران"]["admin_level"="4"]->.tehran;relation["admin_level"="6"](area.tehran);out geom;
  let FullUrl = _BaseUrlQueryOsm + _QueryPart_A + ProvinceName + _QueryPart_C;

  AjaxUtils.GetJSONAsync(FullUrl)
    .done((response) => {
      let geojson = osmtogeojson(response);
      var result = geojson.features;
      for (var t = 0; t < result.length; t++) {       
        var stringID = result[t].properties.id;
        var idParts = stringID.split("/");
        if (idParts[0] !== "node") {         
          const Areia_ID = stringID.match(/\d+/)[0];
          var County = {
            CountyName: result[t].properties.name,
            CountyAdminLevel: result[t].properties.admin_level,
            CountyAreaId: String(Areia_ID),
            ProvinceName: ProvinceName,
            Coordinates: result[t].geometry.coordinates,
          };
          AddProvinceExelDTOs.push(County);
          console.log(
            "اطلاعات استان ",
            ProvinceName,            
            "موفقیت اضافه گردید"
          );
        }
      }
      console.log(AddProvinceExelDTOs);
    })
    .fail((jqXHR, exception) => {
      // Error Here
      var msg = "";
      if (jqXHR.status === 0) {
        msg = "متاسفانه پاسخی از سرور دریافن نشد . لطفا مجدداً تلاش نمایید";
      } else if (jqXHR.status == 404) {
        msg =
          "ارتباط با سرور بر قرار نشد.لطفا از اتصال خود به اینترنت مطمئن شوید";
      } else if (jqXHR.status == 500) {
        msg = "متاسفانه پاسخی از سرور دریافن نشد . لطفا مجدداً تلاش نمایید";
      } else if (exception === "parsererror") {
        msg = "متاسفانه پاسخی از سرور دریافن نشد . لطفا مجدداً تلاش نمایید";
      } else if (exception === "timeout") {
        msg =
          "ارتباط با سرور بر قرار نشد.لطفا از اتصال خود به اینترنت مطمئن شوید";
      } else if (exception === "abort") {
        msg = "متاسفانه پاسخی از سرور دریافن نشد . لطفا مجدداً تلاش نمایید";
      } else {
        msg = "متاسفانه پاسخی از سرور دریافن نشد . لطفا مجدداً تلاش نمایید";
      }
      console.log("خطای : ", msg);
      console.log("استان : ", ProvinceName);
    });
}

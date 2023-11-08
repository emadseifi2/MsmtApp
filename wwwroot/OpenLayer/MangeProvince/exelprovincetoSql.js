

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
let pro = ProvinceIran.features;
console.log(pro);
for (var q = 0; q < pro.length; q++) {
  var _BaseUrlQueryOsm = "https://overpass-api.de/api/interpreter?data=";
  var _QueryPathwaysPart_1 = "[out:json];area(";
  let OsmID = pro[q].properties.ProvinceAreaId;
  var FullOsmId = parseInt(OsmID);
  var _QueryPathwaysPart_2 = 3600000000 + FullOsmId;
  var _QueryPathwaysPart_3 =
    ')->.searchArea;(nwr["boundary"="administrative"]["admin_level"="5"]["place"="county"](area.searchArea););map_to_area;out;>;out skel qt;';
  //[out:json];area(3600269900)->.searchArea;(nwr["boundary"="administrative"]["admin_level"="5"]["place"="county"](area.searchArea););map_to_area;out;>;out skel qt;
  let FullUrl =
    _BaseUrlQueryOsm +
    _QueryPathwaysPart_1 +
    _QueryPathwaysPart_2 +
    _QueryPathwaysPart_3;

  AjaxUtils.GetJSONAsync(FullUrl)
    .done((response) => {
      console.log(response);
      let Element = response.elements;
      for (var e = 0; e < Element.length; e++) {     
        let ID = Element[e].id;
        let OsmID = 3600000000 -  parseInt(ID);
        var Unit = {
          CountyName: Element[e].tags.name,          
          CountyAdminLevel: Element[e].tags.admin_level, 
          CountyAreaId: Math.abs(OsmID),
          ProvinceID : FullOsmId
          //CountyCoordinates: pro[i].geometry.coordinates[0],
        };
        AddProvinceExelDTOs.push(Unit);
      }
      console.log(AddProvinceExelDTOs);

      // let geojson = osmtogeojson(response);
      // console.log(geojson);
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
      _ceartMessage("error", "کاربر گرامی ...", msg);
      document.getElementById("loaderOSM").style.display = "none";
    });
}



let Province = ProvinceIran.features;
var nameProvince = [];
for (var c = 0; c < Province.length; c++) {
      let nameCity = {
        name : 'استان ' +  Province[c].properties.name,
        ProvinceID : Province[c].properties.ProvinceAreaId
      }
      nameProvince.push(nameCity);
};

console.log(nameProvince);



var OL = (function ($) {
  "use strict";

  //#region Constractor Variable......................................................................

  //Collect All layer
  var AllLayer = [];
  var AllLayerOnePoint = [];
  var AllLayerFCPointColor = [];
  var AllLayerFCPointIcone = [];
  var AllLayerOneLineString = [];
  var AllLayerFCLineString = [];
  var AllLayerOnePolygon = [];
  var AllLayerFCPolygon = [];
  var AllLayerFeatureCollection = [];
  var AllLayerCity = [];
  var AllCheclGroup = [];
  var container = "";
  var content = "";
  var closer = "";
  var _BaseUrlQueryOsm = "https://overpass-api.de/api/interpreter?data=";
  var _QueryPathwaysPart_1 = "[out:json][timeout:25];area(";
  var _QueryPathwaysPart_3 = ')->.searchArea;(way["highway"="';
  var _QueryPathwaysPart_4 = '"](area.searchArea););out;>;out skel qt;';

  //Other Variable
  const Map = ol.Map;
  const View = ol.View;
  const TileLayer = ol.layer.Tile;
  const VectorLayer = ol.layer.Vector;
  const OSM = ol.source.OSM;
  const VectorSource = ol.source.Vector;
  const CircleStyle = ol.style.Circle;
  const Fill = ol.style.Fill;
  const Stroke = ol.style.Stroke;
  const Style = ol.style.Style;
  const Point = ol.geom.Point;
  const Feature = ol.Feature;
  const GeoJSON = ol.format.GeoJSON;
  const Overlay = ol.Overlay;
  const TileJSON = ol.source.TileJSON;
  const transform = ol.proj.transform;

  var AllBaseMapLayers = [
    new ol.layer.Tile({
      source: new ol.source.OSM({
        projection: "EPSG:4326",
      }), // OpenStreetMap
      visible: true,
      title: "OpenStreetMap",
    }),
    new ol.layer.Tile({
      source: new ol.source.Stamen({
        layer: "watercolor", // نقشه طراحی آبرنگی
        projection: "EPSG:4326",
      }),
      visible: false,
      title: "Stamen Watercolor",
    }),
    new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: "https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png", // OpenTopoMap
        attributions:
          '© <a href="https://opentopomap.org">OpenTopoMap</a> contributors',
        maxZoom: 17,
      }),
      visible: false,
      title: "OpenTopoMap",
    }),
    //new ol.layer.Tile({
    //    source: new ol.source.XYZ({
    //        url: 'http://{s}.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=1398',
    //        attributions: '© <a href="https://www.microsoft.com/maps">Bing Maps</a>',
    //        maxZoom: 19,
    //        subdomains: ['0', '1', '2', '3']
    //    }),
    //    visible: true,
    //    title: 'Bing Maps Satellite'
    //}),
    //new ol.layer.Tile({
    //    source: new ol.source.XYZ({
    //        url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', // Wikimedia Map
    //        attributions: '© <a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
    //        maxZoom: 19
    //    }),
    //    visible: false,
    //    title: 'Wikimedia Map'
    //}),
    //new ol.layer.Tile({
    //    source: new ol.source.XYZ({
    //        url: 'https://api.mapbox.com/styles/v1/{username}/{style_id}/tiles/{z}/{x}/{y}?access_token={access_token}',
    //        attributions: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a>',
    //        maxZoom: 22
    //    }),
    //    visible: true,
    //    title: 'Mapbox Custom Style'
    //})
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

  //#endregion

  //#region CeartMessage......................................................................
  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: true,
    progressBar: true,
    positionClass: "toast-top-left",
    preventDuplicates: true,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "10000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };

  let _ceartMessage = (typeMessage, Title, Content) => {
    let titleMessage = document.createElement("h2");
    titleMessage.setAttribute(
      "class",
      "text-white text-Medium text-right text-x7"
    );
    var IconMessage = document.createElement("i");
    switch (typeMessage) {
      case "error":
        IconMessage.setAttribute("class", "text-white text-x13 far fa-tired");
        break;
      case "success":
        IconMessage.setAttribute(
          "class",
          "text-white text-x13 far fa-grin-wink"
        );
        break;
      case "info":
        IconMessage.setAttribute(
          "class",
          "text-white text-x13 far fa-surprise"
        );
        break;
      case "warning":
        IconMessage.setAttribute(
          "class",
          "text-white text-x13 far fa-frown-open"
        );
        break;
      default:
      //IconMessage.setAttribute("class", "text-white text-x14 far fa-frown-open");
    }
    IconMessage.setAttribute("style", "float : left");
    let titletextnode = document.createTextNode(Title);
    titleMessage.appendChild(titletextnode);
    titleMessage.appendChild(IconMessage);
    let ContentMessage = document.createElement("p");
    ContentMessage.setAttribute(
      "class",
      "text-white text-Medium text-right text-x6"
    );
    let Contenttextnode = document.createTextNode(Content);
    ContentMessage.appendChild(Contenttextnode);
    switch (typeMessage) {
      case "error":
        toastr.error(ContentMessage, titleMessage);
        break;
      case "success":
        toastr.success(ContentMessage, titleMessage);
        break;
      case "info":
        toastr.info(ContentMessage, titleMessage);
        break;
      case "warning":
        toastr.warning(ContentMessage, titleMessage);
        break;
      default:
        toastr.warning("نوع پیام شما مشخص نشده است ...", "خطا در نوع پیام");
    }
  };
  //#endregion

  //#region load And Tools on map......................................................................
  let _loadMap = () => {
    map = new ol.Map({
      controls: ol.control.defaults().extend([
        new ol.control.ScaleLine({
          units: "degrees",
        }),
      ]),
      layers: AllBaseMapLayers,
      overlays: [],
      target: "map",
      view: new ol.View({
        center: ol.proj.transform(
          [52.860343, 32.880131],
          "EPSG:4326",
          "EPSG:3857"
        ),
        zoom: 6,
      }),
      controls: [],
    });
  };

  let _flyToMap = {
    BaseFlyto: function (_center, _duration, _zoom) {
      var center3857 = ol.proj.fromLonLat(_center, "EPSG:4326");
      console.log(_center);
      console.log(center3857);
      return map.getView().animate({
        center: _center,
        zoom: _zoom,
        duration: _duration,
        easing: ol.easing.easeOut,
      });
    },
    LatLonFlyto: function (_lon, _lat, _duration, _zoom) {
      return map.getView().animate({
        center: ol.proj.fromLonLat([parseFloat(_lon), parseFloat(_lat)]),
        zoom: _zoom,
        duration: _duration,
        easing: ol.easing.easeOut,
      });
    },
    ToolsViewFlyto: function (_center, _duration, _zoom, _rotation, _pitch) {
      var center3857 = ol.proj.fromLonLat(_center, "EPSG:4326");
      return map.getView().animate({
        center: _center,
        duration: _duration,
        zoom: _zoom,
        rotation: _rotation,
        pitch: _pitch,
        easing: ol.easing.easeOut,
      });
    },
  };

  let _toggleSidebar = () => {
    var currentRight = document.getElementById("OL_Id_Sidbare").style.right;
    if (currentRight === "-305px") {
      document.getElementById("OL_Id_Sidbare").style.right = "0";
      var center = map.getView().getCenter();
      var zoomLevel = map.getView().getZoom();
      var offsetCoordinate = 500 * (23 - zoomLevel);
      var offsetLeft = [offsetCoordinate, 0]; // مقدار افست به سمت چپ را تعیین می‌کنیم
      center = ol.coordinate.add(center, offsetLeft); // مختصات جدید را بدست می‌آوریم
      _flyToMap.BaseFlyto(center, 2000, zoomLevel);
    } else if (currentRight === "0px") {
      document.getElementById("OL_Id_Sidbare").style.right = "-305px";
      var center = map.getView().getCenter();
      var zoomLevel = map.getView().getZoom();
      var offsetCoordinate = 500 * (23 - zoomLevel);
      var offsetLeft = [-offsetCoordinate, 0]; // مقدار افست به سمت چپ را تعیین می‌کنیم
      center = ol.coordinate.add(center, offsetLeft); // مختصات جدید را بدست می‌آوریم
      _flyToMap.BaseFlyto(center, 2000, zoomLevel);
    }
  };

  let _controllerMap = () => {
    var HomeControl = function (options) {
      var button = document.createElement("div");
      button.className = "text-center";
      button.innerHTML = '<i class="fas fa-home m-2"></i>';
      button.addEventListener("click", function () {
        map.getView().fit(options.extent, map.getSize());
      });

      var element = document.createElement("div");
      element.className = "OL_Cl_Controller ol-home";
      element.appendChild(button);

      ol.control.Control.call(this, {
        element: element,
        target: options.target,
      });
    };
    var FullScreenControl = function (options) {
      var button = document.createElement("div");
      button.className = "text-center";
      button.innerHTML = '<i class="fas fa-expand m-2"></i>';
      button.addEventListener("click", function () {
        if (
          !document.fullscreenElement &&
          !document.mozFullScreenElement &&
          !document.webkitFullscreenElement &&
          !document.msFullscreenElement
        ) {
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(
              Element.ALLOW_KEYBOARD_INPUT
            );
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
        }
      });

      var element = document.createElement("div");
      element.className = "OL_Cl_Controller ol-fullscreen";
      element.appendChild(button);

      ol.control.Control.call(this, {
        element: element,
        target: options.target,
      });
    };
    var RotateControl = function (options) {
      var button = document.createElement("div");
      button.className = "text-center";
      button.innerHTML = '<i class="fas fa-sync-alt m-2"></i>';
      button.addEventListener("click", function () {
        var view = map.getView();
        var rotation = view.getRotation();
        view.setRotation(rotation + Math.PI / 2);
      });

      var element = document.createElement("div");
      element.className = "OL_Cl_Controller ol-rotate";
      element.appendChild(button);

      ol.control.Control.call(this, {
        element: element,
        target: options.target,
      });
    };
    var GeolocationControl = function (options) {
      var button = document.createElement("div");
      button.className = "text-center";
      button.innerHTML = '<i class="fas fa-map-marker-alt m-2"></i>';
      button.addEventListener("click", function () {
        var geolocation = new ol.Geolocation({
          tracking: true,
          projection: map.getView().getProjection(),
        });

        var accuracyFeature = new ol.Feature();
        geolocation.on("change:accuracyGeometry", function () {
          accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
        });

        var positionFeature = new ol.Feature();
        positionFeature.setStyle(
          new ol.style.Style({
            image: new ol.style.Circle({
              radius: 6,
              fill: new ol.style.Fill({
                color: "#3399CC",
              }),
              stroke: new ol.style.Stroke({
                color: "#fff",
                width: 2,
              }),
            }),
          })
        );

        geolocation.on("change:position", function () {
          var coordinates = geolocation.getPosition();
          positionFeature.setGeometry(
            coordinates ? new ol.geom.Point(coordinates) : null
          );
        });

        new ol.layer.Vector({
          map: map,
          source: new ol.source.Vector({
            features: [accuracyFeature, positionFeature],
          }),
        });
      });

      var element = document.createElement("div");
      element.className = "OL_Cl_Controller ol-geolocation";
      element.appendChild(button);

      ol.control.Control.call(this, {
        element: element,
        target: options.target,
      });
    };
    var PrintControl = function (options) {
      var button = document.createElement("div");
      button.className = "text-center";
      button.innerHTML = '<i class="fas fa-print m-2"></i>';
      button.addEventListener("click", function () {
        var exportType = options.exportType || "png";
        var layout = options.layout || "portrait";
        var resolution = options.resolution || 150;
        var size = options.size || "a4";
        var lang = options.lang || "en-US";

        var printOptions = {
          exportType: exportType,
          layout: layout,
          resolution: resolution,
          size: size,
          lang: lang,
        };

        if (options.onBeforePrint) {
          options.onBeforePrint(map, layers, printOptions);
        }

        var printTask = new ol.PrintTask({
          lang: lang,
          map: map,
          layers: layers,
          format: exportType,
          layout: layout,
          resolution: resolution,
          size: size,
        });

        printTask.on("complete", function (event) {
          if (options.onPrint) {
            options.onPrint(event.data);
          }
        });

        printTask.on("error", function (event) {
          alert("Error printing map: " + event.error.message);
        });

        printTask.run();
      });

      var element = document.createElement("div");
      element.className = "OL_Cl_Controller ol-print";
      element.appendChild(button);

      ol.control.Control.call(this, {
        element: element,
        target: options.target,
      });
    };
    var ZoomControlIn = function (options) {
      var zoomInButton = document.createElement("div");
      zoomInButton.className = "text-center";
      zoomInButton.innerHTML = '<i class="fas fa-plus m-2"></i>';
      zoomInButton.addEventListener("click", function () {
        var view = map.getView();
        var zoom = view.getZoom();
        view.setZoom(zoom + 1);
      });

      var element = document.createElement("div");
      element.className = "OL_Cl_Controller ol-zoom";
      element.appendChild(zoomInButton);

      ol.control.Control.call(this, {
        element: element,
        target: options.target,
      });
    };
    var ZoomControlOut = function (options) {
      var zoomOutButton = document.createElement("div");
      zoomOutButton.className = "text-center";
      zoomOutButton.innerHTML = '<i class="fas fa-minus"></i>';
      zoomOutButton.addEventListener("click", function () {
        var view = map.getView();
        var zoom = view.getZoom();
        view.setZoom(zoom - 1);
      });

      var element = document.createElement("div");
      element.className = "OL_Cl_Controller ol-zoom";
      element.appendChild(zoomOutButton);

      ol.control.Control.call(this, {
        element: element,
        target: options.target,
      });
    };

    Object.assign(HomeControl.prototype, ol.control.Control.prototype);
    Object.assign(FullScreenControl.prototype, ol.control.Control.prototype);
    Object.assign(RotateControl.prototype, ol.control.Control.prototype);
    Object.assign(GeolocationControl.prototype, ol.control.Control.prototype);
    //Object.assign(PrintControl.prototype, ol.control.Control.prototype);
    Object.assign(ZoomControlIn.prototype, ol.control.Control.prototype);
    Object.assign(ZoomControlOut.prototype, ol.control.Control.prototype);

    var homeControl = new HomeControl({
      extent: [-180, -90, 180, 90],
      target: "OL_Id_HomeControl",
    });
    var fullscreenControl = new FullScreenControl({
      target: "OL_Id_FullscreenControl",
    });
    var rotateControl = new RotateControl({
      target: "OL_Id_RotateControl",
    });
    var geolocationControl = new GeolocationControl({
      target: "OL_Id_GeolocationControl",
    });
    //var printControl = new PrintControl({
    //    target: "OL_Id_PrintControl"
    //});
    var zoomControlIn = new ZoomControlIn({
      target: "OL_Id_ZoomControlIn",
    });
    var zoomControlOut = new ZoomControlOut({
      target: "OL_Id_ZoomControlOut",
    });

    map.addControl(homeControl);
    map.addControl(fullscreenControl);
    map.addControl(rotateControl);
    map.addControl(geolocationControl);
    //map.addControl(printControl);
    map.addControl(zoomControlIn);
    map.addControl(zoomControlOut);
  };

  let _disableButton = (_btn) => {
    var button = document.getElementById(_btn);
    button.disabled = true;
  };

  let _switchBasemap = (basemapIndex) => {
    var baseMapLayers = map.getLayers().getArray();

    for (var i = 0; i < baseMapLayers.length; i++) {
      baseMapLayers[i].setVisible(i === basemapIndex);
    }
  };

  let _showBasemap = () => {
    //var popover = document.getElementById('popover97781');
    //if (popover.style.display === 'none') {
    //    popover.style.display = 'block';
    //} else {
    //    popover.style.display = 'none';
    //}
    var popover = $("#popover97781");
    if (popover.css("display") === "none") {
      popover.fadeIn(); // افکت نمایش
    } else {
      popover.fadeOut(); // افکت مخفی شدن
    }
  };

  let _queryToSql = (callback) => {
    const AllRegion = document.getElementById("AllRegion");
    const checkRegion = AllRegion.querySelectorAll('input[type="checkbox"]');
    let allCheckedRegion = false;
    checkRegion.forEach((checkbox) => {
      if (!checkbox.checked) {
        allCheckedRegion = true;
      }
    });

    let ProviceCheckVal = "";
    let ProviceNameVal = "";
    let GroupCheckVal = "";
    let AllCheclRegion = [];
    let AllCheclGroup = [];

    if (allCheckedRegion) {
      document.getElementById("loaderOSM").style.display = "block";
      const AllProvince = document.getElementById("AllProvince");
      const checkProvince = AllProvince.querySelectorAll("input");
      if (checkProvince[0].checked) {
        ProviceCheckVal = "Province";
        ProviceNameVal = document.getElementById("FilterPartA").value;
        AllCheclRegion = [];
      } else {
        ProviceCheckVal = "City";
        const AllCity = document.getElementById("AllCity");
        const checkCity = AllCity.querySelectorAll('input[type="checkbox"]');
        for (var ci = 0; ci < checkCity.length; ci++) {
          if (checkCity[ci].checked) {
            AllCheclRegion.push(checkCity[ci].getAttribute("data-name"));
          }
        }
      }

      const AllGroupBox = document.getElementById("AllGroupBox");
      const checkboxes = AllGroupBox.querySelectorAll('input[type="checkbox"]');
      let CheckAllGroup = document.getElementById("AllGroup");
      if (CheckAllGroup.checked) {
        GroupCheckVal = "AllGroup";
        AllCheclGroup = [];
      } else {
        GroupCheckVal = "MultiGrouph";
        checkboxes.forEach((checkbox) => {
          if (checkbox.checked) {
            let IndustryGroupCheck = checkbox.getAttribute(
              "data-IndustryGroupTitle"
            );
            AllCheclGroup.push(IndustryGroupCheck);
          }
        });
      }

      $.ajax({
        type: "POST",
        url: "/AdminPanel/IUnit_CollectionQuery/",
        data: {
          ProviceCheck: ProviceCheckVal,
          GroupCheck: GroupCheckVal,
          ProviceName: ProviceNameVal,
          CityName: AllCheclRegion.join(","),
          GroupName: AllCheclGroup.join(","),
        },
        dataType: "json",
        success: function (response) {
          document.getElementById("loaderOSM").style.display = "none";
          callback(response);
        },
        error: function (req, status, error) {
          document.getElementById("loaderOSM").style.display = "none";
          _ceartMessage("error", "اشکال از سرور", req + status + error);
        },
      });
    } else if (ChildContainer === null) {
      _ceartMessage(
        "warning",
        "کاربر گرامی",
        "لطفا یک استان و یا یک شهر را انتخاب نمایید..."
      );
    }
  };

  let _initialGroups = () => {
    $.ajax({
      type: "POST",
      url: "/AdminPanel/InitialGroups/",
      dataType: "json",
      data: "",
      success: function (response) {
        console.log(response);

        let AllElemetGroup = [];
        AllElemetGroup.push(
          '<div class="accordion" id="accordionCategoryGroup">'
        );
        for (var i = 0; i < response.length; i++) {
          let headingID = response[i].industryGroupCode;
          let title = response[i].industryGroupTitle;
          let FourDigitActivityGroup =
            response[i].relation_FourDigitActivityGroup;
          let ColorGroup = response[i].industryGroupColor;

          AllElemetGroup.push('<div class="card z-depth-0 bordered">');
          AllElemetGroup.push('<div class="card-header p-0" id="');
          AllElemetGroup.push("heading" + headingID);
          AllElemetGroup.push('">');
          AllElemetGroup.push(
            '<button class="btn peach-gradient white-text m-0 py-1 text-Medium text-right text-x6 w-100 waves-effect waves-light collapsed"'
          );
          AllElemetGroup.push(
            'type="button" data-toggle="collapse" data-target="'
          );
          AllElemetGroup.push("#collapse" + headingID);
          AllElemetGroup.push('" aria-expanded="false" aria-controls="');
          AllElemetGroup.push("collapse" + headingID);
          AllElemetGroup.push('">');
          AllElemetGroup.push(
            '<i class="fa fa-minus fa-2x text-x7 float-right white-text" aria-hidden="true"></i>'
          );
          AllElemetGroup.push('<span class="pr-2">');
          AllElemetGroup.push(title);
          AllElemetGroup.push("</span>");
          AllElemetGroup.push("</button>");
          AllElemetGroup.push("</div>");
          AllElemetGroup.push('<div id="');
          AllElemetGroup.push("collapse" + headingID);
          AllElemetGroup.push('" class="collapse" aria-labelledby="');
          AllElemetGroup.push("heading" + headingID);
          AllElemetGroup.push('" data-parent="#accordionCategoryGroup">');
          AllElemetGroup.push('<div class="card-body p-1">');

          AllElemetGroup.push(
            '<ul class="m-0 pt-2 pb-3 pr-3 w-100 mx-auto text-right" style="direction: rtl;float: right" >'
          );
          for (var f = 0; f < FourDigitActivityGroup.length; f++) {
            let FDAG_Title = FourDigitActivityGroup[f].fdaG_Title;
            let FDAG_ID = FourDigitActivityGroup[f].fdaG_Code;

            AllElemetGroup.push('<li style="border-color:');
            AllElemetGroup.push(ColorGroup);
            AllElemetGroup.push(
              '" class="d-inline-block mt-1 pt-1 pr-1 ml-2 liCheckBox">'
            );
            AllElemetGroup.push(
              '<div class="custom-control custom-checkbox outline-info px-0 py-0 rounded">'
            );
            AllElemetGroup.push(
              '<input type="checkbox" class="custom-control-input" data-IndustryGroupCheck="MultiGrouph" data-IndustryGroupTitle="'
            );
            AllElemetGroup.push(FDAG_Title);
            AllElemetGroup.push('" id="');
            AllElemetGroup.push(FDAG_ID);
            AllElemetGroup.push('">');
            AllElemetGroup.push(
              '<label class="custom-control-label text-Medium text-dark m-0 pr-2" style="font-size: 10px" for="'
            );
            AllElemetGroup.push(FDAG_ID);
            AllElemetGroup.push('">');
            AllElemetGroup.push(FDAG_Title);
            AllElemetGroup.push("</label></div></li>");
          }
          AllElemetGroup.push("</ul></div></div></div>");
        }
        AllElemetGroup.push('<div class="card z-depth-0 bordered">');
        AllElemetGroup.push('<div class="card-header p-0" id="');
        AllElemetGroup.push("heading" + "AllGroupId");
        AllElemetGroup.push('">');
        AllElemetGroup.push(
          '<button class="btn peach-gradient white-text m-0 py-1 text-Medium text-right text-x6 w-100 waves-effect waves-light collapsed"'
        );
        AllElemetGroup.push(
          'type="button" data-toggle="collapse" data-target="'
        );
        AllElemetGroup.push("#collapse" + "AllGroupId");
        AllElemetGroup.push('" aria-expanded="false" aria-controls="');
        AllElemetGroup.push("collapse" + "AllGroupId");
        AllElemetGroup.push('">');
        AllElemetGroup.push(
          '<i class="fa fa-minus fa-2x text-x7 float-right white-text" aria-hidden="true"></i>'
        );
        AllElemetGroup.push('<span class="pr-2">');
        AllElemetGroup.push("تمام گروها");
        AllElemetGroup.push("</span>");
        AllElemetGroup.push("</button>");
        AllElemetGroup.push("</div>");
        AllElemetGroup.push('<div id="');
        AllElemetGroup.push("collapse" + "AllGroupId");
        AllElemetGroup.push('" class="collapse" aria-labelledby="');
        AllElemetGroup.push("heading" + "AllGroupId");
        AllElemetGroup.push('" data-parent="#accordionCategoryGroup">');
        AllElemetGroup.push('<div class="card-body p-1">');
        AllElemetGroup.push(
          '<ul class="m-0 pt-2 pb-3 pr-3 w-100 mx-auto text-right" style="direction: rtl;float: right">'
        );
        AllElemetGroup.push(
          '<li style="border-color:#1acf96" class="d-inline-block mt-1 pt-1 pr-1 ml-2 liCheckBox">'
        );
        AllElemetGroup.push(
          '<div class="custom-control custom-checkbox outline-info px-0 py-0 rounded">'
        );
        AllElemetGroup.push(
          '<input type="checkbox" class="custom-control-input" data-industrygroupcheck="AllGroup data-IndustryGroupTitle="AllGroup" id="AllGroup">'
        );
        AllElemetGroup.push(
          '<label class="custom-control-label text-Medium text-dark m-0 pr-2" style="font-size: 10px" for="AllGroup">تمام گروه ها</label>'
        );
        AllElemetGroup.push("</div></li>");
        AllElemetGroup.push("</ul></div></div></div>");
        AllElemetGroup.push("</div>");

        let AllGroup = AllElemetGroup.join("");
        $("#AllGroupBox").html(AllGroup);
      },
      error: function (req, status, error) {
        document.getElementById("loaderOSM").style.display = "none";
        OL.CeartMessage("error", "اشکال از سرور", req + status + error);
      },
    });
  };
  //#endregion

  //#region Layer on map......................................................................
  let _removeLayer = {
    _removeOneLayer: function (_layer) {
      return function () {
        let layerToRemove;
        map.getLayers().forEach((layer) => {
          if (layer.get("name") === _layer) {
            layerToRemove = layer;
          }
        });
        if (layerToRemove) {
          map.removeLayer(layerToRemove);
        }
      };
    },
    _removeMultiLayer: function (_multilayer) {
      return function () {
        if (_multilayer.length) {
          for (var i = 0; i < _multilayer.length; i++) {
            let layerToRemove;
            map.getLayers().forEach((layer) => {
              if (layer.get("name") === _multilayer[i]) {
                layerToRemove = layer;
              }
            });
            if (layerToRemove) {
              map.removeLayer(layerToRemove);
            }
          }
        }
      };
    },
    _removeAllLayer: function (_layer) {
      return function () {
        if (AllLayer.length) {
          for (var i = 0; i < AllLayer.length; i++) {
            let layerToRemove;
            map.getLayers().forEach((layer) => {
              if (layer.get("name") === AllLayer[i]) {
                layerToRemove = layer;
              }
            });
            if (layerToRemove) {
              map.removeLayer(layerToRemove);
            }
          }
        }
      };
    },
  };

  let _addNewLayer = {
    LayerOnePoint: function (
      _Lon,
      _Lat,
      _colorFill,
      _colorStroke,
      _widthStroke,
      _radius,
      _layerName
    ) {
      return function () {
        _removeLayer._removeMultiLayer(AllLayerOnePoint)();

        // مختصات دو نقطه به صورت [طول، عرض]
        const pointCoords = [_Lon, _Lat];
        const sourceProjection = "EPSG:4326";
        const targetProjection = "EPSG:3857";
        const transformedCoordinates = ol.proj.transform(
          pointCoords,
          sourceProjection,
          targetProjection
        );

        const pointFeature = new Feature({
          geometry: new Point(transformedCoordinates),
        });

        const vectorSource = new VectorSource({
          features: [pointFeature],
        });

        const vectorLayer = new VectorLayer({
          source: vectorSource,
          style: new Style({
            image: new CircleStyle({
              fill: new Fill({
                color: _colorFill,
              }),
              stroke: new Stroke({
                color: _colorStroke,
                width: _widthStroke,
              }),
              radius: _radius,
            }),
          }),
        });
        vectorLayer.set("name", _layerName); // تنظیم نام برای لایه
        map.addLayer(vectorLayer);
        AllLayer.push(_layerName);
        AllLayerOnePoint.push(_layerName);
      };
    },
    LayerFCPointColor: function (points, _radius, _layerName) {
      return function () {
        // var points =[
        //     {
        //         "name": "شن و ماسه شمال با مسئوليت محدود","color": "rgb(39,39,222)","coordinates": [50.7662537,36.8715425]
        //     },{
        //         "name": "تعاوني توليدي خاص صنعت و معدن آرين ورسک سوادکوه","color": "rgb(39,39,222)","coordinates": [53.0482972,36.0171756]
        //     },            {
        //         "name": "گچ مازندران","color": "rgb(39,39,222)","coordinates": [53.0421362,36.1379876]
        //     }
        // ];
        _removeLayer._removeMultiLayer(AllLayerFCPointColor)();

        var vectorLayer = new ol.layer.Vector({
          source: new ol.source.Vector({
            features: points.map(function (point) {
              var feature = new ol.Feature({
                geometry: new ol.geom.Point(
                  ol.proj.fromLonLat(point.coordinates)
                ),
              });
              feature.setStyle(
                new ol.style.Style({
                  image: new ol.style.Circle({
                    radius: _radius,
                    fill: new ol.style.Fill({
                      color: point.color,
                    }),
                  }),
                })
              );
              return feature;
            }),
          }),
        });

        // Show the layer
        vectorLayer.setVisible(true);
        vectorLayer.set("name", _layerName);
        // افزودن لایه نقاط به نقشه
        map.addLayer(vectorLayer);
        AllLayer.push(_layerName);
        AllLayerFCPointColor.push(_layerName);
      };
    },
    LayerFCPointIcone: function (
      points,
      _offsetYText,
      _layerName,
      _markerIcone
    ) {
      return function () {
        _removeLayer._removeMultiLayer(AllLayerFCPointIcone)();
        // var points = [
        //   {
        //     unitName: "نقطه 1",
        //     coordinates: [51.34702555201267, 35.746928060029084],
        //   },
        //   {
        //     unitName: "نقطه 2",
        //     coordinates: [51.47474162085464, 35.74581348197296],
        //   },
        //   {
        //     unitName: "نقطه 3",
        //     coordinates: [51.39989725793111, 35.69118004314743],
        //   },
        // ];
        //var _markerIcone = 'markerA';
        //var _layerName = '_layerName';
        // ایجاد یک FeatureCollection با استفاده از تابع turf.featureCollection()
        document.getElementById("popup").style.left = "-50px";
        var urlIcone =
          "http://msmt.ir/OpenLayer/OL_Images/" + _markerIcone + ".png";

        var iconStyle = new ol.style.Style({
          image: new ol.style.Icon({
            src: urlIcone,
            scale: 0.6,
          }),
        });

        var vectorSource = new ol.source.Vector();

        points.forEach(function (point) {
          var feature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat(point.coordinates)),
            unitName: point.unitName,
            industryGroupTitle: point.industryGroupTitle,
            managingName: point.managingName,
            phone: point.phone,
            province: point.province,
            city: point.city,
            Type: point.Type,
          });
          feature.setStyle(iconStyle);
          vectorSource.addFeature(feature);
        });

        var vectorLayer = new ol.layer.Vector({
          source: vectorSource,
        });

        vectorLayer.set("name", _layerName);
        map.addLayer(vectorLayer);
        AllLayer.push(_layerName);
        AllLayerFCPointIcone.push(_layerName);

        container = document.getElementById("popup");
        content = document.getElementById("popup-content");
        closer = document.getElementById("popup-closer");

        /*** Create an overlay to anchor the popup to the map.*/
        var overlay = new ol.Overlay({
          element: container,
          autoPan: true,
          autoPanAnimation: {
            duration: 250,
          },
        });

        map.addOverlay(overlay);

        /*** Add a click handler to hide the popup. Don't follow the href.*/
        closer.onclick = function () {
          overlay.setPosition(undefined);
          closer.blur();
          return false;
        };

        map.on("pointermove", function (evt) {
          if (map.hasFeatureAtPixel(evt.pixel) === true) {
            var feature = map.forEachFeatureAtPixel(
              evt.pixel,
              function (feature) {
                return feature;
              }
            );
            console.log();
            var ChekTypeLayer = feature.get("Type");

            if (ChekTypeLayer === "PointLayer") {
              let PopUpContent = [];
              var coordinate = evt.coordinate;
              PopUpContent.push(
                '<div class="card"><div class="card-header p-1"><h5 class="text-x6 text-center text-Bold mb-0">'
              );
              PopUpContent.push(feature.get("unitName"));
              PopUpContent.push("</h5></div>");
              PopUpContent.push(
                '<div class="card-block table-border-style"><div class="table-responsive table-sm"><table class="table text-x6 text-Medium mb-0"><tbody>'
              );
              PopUpContent.push(
                '<tr><td class="text-center text-Medium text-x6 p-1">گروه صنعتی : </td>'
              );
              PopUpContent.push(
                '<td class="text-center text-Medium text-x6 p-1">'
              );
              PopUpContent.push(feature.get("industryGroupTitle"));
              PopUpContent.push("</td></tr>");
              PopUpContent.push(
                '<tr><td class="text-center text-Medium text-x6 p-1">مدیر عامل : </td>'
              );
              PopUpContent.push(
                '<td class="text-center text-Medium text-x6 p-1">'
              );
              PopUpContent.push(feature.get("managingName"));
              PopUpContent.push("</td></tr>");
              PopUpContent.push(
                '<tr><td class="text-center text-Medium text-x6 p-1">تلفن : </td>'
              );
              PopUpContent.push(
                '<td class="text-center text-Medium text-x6 p-1">'
              );
              PopUpContent.push(feature.get("phone"));
              PopUpContent.push("</td></tr>");
              PopUpContent.push(
                '<tr><td class="text-center text-Medium text-x6 p-1">استان : </td>'
              );
              PopUpContent.push(
                '<td class="text-center text-Medium text-x6 p-1">'
              );
              PopUpContent.push(feature.get("province"));
              PopUpContent.push("</td></tr>");
              PopUpContent.push(
                '<tr><td class="text-center text-Medium text-x6 p-1">شهر : </td>'
              );
              PopUpContent.push(
                '<td class="text-center text-Medium text-x6 p-1">'
              );
              PopUpContent.push(feature.get("city"));
              PopUpContent.push("</td></tr>");
              content.innerHTML = PopUpContent.join("");
              overlay.setPosition(coordinate);
            }
          } else {
            overlay.setPosition(undefined);
            closer.blur();
          }
        });
      };
    },
    LayerOneLineString: function (
      _lonPointA,
      _latPointA,
      _lonPointB,
      _latPointB,
      _titleLine,
      _colorStroke,
      _widthStroke,
      _layerName
    ) {
      return function () {
        if (AllLayerOneLineString.length) {
          for (var i = 0; i < AllLayerOneLineString.length; i++) {
            let layerToRemove;
            map.getLayers().forEach((layer) => {
              if (layer.get("name") === AllLayerOneLineString[i]) {
                layerToRemove = layer;
              }
            });
            if (layerToRemove) {
              map.removeLayer(layerToRemove);
            }
          }
        }

        const lineCoords = [
          [_lonPointA, _latPointA],
          [_lonPointB, _latPointB],
        ];

        var sourceProjection = "EPSG:4326";
        var targetProjection = "EPSG:3857";
        // Transform coordinates to the target projection
        var transformedCoordinates = lineCoords.map(function (coord) {
          return ol.proj.transform(coord, sourceProjection, targetProjection);
        });
        // ساختن ویژگی خط
        const lineFeature = new Feature({
          geometry: new LineString(transformedCoordinates),
          name: _titleLine,
        });

        // تابع style برای تعیین سبک feature
        const styleFunction = function (feature) {
          return new Style({
            stroke: new Stroke({
              color: _colorStroke,
              width: _widthStroke,
            }),
          });
        };

        const vectorLayer = new VectorLayer({
          source: vectorSource,
          style: styleFunction,
        });
        vectorLayer.set("name", _layerName); // تنظیم نام برای لایه

        // اضافه کردن ویژگی خط به نقشه با استفاده از map.addLayer
        map.addLayer(vectorLayer);
      };
    },
    LayerFCLineString: function (
      _arrylines,
      _colorStroke,
      _widthStroke,
      _layerName
    ) {
      return function () {
        _removeLayer._removeMultiLayer(AllLayerFCLineString)();
        // Define a new Vector layer
        var lineLayer = new ol.layer.Vector({
          source: new ol.source.Vector({
            features: _arrylines.features.map(function (line) {
              return new ol.Feature({
                geometry: new ol.geom.LineString(
                  line.geometry.coordinates.map(function (coord) {
                    return ol.proj.fromLonLat(coord);
                  })
                ),
              });
            }),
          }),
          style: new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: _colorStroke,
              width: _widthStroke,
            }),
            fill: new ol.style.Fill({
              color: _colorStroke,
            }),
          }),
        });

        // Add the new Vector layer to the map
        lineLayer.setVisible(true);
        lineLayer.set("name", _layerName);
        map.addLayer(lineLayer);
        AllLayer.push(_layerName);
        AllLayerFCPointIcone.push(_layerName);
      };
    },
    LayerOnePolygon: function (
      _coordinates,
      _colorStroke,
      _widthStroke,
      _colorFill,
      _layerName
    ) {
      return function () {
        _removeLayer._removeMultiLayer(AllLayerOnePolygon)();
        console.log(_coordinates);
        var sourceProjection = "EPSG:4326";
        var targetProjection = "EPSG:3857";
        // Transform coordinates to the target projection
        var transformedCoordinates = _coordinates.map(function (coord) {
          return ol.proj.transform(coord, sourceProjection, targetProjection);
        });

        var polygon = new ol.geom.Polygon([transformedCoordinates]);

        var feature = new ol.Feature({
          geometry: polygon,
        });

        let Layer = new ol.layer.Vector({
          source: new ol.source.Vector({
            features: [feature],
          }),
          style: new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: _colorStroke,
              width: _widthStroke,
            }),
            fill: new ol.style.Fill({
              color: _colorFill,
            }),
          }),
        });
        Layer.set("name", _layerName); // تنظیم نام برای لایه
        map.addLayer(Layer);
        AllLayer.push(_layerName);
        AllLayerOnePolygon.push(_layerName);
      };
    },
    LayerFCPolygon: function (_points, _widthStroke, _layerName) {
      return function () {
        _removeLayer._removeMultiLayer(AllLayerFCPolygon)();

        //var points = [
        //    {
        //        name: "نقطه 1",
        //        coordinates: [
        //            [
        //                53.831642540341704,
        //                36.90070550440049
        //            ],
        //            [
        //                53.82948585860129,
        //                36.93693036735546
        //            ],
        //            [
        //                53.46988840640009,
        //                36.901457648028355
        //            ]
        //        ]
        //    }
        //];
        console.log(_points);

        var Allpolygons = []; // آرایه‌ای برای ذخیره پلیگان‌های به دست آمده
        for (var i = 0; i < _points.length; i++) {
          var sourceProjection = "EPSG:4326";
          var targetProjection = "EPSG:3857";
          var CoordPoint = _points[i].coordinates;
          // Transform coordinates to the target projection
          var transformedCoordinates = CoordPoint.map(function (coord) {
            return ol.proj.transform(coord, sourceProjection, targetProjection);
          });
          var polygon = new ol.geom.Polygon([transformedCoordinates]);

          var feature = new ol.Feature({
            geometry: polygon,
            color: _points[i].color, // اضافه کردن مقدار رنگ به ویژگی‌های جغرافیایی Feature
          }); // ساخت یک Feature با فرمت GeoJSON برای پلیگان با استفاده از ol.Feature

          Allpolygons.push(feature); // Feature جدید را به آرایه اضافه می‌کنیم
        }
        var featureCollection = new ol.format.GeoJSON().writeFeaturesObject(
          Allpolygons
        );

        // ایجاد یک VectorSource برای نگهداری ویژگی‌های جغرافیایی
        var vectorSource = new ol.source.Vector({
          features: new ol.format.GeoJSON().readFeatures(featureCollection),
        });

        // ایجاد یک VectorLayer و اضافه کردن VectorSource به آن
        var vectorLayer = new ol.layer.Vector({
          source: vectorSource,
          style: function (feature) {
            var color = feature.get("color");
            var fillColor = tinycolor(color).setAlpha(0.2); // تغییر شفافیت به 70%
            var strokeColor = tinycolor(color).setAlpha(0.7);
            return new ol.style.Style({
              stroke: new ol.style.Stroke({
                color: strokeColor,
                width: _widthStroke,
              }),
              fill: new ol.style.Fill({
                color: fillColor.toRgbString(), // تبدیل شیء tinycolor به رشته‌ای قابل استفاده توسط OpenLayers
              }),
            });
          },
        });

        vectorLayer.set("name", _layerName); // تنظیم نام برای لایه
        map.addLayer(vectorLayer);
        AllLayer.push(_layerName); // اضافه کردن نام لایه به آرایه AllLayer
        AllLayerFCPolygon.push(_layerName);
      };
    },
    LayerFeatureCollection: function (_geojsonObject, _layerName) {
      return function () {
        // تابع style برای تعیین سبک هر feature
        const styleFunction = function (feature) {
          // استخراج نوع ویژگی
          const type = feature.getGeometry().getType();

          // تعیین سبک بر اساس نوع ویژگی
          if (type === "Point") {
            return new Style({
              image: new CircleStyle({
                fill: new Fill({
                  color: "blue",
                }),
                stroke: new Stroke({
                  color: "white",
                  width: 2,
                }),
                radius: 10,
              }),
            });
          } else if (type === "LineString") {
            return new Style({
              stroke: new Stroke({
                color: "green",
                width: 2,
              }),
            });
          } else if (type === "Polygon") {
            return new Style({
              fill: new Fill({
                color: "orange",
              }),
              stroke: new Stroke({
                color: "red",
                width: 2,
              }),
            });
          } else {
            return null;
          }
        };

        // ساختن یک VectorSource از فایل GeoJSON
        const vectorSource = new VectorSource({
          features: new GeoJSON().readFeatures(geojsonObject),
        });

        // ساختن یک VectorLayer با استفاده از VectorSource و تابع style
        const vectorLayer = new VectorLayer({
          source: vectorSource,
          style: styleFunction,
        });
        vectorLayer.set("name", _layerName); // تنظیم نام برای لایه

        // اضافه کردن VectorLayer به نقشه
        map.addLayer(vectorLayer);
      };
    },
  };

  let _claster = () => {
    // Addfeatures to the cluster
    function addFeatures(nb) {
      var ext = map.getView().calculateExtent(map.getSize());
      var features = [];
      for (var i = 0; i < nb; ++i) {
        features[i] = new ol.Feature(
          new ol.geom.Point([
            ext[0] + (ext[2] - ext[0]) * Math.random(),
            ext[1] + (ext[3] - ext[1]) * Math.random(),
          ])
        );
        features[i].set("id", i);
        features[i].set("type", Math.floor(Math.random() * 4));
      }
      clusterSource.getSource().clear();
      clusterSource.getSource().addFeatures(features);
    }

    function addFeaturesFromJson(jsonFile) {
      $.getJSON(jsonFile, function (data) {
        var features = [];
        $.each(data, function (key, val) {
          var coords = ol.proj.fromLonLat(val.coordinates);
          var feature = new ol.Feature(new ol.geom.Point(coords));
          feature.set("id", key);
          feature.set("type", Math.floor(Math.random() * 4));
          features.push(feature);
        });
        clusterSource.getSource().clear();
        clusterSource.getSource().addFeatures(features);
      });
    }

    // Style for the clusters
    var styleCache = {};
    function getStyle(feature, resolution) {
      var features = feature.get("features");
      var size = features.length;
      // Feature style
      if (size === 1) return featureStyle(feature);
      // ClusterStyle
      else {
        var data = [0, 0, 0, 0];
        for (var i = 0, f; (f = features[i]); i++) data[f.get("type")]++;
        var style = styleCache[data.join(",")];
        if (!style) {
          var radius = Math.min(size + 7, 20);
          style = styleCache[data.join(",")] = new ol.style.Style({
            image: new ol.style.Chart({
              type: "pie",
              radius: radius,
              data: data,
              rotateWithView: true,
              stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,0)",
                width: 0,
              }),
            }),
          });
        }
        return [style];
      }
    }

    // Style for the features
    var form = ["bus", "town_hall", "theatre", "industrial"];
    function featureStyle(f) {
      var sel = f.get("features");
      if (sel) {
        var type = sel[0].get("type");
        var style = styleCache[type];
        if (!style) {
          var color = ol.style.Chart.colors.classic[type];
          style = styleCache[type] = new ol.style.Style({
            /*
          image: new ol.style.Icon({
            src: 'https://cdn.pixabay.com/photo/2014/04/02/10/45/poi-304466_960_720.png',
            scale: .05 
          }),
          */
            image: new ol.style.FontSymbol({
              glyph: "maki-" + form[type],
              radius: 12,
              color: color,
              scale: 10,
              fill: new ol.style.Fill({
                color: color,
              }),
              stroke: new ol.style.Stroke({
                color: "#fff",
                width: 1,
              }),
            }),
          });
        }
        return [style];
      } else
        return [
          new ol.style.Style({
            // Draw a link beetween points (or not)
            stroke: new ol.style.Stroke({
              color: "#fff",
              width: 1,
            }),
          }),
        ];
    }

    // Cluster Source
    var clusterSource = new ol.source.Cluster({
      distance: 40,
      source: new ol.source.Vector(),
    });
    // Animated cluster layer
    var clusterLayer = new ol.layer.AnimatedCluster({
      name: "Cluster",
      source: clusterSource,
      animationDuration: $("#animatecluster").prop("checked") ? 700 : 0,
      // Cluster style
      style: getStyle,
    });
    map.addLayer(clusterLayer);
    // add 2000 features
    addFeatures(2000);

    // Select interaction to spread cluster out and select features
    var selectCluster = new ol.interaction.SelectCluster({
      // Point radius: to calculate distance between the features
      pointRadius: 10,
      animate: $("#animatesel").prop("checked"),
      condition: ol.events.condition.click,
      // Feature style when it springs apart
      featureStyle: featureStyle,
      selectCluster: false, // disable cluster selection
    });
    map.addInteraction(selectCluster);

    // On selected => get feature in cluster and show info
    selectCluster.getFeatures().on(["add"], function (e) {
      var c = e.element.get("features");
      if (c.length == 1) {
        var feature = c[0];
        var color = ol.style.Chart.colors.classic[feature.get("type")];
        $(".infos").html(
          "<i class='maki-" +
            form[feature.get("type")] +
            "' style='color:" +
            color +
            "'></i>" +
            "One feature selected...<br/>(type=" +
            form[feature.get("type")] +
            ")"
        );
      } else {
        $(".infos").text("Cluster (" + c.length + " features)");
      }
    });
    selectCluster.getFeatures().on(["remove"], function (e) {
      $(".infos").html("");
    });

    function testFontLoaded() {
      console.log("TEST", $(".maki-bus").width());
      // Loaded ?
      if ($(".maki-bus").width() > 60) {
        styleCache = {};
      } else {
        setTimeout(testFontLoaded, 100);
      }
    }
    testFontLoaded();
  };

  let _onChangeProvin = () => {
    _removeLayer._removeAllLayer()();
    var SelectValuA = $("#FilterPartA").val();  
    var City = ShahrestanFull.features;
    let MakeButtonCity = [];
    let MakeButtonProvince = [];

    for (var i = 0; i < City.length; i++) {
      let id = "id_" + i;
      let County = City[i].properties.name;
      let province = City[i].properties.province;
      if (province === SelectValuA) {
        let coordinatesProvince = City[i].geometry.coordinates[0];
        var lonCity;
        var latCity;
        try {
          var polygon = turf.polygon([coordinatesProvince]);
          var center = turf.centerOfMass(polygon);
          lonCity = center.geometry.coordinates[0];
          latCity = center.geometry.coordinates[1];
        } catch (err) {
          OL.CeartMessage(
            "error",
            "اشکال از سرور",
            "اطلاعات شهر " + County + " نیاز به اصلاح دارد ..."
          );
        }
        MakeButtonCity.push(
          '<li class="d-inline-block w-lg-40 ml-4 mt-1"><div class="custom-control custom-checkbox outline-info px-0 py-0 rounded stylish-color">'
        );
        MakeButtonCity.push(
          '<input onclick="OL.FlytoLayerCity(this)" type="checkbox" class="custom-control-input-provin custom-control-input" data-layerGroup="City" id="'
        );
        MakeButtonCity.push(id);
        MakeButtonCity.push('" data-name="');
        MakeButtonCity.push(County);
        MakeButtonCity.push('" data-lat="');
        MakeButtonCity.push(latCity);
        MakeButtonCity.push('" data-lon="');
        MakeButtonCity.push(lonCity);
        MakeButtonCity.push('" data-zoom="10">');
        MakeButtonCity.push(
          '<label class="custom-control-label-provin custom-control-label text-x6 text-Medium text-white m-0 pr-2" for="'
        );
        MakeButtonCity.push(id);
        MakeButtonCity.push('">');
        MakeButtonCity.push(County);
        MakeButtonCity.push("</label></div></li>");
      }
    }

    var IranStat = ProvinceIran.features;
    for (var t = 0; t < IranStat.length; t++) {
      let id = IranStat[t].id;
      let ProvinceName = IranStat[t].properties.name;
      let lonProvince = IranStat[t].properties.lon;
      let latProvince = IranStat[t].properties.lat;
      let Zoom = IranStat[t].properties.zoomLevel;
      if (SelectValuA === ProvinceName) {
        MakeButtonProvince.push(
          '<li class="d-inline-block w-lg-40 ml-4 mt-1"><div class="custom-control custom-checkbox outline-info px-0 py-0 rounded stylish-color">'
        );
        MakeButtonProvince.push(
          '<input onclick="OL.FlytoLayerCity(this)" type="checkbox" class="custom-control-input-provin custom-control-input" data-layerGroup="Province" data-layerGroupID="Province_'
        );
        MakeButtonProvince.push(id);
        MakeButtonProvince.push('" id="');
        MakeButtonProvince.push(id);
        MakeButtonProvince.push('" data-name="');
        MakeButtonProvince.push(ProvinceName);
        MakeButtonProvince.push('" data-lat="');
        MakeButtonProvince.push(latProvince);
        MakeButtonProvince.push('" data-lon="');
        MakeButtonProvince.push(lonProvince);
        MakeButtonProvince.push('" data-zoom="9">');
        MakeButtonProvince.push(
          '<label class="custom-control-label-provin custom-control-label text-x6 text-Medium text-white m-0 pr-2" for="'
        );
        MakeButtonProvince.push(id);
        MakeButtonProvince.push('">');
        MakeButtonProvince.push("کل استان");
        MakeButtonProvince.push("</label></div></li>");
        _flyToMap.LatLonFlyto(lonProvince, latProvince, 2000, 9);

        var coordinatesState = IranStat[t].geometry.coordinates[0];
        var LayerName = "ProvinceLayer_" + id;
        _addNewLayer.LayerOnePolygon(
          coordinatesState,
          "blue",
          1,
          "rgba(0, 76, 255, 0.05)",
          LayerName
        )();
      }
    }
    let CreatButtonProvince = MakeButtonProvince.join("");
    let CreatButtonCity = MakeButtonCity.join("");
    $("#AllProvince").html();
    $("#AllCity").html();
    $("#AllProvince").html(CreatButtonProvince);
    $("#AllCity").html(CreatButtonCity);
    document.getElementById("city").style.display = "block";
  };

  let _onChangePathways = () => {
    var SelectValuA = $("#ُSelectPathways").val();
    var City = ShahrestanFull.features;
    let MakeButtonCity = [];
    MakeButtonCity.push(
      '<option class="text-Medium text-center text-x6" id="NotSelectProvine" selected="">...انتخاب نمایید</option>'
    );
    for (var i = 0; i < City.length; i++) {
      let id = "id_" + i;
      let County = City[i].properties.name;
      let province = City[i].properties.province;
      let CodeArea = City[i].properties.CodeArea;
      if (province === SelectValuA) {
        let coordinatesProvince = City[i].geometry.coordinates[0];
        var lonCity;
        var latCity;
        try {
          var polygon = turf.polygon([coordinatesProvince]);
          var center = turf.centerOfMass(polygon);
          lonCity = center.geometry.coordinates[0];
          latCity = center.geometry.coordinates[1];
        } catch (err) {
          OL.CeartMessage(
            "error",
            "اشکال از سرور",
            "اطلاعات شهر " + County + " نیاز به اصلاح دارد ..."
          );
        }
        MakeButtonCity.push(
          '<option class="text-Medium text-center text-x6" value="'
        );
        MakeButtonCity.push(CodeArea);
        MakeButtonCity.push('" data-lon="');
        MakeButtonCity.push(lonCity);
        MakeButtonCity.push('" data-lat="');
        MakeButtonCity.push(latCity);
        MakeButtonCity.push('">');
        MakeButtonCity.push(County);
        MakeButtonCity.push("</option>");
      }
    }

    let CreatButtonCity = MakeButtonCity.join("");
    $("#SelectCityPathways").html();
    $("#SelectCityPathways").html(CreatButtonCity);
    document.getElementById("cityPathways").style.display = "block";
  };

  let _flytoLayerCity = (_layer) => {
    //00_removeLayer._removeMultiLayer(AllLayerCity)();
    var layergroup = _layer.getAttribute("data-layergroup");
    var layerlat = _layer.getAttribute("data-lat");
    var layerlon = _layer.getAttribute("data-lon");
    var layerzoom = _layer.getAttribute("data-zoom");
    var layerName = _layer.getAttribute("data-name");
    var layerID = _layer.id;
    var checkClass = document.getElementById(layerID).className;
    var getElId = document.getElementById(layerID);

    _flyToMap.LatLonFlyto(layerlon, layerlat, 2000, layerzoom);

    var IranStat;
    if (layergroup === "City") {
      IranStat = ShahrestanFull.features;
      var selectElement = document.getElementById("FilterPartA");
      var selectedOptionIndex = selectElement.selectedIndex;
      var selectedOption = selectElement.options[selectedOptionIndex];
      var selectedId = selectedOption.getAttribute("data-id");
      const inputElement = document.getElementById(selectedId);
      // تنظیم مقدار checked به true
      inputElement.checked = false;
    } else if (layergroup === "Province") {
      IranStat = ProvinceIran.features;
      const divElement = document.getElementById("AllProvince");
      // انتخاب تمام تگ‌های <input> داخل تگ <div>
      const inputs = divElement.querySelectorAll("input");
      // حلقه بر روی هر تگ <input>
      inputs.forEach((input) => {
        // بررسی وضعیت تیک خوردگی هر تگ <input>
        if (input.checked) {
          // برداشتن تیک از تگ <input> خاص
          input.checked = false;
        }
      });
      // انتخاب تگ <input> با استفاده از شناسه
      const inputElement = document.getElementById(layerID);
      // تنظیم مقدار checked به true
      inputElement.checked = true;
    }

    for (var i = 0; i < IranStat.length; i++) {
      let Name = IranStat[i].properties.name;
      if (layerName === Name) {
        var coordinatesCity = IranStat[i].geometry.coordinates[0];
        var LayerName = "CityLayer_" + layerID;
        AllLayerCity.push(LayerName);
        _addNewLayer.LayerOnePolygon(
          coordinatesCity,
          "black",
          1,
          "rgba(0, 76, 255, 0.05)",
          LayerName
        )();
      }
    }
  };

  let _getOsmJson = (_osmID, _query, _layerName,_lon,_lat,_colorFill,_widthStroke) => {
    let FullUrl = _BaseUrlQueryOsm + _query;
    FullUrl =
      _BaseUrlQueryOsm +
      _QueryPathwaysPart_1 +
      _osmID +
      _QueryPathwaysPart_3 +
      _query +
      _QueryPathwaysPart_4;
    console.log(FullUrl);
    AjaxUtils.GetJSONAsync(FullUrl)
      .done((response) => {
        let geojson = osmtogeojson(response);
        console.log(geojson);
        document.getElementById("loaderOSM").style.display = "none";
        _addNewLayer.LayerFCLineString(geojson,_colorFill,_widthStroke,_layerName)();
        let _center = [parseFloat(_lon), parseFloat(_lat)];
        _flyToMap.LatLonFlyto(_lon,_lat, 2000, 12);
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
  };

  //#endregion

  // Exposing Public Methods....
  return {
    //CeartMessage on map....................
    CeartMessage: _ceartMessage,

    //load base map..........................
    LoadMap: _loadMap,
    FlyToMap: _flyToMap,

    //tools & control map....................
    ToggleSidebar: _toggleSidebar,
    ControllerMap: _controllerMap,
    DisableButton: _disableButton,
    SwitchBasemap: _switchBasemap,
    ShowBasemap: _showBasemap,
    QueryToSql: _queryToSql,

    //Layer on map....................
    RemoveLayer: _removeLayer,
    AddNewLayer: _addNewLayer,    
    OnChangeProvin: _onChangeProvin,
    OnChangePathways: _onChangePathways,
    FlytoLayerCity: _flytoLayerCity,
    InitialGroups: _initialGroups,
    Claster: _claster,
    GetOsmJson: _getOsmJson,
  };
})(window.jQuery);

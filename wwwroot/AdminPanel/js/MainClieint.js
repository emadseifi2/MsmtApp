var MainClieint = (function ($) {
    "use strict"

    //Other Variable
    var AllLayerCity = [];
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
    const TileJSON = ol.source.TileJSON;

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-left",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "4000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    let _ceartMessage = (typeMessage, Title, Content) => {
        let titleMessage = document.createElement("h2");
        titleMessage.setAttribute("class", "text-white text-Medium text-right text-x7");
        var IconMessage = document.createElement("i");
        switch (typeMessage) {
            case "error":
                IconMessage.setAttribute("class", "text-white text-x15 far fa-tired");
                break;
            case "success":
                IconMessage.setAttribute("class", "text-white text-x15 far fa-grin-wink");
                break;
            case "info":
                IconMessage.setAttribute("class", "text-white text-x15 far fa-surprise");
                break;
            case "warning":
                IconMessage.setAttribute("class", "text-white text-x15 far fa-meh");
                break;
            default:
            //IconMessage.setAttribute("class", "text-white text-x14 far fa-frown-open");
        }
        IconMessage.setAttribute("style", "float : left");
        let titletextnode = document.createTextNode(Title);
        titleMessage.appendChild(titletextnode);
        titleMessage.appendChild(IconMessage);
        let ContentMessage = document.createElement("p");
        ContentMessage.setAttribute("class", "text-white text-Medium text-right text-x6");
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

    let _loadMap = (_lon, _lat) => {
        map = new ol.Map({
            target: 'map',
            controls: [],
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([_lon, _lat]),
                zoom: 12
            })
        });
    };

    let _flyToMap = {
        BaseFlyto: function (_center, _duration, _zoom) {
            return map.getView().animate({
                center: _center,
                zoom: _zoom,
                duration: _duration,
                easing: ol.easing.easeOut
            });
        },
        LatLonFlyto: function (_lon, _lat, _duration, _zoom) {
            return map.getView().animate({
                center: ol.proj.fromLonLat([_lon, _lat]),
                zoom: _zoom,
                duration: _duration,
                easing: ol.easing.easeOut
            });
        },
        ToolsViewFlyto: function (_center, _duration, _zoom, _rotation, _pitch) {
            return map.getView().animate({
                center: _center,
                duration: _duration,
                zoom: _zoom,
                rotation: _rotation,
                pitch: _pitch,
                easing: ol.easing.easeOut
            });
        }
    }

    let _dragDropMarker = (_lon, _lat) => {

        // ایجاد آیکون برای مارکر
        const iconStyle = new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: '/AdminPanel/images/MarkerB.png',
                scale: 0.9 // مقیاس آیکون
            })
        });

        // ایجاد فیچر برای مارکر با آیکون
        const marker = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([_lon, _lat])),
            name: 'مارکر'
        });
        marker.setStyle(iconStyle);

        // ایجاد لایه برای مارکر
        const vectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [marker]
            })
        });

        // اضافه کردن لایه به نقشه
        map.addLayer(vectorLayer);

        // تعریف تابع برای جابجایی مارکر با drag & drop
        const dragAndDropInteraction = new ol.interaction.Translate({
            features: new ol.Collection([marker])
        });

        // اضافه کردن interaction به نقشه
        map.addInteraction(dragAndDropInteraction);

        // تعریف تابع برای دریافت موقعیت جغرافیایی مارکر بعد از جابجایی با drag & drop
        dragAndDropInteraction.on('translateend', function (event) {
            const coordinates = event.features.getArray()[0].getGeometry().getCoordinates();
            const lonLat = ol.proj.toLonLat(coordinates);
            console.log("موقعیت جغرافیایی مارکر بعد از جابجایی: ", lonLat);
            document.getElementById("Longitude").value = lonLat[0].toFixed(7).toString();
            document.getElementById("Latitude").value = lonLat[1].toFixed(7).toString();
            _flyToMap.LatLonFlyto(lonLat[0], lonLat[1], 2000, 13);
        });
    }

    let _creatTagSelectProvince = () => {
        return new Promise((resolve, reject) => {
            var Province = ProvinceAndCityName.AllCity;
            let MakeButton = [];
            var i;
            MakeButton.push('<option class="text-Medium text-center text-x6" id="NotSelectProvine" selected="">...انتخاب نمایید</option>');
            for (i = 0; i < Province.length; i++) {
                let GroupName = Province[i].provinceName;

                MakeButton.push('<option class="text-Medium text-center text-x6" value="');
                MakeButton.push(GroupName);
                MakeButton.push('">');
                MakeButton.push(GroupName);
                MakeButton.push('</option>');
            }
            let CreatButton = MakeButton.join('');
            if (CreatButton) {
                resolve(CreatButton);
            } else {
                reject(new Error(_ceartMessage('error', 'کاربر گرامی', 'خطا در ساخت المان select')));
            }
        });
    };

    let _onChangeProvin = () => {
        return new Promise((resolve, reject) => {
            var SelectValuA = $('#ProvineSelect').val();
            var City = ProvinceAndCityName.AllCity;
            let MakeButton = [];
            MakeButton.push('<option class="text-Medium text-center text-x6" id="Province" value="AllProvine">' + SelectValuA + '</option>');
            for (var i = 0; i < City.length; i++) {
                let province = City[i].provinceName;
                if (province === SelectValuA) {
                    let cities = City[i].cities;
                    for (var p = 0; p < cities.length; p++) {
                        MakeButton.push('<option class="text-Medium text-center text-x6" id="City" value="');
                        MakeButton.push(cities[p]);
                        MakeButton.push('">');
                        MakeButton.push(cities[p]);
                        MakeButton.push('</option>');
                    }
                };
            };
            let CreatButton = MakeButton.join('');
            if (CreatButton) {
                MainClieint.CeartMessage("info", "کاربر گرامی", "لطفا یکی از شهر ها را انتخاب نمایید");
                $("#CitySelect").html();
                $("#CitySelect").html(CreatButton);
                resolve('مقدار بازگشتی از متد _onChangeProvin');
            } else {
                reject(new Error(_ceartMessage('error', 'کاربر گرامی', 'خطا در ساخت گزینه‌های المان select')));
            }
        });
    };

    let _simpleTemplating = (data) => {
        var html = '';
        for (var i = 0; i < data.length; i++) {
            html += '<div class="row d-flex justify-content-center mx-1 mb-2 mb-1 border-bottom">';
            html += '<div class="col-lg-3 col-md-3 col-6 text-center"><div class="text-center text-Medium text-x6 text-dark py-1">' + data[i].unitName + '</div></div>';
            html += '<div class="col-lg-2 col-md-2 col-6 text-center"><div class="text-center text-Medium text-x6 text-dark py-1">' + data[i].province + '</div></div>';
            html += '<div class="col-lg-1 col-md-1 col-6 text-center"><div class="text-center text-Medium text-x6 text-dark py-1">' + data[i].city + '</div></div>';
            html += '<div class="col-lg-3 col-md-3 col-6 text-center"><div class="text-center text-Medium text-x6 text-dark py-1">' + data[i].industryGroup.industryGroupTitle + '</div></div>';
            html += '<div class="col-lg-1 col-md-1 col-6 text-center"><div class="text-center text-Medium text-x6 text-dark py-1">' + data[i].fixMe + '</div></div>';
            html += '<div class="col-lg-2 col-md-2 col-6 text-center">';
            html += '<span class="d-inline-block ml-3" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="ویرایش اطلاعات">';
            html += '<a data-IUnitDetails="true" data-targetid="' + data[i].industryId + '" style="cursor:pointer"><i class="fa fa-file-text-o text-x8 amber-text"></i></a></span>';
            html += '<span class="d-inline-block ml-3" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="ویرایش اطلاعات">';
            html += '<a data-IUnitEdite="true" data-targetid="' + data[i].industryId + '" style="cursor:pointer"><i class="fas fa-edit text-x8 text-c-blue"></i></a></span>';
            html += '<span class="d-inline-block" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="حذف اطلاعات">';
            html += '<a style="cursor:pointer" data-IUnitDelete="true" data-targetid="' + data[i].industryId + '"><i class="fas fa-trash-alt text-x8 text-c-red"></i></a></span></div>';
            html += '</div>';
        }
        return html;
    };

    let _uniteMainTemplating = (data) => {
        var html = '';
        for (var i = 0; i < data.length; i++) {
            html += '<div class="row justify-content-md-center mb-1">';
            html += '<div class="col-lg-3 col-md-3 col-12 border-bottom"><div class="text-center text-Medium text-x6 text-dark py-1">' + data[i].unitName + '</div></div>';
            html += '<div class="col-lg-2 col-md-2 col-12 border-bottom"><div class="text-center text-Medium text-x6 text-dark py-1">' + data[i].province + '</div></div>';
            html += '<div class="col-lg-2 col-md-2 col-12 border-bottom"><div class="text-center text-Medium text-x6 text-dark py-1">' + data[i].city + '</div></div>';
            html += '<div class="col-lg-3 col-md-3 col-12 border-bottom"><div class="text-center text-Medium text-x6 text-dark py-1">' + data[i].industryGroup.industryGroupTitle + '</div></div>';
            html += '<div class="col-lg-1 col-md-1 col-12 border-bottom text-center">';
            html += '<span class="d-inline-block ml-3" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="ویرایش اطلاعات">';
            html += '<a data-IUnitEdite="true" data-targetid="' + data[i].industryId + '" style="cursor:pointer"><i class="fas fa-edit text-x8 text-c-blue"></i></a></span>';
            html += '</div></div> ';
        }
        return html;
    };

    let _callUnitMain = () => {
        return new Promise((resolve, reject) => {
            var GroupNameVal = $("#IndustrialGroupSelect").val();
            var selectedOption_IGS = $("#IndustrialGroupSelect").find("option:selected");
            var GroupCheckID = selectedOption_IGS.attr("id");
            var GroupCheckVal = "";

            if (GroupCheckID !== "NotSelectGroup") {
                GroupCheckVal = GroupCheckID;
            } else {
                GroupCheckVal = "AllGroup";
            };
            var selectedOption_ProvineSelect = $("#CitySelect").find("option:selected");
            var ProviceCheckVal = selectedOption_ProvineSelect.attr("id");
            var ProviceNameVal = selectedOption_ProvineSelect.text();

            if (ProviceCheckVal !== "NotSelectProvine") {
                document.getElementById("QueryLaoder").style.display = "block";
                $.ajax({
                    type: "POST",
                    url: '/AdminPanel/IUnit_CollectionQuery/',
                    data: {
                        ProviceCheck: ProviceCheckVal,
                        GroupCheck: GroupCheckVal,
                        ProviceName: ProviceNameVal,
                        GroupName: GroupNameVal
                    },
                    dataType: "json",
                    crossDomain: true,
                    success: function (response) {
                        document.getElementById("QueryLaoder").style.display = "none";
                        $('#InsertUnit').pagination({
                            dataSource: response,
                            pageSize: 15,
                            callback: function (data, pagination) {
                                var html = _simpleTemplating(data);
                                $('#data-container').html(html);
                            }
                        });
                        document.getElementById("LoadDataUnite").style.display = "block";
                        resolve(response);
                    },
                    error: function (req, status, error) {
                        document.getElementById("QueryLaoder").style.display = "none";
                        reject(new Error(_ceartMessage('error', 'کاربر گرامی', 'خطا در دریافت اطلاعات واحدهای صنفی')));
                    }
                });
            } else {
                _ceartMessage("warning", "کاربر گرامی", "لطفا یک استان را انتخاب نمایید...");
                reject(new Error(_ceartMessage('error', 'کاربر گرامی', 'لطفا یک استان را انتخاب نمایید')));
            };
        });
    };

    let _creatChartMain = (_data) => {
        return new Promise((resolve, reject) => {
            document.getElementById("chartProvonceUnite").innerHTML = "";
            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create("chartProvonceUnite", am4charts.XYChart);

            // Add data
            chart.data = _data;

            // Create axes
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "city";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;
            categoryAxis.renderer.labels.template.horizontalCenter = "right";
            categoryAxis.renderer.labels.template.verticalCenter = "middle";
            categoryAxis.renderer.labels.template.rotation = 270;
            categoryAxis.tooltip.disabled = true;
            categoryAxis.renderer.minHeight = 110;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.minWidth = 50;

            // Create series
            var series = chart.series.push(new am4charts.ColumnSeries());
            series.sequencedInterpolation = true;
            series.dataFields.valueY = "count";
            series.dataFields.categoryX = "city";
            series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
            series.columns.template.strokeWidth = 0;

            series.tooltip.pointerOrientation = "vertical";

            series.columns.template.column.cornerRadiusTopLeft = 10;
            series.columns.template.column.cornerRadiusTopRight = 10;
            series.columns.template.column.fillOpacity = 0.8;

            // on hover, make corner radiuses bigger
            var hoverState = series.columns.template.column.states.create("hover");
            hoverState.properties.cornerRadiusTopLeft = 0;
            hoverState.properties.cornerRadiusTopRight = 0;
            hoverState.properties.fillOpacity = 1;

            series.columns.template.adapter.add("fill", function (fill, target) {
                return chart.colors.getIndex(target.dataItem.index);
            });
            chart.cursor = new am4charts.XYCursor();

            document.getElementById("loaderChart").style.display = "none";
            var myDiv = document.getElementById("Message");
            var display = window.getComputedStyle(myDiv).getPropertyValue("display");
            if (display === "none") {
                document.getElementById("elmChart").style.display = "block";
            } else {
                document.getElementById("Message").style.display = "none";
                document.getElementById("elmChart").style.display = "block";
            };
            resolve();
        });
    };

    let _loadChartMain = (_province) => {
        return new Promise((resolve, reject) => {
            var ProviceNameVal = $('#ProvineSelect').val();
            var City = ProvinceAndCityName.AllCity;
            let AllCity = [];
            for (var i = 0; i < City.length; i++) {
                let province = City[i].provinceName;
                if (province === ProviceNameVal) {
                    let cities = City[i].cities;
                    for (var p = 0; p < cities.length; p++) {
                        AllCity.push(cities[p]);
                    }
                };
            };

            $.ajax({
                type: "POST",
                url: '/AdminPanel/IUnit_ProvinceChart/',
                data: {
                    ProviceName: ProviceNameVal
                },
                dataType: "json",
                crossDomain: true,
                success: function (response) {
                    if (response.length) {
                        const unitCountByCity = [];
                        for (let i = 0; i < AllCity.length; i++) {
                            let count = 0;
                            for (let j = 0; j < response.length; j++) {
                                if (response[j].city.trim() === AllCity[i]) {
                                    count++;
                                }
                            }
                            unitCountByCity.push({
                                "city": AllCity[i],
                                "count": count
                            });
                        };
                        _creatChartMain(unitCountByCity);
                        resolve();
                    } else {
                        var MessageDiv = document.getElementById("loaderChart");
                        var DisplayMessageDiv = window.getComputedStyle(MessageDiv).getPropertyValue("display");
                        if (DisplayMessageDiv === "none") {
                            document.getElementById("elmChart").style.display = "none";
                            document.getElementById("Message").style.display = "block";
                        } else {
                            document.getElementById("loaderChart").style.display = "none";
                            document.getElementById("Message").style.display = "block";
                        };
                        reject(_ceartMessage('error', 'کاربر گرامی', 'خطا در ساخت گزینه‌های المان select'));
                    }
                },
                error: function (req, status, error) {
                    document.getElementById("QueryLaoder").style.display = "none";
                    reject(new Error(_ceartMessage('error', 'کاربر گرامی', error)));
                }
            });
        });
    };

    let _loadUnitNeetToFix = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: '/AdminPanel/IUnit_NeedToFix/',
                dataType: "json",
                crossDomain: true,
                success: function (response) {
                    $('#InsertUnit').pagination({
                        dataSource: response,
                        pageSize: 6,
                        callback: function (data, pagination) {
                            var html = _uniteMainTemplating(data);
                            $('#data-container').html(html);
                        }
                    });
                    document.getElementById("loaderUniteFixME").style.display = "none";
                    document.getElementById("UnitFixMe").style.display = "block";
                    resolve();
                },
                error: function (req, status, error) {
                    document.getElementById("QueryLaoder").style.display = "none";
                    reject(new Error(_ceartMessage('error', 'کاربر گرامی', error)));
                }
            });
        });
    };

    let _iUnitDetails = (targetid) => {
        $.ajax({
            type: "POST",
            url: '/AdminPanel/IUnit_Details/',
            data: {
                id: targetid               
            },
            dataType: "json",
            success: function (response) {
                console.log(response);                
                let ElmDetails = [];
                ElmDetails.push('<div class="card-header text-right primary-color"><h5 class="text-white">جزئیات</h5><i onclick="CloseModal()" class="fa fa-times text-x7 text-white text-left" aria-hidden="true" style="float: left;cursor: pointer;"></i></div>');
                ElmDetails.push('<div class="card-block grey lighten-4" style="background-image: url(/Adminpanel/images/detalis.png);background-size: 30%;background-repeat: no-repeat">');
                ElmDetails.push('<div class="row">');
                ElmDetails.push('<div class="col-8 text-right py-1 border-bottom">');
                ElmDetails.push('<span class="text-c-red">نام:</span>');
                ElmDetails.push('<span>');
                ElmDetails.push(response.unitName);
                ElmDetails.push('</span></div>');    
                
                ElmDetails.push('<div class="col-8 text-right py-1 border-bottom">');
                ElmDetails.push('<span class="text-c-red">استان:</span>');
                ElmDetails.push('<span>');
                ElmDetails.push(response.province);
                ElmDetails.push('</span></div>');

                ElmDetails.push('<div class="col-8 text-right py-1 border-bottom">');
                ElmDetails.push('<span class="text-c-red">شهر:</span>');
                ElmDetails.push('<span>');
                ElmDetails.push(response.city);
                ElmDetails.push('</span></div>');

                ElmDetails.push('<div class="col-8 text-right py-1 border-bottom">');
                ElmDetails.push('<span class="text-c-red">تلفن:</span>');
                ElmDetails.push('<span>');
                ElmDetails.push(response.phone);
                ElmDetails.push('</span></div>');

                ElmDetails.push('<div class="col-8 text-right py-1 border-bottom">');
                ElmDetails.push('<span class="text-c-red">مدیرعامل:</span>');
                ElmDetails.push('<span>');
                ElmDetails.push(response.managingName);
                ElmDetails.push('</span></div>');

                ElmDetails.push('<div class="col-8 text-right py-1 border-bottom">');
                ElmDetails.push('<span class="text-c-red">دفتر مرکزی:</span>');
                ElmDetails.push('<span>');
                ElmDetails.push(response.centralOffice);
                ElmDetails.push('</span></div>');

                ElmDetails.push('<div class="col-8 text-right py-1 border-bottom">');
                ElmDetails.push('<span class="text-c-red">گروه فعالیت 4 رقمی:</span>');
                ElmDetails.push('<span>');
                ElmDetails.push(response.digitActivityGroup4);
                ElmDetails.push('</span></div>');

                ElmDetails.push('<div class="col-8 text-right py-1 border-bottom">');
                ElmDetails.push('<span class="text-c-red">گروه فعالیت 2 رقمی:</span>');
                ElmDetails.push('<span>');
                ElmDetails.push(response.industryGroup.industryGroupTitle);
                ElmDetails.push('</span></div>');

                ElmDetails.push('<div class="col-8 text-right py-1">');
                ElmDetails.push('<span class="text-c-red">منبع داده:</span>');
                ElmDetails.push('<span>');
                ElmDetails.push(response.sourceData);
                ElmDetails.push('</span></div>');               
                ElmDetails.push('</div></div>');   
                document.getElementById("IUniteDetails_block").innerHTML = ElmDetails.join('');
                document.getElementById("IUniteDetails").style.left = "30px";
            },
            error: function (req, status, error) {
                document.getElementById("QueryLaoder").style.display = "none";
            }
        });
    }

    // Exposing Public Methods....
    return {
        //tools & control map....................
        CeartMessage: _ceartMessage,
        LoadMap: _loadMap,
        FlyToMap: _flyToMap,
        DragDropMarker: _dragDropMarker,
        CreatTagSelectProvince: _creatTagSelectProvince,
        OnChangeProvin: _onChangeProvin,
        CallUnitMain: _callUnitMain,
        LoadChartMain: _loadChartMain,
        LoadUnitNeetToFix: _loadUnitNeetToFix,
        IUnitDetails: _iUnitDetails
    };

})(window.jQuery);
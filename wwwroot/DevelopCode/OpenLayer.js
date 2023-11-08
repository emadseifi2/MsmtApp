//#region ایجاد مارکر ......................................................................
//#endregion

//#region ایجاد مارکر ......................................................................
const marker = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([51.38897, 35.6892])),
    name: 'مارکر'
});

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
//#endregion

//#region ایجاد آیکون برای مارکر ......................................................................

// 
const iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'http://localhost:5299/OpenLayer/OL_Images/MarkerA.png',
        scale: 0.9 // مقیاس آیکون
    })
});

// ایجاد فیچر برای مارکر با آیکون
const marker = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([51.38897, 35.6892])),
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
});
//#endregion

//#region _addNewLayer ......................................................................
let _addNewLayer = {
    LayerOnePoint: function (_Lon, _Lat, _colorFill, _colorStroke, _widthStroke, _radius, _layerName) {
        return function () {
            _removeLayer._removeMultiLayer(AllLayerOnePoint);

            // مختصات دو نقطه به صورت [طول، عرض]
            const pointCoords = [_Lon, _Lat];
            const sourceProjection = 'EPSG:4326';
            const targetProjection = 'EPSG:3857';
            const transformedCoordinates = ol.proj.transform(pointCoords, sourceProjection, targetProjection);

            const pointFeature = new Feature({
                geometry: new Point(transformedCoordinates)
            });

            const vectorSource = new VectorSource({
                features: [pointFeature]
            });

            const vectorLayer = new VectorLayer({
                source: vectorSource,
                style: new Style({
                    image: new CircleStyle({
                        fill: new Fill({
                            color: _colorFill
                        }),
                        stroke: new Stroke({
                            color: _colorStroke,
                            width: _widthStroke
                        }),
                        radius: _radius
                    })
                })
            });
            vectorLayer.set('name', _layerName); // تنظیم نام برای لایه
            map.addLayer(vectorLayer);
            AllLayer.push(_layerName);
            AllLayerOnePoint.push(_layerName);
        };
    },
    LayerFCPointColor: function (points, _colorStroke, _widthStroke, _radius, _fillColor, _layerName) {
        return function () {
            _removeLayer._removeMultiLayer(AllLayerFCPointColor);

            var geojsonObject = turf.featureCollection(
                points.map(function (point) {
                    return turf.point(point.coordinates, { name: point.name });
                })
            );

            proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");
            var fromProjection = 'EPSG:4326';
            var toProjection = 'EPSG:3857';
            var transform = proj4(fromProjection, toProjection).forward;

            var style = new ol.style.Style({
                image: new ol.style.RegularShape({
                    fill: new ol.style.Fill({
                        color: _fillColor
                    }),
                    stroke: new ol.style.Stroke({
                        color: _colorStroke,
                        width: _widthStroke
                    }),
                    radius: _radius,
                    points: 50
                })
            });

            var vectorSource = new ol.source.Vector({
                features: new ol.format.GeoJSON().readFeatures(geojsonObject)
            });

            vectorSource.forEachFeature(function (feature) {
                feature.getGeometry().transform(fromProjection, toProjection);
                feature.setStyle(style);
            });

            var vectorLayer = new ol.layer.Vector({
                source: vectorSource
            });

            vectorLayer.set('name', _layerName);
            map.addLayer(vectorLayer);
            AllLayer.push(_layerName);
            AllLayerFCPointColor.push(_layerName);
        };
    },
    LayerFCPointIcone: function (points, _offsetYText, _layerName, _markerIcone) {
        return function () {
            console.log(points);
            _removeLayer._removeMultiLayer(AllLayerFCPointIcone);
            //var points = [
            //    { unitName: "نقطه 1", coordinates: [51.34702555201267, 35.746928060029084] },
            //    { unitName: "نقطه 2", coordinates: [51.47474162085464, 35.74581348197296] },
            //    { unitName: "نقطه 3", coordinates: [51.39989725793111, 35.69118004314743] }
            //];
            //var _markerIcone = 'markerA';
            //var _layerName = '_layerName';
            // ایجاد یک FeatureCollection با استفاده از تابع turf.featureCollection()
            var geojsonObject = turf.featureCollection(
                points.map(function (point) {
                    return turf.point(point.coordinates, { unitName: point.unitName });
                })
            );
            console.log(geojsonObject);
            proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");
            var fromProjection = 'EPSG:4326';
            var toProjection = 'EPSG:3857';
            var transform = proj4(fromProjection, toProjection).forward;
            var urlIcone = 'https://msmt.ir/OpenLayer/OL_Images/' + _markerIcone + '.png';

            var icon = new ol.style.Icon({
                src: urlIcone,
                scale: 0.7
            });

            var style = new ol.style.Style({
                image: icon,
                text: new ol.style.Text({
                    font: '12px IRANSans',
                    fill: new ol.style.Fill({
                        color: '#000'
                    }),
                    offsetY: 15, // فاصله 10 پیکسلی از بالای آیکون
                    text: '', // مقدار اولیه
                    textAlign: 'center',
                    textBaseline: 'top' // تنظیم مقدار textBaseline به top
                })
            });

            var vectorSource = new ol.source.Vector({
                features: new ol.format.GeoJSON().readFeatures(geojsonObject)
            });

            vectorSource.forEachFeature(function (feature) {
                console.log(feature.get('unitName'));
                feature.getGeometry().transform(fromProjection, toProjection); // تبدیل مختصات
                style.getText().setText(feature.get('unitName')); // تنظیم مقدار Text
                feature.setStyle(style); // تنظیم استایل برای feature
            });

            var vectorLayer = new ol.layer.Vector({
                source: vectorSource
            });

            vectorLayer.set('name', _layerName);
            map.addLayer(vectorLayer);
            AllLayer.push(_layerName);
            AllLayerFCPointIcone.push(_layerName);
        };
    },
    LayerOneLineString: function (_lonPointA, _latPointA, _lonPointB, _latPointB, _titleLine, _colorStroke, _widthStroke, _layerName) {
        return function () {
            if (AllLayerOneLineString.length) {
                for (var i = 0; i < AllLayerOneLineString.length; i++) {
                    let layerToRemove;
                    map.getLayers().forEach(layer => {
                        if (layer.get('name') === AllLayerOneLineString[i]) {
                            layerToRemove = layer;
                        }
                    });
                    if (layerToRemove) {
                        map.removeLayer(layerToRemove);
                    }
                };
            };

            const lineCoords = [[_lonPointA, _latPointA], [_lonPointB, _latPointB]];

            var sourceProjection = 'EPSG:4326';
            var targetProjection = 'EPSG:3857';
            // Transform coordinates to the target projection
            var transformedCoordinates = lineCoords.map(function (coord) {
                return ol.proj.transform(coord, sourceProjection, targetProjection);
            });
            // ساختن ویژگی خط
            const lineFeature = new Feature({
                geometry: new LineString(transformedCoordinates),
                name: _titleLine
            });

            // تابع style برای تعیین سبک feature
            const styleFunction = function (feature) {
                return new Style({
                    stroke: new Stroke({
                        color: _colorStroke,
                        width: _widthStroke
                    })
                });
            };

            const vectorLayer = new VectorLayer({
                source: vectorSource,
                style: styleFunction
            });
            vectorLayer.set('name', _layerName); // تنظیم نام برای لایه

            // اضافه کردن ویژگی خط به نقشه با استفاده از map.addLayer
            map.addLayer(vectorLayer);
        };
    },
    LayerFCLineString: function (_arrylines, _titleLine, _colorStroke, _widthStroke, _layerName) {
        return function () {
            // مجموعه ای از خطوط با مختصات متفاوت
            //const Arrylines = [
            //    new LineString([[51.4215, 35.732], [51.423, 35.731]]),
            //    new LineString([[51.423, 35.731], [51.4245, 35.733]]),
            //];

            var sourceProjection = 'EPSG:4326';
            var targetProjection = 'EPSG:3857';

            // Transform coordinates to the target projection
            var transformedCoordinates = _arrylines.map(function (coord) {
                return ol.proj.transform(coord, sourceProjection, targetProjection);
            });

            // ساختن ویژگی MultiLineString با استفاده از آرایه خطوط
            const multiLineStringFeature = new Feature({
                geometry: new MultiLineString(transformedCoordinates),
                name: _titleLine
            });

            // تابع style برای تعیین سبک feature
            const styleFunction = function (feature) {
                return new Style({
                    stroke: new Stroke({
                        color: _colorStroke,
                        width: _widthStroke
                    })
                });
            };

            const vectorLayer = new VectorLayer({
                source: new VectorSource({
                    features: [multiLineStringFeature]
                }),
                style: styleFunction
            });
            vectorLayer.set('name', _layerName); // تنظیم نام برای لایه
            // اضافه کردن ویژگی خط به نقشه با استفاده از map.addLayer
            map.addLayer(vectorLayer);
        };
    },
    LayerOnePolygon: function (_coordinates, _colorStroke, _widthStroke, _colorFill, _layerName) {
        return function () {
            _removeLayer._removeMultiLayer(AllLayerOnePolygon);

            var sourceProjection = 'EPSG:4326';
            var targetProjection = 'EPSG:3857';
            // Transform coordinates to the target projection
            var transformedCoordinates = _coordinates.map(function (coord) {
                return ol.proj.transform(coord, sourceProjection, targetProjection);
            });

            var polygon = new ol.geom.Polygon([transformedCoordinates]);

            var feature = new ol.Feature({
                geometry: polygon
            });

            let Layer = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: [feature]
                }),
                style: new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: _colorStroke,
                        width: _widthStroke
                    }),
                    fill: new ol.style.Fill({
                        color: _colorFill
                    })
                })
            });
            Layer.set('name', _layerName); // تنظیم نام برای لایه
            map.addLayer(Layer);
            AllLayer.push(_layerName);
            AllLayerOnePolygon.push(_layerName);
        };
    },
    LayerFCPolygon: function (_points, _widthStroke, _layerName) {
        return function () {
            _removeLayer._removeMultiLayer(AllLayerFCPolygon);

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
                var sourceProjection = 'EPSG:4326';
                var targetProjection = 'EPSG:3857';
                var CoordPoint = _points[i].coordinates;
                // Transform coordinates to the target projection
                var transformedCoordinates = CoordPoint.map(function (coord) {
                    return ol.proj.transform(coord, sourceProjection, targetProjection);
                });
                var polygon = new ol.geom.Polygon([transformedCoordinates]);

                var feature = new ol.Feature({
                    geometry: polygon,
                    color: _points[i].color // اضافه کردن مقدار رنگ به ویژگی‌های جغرافیایی Feature
                }); // ساخت یک Feature با فرمت GeoJSON برای پلیگان با استفاده از ol.Feature

                Allpolygons.push(feature); // Feature جدید را به آرایه اضافه می‌کنیم
            }
            var featureCollection = new ol.format.GeoJSON().writeFeaturesObject(Allpolygons);

            // ایجاد یک VectorSource برای نگهداری ویژگی‌های جغرافیایی
            var vectorSource = new ol.source.Vector({
                features: (new ol.format.GeoJSON()).readFeatures(featureCollection)
            });

            // ایجاد یک VectorLayer و اضافه کردن VectorSource به آن
            var vectorLayer = new ol.layer.Vector({
                source: vectorSource,
                style: function (feature) {
                    //var colorFill = feature.get('color'); // کاهش شفافیت (50% یا 0.5) از مقدار رنگ
                    var Fillcolor = tinycolor(feature.get('color'));
                    var ColorStroke = tinycolor(feature.get('color'));
                    let newColor = Fillcolor.setAlpha(.1);
                    return new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: ColorStroke,
                            width: _widthStroke
                        }),
                        fill: new ol.style.Fill({
                            color: newColor // استفاده از مقدار رنگ با شفافیت کاهش یافته
                        })
                    });
                }
            });

            vectorLayer.set('name', _layerName); // تنظیم نام برای لایه
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
                if (type === 'Point') {
                    return new Style({
                        image: new CircleStyle({
                            fill: new Fill({
                                color: 'blue'
                            }),
                            stroke: new Stroke({
                                color: 'white',
                                width: 2
                            }),
                            radius: 10
                        })
                    });
                } else if (type === 'LineString') {
                    return new Style({
                        stroke: new Stroke({
                            color: 'green',
                            width: 2
                        })
                    });
                } else if (type === 'Polygon') {
                    return new Style({
                        fill: new Fill({
                            color: 'orange'
                        }),
                        stroke: new Stroke({
                            color: 'red',
                            width: 2
                        })
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
                style: styleFunction
            });
            vectorLayer.set('name', _layerName); // تنظیم نام برای لایه

            // اضافه کردن VectorLayer به نقشه
            map.addLayer(vectorLayer);
        };
    }
};

//#endregion

//#region popup ......................................................................
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


const element = document.getElementById('popup');
const popup = new Overlay({
    element: element,
    positioning: 'bottom-center',
    stopEvent: false,
});
map.addOverlay(popup);

const coordinate = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
popup.setPosition([53.26853984596202, 36.83690136476342]);
$(element).popover({
    placement: 'top',
    html: true,
    content: 'unitName',
});
$(element).popover('show');

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

// ایجاد یک Popup جدید
map.on('click', function (evt) {
    const coordinate = evt.coordinate;
    const element = document.getElementById('popup');
    const popup = new Overlay({
        element: element,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -10]
    });
    map.addOverlay(popup);
    popup.setPosition(coordinate);
    $(element).popover({
        placement: 'top',
        html: true,
        content: 'unitName'
    });
    $(element).popover('show');
});

//#endregion

//#region popup 2 ......................................................................
var element = document.getElementById('popupNew');
var popup = new ol.Overlay({
    element: element,
    positioning: 'bottom-center',
    stopEvent: false,
    offset: [0, -20]
});
map.addOverlay(popup);

// display popup on click
map.on('click', function (evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature) {
            return feature;
        });
    if (feature) {
        var _unitName = feature.get('unitName');
        var coordinates = feature.getGeometry().getCoordinates();
        popup.setPosition(coordinates);
        $(element).popover({
            'placement': 'top',
            'html': true,
            'content': _unitName
        });
        $(element).popover('show');
    } else {
        $(element).popover('destroy');
    }
});
//change mouse cursor when over marker
map.on('pointermove', function (e) {
    if (e.dragging) {
        $(element).popover('destroy');
        return;
    }
    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    map.getViewport().style.cursor = hit ? 'pointer' : ''; // Change this line
});
//#endregion

//#region LayerFCPointIcone  ......................................................................

console.log(points);
_removeLayer._removeMultiLayer(AllLayerFCPointIcone);
//var points = [
//    { unitName: "نقطه 1", coordinates: [51.34702555201267, 35.746928060029084] },
//    { unitName: "نقطه 2", coordinates: [51.47474162085464, 35.74581348197296] },
//    { unitName: "نقطه 3", coordinates: [51.39989725793111, 35.69118004314743] }
//];
//var _markerIcone = 'markerA';
//var _layerName = '_layerName';
// ایجاد یک FeatureCollection با استفاده از تابع turf.featureCollection()
var geojsonObject = turf.featureCollection(
    points.map(function (point) {
        return turf.point(point.coordinates, { unitName: point.unitName });
    })
);

proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");
var fromProjection = 'EPSG:4326';
var toProjection = 'EPSG:3857';
var transform = proj4(fromProjection, toProjection).forward;
var urlIcone = 'https://msmt.ir/OpenLayer/OL_Images/' + _markerIcone + '.png';

var icon = new ol.style.Icon({
    src: urlIcone,
    scale: 0.7
});

var vectorSource = new ol.source.Vector({
    features: new ol.format.GeoJSON().readFeatures(geojsonObject)
});

vectorSource.forEachFeature(function (feature) {
    var uniqueName = feature.get('unitName');
    var uniqueStyle = new ol.style.Style({
        image: icon,
        text: new ol.style.Text({
            font: '12px IRANSans',
            fill: new ol.style.Fill({
                color: '#000'
            }),
            offsetY: 15,
            //text: uniqueName,
            textAlign: 'center',
            textBaseline: 'top'
        })
    });
    feature.getGeometry().transform(fromProjection, toProjection);
    feature.setStyle(uniqueStyle);
});

var vectorLayer = new ol.layer.Vector({
    source: vectorSource
});

vectorLayer.set('name', _layerName);
map.addLayer(vectorLayer);
AllLayer.push(_layerName);
AllLayerFCPointIcone.push(_layerName);

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

/*** Create an overlay to anchor the popup to the map.*/
var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});

/*** Add a click handler to hide the popup. Don't follow the href.*/
closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};

map.addOverlay(overlay);

map.on('singleclick', function (evt) {
    var coordinate = evt.coordinate;
    var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
        coordinate, 'EPSG:3857', 'EPSG:4326'));

    content.innerHTML = '<p>You clicked here:</p><code>' + hdms +
        '</code>';
    overlay.setPosition(coordinate);
});   
//#endregion

//#region full popup ......................................................................
map.on('singleclick', function (evt) {
    if (map.hasFeatureAtPixel(evt.pixel) === true) {
        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function (feature) {
                return feature;
            });
        if (feature) {
            let PopUpContent = [];
            var coordinate = evt.coordinate;
            PopUpContent.push('<div class="card"><div class="card-header p-1"><h5 class="text-x6 text-center text-Bold">');
            PopUpContent.push(feature.get('unitName'));
            PopUpContent.push('</h5></div>');
            PopUpContent.push('<div class="card-block table-border-style"><div class="table-responsive table-sm"><table class="table text-x6 text-Medium mb-0"><tbody>');
            PopUpContent.push('<tr><td class="text-center text-Medium text-x6">گروه صنعتی : </td>');
            PopUpContent.push('<td class="text-center text-Medium text-x6">');
            PopUpContent.push(feature.get('industryGroupTitle'));
            PopUpContent.push('</td></tr>');
            PopUpContent.push('<tr><td class="text-center text-Medium text-x6">مدیر عامل : </td>');
            PopUpContent.push('<td class="text-center text-Medium text-x6">');
            PopUpContent.push(feature.get('managingName'));
            PopUpContent.push('</td></tr>');
            PopUpContent.push('<tr><td class="text-center text-Medium text-x6">تلفن : </td>');
            PopUpContent.push('<td class="text-center text-Medium text-x6">');
            PopUpContent.push(feature.get('phone'));
            PopUpContent.push('</td></tr>');
            PopUpContent.push('<tr><td class="text-center text-Medium text-x6">استان : </td>');
            PopUpContent.push('<td class="text-center text-Medium text-x6">');
            PopUpContent.push(feature.get('province'));
            PopUpContent.push('</td></tr>');
            PopUpContent.push('<tr><td class="text-center text-Medium text-x6">شهر : </td>');
            PopUpContent.push('<td class="text-center text-Medium text-x6">');
            PopUpContent.push(feature.get('city'));
            PopUpContent.push('</td></tr>');
            content.innerHTML = PopUpContent.join('');
            overlay.setPosition(coordinate);
        }
    } else {
        overlay.setPosition(undefined);
        closer.blur();
    }
});


//#endregion

var OL = (function ($) {
    "use strict";

    let _myFunction = (callback) => {
        // فراخوانی ajax
        $.ajax({
            url: "url",
            success: function (response) {
                // انجام کارهای دیگر

                // فراخوانی callback و ارسال مقدار برگشتی
                callback(response);
            }
        });
    }

    // Exposing Public Methods....
    return {
        //CeartMessage on map....................
        MyFunction: _myFunction
    };
})(window.jQuery);

$("#btn").on("click", function () {
    OL.MyFunction(function (result) {
        console.log(result);
    });
});





    












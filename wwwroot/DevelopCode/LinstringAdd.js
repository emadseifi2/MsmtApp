let amol = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "id": "way/170571977",
            "properties": {
                "highway": "secondary",
                "name": "بلوار بنفشه",
                "oneway": "yes",
                "id": "way/170571977"
            },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [
                        52.3743044,
                        36.4594728
                    ],
                    [
                        52.3743876,
                        36.4595074
                    ],
                    [
                        52.3744615,
                        36.4595585
                    ],
                    [
                        52.374499,
                        36.4595962
                    ],
                    [
                        52.3748934,
                        36.4599922
                    ],
                    [
                        52.3749228,
                        36.4600217
                    ],
                    [
                        52.375287,
                        36.46041
                    ],
                    [
                        52.37567,
                        36.4608051
                    ],
                    [
                        52.3758726,
                        36.461014
                    ],
                    [
                        52.376018,
                        36.4611658
                    ],
                    [
                        52.3762312,
                        36.4613885
                    ],
                    [
                        52.3765116,
                        36.4616813
                    ],
                    [
                        52.3765409,
                        36.4617063
                    ],
                    [
                        52.3765933,
                        36.461751
                    ],
                    [
                        52.3767072,
                        36.4617789
                    ],
                    [
                        52.3768088,
                        36.4617928
                    ],
                    [
                        52.3770464,
                        36.4617866
                    ],
                    [
                        52.3772043,
                        36.4617806
                    ]
                ]
            }
        }
    ]
}

  // Define a new Vector layer
var lineLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: amol.features.map(function (line) {
        return new ol.Feature({
          geometry: new ol.geom.LineString(
            line.geometry.coordinates.map(function (coord) {
              return ol.proj.fromLonLat(coord);
            })
          ),
        });
      }),
    }),
  });
  
  // Add the new Vector layer to the map
  map.addLayer(lineLayer);



  // Define a new Vector layer
var lineLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: amol.features.map(function (line) {
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
        color: "red",
        width: 2,
      }),
      fill: new ol.style.Fill({
        color: "rgba(255, 0, 0, 0.1)",
      }),
    }),
  });
  
  // Add the new Vector layer to the map
  map.addLayer(lineLayer);
  
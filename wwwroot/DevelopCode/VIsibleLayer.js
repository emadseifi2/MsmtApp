// Hide the layer
myLayer.setVisible(false);

// Show the layer
vectorLayer.setVisible(true);

// Check the visibility of the layer
if (vectorLayer.getVisible()) {
  // If the layer is visible, hide it
  vectorLayer.setVisible(false);
} else {
  // If the layer is hidden, show it
  vectorLayer.setVisible(true);
}

// Get the visibility of the layer by name
var layerName = "layerName";
var layer = map
  .getLayers()
  .getArray()
  .find(function (l) {
    return l.get("name") === layerName;
  });

// Check the visibility of the layer
if (layer.getVisible()) {
  // If the layer is visible, hide it
  layer.setVisible(false);
} else {
  // If the layer is hidden, show it
  layer.setVisible(true);
}

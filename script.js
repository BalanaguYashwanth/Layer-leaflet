document.addEventListener("DOMContentLoaded", function() {
  var map = L.map('map').setView([18.86136065249584, 73.937738742226074], 10);

  const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);

  const tileLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 19,
    subdomains:['mt1', 'mt2', 'mt3']
  }).addTo(map);

  var geoLayer;

  fetch('geoData.json')
    .then(response => response.json())
    .then(data => {
      geoLayer = L.geoJSON(data).addTo(map);

      var layers = {
        "Base Map": baseLayer,
       
      };
      var overlayLayers = {
        "Geo Layer": geoLayer,
        "Tile Layer": tileLayer,
      };
      L.control.layers(layers, overlayLayers).addTo(map);
      
    });

  var tileOpacitySlider = document.getElementById('tileOpacitySlider');
  var geoOpacitySlider = document.getElementById('geoOpacitySlider');

  tileOpacitySlider.addEventListener('input', function() {
    tileLayer.setOpacity(this.value);
  });

  geoOpacitySlider.addEventListener('input', function() {
    geoLayer.setStyle({ opacity: this.value });
  });
});

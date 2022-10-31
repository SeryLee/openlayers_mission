$(document).ready(function () {
    loadMap9();
});
let map9 = getDefaultMap('map9', getOSMLayer(), get3857View());

function loadMap9() {
    var circle = new ol.geom.Circle([14248656.389982047, 4331624.063626864], 120000);

    var circleSourceLayer = new ol.source.Vector({
        features: [new ol.Feature(circle)]
    });

    var circleStyleLayer = new ol.layer.Vector({
        source: circleSourceLayer,
        style: new ol.style.Style({
            fill: new ol.style.Fill({color: 'rgba( 255, 133, 133 ,0.5)'}),
            stroke: new ol.style.Stroke({color: 'blue', width: 2}),
            text: new ol.style.Text({
                text: "성공~~",
                textAlign: 'center',
                font: '50px roboto,sans-serif'
            })
        })
    });

    map9.addLayer(circleStyleLayer);
}
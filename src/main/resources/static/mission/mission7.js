$(document).ready(function () {
    loadMap7();
});
let map7 = getDefaultMap('map7', getOSMLayer(), get3857View());

function loadMap7() {

    map7.on('click', function (evt) {
        var x = evt.coordinate[0];
        var y = evt.coordinate[1];

        //point Geometry 객체 생성
        var point = new ol.geom.Point([x, y]);

        var pointSourceLayer = new ol.source.Vector({
            features: [new ol.Feature(point)]
        });

        //레이어 생성 스타일
        var pointStyle = new ol.layer.Vector({
            source: pointSourceLayer,
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 5,
                    fill: new ol.style.Fill({color: 'red'})
                })
            })
        });
        this.addLayer(pointStyle);
    });
}
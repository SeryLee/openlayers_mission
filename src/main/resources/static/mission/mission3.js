$(document).ready(function () {
    loadMap3();
});

function loadMap3() {
    //ol의 Map 생성
    let map3 = getDefaultMap('map3', getOSMLayer(), get3857View());

    let mousePosition = new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(4),
        projection: 'EPSG:4326',
        className: 'mouse-position',
        target: document.getElementById('coords'),
        undefinedHTML: '&nbsp;'
    });
    map3.addControl(mousePosition);
}
$(document).ready(function () {
    loadMap11();
});
let map11 = getDefaultMap('map11', getOSMLayer(), get3857View());

function loadMap11() {

    const getBaseKorMapByWFS = () => {
        const layerSource = new ol.source.Vector({
            url: 'http://localhost:8083/geoserver/test/ows?' +
                'service=WFS&version=1.0.0&request=GetFeature' +
                '&typeName=test%3Akor_map_sort_by_sido' +
                '&maxFeatures=50&outputFormat=application%2Fjson',
            format: new ol.format.GeoJSON(),
            serverType: 'geoserver',
            projection: 'EPSG:4326'
        });

        return new ol.layer.Vector({
            source: layerSource,
            style: new ol.style.Style({
                fill: new ol.style.Fill({color: 'rgba(1,1,1,0)'}),
                stroke: new ol.style.Stroke({color: 'blue', width: 0.2}),
            }),
            layerId: 'baseMap1',
            title: 'sido',
            visible: true,
            zIndex: 100
        });
    }

    let testMap = getBaseKorMapByWFS();
    map11.addLayer(testMap);
}
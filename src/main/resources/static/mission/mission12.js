$(document).ready(function () {
    map12;
});
let map12 = getDefaultMap('map12', getOSMLayer(), get4326View());
const wfsEvent = () => {
    $.ajax({
        url: 'http://localhost:8083/geoserver/test/ows?' +
            'service=WFS&version=1.0.0&request=GetFeature&typeName=test%3Akor_map_sort_by_sido&maxFeatures=50&outputFormat=application%2Fjson',
        method: 'get',
        success: function (data) {
            console.log(data);
            addPointLayerToMap(data);
        }
    })
}

const FINDwfs = () => {
    let allLayer = map12.getAllLayers();
    for (const allLayerElement of allLayer) {
        console.log(allLayerElement);
    }
};

const addPointLayerToMap = (data) => {
    const multiPolygons = createMultiPolygon(data);
    const vectorLayer = putPolygonLayer(multiPolygons);
    addLayerToMap(vectorLayer, 'pointVectorLayer');
}

const createMultiPolygon = (data) => {
    let polygons = [];
    data.features.forEach(each => {
        const multiPolygon = new ol.Feature({
            geometry: new ol.geom.MultiPolygon(each.geometry.coordinates),
            jiyeok: "강원도"
        });

        polygons.push(multiPolygon);
    })
    return polygons;
}

const putPolygonLayer = (multiPolygons) => {
    return new ol.layer.Vector({
        source: new ol.source.Vector({
            features: multiPolygons
        }),
        layerId: 'MultiPolygon',
        zIndex: 999
    });
}

const addLayerToMap = (layer, layerId) => {
    layer.set('name', layerId);
    map12.addLayer(layer);
}
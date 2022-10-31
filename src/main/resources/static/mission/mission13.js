$(document).ready(function () {
    map13;
});
let map13 = getDefaultMap('map13', getOSMLayer(), get4326View());

const wfsEvent2 = () => {
    $.ajax({
        url: '/getGeoJSON',
        method: 'get',
        success: function (data) {
            //TODO : OBJECT cooridnates
            console.log(data);
            addPointLayerToMapByGeoJSON(data);
        },
    })
}

const FINDwfs2 = () => {
    let allLayer = map13.getAllLayers();
    for (const allLayerElement of allLayer) {
        console.log(allLayerElement);
    }
};

const addPointLayerToMapByGeoJSON = (data) => {
    const multiPolygons = createMultiPolygonByGeoJSON(data);
    const vectorLayer = putPolygonLayerByGeoJSON(multiPolygons);
    addLayerToMap13(vectorLayer, 'pointVectorLayer');
}

const createMultiPolygonByGeoJSON = (data) => {
    let polygons = [];

    // MultiPolygon 은 여러개의 Polygon을 한 리스트에 넣은 것!!
    // Polygon 은 하나의 Point 그룹!!
    console.log(data);
    data.forEach(each => {
        const multiPolygon = new ol.Feature({
            geometry: new ol.geom.MultiPolygon(each.coordinates),
            name: each.type
        });

        polygons.push(multiPolygon);
    })
    return polygons;
}

const putPolygonLayerByGeoJSON = (multiPolygons) => {
    return new ol.layer.Vector({
        source: new ol.source.Vector({
            features: multiPolygons
        }),
        layerId: 'MultiPolygon',
        zIndex: 999
    });
}

const addLayerToMap13 = (layer, layerId) => {
    layer.set('name', layerId);
    map13.addLayer(layer);
}
function getOSMLayer() {
    return new ol.layer.Tile({
        //소스는 OpenStreetMap
        source: new ol.source.OSM(),
        id: 'osm_standard',
    });
}

function get3857View() {
    return new ol.View({
        projection: 'EPSG:3857',
        center: [14248656.389982047, 4331624.063626864],
        zoom: 7
    });
}

function get4326View() {
    return new ol.View({
        projection: 'EPSG:4326',
        center: [127, 37],
        zoom: 7
    });
}

let target;
var map;

function getDefaultMap(target, layer, view) {
    map = new ol.Map({
        layers: [
            layer
        ],
        target: target,
        view: view
    });
    return map;
}

// OpenStreetMap, Vworld baseLayer 추가하기
function addBaseLayer(map) {
    //OpenStreetMap
    var osmHumanitarianLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            projection: 'EPSG:3857',
            url: 'http://tile-{a-c}.openstreetmap.fr/hot/{z}/{x}/{y}.png',
            crossOrigin: 'anonymous'
        }),
        id: 'osm_humanitarian',
        visible: false
    });
    map.addLayer(osmHumanitarianLayer);

    //vworld layers
    var vworldBaseLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            projection: 'EPSG:3857',
            url: 'https://xdworld.vworld.kr/2d/Base/service/{z}/{x}/{y}.png',
            crossOrigin: 'anonymous'
        }),
        id: 'vworld_base',
        visible: false
    });
    map.addLayer(vworldBaseLayer);
    var vworldSatelliteLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            projection: 'EPSG:3857',
            url: 'https://xdworld.vworld.kr/2d/Satellite/service/{z}/{x}/{y}.jpeg',
            crossOrigin: 'anonymous'
        }),
        id: 'vworld_satellite',
        visible: false
    });
    map.addLayer(vworldSatelliteLayer);
    var vworldHybridLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            projection: 'EPSG:3857',
            url: 'https://xdworld.vworld.kr/2d/Hybrid/service/{z}/{x}/{y}.png',
            crossOrigin: 'anonymous'
        }),
        id: 'vworld_hybrid',
        visible: false
    });
    map.addLayer(vworldHybridLayer);
    var vworldGrayLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            projection: 'EPSG:3857',
            url: 'https://xdworld.vworld.kr/2d/gray/service/{z}/{x}/{y}.png',
            crossOrigin: 'anonymous'
        }),
        id: 'vworld_gray',
        visible: false
    });
    map.addLayer(vworldGrayLayer);
    var vworldMidnightLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            projection: 'EPSG:3857',
            url: 'https://xdworld.vworld.kr/2d/midnight/service/{z}/{x}/{y}.png',
            crossOrigin: 'anonymous'
        }),
        id: 'vworld_midnight',
        visible: false
    });
    map.addLayer(vworldMidnightLayer);

}

function initBaseLayerSelect(map) {
    var html = '';
    $.each(map.getLayers().getArray(), function (i, v) {
        html += '<option value="' + v.get('id') + '">' + v.get('id') + '</option>';
    });
    $('#baseLayer').append(html);

    $('#baseLayer').change(function () {
        var layerId = $(this).val();
        $.each(map.getLayers().getArray(), function (i, v) {
            if (layerId == v.get('id')) {
                v.setVisible(true);
            } else {
                v.setVisible(false);
            }
        });
    });
    //초기값
    $('#baseLayer').val('vworld_base').trigger('change');
}

function addMarker(x, y, uuid) {
    var feature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([x, y])),
        name: uuid
    });
    var markerStyle = new ol.style.Style({
        image: new ol.style.Icon({
            opacity: 1,
            scale: 1.2,
            src: 'http://map.vworld.kr/images/ol3/marker_blue.png'
        }),
        zIndex: 100
    });
    var markerSourse = new ol.source.Vector({
        features: [feature]
    });
    var markerLayer = new ol.layer.Vector({
        source: markerSourse,
        style: markerStyle
    });
    return markerLayer;
}

// 시도 경계선
const getKorMap1 = () => {
    const layerSource = new ol.source.TileWMS({
        url: 'http://localhost:8083/geoserver/test/wms',
        params: {
            'FORMAT': 'image/png',
            'VERSION': '1.1.0',
            crossOrigin: 'anonymous',
            tiled: true,
            'LAYERS': 'test:kor_map_sort_by_sido',
        },
        serverType: 'geoserver',
        projection: 'EPSG:4326'
    });

    return new ol.layer.Tile({
        source: layerSource,
        layerId: 'baseMap1',
        title: 'baseMap1',
        visible: true,
        zIndex: 100
    });
}
// 시군구 경계선
const getKorMap2 = () => {
    const layerSource = new ol.source.TileWMS({
        url: 'http://localhost:8083/geoserver/test/wms',
        params: {
            'FORMAT': 'image/png',
            'VERSION': '1.1.0',
            crossOrigin: 'anonymous',
            tiled: true,
            'LAYERS': 'test:kor_map_sort_by_sigungu',
        },
        serverType: 'geoserver',
        projection: 'EPSG:4326'
    });

    return new ol.layer.Tile({
        source: layerSource,
        layerId: 'baseMap2',
        title: 'baseMap2',
        visible: true,
        zIndex: 100
    });
}
// 읍면동 경계선
const getKorMap3 = () => {
    const layerSource = new ol.source.TileWMS({
        url: 'http://localhost:8083/geoserver/test/wms',
        params: {
            'FORMAT': 'image/png',
            'VERSION': '1.1.0',
            crossOrigin: 'anonymous',
            tiled: true,
            'LAYERS': 'test:kor_map_sort_by_eupmyeondong',
        },
        serverType: 'geoserver',
        projection: 'EPSG:4326'
    });

    return new ol.layer.Tile({
        source: layerSource,
        layerId: 'baseMap3',
        title: 'baseMap3',
        visible: true,
        zIndex: 100
    });
}
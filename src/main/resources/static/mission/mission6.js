$(document).ready(function () {
    initBaseLayer();
});

let map6 = getDefaultMap('map6', getOSMLayer(), get3857View());

function initBaseLayer() {
    let baseKorMap1 = getBaseKorMap1();
    let baseKorMap2 = getBaseKorMap2();
    let baseKorMap3 = getBaseKorMap3();
    map6.addLayer(baseKorMap1);
    map6.addLayer(baseKorMap2)
    map6.addLayer(baseKorMap3)
}

// baseMap으로 시작하면서 현재 visible이 true인 레이어 반환
function isBaseMapLayer(layer) {
    let layerId = layer.get('layerId');
    let layerVisible = layer.get('visible');
    if (layerId === undefined || layerId === null) {
        return false;
    } else if (layerId.startsWith("baseMap") === true && layerVisible === true) {
        return layerId;
    } else {
        return false;
    }
}

function changeLayerByButton() {
    for (const layer of map6.getAllLayers()) {
        const isBaseMap = isBaseMapLayer(layer);
        if (isBaseMap !== false) {
            //TODO : visiible -> false
            map6.getLayers().getArray()
                .filter(layer => layer.get('layerId') === isBaseMap)
                .forEach(layer => layer.setVisible(false));
            //TODO : 다음 레이어 이름 구하기, visiible -> true
            var result = isBaseMap.slice(-1);
            result = Number(result);
            if (result === 3) {
                result = 1;
            } else {
                result++;
            }
            var newLayer = "baseMap" + result;

            map6.getLayers().getArray()
                .filter(layer => layer.get('layerId') === newLayer)
                .forEach(layer => layer.setVisible(true));
            break;
        } else {
            continue;
        }
    }
}

const getBaseKorMap1 = () => {
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
        title: 'sido',
        visible: true,
        zIndex: 100
    });
}
const getBaseKorMap2 = () => {
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
        title: 'sigungu',
        visible: false,
        zIndex: 100
    });
}
const getBaseKorMap3 = () => {
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
        title: 'eupmyeondong',
        visible: false,
        zIndex: 100
    });
}
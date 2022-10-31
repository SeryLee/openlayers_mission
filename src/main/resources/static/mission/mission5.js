$(document).ready(function () {
    sido();
});
let map5 = getDefaultMap('map5', getOSMLayer(), get3857View());

function sido() {
    let baseKorMap1 = getKorMap1();
    map5.getLayers().getArray()
        .filter(layer => layer.get('layerId') === 'baseMap2' || layer.get('layerId') === 'baseMap3')
        .forEach(layer => map5.removeLayer(layer));
    map5.addLayer(baseKorMap1);
}

function sigungu() {
    let baseKorMap2 = getKorMap2();
    map5.getLayers().getArray()
        .filter(layer => layer.get('layerId') === 'baseMap1' || layer.get('layerId') === 'baseMap3')
        .forEach(layer => map5.removeLayer(layer));
    map5.addLayer(baseKorMap2);
}

function eupmyeondong() {
    let baseKorMap3 = getKorMap3();
    map5.getLayers().getArray()
        .filter(layer => layer.get('layerId') === 'baseMap1' || layer.get('layerId') === 'baseMap2')
        .forEach(layer => map5.removeLayer(layer));
    map5.addLayer(baseKorMap3);
}
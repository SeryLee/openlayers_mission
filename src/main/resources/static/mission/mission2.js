$(document).ready(function () {
    let map2 = getDefaultMap('map2', getOSMLayer(), get3857View());
    addBaseLayer(map2);
    initBaseLayerSelect(map2);
});
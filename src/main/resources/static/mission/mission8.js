$(document).ready(function () {
    loadMap8();
});
let map8 = getDefaultMap('map8', getOSMLayer(), get3857View());

function loadMap8() {
    //그릴 도형의 타입 고르기
    var typeSelect = document.getElementById('type');
    var draw;
    typeSelect.onchange = function () {
        map8.removeInteraction(draw);
        addInteraction();
    };
    var source = new ol.source.Vector({wrapX: false})
    var vector = new ol.layer.Vector({
        title: 'vector',
        source: source
    });
    map8.addLayer(vector);

    function addInteraction() {
        var value = typeSelect.value;
        if (value !== 'None') {
            draw = new ol.interaction.Draw({
                source: source,
                type: value
            });
            map8.addInteraction(draw);
        }
    }
}
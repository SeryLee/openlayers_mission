$(document).ready(function () {
    loadMap10();
});
let map10 = getDefaultMap('map10', getOSMLayer(), get3857View());

function loadMap10() {
    // var container = document.getElementById('popup');
    var mapOverlay = new ol.Overlay({
        element: document.getElementById('popup'),
        id: 'popUpOverlay',
        zIndex: 200
    });
    map10.addOverlay(mapOverlay);
    map10.on('click', function (evt) {
        let coordinate = evt.coordinate;
        coordinate = ol.proj.transform([coordinate[0], coordinate[1]], 'EPSG:3857', 'EPSG:4326');
        var x, y, uuid;

        $.ajax({
            url: "/coordinate",
            method: 'post',
            data: {
                longitude: coordinate[0],
                latitude: coordinate[1]
            },
            dataType: "json"
        }).done(function (msg) {
            $.each(msg, function (k, v) {
                if (k === 'uuid') {
                    uuid = v;
                }
                if (k === 'longitude') {
                    x = v;
                }
                if (k === 'latitude') {
                    y = v;
                }
            })
            var markerLayer = addMarker(x, y, uuid);
            map10.addLayer(markerLayer);
        }).fail(function (jqXHR, textStatus) {
            console.log(textStatus);
        });
    });
}
$(document).ready(function () {
    loadMap4();
});

function loadMap4() {
    //ol의 Map 생성
    let map4 = getDefaultMap('map4', getOSMLayer(), get3857View());
    map4.on('click', function (evt) {
        let coordinate = evt.coordinate;
        coordinate = ol.proj.transform([coordinate[0], coordinate[1]], 'EPSG:3857', 'EPSG:4326');
        console.log(coordinate);
        $.ajax({
            url: "/coordinate",
            method: 'post',
            data: {
                longitude: coordinate[0],
                latitude: coordinate[1]
            },
            dataType: "json"
        }).done(function (msg) {
            console.log(msg);
            $.each(msg, function (k, v) {
                if (k == 'uuid') {
                    $('#uuid').val(v)
                }
                if (k == 'name') {
                    $('#name').val(v)
                }
                if (k == 'longitude') {
                    $('#longitude').val(v)
                }
                if (k == 'latitude') {
                    $('#latitude').val(v)
                }
            })
        }).fail(function (jqXHR, textStatus) {
            console.log(textStatus);
        });
    });
}
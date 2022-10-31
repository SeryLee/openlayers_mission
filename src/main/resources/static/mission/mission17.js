$(document).ready(function () {
    loadMap17();
});
let map17 = getDefaultMap('map17', getOSMLayer(), get4326View());

let reservoirList = [
    [126.4706163, 34.8816832, "감돈저수지"],
    [126.7463377, 36.5180018, "천태저수지"],
    [127.201016, 37.1184823, "이동저수지"],
    [128.9440084, 37.3477685, "광동댐"],
    [129.1774425, 35.6281585, "대곡댐-사연댐"]
]

function addMarkerToMap(x, y, name) {
    var feature = new ol.Feature({
        geometry: new ol.geom.Point([x, y]),
        name: name,
    });
    var markerStyle = new ol.style.Style({
        image: new ol.style.Icon({
            opacity: 1,
            scale: 1.2,
            src: 'http://map.vworld.kr/images/ol3/marker_blue.png'
        }),
        zIndex: 300
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

const returnReservoriInfo = (name) => {
    for (let list of reservoirList) {
        if (list[2] == name) {
            return list;
        }
    }
}

function loadMap17() {
    for (let reservoirListElement of reservoirList) {
        var markerLayer22 = addMarkerToMap(reservoirListElement[0], reservoirListElement[1], reservoirListElement[2]);
        console.log(reservoirListElement[0], reservoirListElement[1], reservoirListElement[2]);
        map17.addLayer(markerLayer22);
    }


    map17.on("pointermove", function (evt) {
        this.getTargetElement().style.cursor = this.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';
    });

    map17.on('singleclick', function (evt) {
        const container2 = document.createElement('div');
        container2.className = 'ol-popup';
        container2.id = 'popup2';

        const content2 = document.createElement('div');
        content2.id = 'popup-content2';

        const closer2 = document.createElement('a');
        closer2.className = 'ol-popup-closer2';
        closer2.id = 'popup-closer2';
        closer2.href = '#';

        container2.appendChild(content2);
        container2.appendChild(closer2);
        const overlay = new ol.Overlay({
            element: container2,
            autoPan: {
                animation: {
                    duration: 250,
                },
            },
        });

        closer2.onclick = function () {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
        };
        map17.addOverlay(overlay);

        let clickedName = this.forEachFeatureAtPixel(evt.pixel, function (f) {
            return f.get('name');
        })
        let reservoirInfo = returnReservoriInfo(clickedName);
        let newCenter = [reservoirInfo[0], reservoirInfo[1]];

        map17.setView(new ol.View({
            projection: 'EPSG:4326',
            center: newCenter,
            zoom: 15
        }))

        content2.innerHTML = '<p>You Clicked Here:</p><code>' + clickedName + '</code>';
        overlay.setPosition(newCenter);
    })
}
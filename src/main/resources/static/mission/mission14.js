const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');
//var map14;
$(document).ready(function () {
    loadMap14();
    wfsEvent3();
});
let map14 = getDefaultMap('map14', getOSMLayer(), get4326View());

function loadMap14() {

    //방법 1. pointermove 이벤트 사용
    // const status = document.getElementById('status');
    // let selected = null;
    // let style = [];
    // map14.on('pointermove', function (e) {
    //     if(selected !== null) {
    //         selected.setStyle(undefined);
    //         selected = null;
    //     }
    //     map14.forEachFeatureAtPixel(e.pixel, function (f) {
    //         selected = f;
    //         f.setStyle(new ol.style.Style({
    //             stroke: new ol.style.Stroke({
    //                 color: 'white',
    //                 width: 2
    //             }),
    //             fill: new ol.style.Fill({
    //                 color: 'blue'
    //             })
    //         }))
    //         return true;
    //     })
    //     if(selected) {
    //         status.innerHTML = selected.get('ADM_DR_NM');
    //     } else {
    //         status.innerHTML = '&nbsp;';
    //     }
    // })

    //방법 2. interaction 사용
    const selectPointerMove = new ol.interaction.Select({
        condition: ol.events.condition.pointerMove,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'white',
                width: 2
            }),
            fill: new ol.style.Fill({
                color: 'blue'
            })
        })
    });
    const selectClicked = new ol.interaction.Select({
        condition: ol.events.condition.click,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'white',
                width: 2
            }),
            fill: new ol.style.Fill({
                color: 'red'
            })
        })
    });
    map14.addInteraction(selectPointerMove);
    map14.addInteraction(selectClicked);

    const overlay = new ol.Overlay({
        element: container,
        autoPan: {
            animation: {
                duration: 250,
            },
        },
    });

    closer.onclick = function () {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };
    map14.addOverlay(overlay);
    map14.on('singleclick', function (evt) {
        const coordinate = evt.coordinate;
        const hdms = ol.coordinate.toStringHDMS(coordinate);
        let dongName;
        map14.forEachFeatureAtPixel(evt.pixel, function (f, l) {
            dongName = f.get('name');
        })
        content.innerHTML = '<p>You Clicked Here:</p><code>' + hdms + '</code><p>' + dongName + '</p>';
        overlay.setPosition(coordinate);
    })
}

const wfsEvent3 = () => {
    $.ajax({
        url: '/getGeoJSON',
        method: 'get',
        success: function (data) {
            //TODO : OBJECT cooridnates
            addPointLayerToMapHoverEvent(data);
        },
    })
}
const addPointLayerToMapHoverEvent = (data) => {
    const multiPolygons = createMultiPolygonByGeoJSON(data);
    const vectorLayer = putPolygonLayerByGeoJSON(multiPolygons);
    addLayerToMap14(vectorLayer, 'pointVectorLayer');
}
const addLayerToMap14 = (layer, layerId) => {
    layer.set('name', layerId);
    map14.addLayer(layer);
}
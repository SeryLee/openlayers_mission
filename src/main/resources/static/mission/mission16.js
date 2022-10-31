$(document).ready(function () {
    loadMap16();
});

var map16;

class RotateNorthControl extends ol.control.Control {
    constructor(opt_options) {
        const options = opt_options || {};

        const button = document.createElement('button');
        // button.innerHTML = 'North';

        const rotateIcon = document.createElement('i');
        rotateIcon.className = 'fas fa-undo';
        rotateIcon.id = "drawPolygonIcon";
        button.appendChild(rotateIcon);

        const element = document.createElement('div');
        element.className = 'rotate-north ol-unselectable ol-control';
        element.appendChild(button);

        super({
            element: element,
            target: options.target
        });
        button.addEventListener('click', this.handleRotateNorth.bind(this), false);
    }

    handleRotateNorth() {
        let rotation = this.getMap().getView().getRotation();
        this.getMap().getView().setRotation(rotation - 1);
    }
}

var overviewMapControl = new ol.control.OverviewMap({
    className: 'ol-overviewmap ol-custom-overviewmap',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM(),
        }),
    ],
    collapseLabel: '\u00BB',
    label: '\u00AB',
    collapsed: false,
});

class DrawPolygon extends ol.control.Control {
    constructor(opt_options) {
        const options = opt_options || {};
        const button = document.createElement('button');

        const drawIcon = document.createElement('i');
        drawIcon.className = 'far fa-object-ungroup';
        button.appendChild(drawIcon);

        const element = document.createElement('div');
        element.className = 'custom-map-control ol-unselectable ol-control';
        element.id = 'customMapControl';
        element.appendChild(button);

        super({
            element: element,
            target: options.target
        });
        button.addEventListener('click', this.handleDrawPolygon.bind(this), false);
    }

    handleDrawPolygon() {
        map16.addLayer(vector16);
        map16.addInteraction(modify);
        addInteractionToMap16();
    }
}

function stylePolygonFunction(feature, segments, drawType, tip) {
    const styles = [style];
    const geometry = feature.getGeometry();
    const type = geometry.getType();
    let point, label, line;
    if (!drawType || drawType === type) {
        point = geometry.getInteriorPoint();
        label = formatArea(geometry);
        line = new ol.geom.LineString(geometry.getCoordinates()[0]);
    }
    if (segments && line) {
        let count = 0;
        line.forEachSegment(function (a, b) {
            const segment = new ol.geom.LineString([a, b]);
            const label = formatLength(segment);
            if (segmentStyles.length - 1 < count) {
                segmentStyles.push(segmentStyle.clone());
            }
            const segmentPoint = new ol.geom.Point(segment.getCoordinateAt(0.5));
            segmentStyles[count].setGeometry(segmentPoint);
            segmentStyles[count].getText().setText(label);
            styles.push(segmentStyles[count]);
            count++;
        });
    }
    if (label) {
        labelStyle.setGeometry(point);
        labelStyle.getText().setText(label);
        styles.push(labelStyle);
    }
    if (
        tip &&
        type === 'Point' &&
        !modify.getOverlay().getSource().getFeatures().length
    ) {
        tipPoint = geometry;
        tipStyle.getText().setText(tip);
        styles.push(tipStyle);
    }
    return styles;
}

var source16 = new ol.source.Vector();

const vector16 = new ol.layer.Vector({
    source: source16,
    style: function (feature) {
        return stylePolygonFunction(feature, true);
    }
})

function addInteractionToMap16() {
    const drawType = 'Polygon';
    const activeTip =
        'Click to continue drawing the ' +
        'polygon';
    const idleTip = 'Click to start measuring';
    let tip = idleTip;
    draw = new ol.interaction.Draw({
        source: source16,
        type: drawType,
        style: function (feature) {
            return stylePolygonFunction(feature, true, drawType, tip);
        },
    });
    draw.on('drawstart', function () {
        modify.setActive(false);
        tip = activeTip;
    });
    draw.on('drawend', function () {
        modifyStyle.setGeometry(tipPoint);
        modify.setActive(true);
        map16.once('pointermove', function () {
            modifyStyle.setGeometry();
        });
        tip = idleTip;
    });
    modify.setActive(true);
    map16.addInteraction(draw);
}

function loadMap16() {
    map16 = new ol.Map({
        controls: ol.control.defaults({
            // attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
            //     collapsible: false
        }).extend([
            new ol.control.FullScreen(),
            new ol.control.ZoomSlider(),
            new RotateNorthControl(),
            new DrawPolygon(),
            overviewMapControl
        ]),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        target: 'map16',
        view: new ol.View({
            center: [14248656.389982047, 4331624.063626864],
            zoom: 7,
            rotation: 0
        })
    });

}
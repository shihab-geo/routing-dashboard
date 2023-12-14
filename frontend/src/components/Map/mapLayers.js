export const routingLayer = (layerId, sourceId) => {
    const layers = {
        id: layerId,
        type: 'line',
        source: sourceId,
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': 'rgba(8,81,156,0.5)',
            'line-width': 8
        }
    }
    return layers;

};

export const bestRoutePolylineLayerCase = {
    id: "best-route-polyline-layer-case",
    type: "line",
    source: "best-route-polyline-source",
    layout: {
        "line-join": "round",
        "line-cap": "round",
    },
    paint: {
        "line-width": ["interpolate", ["exponential", 1.5], ["zoom"], 5, 2, 18, 3],
        "line-color": "#802b2b",
        "line-gap-width": ["interpolate", ["exponential", 1.5], ["zoom"], 5, 7, 18, 12],
    },
};

export const bestRouteWithTrackingPolylineLayer = {
    id: "best-route-with-tracking-polyline-layer",
    type: "line",
    source: "best-route-polyline-source",
    layout: {
        "line-join": "round",
        "line-cap": "round",
    },
    paint: {
        "line-color": "#b54141",
        "line-width": ["interpolate", ["exponential", 1.5], ["zoom"], 5, 3, 18, 6],
        "line-opacity": 1
    },
};


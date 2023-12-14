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


export const bestRoutePolylineLayer = {
    id: "best-route-polyline-layer",
    type: "line",
    source: "best-route-polyline-source",
    layout: {
        "line-join": "round",
        "line-cap": "round",
    },
    paint: {
        "line-color": "#b54141",
        "line-width": ["interpolate", ["exponential", 1.5], ["zoom"], 5, 7, 18, 12],
    },
};

export const distributorLocLayer = {
    id: "distributor-loc-layer",
    type: "symbol",
    source: "distributor-loc-source",
    layout: {
        "icon-image": "bk-ccc-15",
        "icon-allow-overlap": true,
    },
    paint: {
        "text-halo-width": 1.25,
        "text-halo-color": "rgba(255, 255, 255, 1)",
        "text-halo-blur": 1,
    },
};

export const pointLayer = {
    id: "point-layer",
    type: "symbol",
    source: "point-source",
    layout: {
        "icon-image": "bk-agent-15",
        "icon-allow-overlap": true,
        "text-optional": true,
        "text-field": ["get", "agents"],
        "text-font": ["bscm", "MuliBold"],
        "text-offset": [0, 1],
        "text-anchor": "top",
        "text-size": 14
    },
    paint: {
        "text-halo-width": 1.25,
        "text-halo-color": "rgba(255, 255, 255, 1)",
        "text-halo-blur": 1,
        "text-color": "#e0126e"
    },
};



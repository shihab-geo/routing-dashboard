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


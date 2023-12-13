export const pointGeoJsonFromGeom = (json) => {
    let points = { type: "FeatureCollection", features: [] };
    for (let point of json) {
        let geometry = point.geometry;
        let properties = point;
        delete properties.geometry;
        let feature = { type: "Feature", geometry: geometry, properties: properties };
        points.features.push(feature);
    }
    return points;
};

export const pointGeoJsonFromJson = (json) => {
    let points = { type: "FeatureCollection", features: [] };
    for (let point of json) {
        let coordinate = [point.longitude, point.latitude];
        let properties = point;
        delete properties.geometry;
        let feature = { type: "Feature", geometry: { type: "Point", coordinates: coordinate }, properties: properties };
        points.features.push(feature);
    }
    return points;
};

export const pointGeoJsonFromLatLng = (latLng) => {
    let points = { type: "FeatureCollection", features: [] };
    for (let point of latLng) {
        let coordinate = [point[0], point[1]];
        let properties = null;
        let feature = { type: "Feature", geometry: { type: "Point", coordinates: coordinate }, properties: properties };
        points.features.push(feature);
    }
    return points;
};

export const lineGeoJsonFromLatLng = (latLng) => {
    let points = { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: latLng } };
    // for (let point of latLng) {
    //     let coordinate = [point[0], point[1]];
    //     let properties = null;
    //     let feature = { "type": "Feature", "geometry": { "type": "Point", "coordinates": coordinate }, "properties": properties }
    //     points.features.push(feature);
    // }
    return points;
};

export const polygonGeoJsonFromGeom = (json) => {
    let polygons = { type: "FeatureCollection", features: [] };
    for (let polygon of json) {
        let geometry = polygon.geometry;
        let properties = polygon;
        delete properties.geometry;
        let feature = { type: "Feature", geometry: geometry, properties: properties };
        polygons.features.push(feature);
    }
    return polygons;
};

export const trackingGeoJsonData = (json) => {
    let trackPoints = { type: "FeatureCollection", features: [] };
    let trackPath = { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: [] } };
    for (let trackData of json) {
        let coordinate = [trackData.longitude, trackData.latitude];
        let properties = trackData;
        delete properties.longitude;
        delete properties.latitude;
        let PointFeature = { type: "Feature", geometry: { type: "Point", coordinates: coordinate }, properties: properties };
        trackPoints.features.push(PointFeature);
        trackPath.geometry.coordinates.push(coordinate);
    }
    return { trackPoints, trackPath };
};

export const kilometersToPixelsAtMaxZoom = (meters) => {
    let radiusPixel = (meters / 0.075 / Math.cos((24 * Math.PI) / 180) * 1000);
    return radiusPixel
};

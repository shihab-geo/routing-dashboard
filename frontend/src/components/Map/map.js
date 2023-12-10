import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./map.css";
import { routingLayer } from "./mapLayers";
import {
    setShowRoutingInfo,
    setMapLayers, setMapSources,
    resetMapLayers, resetMapSources,
} from "../../redux/slices/mapSlice";
import {
    setDistance, setDuration,
    setRouteFrom, setRouteTo,
} from "../../redux/slices/selectSlice";
import moment from 'moment';






export const Map = forwardRef((props, ref) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const markerFromRef = useRef(null);
    const markerToRef = useRef(null);
    const [calculateDistance, setCalculateDistance] = useState(null);


    const dispatch = useDispatch();


    const { mapLayers, mapSources } = useSelector((state) => state.mapreducer);


    const calculateRouteDistance = () => {
        if (markerFromRef.current && markerToRef.current) {
            const coordinates = [
                markerFromRef.current.getLngLat(),
                markerToRef.current.getLngLat()
            ];

            const fromLngLat = `${coordinates[0].lng},${coordinates[0].lat}`;
            const toLngLat = `${coordinates[1].lng},${coordinates[1].lat}`;

            const fromLntLatConvert = `${coordinates[0].lng.toFixed(6)},${coordinates[0].lat.toFixed(6)}`;
            const toLntLatConvert = `${coordinates[1].lng.toFixed(6)},${coordinates[1].lat.toFixed(6)}`;

            //Dispatch the Route From
            dispatch(setRouteFrom({ data: fromLntLatConvert }));

            //Dispatch the Route To
            dispatch(setRouteTo({ data: toLntLatConvert }));

            const url = `http://10.75.8.26:5000/route/v1/driving/${fromLngLat};${toLngLat}?steps=true&overview=full&annotations=false&geometries=geojson`;

            fetch(url)
                .then(response => response.json())
                .then(data => {

                    const distance = data.routes[0].distance / 1000;
                    const duration = data.routes[0].duration;

                    const totalSeconds = duration;

                    const hours = Math.floor(totalSeconds / 3600);
                    const minutes = Math.floor((totalSeconds % 3600) / 60);
                    const seconds = Math.floor(totalSeconds % 60);


                    const formatedTime = `${hours}:${minutes}:${seconds}`;


                    //Dispatch the Duration
                    dispatch(setDuration({ data: formatedTime }));

                    //Dispatch the Distance
                    dispatch(setDistance({ data: distance.toFixed(2) }));

                    setCalculateDistance(distance.toFixed(2));

                    const routeCoordinates = data.routes[0].geometry.coordinates;

                    // Update the route on the map
                    map.current.getSource('route').setData({
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: routeCoordinates
                        }
                    });




                })
                .catch(error => {
                    console.error('Error calculating route distance:', error);
                });
        }
    };

    const handleMapClick = (e) => {
        if (!markerFromRef.current) {
            markerFromRef.current = new mapboxgl.Marker({ draggable: true, color: 'green' })
                .setLngLat(e.lngLat)
                .addTo(map.current);
        } else if (!markerToRef.current) {
            markerToRef.current = new mapboxgl.Marker({ draggable: true, color: 'red' })
                .setLngLat(e.lngLat)
                .addTo(map.current);
        } else {
            markerToRef.current.setLngLat(e.lngLat);
        }

        calculateRouteDistance();
    };





    useEffect(() => {
        if (!map.current) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'http://10.75.8.13:8080/styles/street_en/style.json',
                center: [90.390445, 23.775563],
                maxZoom: 20,
                minZoom: 5,
                zoom: 8,
                hash: true
            });

            map.current.on('load', () => {
                map.current.resize();

                // Create a GeoJSON source for the route
                map.current.addSource('route', {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: []
                        }
                    }
                });

                dispatch(setMapLayers({ layers: ["route"] }));
                dispatch(setMapSources({ sources: ["route"] }));

                // Add a symbol layer
                map.current.addLayer(routingLayer('route', 'route'));

                // Create a layer to display the route
                // map.current.addLayer({
                //     id: 'route',
                //     type: 'line',
                //     source: 'route',
                //     layout: {
                //         'line-join': 'round',
                //         'line-cap': 'round'
                //     },
                //     paint: {
                //         'line-color': 'rgba(8,81,156,0.5)',
                //         'line-width': 8
                //     }
                // });
            });
        }

      
        map.current.on('click', handleMapClick);

        return () => {
            if (map.current) {
                map.current.remove();
            }
        };
    }, []);

    useEffect(() => {
        if (map.current && markerFromRef.current && markerToRef.current) {
            markerFromRef.current.on('dragend', calculateRouteDistance);
            markerToRef.current.on('dragend', calculateRouteDistance);
        }
    }, [map.current, markerFromRef.current, markerToRef.current]);





    const removeLayer = (layerId, sourceId) => {
        let mapLayer = map.current.getLayer(layerId);
        let mapSource = map.current.getSource(sourceId);
        if (typeof mapLayer !== "undefined") {
            map.current.removeLayer(layerId);
        }
        if (typeof mapSource !== "undefined") {
            map.current.removeSource(sourceId);
        }
    };

    const removeAllLayers = () => {
        if (mapLayers.length > 0) {
            for (let layer of mapLayers) {
                if (typeof map.current.getLayer(layer) !== "undefined") {
                    map.current.removeLayer(layer);
                }
            }
        }
        if (mapSources.length > 0) {
            for (let source of mapSources) {
                if (typeof map.current.getSource(source) !== "undefined") {
                    map.current.removeSource(source);
                }
            }
        }

        dispatch(resetMapLayers());
        dispatch(resetMapSources());
    };

    const distanceMarker = () => {

        const calculateRouteDistance = () => {
            if (markerFromRef.current && markerToRef.current) {
                const coordinates = [
                    markerFromRef.current.getLngLat(),
                    markerToRef.current.getLngLat()
                ];

                const fromLngLat = `${coordinates[0].lng},${coordinates[0].lat}`;
                const toLngLat = `${coordinates[1].lng},${coordinates[1].lat}`;

                const fromLntLatConvert = `${coordinates[0].lng.toFixed(6)},${coordinates[0].lat.toFixed(6)}`;
                const toLntLatConvert = `${coordinates[1].lng.toFixed(6)},${coordinates[1].lat.toFixed(6)}`;

                //Dispatch the Route From
                dispatch(setRouteFrom({ data: fromLntLatConvert }));

                //Dispatch the Route To
                dispatch(setRouteTo({ data: toLntLatConvert }));

                const url = `http://10.75.8.26:5000/route/v1/driving/${fromLngLat};${toLngLat}?steps=true&overview=full&annotations=false&geometries=geojson`;

                fetch(url)
                    .then(response => response.json())
                    .then(data => {

                        const distance = data.routes[0].distance / 1000;
                        const duration = data.routes[0].duration;

                        const totalSeconds = duration;

                        const hours = Math.floor(totalSeconds / 3600);
                        const minutes = Math.floor((totalSeconds % 3600) / 60);
                        const seconds = Math.floor(totalSeconds % 60);


                        const formatedTime = `${hours}:${minutes}:${seconds}`;


                        //Dispatch the Duration
                        dispatch(setDuration({ data: formatedTime }));

                        //Dispatch the Distance
                        dispatch(setDistance({ data: distance.toFixed(2) }));

                        setCalculateDistance(distance.toFixed(2));

                        const routeCoordinates = data.routes[0].geometry.coordinates;

                        // Update the route on the map
                        map.current.getSource('route').setData({
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'LineString',
                                coordinates: routeCoordinates
                            }
                        });




                    })
                    .catch(error => {
                        console.error('Error calculating route distance:', error);
                    });
            }
        };






    }




    //? Imperative handle
    useImperativeHandle(ref, () => ({
        removeLayer,
        removeAllLayers,
        distanceMarker,


    }));

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
})

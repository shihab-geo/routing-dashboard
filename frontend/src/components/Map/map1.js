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
    setRoutingDistance, setRoutingDuration,
    setRouteFrom, setRouteTo,
} from "../../redux/slices/selectSlice";
import moment from 'moment';






export const Map = forwardRef((props, ref) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const markerFrom = useRef(null);
    const markerTo = useRef(null);

    const dispatch = useDispatch();


    const { mapLayers, mapSources } = useSelector((state) => state.mapreducer);





    const handleMapClick = (e) => {
        if (!markerFrom.current) {
            markerFrom.current = new mapboxgl.Marker({ draggable: true, color: "green" }).setLngLat(e.lngLat).addTo(map.current);
        } else if (!markerTo.current) {
            markerTo.current = new mapboxgl.Marker({ draggable: true, color: "red" }).setLngLat(e.lngLat).addTo(map.current);
            calculateRouteDistance();
        } else {
            markerTo.current.setLngLat(e.lngLat);
            calculateRouteDistance();
        }
    };

    const calculateRouteDistance = () => {

        // removeAllLayers();

        const coordinates = [
            markerFrom.current.getLngLat(),
            markerTo.current.getLngLat()
        ];

        const fromLntLat = `${coordinates[0].lng},${coordinates[0].lat}`;
        const toLntLat = `${coordinates[1].lng},${coordinates[1].lat}`;

        const fromLntLatConvert = `${coordinates[0].lng.toFixed(6)},${coordinates[0].lat.toFixed(6)}`;
        const toLntLatConvert = `${coordinates[1].lng.toFixed(6)},${coordinates[1].lat.toFixed(6)}`;

        //Dispatch the Route From
        dispatch(setRouteFrom({ data: fromLntLatConvert }));

        //Dispatch the Route To
        dispatch(setRouteTo({ data: toLntLatConvert }));

        const url = `http://10.75.8.26:5000/route/v1/driving/${fromLntLat};${toLntLat}?steps=true&overview=full&annotations=false&geometries=geojson`;

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
                dispatch(setRoutingDuration({ data: formatedTime }));

                //Dispatch the Distance
                dispatch(setRoutingDistance({ data: distance.toFixed(2) }));

                //layer
                const mapLayer = map.current.getLayer('routing-line-layer');
                if (mapLayer) {
                    map.current.removeLayer('routing-line-layer').removeSource('routing-line-layer');
                    // removeAllLayers();

                }

                const selectedRoute = [];
                const alternativeRoute = [];

                data.routes.forEach((item, i) => {
                    i === 0 ? selectedRoute.push(item.geometry) : alternativeRoute.push(item.geometry);
                });

                //Add Source
                // map.current.addSource("routing-line-source", {
                //     type: "geojson",
                //     data: {
                //         type: 'Feature',
                //         properties: {},
                //         geometry: selectedRoute[0]
                //     },
                // });

                // dispatch(setMapLayers({ layers: ["routing-line-layer"] }));
                // dispatch(setMapSources({ sources: ["routing-line-source"] }));

                //Add Layer
                // map.current.addLayer(routingLayer);

                map.current.addLayer({
                    id: 'routing-line-layer',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: {},
                            geometry: selectedRoute[0]
                        }
                    },
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': 'rgba(8,81,156,0.5)',
                        'line-width': 8
                    }
                });

                //Dispatch the Show Route Info Status
                //    dispatch(setShowRoutingInfo({ data: true }));
            })
            .catch(error => {
                console.error('Error calculating route distance:', error);
            });
    };

    useEffect(() => {
        if (map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'http://10.75.8.13:8080/styles/street_en/style.json',
            center: [90.390445, 23.775563],
            maxZoom: 20,
            minZoom: 5,
            zoom: 8,
            hash: true
        });

        map.current.on("load", () => {
            map.current.resize();
        });


        map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
        const scaleControl = new mapboxgl.ScaleControl({
            maxWidth: 160,
            unit: "metric",
        });
        map.current.addControl(scaleControl, "bottom-right");
        map.current.on("contextmenu", (e) => {
            // onContextMenu(e);
        });

        return () => map.current.remove();


    });



    useEffect(() => {
        if (map.current) {
            map.current.on('click', handleMapClick);
        }
    }, []);









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

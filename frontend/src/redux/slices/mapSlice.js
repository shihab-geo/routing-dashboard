import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    showRoutingInfo: false,
    agentPointsLoc: [],
    distHouseLoc: [],
    mapLayers: [],
    mapSources: [],

}

export const mapSlice = createSlice({
    name: 'routingBenchmarkerMapSlice',
    initialState,
    reducers: {

        setShowRoutingInfo: (state, action) => {
            state.showRoutingInfo = action.payload.data;
        },

        getAgentPoints: (type) => {
            return type;
        },

        setAgentPoints: (state, action) => {
            state.agentPointsLoc = action.payload.data;
        },

        getDistHouseLoc: (type) => {
            return type;
        },

        setDistHouseLoc: (state, action) => {
            state.distHouseLoc = action.payload.data;
        },

        setMapLayers: (state, action) => {
            for (let layer of action.payload.layers) {
                state.mapLayers = [...state.mapLayers, layer]
            }
        },
        setMapSources: (state, action) => {
            for (let source of action.payload.sources) {
                state.mapSources = [...state.mapSources, source]
            }
        },
        resetMapLayers: (state, action) => {
            state.mapLayers = []
        },
        resetMapSources: (state, action) => {
            state.mapSources = []
        },

    }
})

export const {
    setShowRoutingInfo,
    getAgentPoints,
    setAgentPoints,
    getDistHouseLoc,
    setDistHouseLoc,
    setMapLayers,
    setMapSources,
    resetMapLayers,
    resetMapSources,

} = mapSlice.actions

export default mapSlice.reducer
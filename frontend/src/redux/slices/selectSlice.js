import { createSlice } from '@reduxjs/toolkit';
import * as STRING_VARS from "../../strings";


const panelInfo = {
    activePanel: STRING_VARS.ACTIVE_PANEL_ROUTING,

};

const routeInfo = {
    engine: STRING_VARS.ENGINE_OSRM,
    profile: STRING_VARS.PROFILE_CAR,
    duration: null,
    distance: null,
    routeFrom: null,
    routeTo: null,
}

const tripInfo = {
    distributor: null,
    dso: null,
    duration: null,
    distance: null,

}


const initialState = {
    panelInfo,
    routeInfo,
    tripInfo,

}

export const selectSlice = createSlice({
    name: 'routingInfoSelectSlice',
    initialState,
    reducers: {

        setActivePanel: (state, action) => {
            state.panelInfo.activePanel = action.payload.data;
        },

        setEngine: (state, action) => {
            state.routeInfo.engine = action.payload.data;
        },

        setProfile: (state, action) => {
            state.routeInfo.profile = action.payload.data;
        },

        setRoutingDistance: (state, action) => {
            state.routeInfo.distance = action.payload.data;
        },

        setRoutingDuration: (state, action) => {
            state.routeInfo.duration = action.payload.data;
        },

        setRouteFrom: (state, action) => {
            state.routeInfo.routeFrom = action.payload.data;
        },

        setRouteTo: (state, action) => {
            state.routeInfo.routeTo = action.payload.data;
        },

        setDistributor: (state, action) => {
            state.tripInfo.distributor = action.payload.data;
        },

        setDso: (state, action) => {
            state.tripInfo.dso = action.payload.data;
        },

        setTrippingDistance: (state, action) => {
            state.tripInfo.distance = action.payload.data;
        },

        setTripingDuration: (state, action) => {
            state.tripInfo.duration = action.payload.data;
        },

    },

})

export const {
    setActivePanel,
    setEngine,
    setProfile,
    setRoutingDistance,
    setRoutingDuration,
    setRouteFrom,
    setRouteTo,
    setDistributor,
    setDso,
    setTrippingDistance,
    setTripingDuration,

} = selectSlice.actions

export default selectSlice.reducer

import { createSlice } from '@reduxjs/toolkit';
import * as STRING_VARS from "../../strings";


const panelInfo = {
    activePanel: STRING_VARS.ACTIVE_PANEL_ROUTING,

};

const routingInfo = {
    engine: STRING_VARS.ENGINE_OSRM,
    profile: STRING_VARS.PROFILE_CAR,
    duration: null,
    distance: null,
    routeFrom: null,
    routeTo: null,
}

const trippingInfo = {
    distributor: null,
    dso: null,
    duration: null,
    distance: null,

}


const initialState = {
    panelInfo,
    routingInfo,
    trippingInfo,

}

export const selectSlice = createSlice({
    name: 'routingInfoSelectSlice',
    initialState,
    reducers: {

        setActivePanel: (state, action) => {
            state.panelInfo.activePanel = action.payload.data;
        },

        setEngine: (state, action) => {
            state.routingInfo.engine = action.payload.data;
        },

        setProfile: (state, action) => {
            state.routingInfo.profile = action.payload.data;
        },

        setRoutingDistance: (state, action) => {
            state.routingInfo.distance = action.payload.data;
        },

        setRoutingDuration: (state, action) => {
            state.routingInfo.duration = action.payload.data;
        },

        setRouteFrom: (state, action) => {
            state.routingInfo.routeFrom = action.payload.data;
        },

        setRouteTo: (state, action) => {
            state.routingInfo.routeTo = action.payload.data;
        },

        setDistributor: (state, action) => {
            state.trippingInfo.distributor = action.payload.data;
        },

        setDso: (state, action) => {
            state.trippingInfo.dso = action.payload.data;
        },

        setTrippingDistance: (state, action) => {
            state.trippingInfo.distance = action.payload.data;
        },

        setTripingDuration: (state, action) => {
            state.trippingInfo.duration = action.payload.data;
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

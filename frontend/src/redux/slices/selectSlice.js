import { createSlice } from '@reduxjs/toolkit';
import * as STRING_VARS from "../../strings";



const routingInfo = {
    engine: STRING_VARS.ENGINE_OSRM,
    profile: STRING_VARS.PROFILE_CAR,
    duration: null,
    distance: null,
    routeFrom: null,
    routeTo: null,
}


const initialState = {
    routingInfo

}

export const selectSlice = createSlice({
    name: 'routingInfoSelectSlice',
    initialState,
    reducers: {

        setEngine: (state, action) => {
            state.routingInfo.engine = action.payload.data;
        },

        setProfile: (state, action) => {
            state.routingInfo.profile = action.payload.data;
        },

        setDistance: (state, action) => {
            state.routingInfo.distance = action.payload.data;
        },

        setDuration: (state, action) => {
            state.routingInfo.duration = action.payload.data;
        },

        setRouteFrom: (state, action) => {
            state.routingInfo.routeFrom = action.payload.data;
        },

        setRouteTo: (state, action) => {
            state.routingInfo.routeTo = action.payload.data;
        },

    },

})

export const {
    setEngine,
    setProfile,
    setDistance,
    setDuration,
    setRouteFrom,
    setRouteTo,

} = selectSlice.actions

export default selectSlice.reducer

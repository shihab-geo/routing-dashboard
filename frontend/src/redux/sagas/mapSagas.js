import { takeLatest, call, put, fork } from 'redux-saga/effects';
import {
    fetchData
} from '../../services/api.service'


function* trackAgentsWorker({ payload }) {
    try {
        const response = yield call(fetchData, payload.url, payload.query, payload.variables)
        let trackingData = trackingGeoJsonData(response.data.data.trackingData)
        let agentData = pointGeoJsonFromGeom(response.data.data.agentData)
        // console.log(trackingData);
        // console.log(agentData);
        if (response.status === 200) {
            yield put(setTrackAgentPoints(agentData))
            yield put(setTrackPath(trackingData))
        } else {
            // console.log(response.status);
        }
    } catch (error) {
        // console.log(error);
    }
}
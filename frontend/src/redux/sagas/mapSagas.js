import { takeLatest, call, put, fork } from 'redux-saga/effects';
import {
    pointGeoJsonFromGeom,
    pointGeoJsonFromJson,
    polygonGeoJsonFromGeom,
    trackingGeoJsonData,
} from '../../components/Map/geoJsonConverter';
import {
    fetchData
} from '../../services/api.service';
import {
    getAgentPoints, setAgentPoints,
} from "../slices/mapSlice";


function* trackAgentsWorker({ payload }) {
    try {
        const response = yield call(fetchData, payload.url, payload.query, payload.variables)
        let agentData = pointGeoJsonFromGeom(response.data.data.data)
        // console.log(trackingData);
        console.log(agentData);
        if (response.status === 200) {
            yield put(setAgentPoints(agentData))
        } else {
            // console.log(response.status);
        }
    } catch (error) {
        // console.log(error);
    }
}



function* getAgentLocPoints() {
    yield takeLatest(getAgentPoints.type, trackAgentsWorker);
}


export const RoutingBenchmarkerMapSagas = [
    fork(getAgentLocPoints),

];
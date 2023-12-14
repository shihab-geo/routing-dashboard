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
    getDistHouseLoc, setDistHouseLoc,
} from "../slices/mapSlice";
import {
    setDistributor,
} from "../slices/selectSlice";


function* trackAgentsWorker({ payload }) {
    try {
        const response = yield call(fetchData, payload.url, payload.query, payload.variables)
        const agentData = pointGeoJsonFromGeom(response.data.data.data)

        if (response.status === 200) {
            yield put(setAgentPoints({ data: agentData }));
            yield put(setDistributor({ data: agentData?.features[0]?.properties?.distributor }));
        } else {
            // console.log(response.status);
        }
    } catch (error) {
        // console.log(error);
    }
}


function* trackDistHouseLocWorker({ payload }) {
    try {
        const response = yield call(fetchData, payload.url, payload.query, payload.variables)
        const distHouseData = pointGeoJsonFromGeom(response.data.data.data)

        if (response.status === 200) {
            yield put(setDistHouseLoc({ data: distHouseData }));
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

function* getDistributorLocPoints() {
    yield takeLatest(getAgentPoints.type, trackDistHouseLocWorker);
}


export const RoutingBenchmarkerMapSagas = [
    fork(getAgentLocPoints),
    fork(getDistributorLocPoints),

];
import { all } from 'redux-saga/effects'
import { RoutingBenchmarkerMapSagas } from './mapSagas'

export default function* rootSaga() {

    yield all([

        ...RoutingBenchmarkerMapSagas,

    ])
}
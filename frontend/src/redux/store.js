import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import selectReducer from './slices/selectSlice';
import mapReducer from './slices/mapSlice';



import rootSaga from "./sagas/rootSagas";


const DEVTOOL_STATUS = `${process.env.REACT_APP_DEVTOOL_STATUS}`;
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        select: selectReducer,
        mapreducer: mapReducer,
    },

    middleware: [sagaMiddleware],
    devTools: DEVTOOL_STATUS,
})


sagaMiddleware.run(rootSaga)

export default store;

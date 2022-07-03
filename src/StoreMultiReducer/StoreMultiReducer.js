import {configureStore} from '@reduxjs/toolkit';
import CurrentFeatureSlice from './CurrentFeatureSlice';
// import DataFeatureFromMapSlice from "./DataFeatureFromMapSlice"
import DataFeatureFromMapSlice from "./DataFeatureFromMapSlice"


const StoreMultiReducer =configureStore({reducer:{
    DataView: CurrentFeatureSlice ,
    feaOnMap:  DataFeatureFromMapSlice
    // usersSlice
    },
    middleware: getDefaultMiddleware =>getDefaultMiddleware({serializableCheck: false,}), // Cancel Error VM26659 react_devtools_backend.js:4026 A non-serializable value was detected in the state, in the path
})
export default StoreMultiReducer;
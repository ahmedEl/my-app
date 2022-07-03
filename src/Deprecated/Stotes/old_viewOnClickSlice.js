import {createSlice } from '@reduxjs/toolkit';
const esriPoup_DetailsThisAction = {
    title: "Details", // Name Button
    id: "DetailsThisAction", // Action name
    image: "https://icons-for-free.com/download-icon-detail+details+ellipses+more+icon-1320183138163966322_512.png" // Img Button
};

const initState ={CurrentFearure : null ,images:[] ,esriPoup_DetailsThisAction:esriPoup_DetailsThisAction};
const viewOnClickSlice=createSlice(
    {
        name : 'viewOnClick',
        initialState:initState,
        reducers:{
            SetCurrentFeature : (state , action)=> {
                state.CurrentFearure =action.payload.CurrentFearure;
                state.images =action.payload.images;
            },
        },
    });

    export default viewOnClickSlice.reducer; // export Data
    export const {SetCurrentFeature} =viewOnClickSlice.actions; // export Action
    
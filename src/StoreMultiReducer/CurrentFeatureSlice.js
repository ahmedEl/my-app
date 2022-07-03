import {createSlice } from '@reduxjs/toolkit';
const initState ={CurrentFearure : null,images:[] , Loading : false, OpenSlider:false,};
const CurrentFeature=createSlice(
    {
        name : 'CurrentFeature',
        initialState:initState,
        reducers:{
            SetCurrentFeature : (state , action)=> {
                if(!state.OpenSlider){state.OpenSlider=true}
                state.CurrentFearure =action.payload.CurrentFearure;
                state.images =action.payload.images;
                state.Loading=false;
            },


            LoadingAction : (state , action)=> {
                if(!state.OpenSlider){state.OpenSlider=true}
                state.Loading =action.payload.Loading;
            },

            OpenSliderAction : (state , action)=> {
                state.OpenSlider =action.payload.OpenSlider;
            },

        },
    });

    export default CurrentFeature.reducer; // export Data
    export const {SetCurrentFeature , LoadingAction ,OpenSliderAction} =CurrentFeature.actions; // export Action
    
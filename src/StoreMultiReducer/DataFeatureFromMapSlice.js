import {createSlice,createAsyncThunk } from '@reduxjs/toolkit';

export const getFeaturesFromMap = createAsyncThunk('DataFeatureFromMap/getFeaturesFromMap', async ({ view }) => {
    //   return await fetch('https://jsonplaceholder.typicode.com/todos/1').
    //     then(res => res.json());
    const LayerStation = view.map.findLayerById("feature_station");
    const IsLayerView = await view.whenLayerView(LayerStation)
    if (IsLayerView.visible) {
        const query = LayerStation.createQuery();
        query.outFields = ["name_of_station", "status_of_station", "amana_ar ", "modified", "f360_images", "x", "y"];
        query.returnDistinctValues = true;
        query.returnGeometry = false;
        const response = await LayerStation.queryFeatures(query)
        return response.features
    }
    else {
        return null;
    }
}
);


const initState ={StatusRequest:"", AllDataFeature : null,BulidNewDataInWidget : [],BulidNewDataInWidget_Loading:false, IsOpenPoupListStation:false ,Loading :false};
const DataFeatureFromMap=createSlice(
    {
        name : 'DataFeatureFromMap',
        initialState:initState,
        reducers:{

            // Action TogglePoupListStation
            openSlideOutAction : (state , action)=> { 
                state.IsOpenPoupListStation =true
            },
            closeSlideOutAction : (state , action)=> { 
                state.IsOpenPoupListStation =false;
            },

            fetchMoreListItemsAction: (state, action) => {
                debugger;
                if (state.BulidNewDataInWidget.length < state.AllDataFeature.length && state.IsOpenPoupListStation==true) {
                    const NextNewData = state.AllDataFeature.slice(state.BulidNewDataInWidget.length, (state.BulidNewDataInWidget.length * 2));
                    state.BulidNewDataInWidget.push(...NextNewData);
                    state.BulidNewDataInWidget_Loading = false;
                }
            },


            ToggleBulidNewDataInWidget_Loading : (state , action)=> { 
                state.BulidNewDataInWidget_Loading =action.payload.IsLoadind;
            }

        },


        extraReducers: {
            [getFeaturesFromMap.pending] : (state) => {
                debugger;
              state.IsOpenPoupListStation = true;
              state.Loading = true;
              state.StatusRequest = 'Pending';
            },
      
            [getFeaturesFromMap.fulfilled] : (state, action) => {
                debugger;
              state.StatusRequest = 'Fulfilled';
            //   state.data = action.payload;

              state.BulidNewDataInWidget=action.payload.slice(0,30);
              state.AllDataFeature =action.payload;
              state.Loading =false;

            },
      
            [getFeaturesFromMap.rejected] : (state) => {
                debugger;
              state.StatusRequest = 'Rejected';
              state.Loading =false;
            }
          }

    });

    export default DataFeatureFromMap.reducer; // export Data
    export const {SetDataFeatureFromMap,openSlideOutAction,closeSlideOutAction,ToggleBulidNewDataInWidget_Loading,fetchMoreListItemsAction} =DataFeatureFromMap.actions; // export Action
    
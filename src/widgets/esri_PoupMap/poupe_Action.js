//rsc
//#region Using 
import React from 'react'
import  { useEffect } from "react";
import _FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import {  useDispatch } from 'react-redux'
import { SetCurrentFeature,LoadingAction } from '../../StoreMultiReducer/CurrentFeatureSlice';
// import Details_Station from "../../components/Details_Station";
//#endregion

// const viewOnClick = ({ view }) => {
    // export function  viewOnClick({ view })  {
 function PoupeAction({ view }) {
    // Action
    const dispatch = useDispatch()

    useEffect(() => { // Run First Time When Load Component

        console.log("PoupeAction");

        // Event handler that fires each time an action is clicked.
        view.popup.on("trigger-action", (event) => {
            // Execute the measureThis() function if the measure-this action is clicked
            if (event.action.id === "DetailsThisAction") {
                SetNewFeatureData();

            
            }
        });

        const SetNewFeatureData = () => {
            dispatch(LoadingAction({Loading :true}));

            setTimeout(() => {
                dispatch(SetCurrentFeature(
                    {
                        CurrentFearure: view.popup.selectedFeature.attributes,
                        images: (view.popup.selectedFeature.attributes.f360_images != null)
                            ? Array.from(view.popup.selectedFeature.attributes.f360_images.split(','), String).map(Photo => "https://s3.eu-central-1.wasabisys.com/tecsolution/gasstation/" + Photo)
                            : []
                    }
                ));
            }, 500);

        };

//#endregion



    }, [view]);

    return   null;
};


export default PoupeAction;




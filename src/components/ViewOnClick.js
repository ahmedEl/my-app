//rsc
//#region Using 
import React from 'react'
import  { useEffect } from "react";
import _FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import {  useDispatch } from 'react-redux'
import { SetCurrentFeature } from '../StoreMultiReducer/CurrentFeatureSlice';
import Details_Station from "./Details_Station";

//#endregion

 function ViewOnClick({ view }) {
    // Action
    const dispatch = useDispatch()

    useEffect(() => { // Run First Time When Load Component

    view.on("click", (event) => {
        view.hitTest(event).then((resp) => {
            if (resp.results[0].graphic.attributes.name_of_station !=null) {
                console.log(resp.results[0].graphic.attributes);
                dispatch(SetCurrentFeature(
                    {
                        CurrentFearure: resp.results[0].graphic.attributes,
                        images: (resp.results[0].graphic.attributes.f360_images !=null)
                              ?Array.from(resp.results[0].graphic.attributes.f360_images.split(','), String).map(Photo => "https://s3.eu-central-1.wasabisys.com/tecsolution/gasstation/" + Photo)
                              :[]
                    }
                ));

                view.goTo({
                    center: [resp.results[0].graphic.attributes.x, resp.results[0].graphic.attributes.y],
                    zoom: 18
                });

            }
        });
   
   
    });
}, [view]);

    return <Details_Station  view={view}/>;
    
};


export default ViewOnClick;




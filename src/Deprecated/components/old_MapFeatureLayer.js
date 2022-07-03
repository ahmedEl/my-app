
import React, { useEffect, useState } from "react";
import _FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import ViewOnClick from "./ViewOnClick";
import { useSelector } from 'react-redux'

//#endregion


const MapFeatureLayer = ({ view }) => {
    const _Datastate = useSelector((ConsumeDatastate) => ConsumeDatastate);

    useEffect(() => { // Run First Time When Load Component
        let PointStyle = {
            type: "simple",
            symbol: {
                type: "picture-marker",
                url: "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
                width: "18px",
                height: "18px",
            }
        }

        let PointLabel = {
            // Content
            labelExpressionInfo: {
                //expression: "$feature.TRL_NAME + ' m'"
                expression: "$feature.name_of_station"

            },

            // Appearance
            symbol: {
                type: "text",
                color: "white",
                haloColor: [30, 70, 190],
                haloSize: 1,
                font: {
                    family: "arial",
                    style: "normal",
                    weight: "bold",
                    size: 10
                }
            },

            // Placement
            labelPlacement: "above-center",

            // Visibility
            //where: "ELEVATION > 2000"
        }
        const popupTrailheads = {
            "title": "Info",
            "content": "<b>اسم المحطة  :</b> {name_of_station}"
        }


        const popupTemplate = {
            outFields: ["name_of_station"],
            title: "{name_of_station}",
            content: "{name_of_station}",
            actions: [_Datastate.DataView.esriPoup_DetailsThisAction] // Store Global (Configuration Action Details)
        };


        const Feature_Station = new _FeatureLayer({
            url: "https://gis.tecsolutiongroup.com:6443/arcgis/rest/services/GasStation/FeatureServer/11",
            renderer: PointStyle,
            outFields: ["name_of_station", "status_of_station", "amana_ar ", "modified", "f360_images","x","y"],
           // attributes: ["name_of_station", "status_of_station", "amana_ar ", "modified", "f360_images"], // pass in array of field elements from above

             popupTemplate: popupTemplate,
             labelingInfo:[PointLabel],
        });
        view.map.add(Feature_Station); 




    }, [view]);
    return  <ViewOnClick  view={view}/>;
    // return    <DetailsStation view={view}/>;
};


export default MapFeatureLayer;




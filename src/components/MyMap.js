import React, { useState } from "react";
import Map from "@arcgis/core/Map";
import esriConfig from "@arcgis/core/config";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

import { useEffect, useRef } from "react";
import MapWidgets from "./MapWidgets";
// import MapFeatureLayer from "./old_MapFeatureLayer";
import MapSearch from "./MapSearch";
import PoupeAction from "../widgets/esri_PoupMap/poupe_Action";
import List_Layer from "./List_Layer";
import FlitterTypeSation from "./FlitterTypeSation";
import MapLayers from   './Map_Layers'
import ViewOnClick from "./ViewOnClick";
import FlitterTypeSation_Details from "./FlitterTypeSation_Details";
import LoadingSpinner from "./Loading";


const MyMap = () => {
    
    const containerMap = useRef(null); // Store Div
    const [view, setView] = useState(null);
   const [isLoading, setIsLoading] = useState(true);

    const glResult1 = new GraphicsLayer({
        id: "glResult1",
    });
    const glResult2 = new GraphicsLayer({
        id: "glResult2",
    });




    esriConfig.apiKey = "AAPKbce39af9e4994db7b6aeb339804bb23dF9bjN99ezKfUAk9CaGD79aRIk72XiHM6jbnT_SqQt8gtD8ErRok-NHUs5_L9AoG9";

    useEffect(() => {
        debugger;
        
        console.log("Start Loading Map");
        new MapView({
            container: containerMap.current, // Div Show Map
            map: new Map({ // basemap and layers
                // basemap: "dark-gray",
                basemap: "arcgis-topographic",
               // layers: [glResult1,glResult2],
                layers: MapLayers,
            }),
            zoom: 13, // zoom
            center: [46.7378078324593, 24.712815482824904],
        }).when((view) =>{
            console.log("End Loading Map")
            setView(view)
            setIsLoading(false);
        });
       // setIsLoading(false);
      
        // setView(view)
        // console.log("End Loading");
        // setIsLoading(false);

        // When Load Map Set View In varible ( view ) To Pass Props Any Componet
    }, []);






    

//(isLoading) ?(<LoadingSpinner/>) : 

    return  <div ref={containerMap} style={{ height: "100vh", width: "100%"  }}>

   { 
   view &&
         // Check if View Not Null Sent View As Props to Componet ( MapWidgets - MapGraphics)
            (
                <>
                    <MapWidgets view={view} />
                    {/* <MapFeatureLayer view={view} /> */}
                    <MapSearch view={view} />
                    <PoupeAction view={view} />
                    <List_Layer view={view} />
                    <FlitterTypeSation view={view} />
                    <ViewOnClick  view={view}/>
                    <FlitterTypeSation_Details  view={view}/>
                    
                </>
            )
    }
    </div>;

// {isLoading ?<LoadingSpinner/> : <></>}

};

export default MyMap;






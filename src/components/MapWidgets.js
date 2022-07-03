//rsc
import React, { useEffect } from "react";
import Home from "@arcgis/core/widgets/Home";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import Legend from "@arcgis/core/widgets/Legend";
import Expand from "@arcgis/core/widgets/Expand";
import Measurement from "@arcgis/core/widgets/Measurement";
import _BasemapToggle from "@arcgis/core/widgets/BasemapToggle";
import _BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
// import { Tooltip } from "bootstrap";

// Pass View From MyMap
const MapWidgets = ({ view }) => {
  useEffect(() => { // LifeCycle React


    // Add Icon Home In Map (Refersh map)
    view.ui.add(
      new Home({
        view: view,
      }),
      "top-left"
    );

    // Add Icon ScaleBar In Map  (Measure zoom)
    view.ui.add(
      new ScaleBar({
        view: view,
        unit: 'dual'
      }),
      "bottom-left"
    );



    // ################################################# start Basemap  ###############################################################

    const basemapToggle = new _BasemapToggle({ // 1-  Function To Render Two Basemap
      view: view,
      nextBasemap: "arcgis-imagery"
    });
    view.ui.add(basemapToggle, "bottom-right"); // switch Two BaseMap


    const basemapGallery = new _BasemapGallery({ // 2-  Function To Render List Basemap
      view: view,
      source: {
        query: {
          title: '"World Basemaps for Developers" AND owner:esri'
        }
       ,portal:{
            url:"https://www.arcgis.com",
            useVectorBasemaps:false
  
        }
      }
    });

    // ################################################# End Basemap  ###############################################################



    // Add Icon Legend In Map (Show All Polgon or point or other in menue Group)

    const _Legend = new Legend({
      view: view,
      container: document.createElement("div").classList.add('Ahmed')
    });

    const Expand_Legend = new Expand({
      view: view,
      expandIconClass: "esri-icon-feature-layer",
      expandTooltip: "Expand Legend",
      content: _Legend
    });

    view.ui.add(Expand_Legend, "top-left");




    const Expand_Measurement = new Expand({
      view: view,
      expandIconClass: "esri-icon-applications",
      expandTooltip: "Expand measurement",

      content: new Measurement({
        view: view,
        // activeTool: "distance",

      }),

    });

    view.ui.add(Expand_Measurement, "top-left");


    // LayerList
// C. specify content with a DOM node



    // <div className="LegendStyle">
    // {view.ui.add(new Legend({view: view,}),"bottom-right")}
    // </div>

  }, []);
  return null;
};


export default MapWidgets;

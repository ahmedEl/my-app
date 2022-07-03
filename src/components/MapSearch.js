import { useEffect, useState } from "react";
import _Search from "@arcgis/core/widgets/Search";
import _FeatureLayer from "@arcgis/core/layers/FeatureLayer";
const MapSearch = ({ view }) => {
    const [loaded, setLoaded] = useState(false); // Load Img 
    useEffect(() => { // Run First Time When Load Component
        const LayerStation = view.map.findLayerById("feature_station");

        const searchWidget = new _Search({
            view: view,
            allPlaceholder: "District or Senator",
            includeDefaultSources: false,
            popupEnabled:true,
            sources: [
                {
                    layer: LayerStation,
                    searchFields: ["name_of_station"],
                    //displayField: "city_ar",
                    suggestionTemplate: "{name_of_station},{status_of_station},{amana_ar}",

                    exactMatch: false,
                    outFields: ["name_of_station", "status_of_station", "amana_ar ", "modified", "f360_images", "x", "y"],
                    name: "name_of_station",
                    placeholder: "Search Station Name "
                },
            ]
        });

        // Execute function after search result click
        searchWidget.on("select-result", function(evt){
            console.log(evt.result.feature.attributes);
            // view.popup.open({
            //   location: evt.result.extent.center,
            //   features:[evt.result.feature]
            // });
          })

        // Add the search widget to the top right corner of the view
        view.ui.add(searchWidget, {
            position: "top-right"
        });

    }, []);
    return null;
};


export default MapSearch;




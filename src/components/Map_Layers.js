import _FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import StylesFeature from "../widgets/esri_Style/Styles_Feature";
import PopupTemplate from "../widgets/esri_PoupMap/Popup_Template";

//#endregion

const Feature_Station = new _FeatureLayer({
        id: "feature_station",
        url: "https://gis.tecsolutiongroup.com:6443/arcgis/rest/services/GasStation/FeatureServer/11",
        renderer: StylesFeature.PointStyle,
        outFields: ["name_of_station", "status_of_station", "amana_ar ", "modified", "f360_images", "x", "y"],
        popupTemplate: PopupTemplate.PopupStation,
        labelingInfo: [StylesFeature.PointLabel],
       // definitionExpression: "1=0"
        // attributes: ["name_of_station", "status_of_station", "amana_ar ", "modified", "f360_images"], // pass in array of field elements from above
});


const MapLayers = [Feature_Station]
export default MapLayers;




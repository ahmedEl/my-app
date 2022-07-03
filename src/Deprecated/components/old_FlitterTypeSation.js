
import React, { useEffect, useState, useRef } from "react";
import _FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import "../Style_App/Style_inputChecBox.css"
import { useSelector } from 'react-redux'
import Expand from "@arcgis/core/widgets/Expand";

const FlitterTypeSation = ({ view }) => {
    const _Datastate = useSelector((ConsumeDatastate) => ConsumeDatastate);
    const IconFlitterRef = useRef();
    const ContectFlitterRef = useRef();;

    const ILst_Layer = [
        { value: "مفتوح", label: "مفتوح", defaultChecked: true },
        { value: "مغلق", label: "مغلق", defaultChecked: true },
        { value: "مهجور", label: "مهجور", defaultChecked: true },
        { value: "تحت التطوير", label: "تحت التطوير", defaultChecked: true },
        { value: "تحت الانشاء", label: "تحت الانشاء", defaultChecked: true },
    ];

    const [showDiv, setShowDiv] = useState(false)
    const [FilterLayer, seFilterLayer] = useState(["مفتوح", "مغلق", "مهجور", "تحت التطوير", "تحت الانشاء"]);

    const LayerStation = view.map.findLayerById("feature_station"); 
    const handleChange = e => {
        debugger;

        const { value, checked } = e.target;
        if (checked) {
            // push selected value in list
            seFilterLayer(FilterLayer => [...FilterLayer, value]);
        } else {
            // remove unchecked value from the list
            seFilterLayer(FilterLayer => FilterLayer.filter(x => x !== value));
        }

        //const  xxx=FilterLayer.toString();
        // view.layerViews.items[value].visible = checked
        //"status_of_station" in ( 'مهجور' , 'مغلق')
        queryFeatureLayer(view.extent);
    }




    const displayResults = (results) => {
        // Create a blue polygon
        let PointStyle = {
            type: "simple",
            symbol: {
                type: "picture-marker",
                url: "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
                width: "18px",
                height: "18px",
            }
        }




        const popupTemplate = {
            outFields: ["name_of_station"],
            title: "{name_of_station}",
            content: "{name_of_station}",
           // actions: [_Datastate.DataView.esriPoup_DetailsThisAction] // Store Global (Configuration Action Details)
        };


        // Assign styles and popup to features

        // results.features.map((feature) => {
        //     feature.symbol = PointStyle;
        //     feature.popupTemplate = popupTemplate;
        //     return feature;
        // });

        // Clear display
        view.popup.close();
        view.graphics.removeAll();
        // Add features to graphics layer
        view.graphics.addMany(results.features);

    }


    const queryFeatureLayer = (extent) => {
        //  debugger;
        const oFilterLayer = FilterLayer.map(function (value, index) { return "'" + value + "'" }).filter((v, i, a) => a.indexOf(v) === i).toString();

        const parcelQuery = {

            //where: "status_of_station in ('مهجور1','مغلق1')",  // Set by select element
            where: "status_of_station  in (" + oFilterLayer + ")",
            //spatialRelationship: "intersects", // Relationship operation to apply
            // geometry: extent, // Restricted to visible extent of the map
            outFields: ["name_of_station", "status_of_station", "amana_ar ", "modified", "f360_images", "x", "y"], // Attributes to return
            returnGeometry: true
        };
        LayerStation.queryFeatures(parcelQuery).then((results) => {

            console.log("Feature count: " + results.features.length)
            displayResults(results);

        }).catch((error) => {
            console.log(error.error);
        });
    }

    useEffect(() => {
        view.ui.add(ContectFlitterRef.current, "bottom-left"); // Specication Place  bottom-left (List Layer)
        view.ui.add(IconFlitterRef.current, "bottom-left"); // Specication Place  bottom-left (Button Show and Hide Layer)
        // let expand2 = new Expand({
        //     view: view,
        //     content: IconLayerRef.current,
        //     expandIconClass: "esri-icon-key",
        //     group: "bottom-right"
        //   });

        //   view.ui.add(expand2, "top-left"); 
    }, []);

    return (
        <>

            <div>
                <button ref={IconFlitterRef} className="btn btn-default btn-circle-lg IconFiltter" onClick={() => setShowDiv(!showDiv)}>
                    <img style={{ filter: 'invert(0%)', padding: '5px 0' }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABmJLR0QA/wD/AP+gvaeTAAAB4ElEQVQ4jd2RTYuSYRSG77eEaONGcu1i9A+0amGiiGCYLmYv0zaaARduI/9CRT/An1ALmZ0G4sKFK0HRV1LwCwQH8yOHeb1a5CtT5KRmm244i/PxXOc850j/SIYkAQ8kfZAUl3T/QJYl6aOkl4ZhLG3wK0nvGo2GJpPJQVSn0ymv1ytJ54ZhvHes4yeSlEwmFQgEDgIXCgWVSqUNywZPJcnn8ykQCCgaje4FzeVy6vf7tjvdJAAvcLVcLkkkEuTzeda6BB5vsUuAYrFILBZjPp8DXAHen7oCT4Cv0+mUaDRKuVy24W9+nRDIAFQqFSKRCJPJBGAOPP3tl4Aw8G08HhMOh6lWqzY8favmHKBerxMKhRiNRgBL4Nmd+wJOgZvhcEgoFMI0TYAV8GJtq3a7TTAYpNfrAdwApzsdAzgDVp1OB7/fT7vdBrgGrrvdLn6/n1arZTc82wl6C35hHyeVStkrIZVKUSwWbfdi2/t72xKGYbyVZLrdblmWtYlbliW32y1J5rpmP7A9+IG5P4IP1v8HxuFwqFaraTabHRVc8Xg8SqfTisfjymazgjtvtpuAR8AngMViQSaTweVy0Ww2ARrHaPAcMAEGgwGWZQHk/n70H/CHwGvgC/AZODkKeF99B6FTmQO3FDetAAAAAElFTkSuQmCC" />
                </button>
            </div>

            <div ref={ContectFlitterRef} className="ContentFiltter" style={{ margin: 30, display: (showDiv) ? "block" : "none" }}>
                <h5 style={{ color: "#06706d", margin: 0, padding: 0 }}> <i className={'fas fa-filter'} /> Filtter</h5>

                <hr style={{ color: "#06706d", margin: 10 }} ></hr>


                {ILst_Layer.map((x, i) =>


                    <label key={i}>

                        <input
                            type="checkbox"
                            defaultChecked={x.defaultChecked}
                            name="Layer"
                            value={x.value}
                            onChange={handleChange}
                        /> {x.label}
                    </label>


                )}
            </div>
        </>
    );
};


export default FlitterTypeSation;




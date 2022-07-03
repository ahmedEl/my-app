
import React, { useEffect, useState, useRef } from "react";
import _FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import "../Style_App/Style_inputChecBox.css"
import { useSelector, useDispatch } from 'react-redux'
import {  getFeaturesFromMap } from '../StoreMultiReducer/DataFeatureFromMapSlice';

const FlitterTypeSation = ({ view }) => {
    const IconFlitterRef = useRef();
    const ContectFlitterRef = useRef();

    const dispatch = useDispatch()
    const _Datastate = useSelector((ConsumeDatastate) => ConsumeDatastate);


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
        //debugger;

        const { value, checked } = e.target;
        var updatedList = [...FilterLayer];
        if (checked) {
            updatedList = [...FilterLayer, value];
        } else {
            updatedList.splice(FilterLayer.indexOf(value), 1);
            // seFilterLayer(prev => prev.filter(x => x !== value));
        }
        seFilterLayer(updatedList);
        const oFilterLayer = updatedList.map(function (value, index) { return "'" + value + "'" }).filter((v, i, a) => a.indexOf(v) === i).toString();
        LayerStation.definitionExpression = "status_of_station  in (" + oFilterLayer + ")";


        if(_Datastate.feaOnMap.IsOpenPoupListStation)
        {
            dispatch(getFeaturesFromMap({ view: view }));
        }
        

        // view.whenLayerView(LayerStation).then(function (layerView) {

        //     const query = LayerStation.createQuery();
        //     query.outFields = ["name_of_station", "status_of_station", "amana_ar ", "modified", "f360_images", "x", "y"];
        //     query.returnDistinctValues = true;
        //     query.returnGeometry = false;
        //     LayerStation.queryFeatures(query).then(function (results) {
        //         results.features.map(function (feat) {

        //             console.log(feat);
        //         });
        //     });
        // });


       // console.log(updatedList);

    }

    useEffect(() => {
        view.ui.add(ContectFlitterRef.current, "bottom-left"); // Specication Place  bottom-left (List Layer)
        view.ui.add(IconFlitterRef.current, "bottom-left"); // Specication Place  bottom-left (Button Show and Hide Layer)
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

                {/* <div>Selected FilterLayer: {FilterLayer.length ? FilterLayer.join(', ') : null}</div> */}




                <div className="checkList">
                    <div className="title">Your CheckList</div>
                    <div className="list-container">
                        {ILst_Layer.map((x, i) => (
                            <div key={i}>
                                <label>
                                    <input
                                        type="checkbox"
                                        defaultChecked={x.defaultChecked}
                                        name="Layer"
                                        value={x.value}
                                        onChange={handleChange}
                                    /> {x.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>




            </div>

               {/* <FlitterTypeSation view={view} /> */}

            
        </>
    );
};


export default FlitterTypeSation;




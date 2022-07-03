
import React, { useEffect, useState, useRef } from "react";
import "../Style_App/Style_inputChecBox.css"
import Expand from "@arcgis/core/widgets/Expand";

const List_Layer = ({ view }) => {
    const ContentlstLayer = useRef(); // docoument.getelementID("formRef"); // Show Data In Custome Poup
    const IconLayerRef = useRef();
    const ContectFlitterLayer = useRef();;
    const LayerStation = view.map.findLayerById("feature_station");
    const ILst_Layer = [
        { value: "0", label: "All Station", defaultChecked: true }
    ];

    const [showDiv, setShowDiv] = useState(false)
    const [Layer, setLayer] = useState([]);


    const handleChange = e => {
        const { value, checked } = e.target;
        if (checked) {
            // push selected value in list
            setLayer(prev => [...prev, value]);
        } else {
            // remove unchecked value from the list
            setLayer(prev => prev.filter(x => x !== value));
        }

       // view.layerViews.items[value].visible = checked
       LayerStation.visible= checked;
    }


    useEffect(() => {
        view.ui.add(ContentlstLayer.current, "bottom-left"); // Specication Place  bottom-left (List Layer)
        view.ui.add(IconLayerRef.current, "bottom-left"); // Specication Place  bottom-left (Button Show and Hide Layer)



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
                <button ref={IconLayerRef} className="btn btn-default btn-circle-lg def" onClick={() => setShowDiv(!showDiv)}>
                    <img style={{ filter: 'invert(1)', padding: '5px 0' }} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjEuNjk4IDEwLjY1OGwyLjMwMiAxLjM0Mi0xMi4wMDIgNy0xMS45OTgtNyAyLjMwMS0xLjM0MiA5LjY5NyA1LjY1OCA5LjctNS42NTh6bS05LjcgMTAuNjU3bC05LjY5Ny01LjY1OC0yLjMwMSAxLjM0MyAxMS45OTggNyAxMi4wMDItNy0yLjMwMi0xLjM0Mi05LjcgNS42NTd6bTAtMTlsOC4wMzIgNC42ODUtOC4wMzIgNC42ODUtOC4wMjktNC42ODUgOC4wMjktNC42ODV6bTAtMi4zMTVsLTExLjk5OCA3IDExLjk5OCA3IDEyLjAwMi03LTEyLjAwMi03eiIvPjwvc3ZnPg==" />
                </button>
            </div>

            <div ref={ContentlstLayer} className="ContentLayer" style={{ margin: 30, display: (showDiv) ? "block" : "none" }}>
                <h5 style={{ color: "#06706d", margin: 0, padding: 0 }}> <i className={'fas fa-layer-group'} /> List Layer</h5>

                <hr style={{ color: "#06706d", margin: 10 }} ></hr>

                <div className='title'>
                {ILst_Layer.map((x, i) => <label key={i}>
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

            </div>
        </>
    );
};


export default List_Layer;




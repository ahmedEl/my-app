//rsc
//#region Using 
import React, { useEffect, useState } from "react";
import _FeatureLayer from "@arcgis/core/layers/FeatureLayer";


import Slider from 'react-slide-out';
import 'react-slide-out/lib/index.css';

import SimpleImageSlider from "react-simple-image-slider";
import { useSelector, useDispatch } from 'react-redux'
import { LoadingAction, OpenSliderAction } from '../StoreMultiReducer/CurrentFeatureSlice';
import LoadingSpinner from "./Loading";
//#endregion


function Details_Station(view) {


    // Data State
    const _Datastate = useSelector((ConsumeDatastate) => ConsumeDatastate);
    const [isHovering_Info, setIsHovering_Info] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch()
    const current = new Date();

    const openSlideOut = () => {
        dispatch(OpenSliderAction({ OpenSlider: true }));
    };

    const closeSlideOut = () => {
        dispatch(OpenSliderAction({ OpenSlider: false }));
    };
    return (
        <div>

            {!isHovering_Info &&

                <i className={"fas fa-arrow-left icon_InfoDetailsFeature"} style={{ color: "#02877a" }}></i>

            }


            {_Datastate.DataView.CurrentFearure &&

                <i className={isHovering_Info ? 'fa-solid fa-circle-info fa-beat icon_InfoDetailsFeature' : 'fa-solid fa-circle-info icon_InfoDetailsFeature'}
                    title={"عرض تفاصيل محطة " + _Datastate.DataView.CurrentFearure.name_of_station}
                    onMouseOver={() => setIsHovering_Info(false)}
                    onMouseOut={() => setIsHovering_Info(true)}
                    onClick={openSlideOut}></i>
            }



            
            <Slider isOpen={_Datastate.DataView.OpenSlider} onClose={closeSlideOut} onOutsideClick={closeSlideOut} width={"100px"}>
                {
                    _Datastate.DataView.Loading 
                    ? (<div className="column" style={{ width: "100%", position: "absolute", top: "43%" }}>
                        <i className="fas fa-circle-notch fa-spin" style={{ fontSize: "60px" }} ></i>
                    </div>) :
                        (<>
                            
                                <div >
                                    <SimpleImageSlider
                                        width={"100%"}
                                        height={304}
                                        images={(_Datastate.DataView.images.length > 0) ? _Datastate.DataView.images : ["https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png"]}
                                        showBullets={true}
                                        showNavs={true}
                                    />
                                </div>


                                <div className="row">
                                    <div className="column" style={{ width: "50%" }}>
                                        <div className="card">
                                            <h4>الامانة <i className={'fa-solid fa-bag-shopping icon_card'} /></h4>
                                            <p>{_Datastate.DataView.CurrentFearure && _Datastate.DataView.CurrentFearure.amana_ar}</p>

                                        </div>
                                    </div>

                                    <div className="column" style={{ width: "50%" }}>
                                        <div className="card">
                                            <h4>الحالة <i className={'fa-solid fa-street-view icon_card'} /></h4>
                                            <p>{_Datastate.DataView.CurrentFearure && _Datastate.DataView.CurrentFearure.status_of_station}</p>

                                        </div>
                                    </div>

                                    <div className="column" style={{ width: "50%" }}>
                                        <div className="card">

                                            <h4>اسم المحطة <i className={'fa-solid fa-landmark icon_card'} /> </h4>
                                            <p>{_Datastate.DataView.CurrentFearure && _Datastate.DataView.CurrentFearure.name_of_station}</p>

                                        </div>
                                    </div>

                                    <div className="column" style={{ width: "50%" }}>
                                        <div className="card">
                                            <h4>رقم المعاملة <i className={'fa-solid fa-thumbtack icon_card'} /></h4>
                                            <p>{_Datastate.DataView.CurrentFearure && _Datastate.DataView.CurrentFearure.objectid}</p>

                                        </div>
                                    </div>

                                    <div className="column" style={{ width: "50%" }}>
                                        <div className="card">
                                            <h4>تاريخ التحديث <i className={'fa-solid fa-map-pin icon_card'} /></h4>

                                            <p>{current.getDate()}/{current.getMonth() + 1}/{current.getFullYear()}</p>
                                        </div>
                                    </div>

                                    <div className="column" style={{ width: "50%" }}>
                                        <div className="card">
                                            <h4>دفع الكترونى <i className={'fas fa-exclamation-circle icon_card'} /></h4>

                                            <p>يوجد</p>
                                        </div>
                                    </div>

                                </div>

                                <div className="footer_Slider">
                                    <div className="footer--icons">

                                        <i className={'fa-solid fa-window-close  icon_Location'} style={{ color: 'white', margin: "5px", float: 'left' }} title={"اغلاق "} onClick={() => {
                                            console.log(_Datastate.DataView);
                                            closeSlideOut();

                                        }} ></i>


                                        <i className={'fa-solid fa-location-dot icon_Location'} style={{ color: 'white', margin: "5px", float: 'right' }} title={"عرض موقع المحطة "} onClick={() => {
                                            console.log(_Datastate.DataView);
                                            closeSlideOut();
                                            view.view.goTo({
                                                center: [_Datastate.DataView.CurrentFearure.x, _Datastate.DataView.CurrentFearure.y],
                                                zoom: 18
                                            });
                                        }} ></i>

                                    </div>
                                </div>
                           
                         </>)}
            </Slider>
        </div>
    );
};


export default Details_Station;





import React, { useEffect, useState, useRef, useCallback } from "react";
import Slider from 'react-slide-out';
import 'react-slide-out/lib/index.css';
import "../Style_App/Loading.css";
import { useDispatch } from 'react-redux'
import { openSlideOutAction, closeSlideOutAction, ToggleBulidNewDataInWidget_Loading, getFeaturesFromMap, fetchMoreListItemsAction } from '../StoreMultiReducer/DataFeatureFromMapSlice';
import { useSelector } from 'react-redux'

const FlitterTypeSation_Details = ({ view }) => {
    const IconLayerRef = useRef();

    const ContentListsStation = useRef();
    const dispatch = useDispatch()
    const _Datastate = useSelector((ConsumeDatastate) => ConsumeDatastate);

    const handleChange = () => {
        dispatch(getFeaturesFromMap({ view: view }));
    }

    useEffect(() => {
        console.log('add addEventListener')
        const div = ContentListsStation.current
        if (div) {
            div.addEventListener("scroll", handleScroll)
            return () => div.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll])




    const openSlideOut = () => {
        dispatch(openSlideOutAction());
    };

    const closeSlideOut = () => {
        dispatch(closeSlideOutAction());
    };



    useEffect(() => {
        view.ui.add(IconLayerRef.current, "bottom-left"); // Specication Place  bottom-left (Button Show and Hide Layer)
    }, []);






    useEffect(() => {
        //   debugger;
        if (!_Datastate.feaOnMap.BulidNewDataInWidget_Loading) return;
        fetchMoreListItems();
    }, [_Datastate.feaOnMap.BulidNewDataInWidget_Loading]);

    function handleScroll() {
        if (ContentListsStation.current.scrollTop + ContentListsStation.current.offsetHeight !== ContentListsStation.current.scrollHeight || _Datastate.feaOnMap.BulidNewDataInWidget_Loading) return;
        if (_Datastate.feaOnMap.BulidNewDataInWidget.length < _Datastate.feaOnMap.AllDataFeature.length) {
            // setIsFetching(true);
            dispatch(ToggleBulidNewDataInWidget_Loading({ IsLoadind: true }));
        }
        else {
            // setIsFetching(false);
            dispatch(ToggleBulidNewDataInWidget_Loading({ IsLoadind: false }));
        }
    }

    function fetchMoreListItems() {
        debugger;
        setTimeout(() => {
            dispatch(fetchMoreListItemsAction());
        }, 2000);
    }




    return (
        <>
            <div>
                <button ref={IconLayerRef} style={{ bottom: "190px", height: "45px", width: "50px" }} className="btn btn-default btn-circle-lg def" onClick={() => handleChange()}>
                    {_Datastate.feaOnMap.Loading || _Datastate.feaOnMap.BulidNewDataInWidget_Loading
                        ? (<i className="fas fa-circle-notch fa-spin" style={{ fontSize: "25px" }} ></i>)
                        : (<i className="fa-solid fa-charging-station" style={{ fontSize: "25px" }} ></i>)
                    }
                </button>
            </div>



            <Slider isOpen={_Datastate.feaOnMap.IsOpenPoupListStation} onClose={closeSlideOut} onOutsideClick={closeSlideOut} >

                {
                    _Datastate.feaOnMap.Loading 
                    ? (<div className="column" style={{ width: "100%", position: "absolute", top: "43%" }}>
                        <i className="fas fa-circle-notch fa-spin" style={{ fontSize: "60px" }} ></i>
                    </div>)
                     :(
                            _Datastate.feaOnMap.StatusRequest == "Rejected" 
                            ? (<div className="column" style={{ width: "100%", position: "absolute", top: "43%" }}>
                                    لا يوجد بيانات ليتم عرضها !!
                                    <br></br>
                                    <i className={'fa-solid fa-window-close  icon_Location'}  title={"اغلاق "} onClick={() => {
                                                closeSlideOut();
                                            }} ></i>
                                </div>)

                             :   <div className="row scrollableContainer" ref={ContentListsStation} >
                                    {
                                        _Datastate.feaOnMap.BulidNewDataInWidget.map((x, i) => (
                                            <div key={i} className="column" style={{ width: "50%", cursor: "pointer" }}
                                                onClick={() => {
                                                    view.goTo({
                                                        center: [x.attributes.x, x.attributes.y],
                                                        zoom: 21
                                                    });


                                                }}>
                                                <div className="card">
                                                    <h5>{x.attributes.name_of_station ?? "لا يوجد اسم"} </h5>
                                                    <p>{x.attributes.status_of_station ?? "لا يوجد حالة"}</p>

                                                </div>
                                            </div>
                                        ))}

                                    <div style={{ position: "absolute", top: "0%", right: "5%" }}>
                                        <div className="footer--icons">
                                            <i className={'fa-solid fa-window-close  icon_Location'} style={{ color: '#06706d', margin: "5px", float: 'left' }} title={"اغلاق "} onClick={() => {
                                                closeSlideOut();
                                            }} ></i>
                                        </div>
                                    </div>



                                    {_Datastate.feaOnMap.BulidNewDataInWidget_Loading &&
                                        <div className="column" style={{ width: "100%", height: "140px" }}>

                                            <i className="fas fa-circle-notch fa-spin" style={{ fontSize: "35px", textAlign: "center" }} ></i>
                                            <br />
                                            <strong style={{ textAlign: "center", marginLeft: "12px" }}>Loading ...</strong>

                                        </div>
                                    }

                                </div>

                        )
                }
            </Slider>

        </>
    );
};


export default FlitterTypeSation_Details;




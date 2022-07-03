//rsc
//#region Using 
import React, { useEffect, useState } from "react";
import Graphic from "@arcgis/core/Graphic";
import _FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { useRef } from "react";
import Home from "@arcgis/core/widgets/Home";

import Slider from 'react-slide-out';
import 'react-slide-out/lib/index.css';

import SimpleImageSlider from "react-simple-image-slider";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

//#endregion


const DetailsStation = ({ view }) => {
    const [slideOutIsOpen, setSlideOutIsOpen] = useState(false);
    const [CurrentFearure, setCurrentFearure] = useState(null);
    const [images, setimages] = useState([]);

    const [isHovering_Info, setIsHovering_Info] = useState(true);

    const ShowContentDetails = useRef();


    const current = new Date();

    const openSlideOut = () => {
        setSlideOutIsOpen(true);
    };

    const closeSlideOut = () => {
        setSlideOutIsOpen(false);
    };

    


    useEffect(() => { 
        
        // view.ui.add(ShowContentDetails.current, "top-right");
        
        // Run First Time When Load Component
        view.on("click", (event) => { // When Click in map Get Data And attributes
            view.hitTest(event).then((resp) => {
                // Return Data
                if (resp.results.length > 0) {
                    // debugger;
                    console.log(resp.results[0].graphic.attributes);
                    setCurrentFearure(resp.results[0].graphic.attributes);
                    setimages([]);
                   if (resp.results[0].graphic.attributes.f360_images !=null ) 
                   {
                    setimages (Array.from(resp.results[0].graphic.attributes.f360_images.split(','),String).map( Photo => "https://s3.eu-central-1.wasabisys.com/tecsolution/gasstation/"+Photo) );
                   }
                    openSlideOut();
                }
            });
        });

    }, []);
    return (
        <div>

{!isHovering_Info &&  

<i className={"fas fa-arrow-left icon_InfoDetailsFeature"} style={{color: "#02877a"}}></i>

}


        {CurrentFearure &&  

            <i className={isHovering_Info ? 'fa-solid fa-circle-info fa-beat icon_InfoDetailsFeature' : 'fa-solid fa-circle-info icon_InfoDetailsFeature'}
            title={ "عرض تفاصيل محطة " + CurrentFearure.name_of_station}
              onMouseOver={()=>setIsHovering_Info(false)}
              onMouseOut={()=>setIsHovering_Info(true)}
               onClick={openSlideOut}></i>
           
        }
            <Slider isOpen={slideOutIsOpen} onClose={closeSlideOut} onOutsideClick={closeSlideOut}>

                <div >
                    <SimpleImageSlider
                        width={959}
                        height={304}
                        images={(images.length > 0) ? images : ["https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png"]}
                        showBullets={true}
                        showNavs={true}
                    />
                </div>


                    <div className="row">
                        <div className="column">
                            <div className="card">
                                <h3>الامانة</h3>
                                <p>{CurrentFearure && CurrentFearure.amana_ar}</p>
                         
                            </div>
                        </div>

                        <div className="column">
                            <div className="card">
                                <h3>الحالة</h3>
                                <p>{CurrentFearure  && CurrentFearure.status_of_station}</p>
                           
                            </div>
                        </div>

                        <div className="column">
                            <div className="card">
                                <h3>اسم المحطة</h3>
                                <p>{CurrentFearure && CurrentFearure.name_of_station}</p>
                    
                            </div>
                        </div>

                        <div className="column">
                            <div className="card">
                                <h3>رقم المعاملة</h3>
                                <p>{CurrentFearure && CurrentFearure.objectid}</p>
                            
                            </div>
                        </div>

                         <div className="column">
                            <div className="card">
                                <h3>تاريخ التحديث</h3>
                              
                         <p>{current.getDate()}/{current.getMonth()+1}/{current.getFullYear()}</p>
                            </div>
                        </div>
                 
                        <div className="column">
                            <div className="card">
                                <h3>دفع الكترونى</h3>
                              
                         <p>يوجد</p>
                            </div>
                        </div>
                 
                    </div>

                {/* <h2>My Slide Out</h2>

                <div>This is the content inside React Slide Out component.</div>
                <button onClick={closeSlideOut}>Close slide-out</button> */}
            </Slider>
        </div>
    );
};


export default DetailsStation;




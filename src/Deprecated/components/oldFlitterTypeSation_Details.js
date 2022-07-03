
import React, { useEffect, useState, useRef ,useCallback} from "react";
import Slider from 'react-slide-out';
import 'react-slide-out/lib/index.css';
import "../Style_App/Loading.css";
import useInfiniteScroll from 'react-infinite-scroll-hook';

const FlitterTypeSation_Details = ({ view }) => {
    const IconLayerRef = useRef();
    const ContentListsStation = useRef();

    
    const [DataFeature, setDataFeature] = useState([]);
    const LayerStation = view.map.findLayerById("feature_station");
    const [slideOutIsOpen, setSlideOutIsOpen] = useState(false);


    const [listItems, setListItems] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [Loading, setLoading] = useState(false);


    const handleChange = () => {
        openSlideOut();
        setLoading(true);
        view.whenLayerView(LayerStation).then(function (layerView) {


                const query = LayerStation.createQuery();
                query.outFields = ["name_of_station", "status_of_station", "amana_ar ", "modified", "f360_images", "x", "y"];
                query.returnDistinctValues = true;
                query.returnGeometry = false;
                LayerStation.queryFeatures(query).then(function (results) {
        
                    //console.log(results.feature.length);
                    setDataFeature(results.features);
                    setListItems(results.features.slice(0,30))  ;
                    setLoading(false);
                    // results.features.map(function (feat) {
                    //     console.log(feat);
                    // });
                });
            });
    }

    const openSlideOut = () => {
        setSlideOutIsOpen(true);
    };

    const closeSlideOut = () => {
        setSlideOutIsOpen(false);
    };



    useEffect(() => {
        console.log('onload');
        view.ui.add(IconLayerRef.current, "bottom-left"); // Specication Place  bottom-left (Button Show and Hide Layer)
    }, []);



    useEffect(() => {
        console.log('add addEventListener')
        const div = ContentListsStation.current
        if (div) {
            div.addEventListener("scroll", handleScroll)
            return () => div.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll])

    
      useEffect(() => {
        //   debugger;
        if (!isFetching) return;
        fetchMoreListItems();
      }, [isFetching]);
    
      function handleScroll() {
         if (ContentListsStation.current.scrollTop + ContentListsStation.current.offsetHeight !== ContentListsStation.current.scrollHeight|| isFetching) return;
          if (listItems.length < DataFeature.length) {
              setIsFetching(true);
          }
          else {
              setIsFetching(false);
          }
      }




    
    function fetchMoreListItems() {
        setTimeout(() => {

            if (listItems.length < DataFeature.length) {
                setListItems([...listItems, ...DataFeature.slice(listItems.length, (listItems.length * 2))]);
                setIsFetching(false);
            }
            else {
                setIsFetching(false);
            }

        }, 2000);
    }


      


    return (
        <>
            <div>
                <button ref={IconLayerRef}  style={{ bottom : "190px" , height : "45px" , width : "50px" }}  className="btn btn-default btn-circle-lg def" onClick={() => handleChange()}>
                  {Loading 
                  ? (<i class="fas fa-circle-notch fa-spin" style={{ fontSize: "25px" }} ></i>)
                  :(<i class="fa-solid fa-charging-station" style={{ fontSize: "25px" }} ></i>)
                  }  
                </button>
            </div>



            <Slider isOpen={slideOutIsOpen} onClose={closeSlideOut} onOutsideClick={closeSlideOut} >

                {Loading ? (<div className="column" style={{ width: "100%", position: "absolute" , top: "43%" }}>
                    <i class="fas fa-circle-notch fa-spin" style={{ fontSize: "60px" }} ></i>
                </div>) :
                    // Check if View Not Null Sent View As Props to Componet ( MapWidgets - MapGraphics)
                    (

                        <div className="row scrollableContainer" ref={ContentListsStation} >
                            {listItems.map((x, i) => (
                                <div key={i} className="column" style={{ width: "50%" ,cursor:"pointer" }}
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

                            <div  style={{ position:"absolute",top:"0%", right:"5%"  }}>
                                <div class="footer--icons">
                                    <i className={'fa-solid fa-window-close  icon_Location'} style={{ color: '#06706d', margin: "5px", float: 'left' }} title={"اغلاق "} onClick={() => {
                                        closeSlideOut();
                                    }} ></i>
                                </div>
                            </div>

                            

                            {isFetching &&
                                <div className="column" style={{ width: "100%", height: "140px" }}>
                               
                                    <i class="fas fa-circle-notch fa-spin" style={{ fontSize: "35px" ,textAlign:"center" }} ></i>
                                    <br/>
                                    <strong style={{ textAlign:"center" ,marginLeft:"12px" }}>Loading ...</strong>
                                    
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




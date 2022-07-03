
//#region  Methoud
const PointStyle = {
    type: "simple",
    symbol: {
        type: "picture-marker",
        url: "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
        width: "18px",
        height: "18px",
    }
}

const PointLabel = {
    // Content
    labelExpressionInfo: {
        //expression: "$feature.TRL_NAME + ' m'"
        expression: "$feature.name_of_station"

    },

    // Appearance
    symbol: {
        type: "text",
        color: "white",
        haloColor: [30, 70, 190],
        haloSize: 1,
        font: {
            family: "arial",
            style: "normal",
            weight: "bold",
            size: 10
        }
    },

    // Placement
    labelPlacement: "above-center",

    // Visibility
    //where: "ELEVATION > 2000"
}
//#endregion

//#region  Output
const StylesFeatures= {PointStyle , PointLabel }
export default StylesFeatures
//#endregion





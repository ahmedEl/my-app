import ConfigActions from './Config_Actions'

//#region  Methoud
const PopupStation = {
    outFields: ["name_of_station"],
    title: "{name_of_station}",
    content: "{name_of_station}",
    actions: [ConfigActions.DetailsThisAction] // Store Global (Configuration Action Details)
};

//#endregion


//#region  Output
const PopupTemplate= {PopupStation}
export default PopupTemplate
//#endregion
import {
    ADD_LOGGED_USER,
   ADD_FUNCTIONAL_UNIT_OFFLINE,
   UPDATE_SERVER_FUNCTIONAL_UNIT,
   UPDATE_OFFLINE_FUNCTIONAL_UNIT,
   REMOVE_FROM_UPDATE_SERVER_FUNIT,
   REMOVE_FROM_OFFLINE_FUNIT,
   ADD_FOREST_UNIT_OFFLINE_PHASE1,
   UPDATE_SERVER_FOREST_UNIT_PHASE1,
   UPDATE_OFFLINE_FOREST_UNIT_PHASE1,
   REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE1,
   REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE1,
   ADD_FOREST_UNIT_OFFLINE_PHASE2,
   UPDATE_SERVER_FOREST_UNIT_PHASE2,
   UPDATE_OFFLINE_FOREST_UNIT_PHASE2,
   REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE2,
   REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE2,
   ADD_FOREST_UNIT_OFFLINE_PHASE3,
   UPDATE_SERVER_FOREST_UNIT_PHASE3,
   UPDATE_OFFLINE_FOREST_UNIT_PHASE3,
   REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE3,
   REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE3,


   ADD_TUNNEL_DEFORMATION_OFFLINE,
   UPDATE_SERVER_TUNNEL_DEFORMATION_OFFLINE,
   UPDATE_TUNNEL_DEFORMATION_OFFLINE,
   REMOVE_FROM_UPDATE_SERVER_TUNNEL_DEFORMATION_OFFLINE,
   REMOVE_FROM_TUNNEL_DEFORMATION_OFFLINE,

   ADD_HILLSIDE_MOVEMENT_OFFLINE,
   UPDATE_SERVER_HILLSIDE_MOVEMENT_OFFLINE,
   UPDATE_HILLSIDE_MOVEMENT_OFFLINE,
   REMOVE_FROM_UPDATE_SERVER_HILLSIDE_MOVEMENT_OFFLINE,
   REMOVE_FROM_UPDATE_HILLSIDE_MOVEMENT_OFFLINE,

   ADD_RAINFALL_OFFLINE,
   UPDATE_SERVER_RAINFALL_OFFLINE,
   UPDATE_RAINFALL_OFFLINE,
   REMOVE_FROM_UPDATE_SERVER_RAINFALL_OFFLINE,
   REMOVE_FROM_UPDATE_RAINFALL_OFFLINE,

   ADD_HILLSIDE_COLLAPSE_OFFLINE,
   UPDATE_SERVER_HILLSIDE_COLLAPSE_OFFLINE,
   UPDATE_HILLSIDE_COLLAPSE_OFFLINE,
   REMOVE_FROM_UPDATE_SERVER_HILLSIDE_COLLAPSE_OFFLINE,
   REMOVE_FROM_UPDATE_HILLSIDE_COLLAPSE_OFFLINE,

   ADD_RIVER_COLLAPSE_OFFLINE,
   UPDATE_SERVER_RIVER_COLLAPSE_OFFLINE,
   UPDATE_RIVER_COLLAPSE_OFFLINE,
   REMOVE_FROM_UPDATE_SERVER_RIVER_COLLAPSE_OFFLINE,
   REMOVE_FROM_UPDATE_RIVER_COLLAPSE_OFFLINE,


   ADD_PLANTATION_REPORT_OFFLINE,
   UPDATE_SERVER_PLANTATION_REPORT_OFFLINE,
   UPDATE_PLANTATION_REPORT_OFFLINE,
   REMOVE_FROM_UPDATE_SERVER_PLANTATION_REPORT_OFFLINE,
   REMOVE_FROM_PLANTATION_REPORT_OFFLINE,

   SET_NS_APP_STATE,
   SET_NS_MEMORY_STATE

}  from "../types";


export const addLoggedUser = (data) => ({
  type: ADD_LOGGED_USER,
  payload: data
});

export const addOfflineFunctionalUnit = (data) => ({
  type: ADD_FUNCTIONAL_UNIT_OFFLINE,
  payload: data
});

export const updateServerFunctionalUnit = (data) => ({
  type: UPDATE_SERVER_FUNCTIONAL_UNIT,
  payload: data
});

export const updateOfflineFunctionalUnit = (data) => ({
  type: UPDATE_OFFLINE_FUNCTIONAL_UNIT,
  payload: data
});

export const removeFromFunctionalUnitServerUpdate = (data) => ({
  type: REMOVE_FROM_UPDATE_SERVER_FUNIT,
  payload: data
});

export const removeFromOfflineFunctionalUnit = (data) => ({
  type: REMOVE_FROM_OFFLINE_FUNIT,
  payload: data
});

//phase 1

export const addOfflineForestUnitP1 = (data) => ({
  type: ADD_FOREST_UNIT_OFFLINE_PHASE1,
  payload: data
});

export const updateServerForestUnitP1 = (data) => ({
  type: UPDATE_SERVER_FOREST_UNIT_PHASE1,
  payload: data
});

export const updateOfflineForestUnitP1 = (data) => ({
  type: UPDATE_OFFLINE_FOREST_UNIT_PHASE1,
  payload: data
});

export const removeFromForestUnitP1ServerUpdate = (data) => ({
  type: REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE1,
  payload: data
});

export const removeFromOfflineForestUnitP1 = (data) => ({
  type: REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE1,
  payload: data
});

//phase 2

export const addOfflineForestUnitP2 = (data) => ({
  type: ADD_FOREST_UNIT_OFFLINE_PHASE2,
  payload: data
});

export const updateServerForestUnitP2 = (data) => ({
  type: UPDATE_SERVER_FOREST_UNIT_PHASE2,
  payload: data
});

export const updateOfflineForestUnitP2 = (data) => ({
  type: UPDATE_OFFLINE_FOREST_UNIT_PHASE2,
  payload: data
});

export const removeFromForestUnitP2ServerUpdate = (data) => ({
  type: REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE2,
  payload: data
});

export const removeFromOfflineForestUnitP2 = (data) => ({
  type: REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE2,
  payload: data
});


//phase 3

export const addOfflineForestUnitP3 = (data) => ({
  type: ADD_FOREST_UNIT_OFFLINE_PHASE3,
  payload: data
});

export const updateServerForestUnitP3 = (data) => ({
  type: UPDATE_SERVER_FOREST_UNIT_PHASE3,
  payload: data
});

export const updateOfflineForestUnitP3 = (data) => ({
  type: UPDATE_OFFLINE_FOREST_UNIT_PHASE3,
  payload: data
});

export const removeFromForestUnitP3ServerUpdate = (data) => ({
  type: REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE3,
  payload: data
});

export const removeFromOfflineForestUnitP3 = (data) => ({
  type: REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE3,
  payload: data
});

//tunnelDeformation

export const addOfflineTunnelDeformation = (data) => ({
  type: ADD_TUNNEL_DEFORMATION_OFFLINE,
  payload: data
});

export const updateServerTunnelDeformation = (data) => ({
  type: UPDATE_SERVER_TUNNEL_DEFORMATION_OFFLINE,
  payload: data
});


export const updateOfflineTunnelDeformation = (data) => ({
  type: UPDATE_TUNNEL_DEFORMATION_OFFLINE,
  payload: data
});

export const removeFromTunnelDeformationServerUpdate = (data) => ({
  type: REMOVE_FROM_UPDATE_SERVER_TUNNEL_DEFORMATION_OFFLINE,
  payload: data
});

export const removeFromOfflineTunnelDeformation = (data) => ({
  type: REMOVE_FROM_TUNNEL_DEFORMATION_OFFLINE,
  payload: data
});

//HillsideMovement

export const addOfflineHillSideMov = (data) => ({
  type: ADD_HILLSIDE_MOVEMENT_OFFLINE,
  payload: data
});

export const updateServerHillSideMov = (data) => ({
  type: UPDATE_SERVER_HILLSIDE_MOVEMENT_OFFLINE,
  payload: data
});


export const updateOfflineHillSideMov = (data) => ({
  type: UPDATE_HILLSIDE_MOVEMENT_OFFLINE,
  payload: data
});

export const removeFromHillSideMovServerUpdate = (data) => ({
  type: REMOVE_FROM_UPDATE_SERVER_HILLSIDE_MOVEMENT_OFFLINE,
  payload: data
});

export const removeFromOfflineHillSideMov = (data) => ({
  type: REMOVE_FROM_UPDATE_HILLSIDE_MOVEMENT_OFFLINE,
  payload: data
});

//RainFall

export const addOfflineRainFall = (data) => ({
  type: ADD_RAINFALL_OFFLINE,
  payload: data
});

export const updateServerRainFall = (data) => ({
  type: UPDATE_SERVER_RAINFALL_OFFLINE,
  payload: data
});


export const updateOfflineRainFall = (data) => ({
  type: UPDATE_RAINFALL_OFFLINE,
  payload: data
});

export const removeFromRainFallServerUpdate = (data) => ({
  type: REMOVE_FROM_UPDATE_SERVER_RAINFALL_OFFLINE,
  payload: data
});

export const removeFromOfflineRainFall = (data) => ({
  type: REMOVE_FROM_UPDATE_RAINFALL_OFFLINE,
  payload: data
});

//HillsideCollapse

export const addOfflineHillSideColl = (data) => ({
  type: ADD_HILLSIDE_COLLAPSE_OFFLINE,
  payload: data
});

export const updateServerHillSideColl = (data) => ({
  type: UPDATE_SERVER_HILLSIDE_COLLAPSE_OFFLINE,
  payload: data
});


export const updateOfflineHillSideColl = (data) => ({
  type: UPDATE_HILLSIDE_COLLAPSE_OFFLINE,
  payload: data
});

export const removeFromHillSideCollServerUpdate = (data) => ({
  type: REMOVE_FROM_UPDATE_SERVER_HILLSIDE_COLLAPSE_OFFLINE,
  payload: data
});

export const removeFromOfflineHillSideColl = (data) => ({
  type: REMOVE_FROM_UPDATE_HILLSIDE_COLLAPSE_OFFLINE,
  payload: data
});


//River Collapse

export const addOfflineRiverColl = (data) => ({
  type: ADD_RIVER_COLLAPSE_OFFLINE,
  payload: data
});

export const updateServerRiverColl = (data) => ({
  type: UPDATE_SERVER_RIVER_COLLAPSE_OFFLINE,
  payload: data
});


export const updateOfflineRiverColl = (data) => ({
  type: UPDATE_RIVER_COLLAPSE_OFFLINE,
  payload: data
});

export const removeFromRiverCollServerUpdate = (data) => ({
  type: REMOVE_FROM_UPDATE_SERVER_RIVER_COLLAPSE_OFFLINE,
  payload: data
});

export const removeFromOfflineRiverColl = (data) => ({
  type: REMOVE_FROM_UPDATE_RIVER_COLLAPSE_OFFLINE,
  payload: data
});


//plantation report

export const addOfflinePlantationReport = (data) => ({
  type: ADD_PLANTATION_REPORT_OFFLINE,
  payload: data
});

export const updateServerPlantationReport = (data) => ({
  type: UPDATE_SERVER_PLANTATION_REPORT_OFFLINE,
  payload: data
});


export const updateOfflinePlantationReport = (data) => ({
  type: UPDATE_PLANTATION_REPORT_OFFLINE,
  payload: data
});

export const removeFromPlantationReportUpdate = (data) => ({
  type: REMOVE_FROM_UPDATE_SERVER_PLANTATION_REPORT_OFFLINE,
  payload: data
});

export const removeFromOfflinePlantationReport = (data) => ({
  type: REMOVE_FROM_PLANTATION_REPORT_OFFLINE,
  payload: data
});



//SET STATE FROM NATIVE STORAGE OR FILES

export const setAppStatefromNS = (data) => ({
  type: SET_NS_APP_STATE,
  payload: data
})

export const setMemoryStatefromNS = (data) => ({
  type: SET_NS_MEMORY_STATE,
  payload: data
})

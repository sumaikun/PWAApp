import {  ADD_LOGGED_USER,
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
REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE3 ,

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


SET_NS_MEMORY_STATE

 }  from "../types";

import { editOrAddToArray, removeFromArray } from "../../helpers/objectMethods"

let storedData;



let defaultValues = {
  userLogged:{},
  offLineFunctionalUnits:[],
  serverFunctionalUnits:[],
  hasDataToSychro: false,
  offLineForestUnitsPhase1:[],
  serverForestUnitsPhase1:[],
  offLineForestUnitsPhase2:[],
  serverForestUnitsPhase2:[],
  offLineForestUnitsPhase3:[],
  serverForestUnitsPhase3:[],

  offLineTunnelDeformations:[],
  serverTunnelDeformations:[],

  offLineHillSideMovements:[],
  serverHillSideMovements:[],

  offLineRainFall:[],
  serverRainFall:[],

  offLineHillSideCollapse:[],
  serverHillSideCollapse:[],

  offLineRiverCollapse:[],
  serverRiverCollapse:[],

  offLinePlantationReport:[],
  serverPlantationReport:[]

}

try
{
  if(!window.cordova)
  {
     storedData = JSON.parse(localStorage.getItem('state'));
     if(!storedData.memory){
       storedData.memory = defaultValues;
     }
  }
}
catch(err){
  ////console.log("error getting data");
}



const initialState =  storedData ? storedData.memory  : defaultValues;
;

const generateRandomId = () => {
  let dateobj = new Date();
  return dateobj.toString().hashCode();
}

const removeFromState = ( state, stateParameter, action ) => {

  let workingVariable = state[stateParameter];

  workingVariable = removeFromArray(workingVariable,action.payload);

  state = {
    ...state,
    [stateParameter]:workingVariable
  }

  //console.log(state);

  return state;
}

const updateFromState = ( state, stateParameter, action ) => {

  //console.log(stateParameter);

  if(!action.payload.ToSynchro)
  {
    action.payload.ToSynchroEdit = true;
  }

  let workingVariable = state[stateParameter];

  console.log(workingVariable);

  workingVariable = editOrAddToArray(workingVariable,action.payload);

  state = {
    ...state,
    [stateParameter]:workingVariable
  }
  //console.log(state);
  return state;
}

const createOnState = ( state, stateParameter, action ) => {

  action.payload.id = generateRandomId();

  action.payload.ToSynchro = true;

  state = {
    ...state,
    [stateParameter]:[
      ...state[stateParameter],
      action.payload
    ]
  }

  //console.log(state);

  return state;

}

const memoryReducer = (state = initialState, action) => {

  switch(action.type) {

    case ADD_LOGGED_USER:

      state = {
        ...state,
        userLogged:action.payload
      }
      //console.log(state);
      return state;

    case ADD_FUNCTIONAL_UNIT_OFFLINE:


      state = createOnState(state,'offLineFunctionalUnits',action);

      return state;
    case UPDATE_SERVER_FUNCTIONAL_UNIT:


      updateFromState(state,'serverFunctionalUnits',action);

      return state;
    case UPDATE_OFFLINE_FUNCTIONAL_UNIT:



      updateFromState(state,'offLineFunctionalUnits',action);

      return state;

    case REMOVE_FROM_UPDATE_SERVER_FUNIT:

      state = removeFromState(state,'serverFunctionalUnits',action);

      return state;

    case REMOVE_FROM_OFFLINE_FUNIT:

      state = removeFromState(state,'offLineFunctionalUnits',action);

      return state;

    case ADD_FOREST_UNIT_OFFLINE_PHASE1:

      state = createOnState(state,'offLineForestUnitsPhase1',action);

      return state;

    case UPDATE_OFFLINE_FOREST_UNIT_PHASE1:

      state = updateFromState(state,'offLineForestUnitsPhase1',action);

      return state;

    case UPDATE_SERVER_FOREST_UNIT_PHASE1:

      state = updateFromState(state,'serverForestUnitsPhase1',action);

      return state;

    case REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE1:

      state = removeFromState(state,'serverForestUnitsPhase1',action);

      return state;

    case REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE1:

      state = removeFromState(state,'offLineForestUnitsPhase1',action);

      return state;

    case ADD_FOREST_UNIT_OFFLINE_PHASE2:

      state = createOnState(state,'offLineForestUnitsPhase2',action);

      return state;

    case UPDATE_SERVER_FOREST_UNIT_PHASE2:

      state = updateFromState(state,'serverForestUnitsPhase2',action);

      //console.log(state);

      return state;

    case UPDATE_OFFLINE_FOREST_UNIT_PHASE2:

      state = updateFromState(state,'offLineForestUnitsPhase2',action);

      console.log(state);

      return state;

    case REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE2:

      state = removeFromState(state,'serverForestUnitsPhase2',action);

      return state;

    case REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE2:

      state = removeFromState(state,'offLineForestUnitsPhase2',action);

      return state;

    case ADD_FOREST_UNIT_OFFLINE_PHASE3:

      state = createOnState(state,'offLineForestUnitsPhase3',action);

      return state;

    case UPDATE_SERVER_FOREST_UNIT_PHASE3:

      state = updateFromState(state,'serverForestUnitsPhase3',action);

      return state;

    case UPDATE_OFFLINE_FOREST_UNIT_PHASE3:

      state = updateFromState(state,'offLineForestUnitsPhase3',action);

      return state;

    case REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE3:

      state = removeFromState(state,'serverForestUnitsPhase3',action);

      return state;

    case REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE3:

      state = removeFromState(state,'offLineForestUnitsPhase3',action);

      return state;


    case ADD_TUNNEL_DEFORMATION_OFFLINE:

      state = createOnState(state,'offLineTunnelDeformations',action);

      return state;

    case UPDATE_SERVER_TUNNEL_DEFORMATION_OFFLINE:

      state = updateFromState(state,'serverTunnelDeformations',action);

      return state;

    case UPDATE_TUNNEL_DEFORMATION_OFFLINE:

      state = updateFromState(state,'offLineTunnelDeformations',action);

      return state;

    case REMOVE_FROM_UPDATE_SERVER_TUNNEL_DEFORMATION_OFFLINE:

      state = removeFromState(state,'serverTunnelDeformations',action);

      return state;

    case REMOVE_FROM_TUNNEL_DEFORMATION_OFFLINE:

      state = removeFromState(state,'offLineTunnelDeformations',action);

      return state;


    case ADD_HILLSIDE_MOVEMENT_OFFLINE:

      state = createOnState(state,'offLineHillSideMovements',action);

      return state;

    case UPDATE_SERVER_HILLSIDE_MOVEMENT_OFFLINE:

      state = updateFromState(state,'serverHillSideMovements',action);

      return state;

    case UPDATE_HILLSIDE_MOVEMENT_OFFLINE:

      state = updateFromState(state,'offLineHillSideMovements',action);

      return state;

    case REMOVE_FROM_UPDATE_SERVER_HILLSIDE_MOVEMENT_OFFLINE:

      state = removeFromState(state,'serverHillSideMovements',action);

      return state;

    case REMOVE_FROM_UPDATE_HILLSIDE_MOVEMENT_OFFLINE:

      state = removeFromState(state,'offLineHillSideMovements',action);

      return state;

    case ADD_RAINFALL_OFFLINE:

      state = createOnState(state,'offLineRainFall',action);

      return state;

    case UPDATE_SERVER_RAINFALL_OFFLINE:

      state = updateFromState(state,'serverRainFall',action);

      return state;

    case UPDATE_RAINFALL_OFFLINE:

      state = updateFromState(state,'offLineRainFall',action);

      return state;

    case REMOVE_FROM_UPDATE_SERVER_RAINFALL_OFFLINE:

      state = removeFromState(state,'serverRainFall',action);

      return state;

    case REMOVE_FROM_UPDATE_RAINFALL_OFFLINE:

      state = removeFromState(state,'offLineRainFall',action);

      return state;

    case ADD_HILLSIDE_COLLAPSE_OFFLINE:

      state = createOnState(state,'offLineHillSideCollapse',action);

      return state;

    case UPDATE_SERVER_HILLSIDE_COLLAPSE_OFFLINE:

      state = updateFromState(state,'serverHillSideCollapse',action);

      return state;

    case UPDATE_HILLSIDE_COLLAPSE_OFFLINE:

      state = updateFromState(state,'offLineHillSideCollapse',action);

      return state;

    case REMOVE_FROM_UPDATE_SERVER_HILLSIDE_COLLAPSE_OFFLINE:

      state = removeFromState(state,'serverHillSideCollapse',action);

      return state;

    case REMOVE_FROM_UPDATE_HILLSIDE_COLLAPSE_OFFLINE:

      state = removeFromState(state,'offLineHillSideCollapse',action);

      return state;


    case ADD_RIVER_COLLAPSE_OFFLINE:

      state = createOnState(state,'offLineRiverCollapse',action);

      return state;

    case UPDATE_SERVER_RIVER_COLLAPSE_OFFLINE:

      state = updateFromState(state,'serverRiverCollapse',action);

      return state;

    case UPDATE_RIVER_COLLAPSE_OFFLINE:

      state = updateFromState(state,'offLineRiverCollapse',action);

      return state;

    case REMOVE_FROM_UPDATE_SERVER_RIVER_COLLAPSE_OFFLINE:

      state = removeFromState(state,'serverRiverCollapse',action);

      return state;

    case REMOVE_FROM_UPDATE_RIVER_COLLAPSE_OFFLINE:

      state = removeFromState(state,'offLineRiverCollapse',action);

      return state;

 case ADD_RIVER_COLLAPSE_OFFLINE:

      state = createOnState(state,'offLineRiverCollapse',action);

      return state;

    case UPDATE_SERVER_RIVER_COLLAPSE_OFFLINE:

      state = updateFromState(state,'serverRiverCollapse',action);

      return state;

    case UPDATE_RIVER_COLLAPSE_OFFLINE:

      state = updateFromState(state,'offLineRiverCollapse',action);

      return state;

    case REMOVE_FROM_UPDATE_SERVER_RIVER_COLLAPSE_OFFLINE:

      state = removeFromState(state,'serverRiverCollapse',action);

      return state;

    case REMOVE_FROM_UPDATE_RIVER_COLLAPSE_OFFLINE:

      state = removeFromState(state,'offLineRiverCollapse',action);

      return state;


  case ADD_PLANTATION_REPORT_OFFLINE:

    state = createOnState(state,'offLinePlantationReport',action);

    return state;

  case UPDATE_SERVER_PLANTATION_REPORT_OFFLINE:

    state = updateFromState(state,'serverPlantationReport',action);

    return state;

  case UPDATE_PLANTATION_REPORT_OFFLINE:

    state = updateFromState(state,'offLinePlantationReport',action);

    return state;

  case REMOVE_FROM_UPDATE_SERVER_PLANTATION_REPORT_OFFLINE:

    state = removeFromState(state,'serverPlantationReport',action);

    return state;

  case REMOVE_FROM_PLANTATION_REPORT_OFFLINE:

    state = removeFromState(state,'offLinePlantationReport',action); 

    return state;

    case SET_NS_MEMORY_STATE:

      return action.payload;

    default:
      return state;
  }
}

export default memoryReducer;

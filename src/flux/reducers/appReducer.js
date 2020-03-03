import { FETCH,
   CANCEL_FETCH,
   MENU_OPEN,
   MENU_CLOSE,
   SETUSER,
   SET_PROJECTS,
   SET_PROJECT_PHASE,
   SET_FUNCTIONAL_UNITS,
   RESET_FUNCTIONAL_UNITS,

   ADD_FUNCTIONAL_UNIT,
   CHANGE_FUNCTIONAL_UNIT,

   RESET_FORESTAL_UNITS,
   SET_FORESTAL_UNITS,
   SET_FORESTAL_UNIT,
   SET_FUNCTIONAL_UNIT,
   SELECT_PROJECT,
   SET_TUNNEL_DEFORMATION_LIST,
   HILL_SIDE_MOVEMENT_LIST,
   RAIN_FALL_LIST,
   HILL_SIDE_COLLAPSE_LIST,
   RIVER_COLLAPSE_LIST,
   SET_TUNNEL_DEFORMATION,
   SET_HILL_SIDE_MOVEMENT,
   SET_RAIN_FALL,
   SET_HILL_SIDE_COLLAPSE,
   SET_RIVER_COLLAPSE,
   SET_CURRENT_RISK_PHASE,
   SET_RISK_INDICATORS,
   SET_RISK_OVERVIEW,
   SET_SST,
   SET_INVENTORY,
   SET_SST_ASSISTANTS,
   SET_SST_VISITORS,
   SET_SST_DATA,
   SET_VISITOR_DATA,
   SET_FUEL,
   SET_LIST_USER,
   SET_PLANTATION_REPORT_TYPE,
   SET_PLANTATION_REPORTS,
   SET_PLANTATION_REPORT,
   SELECT_PLANTATION_PROJECT,
   SET_DEFAULT_ACTIVITIES,
   PROJECT_DATA,
   SET_VISITOR_ASSISTANTS_DATA,
   SET_NS_APP_STATE,   
   ADD_FORESTAL_UNIT,
   ADD_PLANTATION_REPORT,
   SET_REQUIRE_EXPENSES,
   SET_CURRENT_REQUIRE_EXPENSE,
   SET_BOX_EXPENSES,
   SET_CURRENT_BOX_EXPENSE,
   ADD_REQUIRE_EXPENSE,
   ADD_BOX_EXPENSE,
   SET_EXPENSE_TYPE } from "../types";

let initialUser = null;

let initialProjects = [];

let initialSST = [];

let initialUsers = [];

let initialForestalUnits = [];

let initialFunctionalUnits = [];

let initialForestalUnitE = null;

let initialSelectedProject = null;

let initialCurrentFE = null;

//risk RiskManagement
let initialCurrentProject = null;

let initialHillsideMovement = null;

let initialcurrentTunnelDeformation = null;

let initialHillsideCollapse = null;

let initialCurrentRainfall = null;

let initialRiverCollapse = null;

//  Plantation
let initialEstablishmentReport = null;
let initialMaintenanceReport = null;
let initialListEstablishmentReport = [];
let initialListMaintenanceReport = [];

let storedData;

let defaultValues = {
  isFetching:false,
  isOpen:false,
  user:initialUser,
  projects:initialProjects,
  functionalUnits:initialFunctionalUnits,
  forestalUnits:initialForestalUnits,
  currentPhase:1,
  forestalUnitE:initialForestalUnitE,
  currentFunctionalUnit:initialCurrentFE,
  selectedProject:initialSelectedProject,

  /* risk process  */

  currentHillsideMovement:initialHillsideMovement,
  currentTunnelDeformation:initialcurrentTunnelDeformation,
  currentHillsideCollapse:initialHillsideCollapse,
  currentRainfall:initialCurrentRainfall,
  currentRiverCollapse:initialRiverCollapse,

//
  RiskOverview: {},

  TunnelDeformationList: [],
  HillsideMovementList:[],
  RainfallList:[],
  HallsideCollapseList:[],
  RiverCollapseList:[],

  currentRiskPhase:null,

  riskIndicators:null,

  /*  Inventory process */

  currentMachineForm: null,

  // state list report SST
  listSST: initialSST,
  listSSTAssistants:initialSST,
  listSSTVisitors: initialSST,
  sstData:{},
  visitorData:initialSST,
  project_data:{},
  arrayVisitorsAssistens: [],
  //state list users
  listUser: initialUsers,

  //  Plantation
  plantationProject: null,
  plantationReportToEdit: null,
  plantationReportType: null,
  plantationReports: [],
  defaultActivities: [],
  
  listEstablishmentReport: initialListEstablishmentReport,
  listMaintenanceReport: initialListMaintenanceReport,
  establishmentReport: initialEstablishmentReport,
  maintenanceReport: initialMaintenanceReport,

  // Expenses

  requireExpenses:[],
  boxExpenses:[],
  currentRequireExpense:null,
  currentBoxExpense:null,
  expenseType:null

}


const initialState = defaultValues;

let index;

let data;

const appReducer = (state = initialState, action) => {
  switch(action.type) {
    case SETUSER:
      state={
        ...state,
        user:action.payload
      }
      return state;
    case SET_PROJECTS:
      state={
        ...state,
        projects:action.payload
      }
      return state;
    case SET_PROJECT_PHASE:
      state={
        ...state,
        currentPhase:action.payload
      }
      ////console.log(state);
      return state;
    case SET_FUNCTIONAL_UNITS:

      let functionalArray = state.functionalUnits;

      ////console.log(functionalArray);
      let result ;

      action.payload.forEach(load => {
        
        result = true;
        functionalArray.forEach(data => {
            if(load.id == data.id)
            {
              result = false;
            }
        });

        if(result)
        {
          functionalArray.push(load);
        }

      });

      state={
        ...state,
        functionalUnits:functionalArray
      }
      ////console.log(state);
      return state;
    case RESET_FUNCTIONAL_UNITS:
      state={
        ...state,
        functionalUnits:[]
      }
    return state;
    

    case ADD_FUNCTIONAL_UNIT:

      index = state.functionalUnits.findIndex(data => data.id == action.payload.id);
      
      index != -1 ?   state.functionalUnits[index] = action.payload  : state.functionalUnits.push(action.payload);

    return state;

    

    case RESET_FORESTAL_UNITS:
      state={
        ...state,
        forestalUnits:[]
      }
    return state;

    case SET_FORESTAL_UNITS:     
        
      state={
          ...state,
          forestalUnits:action.payload
      }

      return state;


    case SET_FORESTAL_UNIT:
      state={
        ...state,
        forestalUnitE:action.payload
      }
      ////console.log(state);
    return state;
    
    case ADD_FORESTAL_UNIT:

      index = state.forestalUnits.findIndex(data => data.id == action.payload.id);
      
      index != -1 ?   state.forestalUnits[index] = action.payload  : state.forestalUnits.push(action.payload);

    return state;

    case ADD_PLANTATION_REPORT:

      index = state.plantationReports.findIndex(data => data.id == action.payload.id);
      
      index != -1 ?   state.plantationReports[index] = action.payload  : state.plantationReports.push(action.payload);

    return state;

    case FETCH:
      state={
        ...state,
        isFetching:true
      }
      return state;
    case CANCEL_FETCH:
      state={
        ...state,
        isFetching:false
      }
      return state;
    case SET_RISK_OVERVIEW:
    state={
      ...state,
      RiskOverview:action.payload
    }
    return state;
    case SET_LIST_USER:
      state={
        ...state,
        listUser:action.payload
      }
      return state;
    case MENU_OPEN:
      state={
        ...state,
        isOpen:true
      }
      return state;
    case MENU_CLOSE:
      ////console.log("exec here");
      state={
        ...state,
        isOpen:false
      }
      return state;
    case SET_FUEL:
      state={
        ...state,
        forestalUnitE:action.payload
      }
      console.log(state);
    return state;
    case SET_INVENTORY:
      state={
        ...state,
        forestalUnitE:action.payload
      }
      console.log(state);
    return state;
    case SET_FUNCTIONAL_UNIT:
      state={
        ...state,
        currentFunctionalUnit:action.payload
      }
      ////console.log(state);
      return state;
    case SELECT_PROJECT:
      state={
        ...state,
        selectedProject:action.payload
      }
      ////console.log(state);
      return state;
    case SET_TUNNEL_DEFORMATION_LIST:

      if(action.payload.length > 0)
      {
        ////console.log(action.payload);
        let fid =  action.payload[0].project_id;

        state={
          ...state,
          TunnelDeformationList:{
            ...state.TunnelDeformationList,
            [fid]:action.payload
          }
        }
        ////console.log(state);
        return state;
      }
    case HILL_SIDE_MOVEMENT_LIST:

      if(action.payload.length > 0)
      {
        ////console.log(action.payload);
        let fid =  action.payload[0].project_id;

        state={
          ...state,
          HillsideMovementList:{
            ...state.HillsideMovementList,
            [fid]:action.payload
          }
        }
        ////console.log(state);
        return state;
      }

    case RAIN_FALL_LIST:


      if(action.payload.length > 0)
      {
        ////console.log(action.payload);
        let fid =  action.payload[0].project_id;

        state={
          ...state,
          RainfallList:{
            ...state.RainfallList,
            [fid]:action.payload
          }
        }
        ////console.log(state);
        return state;
      }

    case HILL_SIDE_COLLAPSE_LIST:

      if(action.payload.length > 0)
      {
        ////console.log(action.payload);
        let fid =  action.payload[0].project_id;

        state={
          ...state,
          HallsideCollapseList:{
            ...state.HallsideCollapseList,
            [fid]:action.payload
          }
        }
        ////console.log(state);
        return state;
      }

    case RIVER_COLLAPSE_LIST:

      if(action.payload.length > 0)
      {
        ////console.log(action.payload);
        let fid =  action.payload[0].project_id;

        state={
          ...state,
          RiverCollapseList:{
            ...state.RiverCollapseList,
            [fid]:action.payload
          }
        }
        ////console.log(state);
        return state;
      }

    case SET_TUNNEL_DEFORMATION:

      state={
        ...state,
        currentTunnelDeformation:action.payload
      }
      ////console.log(state);
      return state;

    case SET_HILL_SIDE_MOVEMENT:

      state={
        ...state,
        currentHillsideMovement:action.payload
      }
      ////console.log(state);
      return state;

    case SET_RAIN_FALL:

      state={
        ...state,
        currentRainfall:action.payload
      }
      ////console.log(state);
      return state;

    case SET_HILL_SIDE_COLLAPSE:

      state={
        ...state,
        currentHillsideCollapse:action.payload
      }
      ////console.log(state);
      return state;

    case SET_RIVER_COLLAPSE:

      state={
        ...state,
        currentRiverCollapse:action.payload
      }
      //console.log(state);
      return state;

    case SET_CURRENT_RISK_PHASE:

      state={
        ...state,
        currentRiskPhase:action.payload
      }
      //console.log(state);
      return state;

    case SET_RISK_INDICATORS:

      state={
        ...state,
        riskIndicators:action.payload
      }
      //console.log(state);
      return state;
    // State SST
    case SET_SST:
      state={
        ...state,
        listSST:action.payload
      }
      return state;
    case SET_SST_ASSISTANTS:
      state={
        ...state,
        listSSTAssistants:action.payload
      }
      return state;
    case SET_SST_VISITORS:
      state={
        ...state,
        listSSTVisitors:action.payload
      }
      return state;
    case SET_SST_DATA:
        state={
          ...state,
          sstData:action.payload
        }
      return state;
    case SET_VISITOR_DATA:
         state={
           ...state,
           sstVisitor:action.payload
         }
       return state;
    case SET_VISITOR_ASSISTANTS_DATA:
      state={
        ...state,
        arrayVisitorsAssistens:action.payload
      }
    return state;
   //SET_VISITOR_ASSISTANTS_DATA
    case PROJECT_DATA:
        state={
          ...state,
          project_data:action.payload
        }
      return state;
    //  Plantation

    case SET_PLANTATION_REPORT_TYPE:
      state = {
        ...state,
        plantationReportType: action.payload
      }
      console.log(state);
      return state;  
    
    case SET_DEFAULT_ACTIVITIES:

        if(action.payload.default.length >= 0)
        {
           console.log("default activities");
           console.log(action.payload);
          let pid =  action.payload.project;
  
          state={
            ...state,
            defaultActivities:{
              ...state.defaultActivities,
              [pid]:action.payload.default
            }
          }
          ////console.log(state);
        }

        console.log(state);
        return state;

    case SET_PLANTATION_REPORTS:
      state = {
        ...state,
        plantationReports: action.payload
      }
      console.log(state);
      return state;

    case SET_PLANTATION_REPORT:
      state = {
        ...state,
        plantationReportToEdit: action.payload
      }
      console.log(state);
      return state;

    case SELECT_PLANTATION_PROJECT:
      state = {
        ...state,
        plantationProject: action.payload
      };
      console.log(state);
      return state;

    case SET_REQUIRE_EXPENSES:

      state = {
        ...state,
        requireExpenses: action.payload
      }

      return state

    case SET_CURRENT_REQUIRE_EXPENSE:

      state = {
        ...state,
        currentRequireExpense: action.payload
      }

      return state
    
    case SET_BOX_EXPENSES:

      state = {
        ...state,
        boxExpenses: action.payload
      }

      return state

    case SET_CURRENT_BOX_EXPENSE:

      state = {
        ...state,
        currentBoxExpense: action.payload
      }

      return state

    case ADD_REQUIRE_EXPENSE:

      data = state.requireExpenses;

      data[action.payload.id] == null ?  data.push(action.payload) : data[action.payload.id] = action.payload ; 

      state = {
        ...state,
        requireExpenses:data 
      }

      return state

    case ADD_BOX_EXPENSE:

      data = state.boxExpenses;

      data[action.payload.id] == null ?  data.push(action.payload) : data[action.payload.id] = action.payload ;

      state = {
        ...state,
        boxExpenses:data 
      }

      return state

    case SET_EXPENSE_TYPE:

      state = {
        ...state,
        expenseType:action.payload
      }

      return state

    case SET_NS_APP_STATE:

      return action.payload;

    default:
      return state;
  }
}




export default appReducer;

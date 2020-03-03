//1.5.0 version with forestal working correctly
//1.5.2 version with plantation offline
//1.5.3 version with civil working properly
//1.5.4 version with offline risk
//1.5.5 version with background app on camera
//1.5.6 file delete on version change

//1.7.5 version with expenses not working properly
//1.8.6 version with expenses working right 


//PROPERTIES
export const VERSION = "1.8.6";
const LOCAL_MODE = false;

//ajax
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";
export const BASE_URL = window.location.href.indexOf('localhost') > 0 && LOCAL_MODE ? 'http://plantarfuturo.com/test' : 'https://plantarfuturo.com/ws';

//USER
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

//NAVIGATION
export const INSERT_NAVIGATOR = "INSERT_NAVIGATOR";
export const GO_TO_LOGIN = "GO_TO_LOGIN";
export const GO_TO_MANAGEMENT = "GO_TO_MANAGEMENT";
export const GO_TO_PROJECTS = "GO_TO_PROJECTS";
export const GO_TO_FORESTAL_UNITS = "GO_TO_FORESTAL_UNITS";
export const GO_TO_FORM_INVENTORY = "GO_TO_FORM_INVENTORY";
export const GO_TO_FORM_PROCESS = "GO_TO_FORM_PROCESS";
export const GO_BACK = "GO_BACK";
export const GO_TO_FORM_COMPENSATION = "GO_TO_FORM_COMPENSATION";
export const GO_TO_NAVIGATION_RESOUCE = "GO_TO_NAVIGATION_RESOUCE";
export const GO_TO_CIVIL_MANAGEMENT = "GO_TO_CIVIL_MANAGEMENT";
export const GO_TO_SST_LIST = 'GO_TO_SST_LIST';
export const GO_TO_SST_FORM = "GO_TO_SST_FORM";
export const GO_TO_ASSISTANT_LIST = "GO_TO_ASSISTANT_LIST";


//NATIVE storage, deprecated

export const SET_NS_APP_STATE = "SET_NS_APP_STATE";
export const SET_NS_MEMORY_STATE = "SET_NS_MEMORY_STATE";



//general app states
export const FETCH = "FETCH";
export const CANCEL_FETCH = "CANCEL_FETCH";
export const MENU_OPEN = "MENU_OPEN";
export const MENU_CLOSE = "MENU_CLOSE";
export const SETUSER = "SETUSER";
export const SET_PROJECTS = "SET_PROJECTS";
export const SET_PROJECT_PHASE = "SET_PROJECT_PHASE";
export const SET_FUNCTIONAL_UNITS = "SET_FUNCTIONAL_UNITS";
export const RESET_FUNCTIONAL_UNITS = "RESET_FUNCTIONAL_UNITS";
export const RESET_FORESTAL_UNITS = "RESET_FORESTAL_UNITS";
export const SET_FORESTAL_UNITS = "SET_FORESTAL_UNITS";
export const SET_FORESTAL_UNIT = "SET_FORESTAL_UNIT";
export const SET_FUNCTIONAL_UNIT = "SET_FUNCTIONAL_UNIT";

//news for indexed db

export const ADD_FUNCTIONAL_UNIT = "ADD_FUNCTIONAL_UNIT";
export const ADD_FORESTAL_UNIT = "ADD_FORESTAL_UNIT";
export const ADD_PLANTATION_REPORT = "ADD_PLANTATION_UNIT";
export const SELECT_PROJECT = "SELECT_PROJECT";
export const GO_TO_MACHINERY_LIST = "GO_TO_MACHINERY_LIST";

//aJAX URLS
export const LOGIN_URL = BASE_URL+"/api/login";
//export const GET_PROJECTS_URL = BASE_URL+"/api/users/projects";
export const GET_PROJECTS_URL = BASE_URL+"/api/project";
export const FUNCTIONAL_UNIT_URL = window.location.href.indexOf('localhost') > 0 && LOCAL_MODE ? 'http://plantarfuturo.com/test/api/functional-unit' : 'https://plantarfuturo.com/ws/api/functional-unit';
export const GET_FUNCTIONAL_UNITS = window.location.href.indexOf('localhost') > 0 && LOCAL_MODE ? 'http://plantarfuturo.com/test/api/project/functional-units/' : 'https://plantarfuturo.com/ws/api/project/functional-units/';
export const GET_FORESTAL_UNITS_URL = window.location.href.indexOf('localhost') > 0 && LOCAL_MODE ? 'http://plantarfuturo.com/test/api/functional-unit/forest-units/' : 'https://plantarfuturo.com/ws/api/functional-unit/forest-units/';
export const GET_SST_URL = window.location.href.indexOf('localhost') > 0 && LOCAL_MODE ? 'http://plantarfuturo.com/test/api/sst' : 'https://plantarfuturo.com/ws/api/sst';
export const GET_RISK_OVERVIEW_URL = window.location.href.indexOf('localhost') > 0 && LOCAL_MODE ? 'http://plantarfuturo.com/test/api/project/risks/' : 'https://plantarfuturo.com/ws/api/project/risks/';
export const GET_PROJECTS_BY_USER = window.location.href.indexOf('localhost') > 0 && LOCAL_MODE ? 'http://plantarfuturo.com/test/api/users/projects/' : 'https://plantarfuturo.com/ws/api/users/projects/';
export const GET_USERS_BY_PROJECT = window.location.href.indexOf('localhost') > 0 && LOCAL_MODE ? 'http://plantarfuturo.com/test/api/project/users/' : 'https://plantarfuturo.com/ws/api/project/users/';
export const GET_VISITOR_URL = window.location.href.indexOf('localhost') > 0 && LOCAL_MODE ? 'http://plantarfuturo.com/test/visitor' : 'https://plantarfuturo.com/ws/api/visitor';
export const GET_INVENTORY_URL = "GET_INVENTORY_URL";

//state SST
export const SET_SST = "SET_SST";
export const SET_SST_ASSISTANTS = "SET_SST_ASSISTANTS";
export const SET_SST_VISITORS = "SET_SST_VISITORS";
export const SET_SST_DATA = "SET_SST_DATA";
export const SET_VISITOR_DATA = "SET_VISITOR_DATA"
export const SET_VISITOR_ASSISTANTS_DATA = "SET_VISITOR_ASSISTANTS_DATA"
export const PROJECT_DATA = "PROJECT_DATA"


export const GO_TO_ASSISTANT_FORM ="GO_TO_ASSISTANT_FORM";
export const SET_LIST_USER ="SET_USER";
//RiskManagement navigation
export const GO_TO_RISK_MANAGEMENT = "GO_TO_RISK_MANAGEMENT";
export const GO_TO_HILLSIDE_MOVEMENT = "GO_TO_HILLSIDE_MOVEMENT";
export const GO_TO_HILLSIDE_COLLAPSE = "GO_TO_HILLSIDE_COLLAPSE";
export const GO_TO_RAIN_FALL = "GO_TO_RAIN_FALL";
export const GO_TO_RISK_OVERVIEW = "GO_TO_RISK_OVERVIEW";
export const GO_TO_RIVER_COLLAPSE = "GO_TO_RIVER_COLLAPSE";
export const GO_TO_TUNNEL_DEFORMATION = "GO_TO_TUNNEL_DEFORMATION";
export const GO_TO_RISK_INDICATORS = "GO_TO_RISK_INDICATORS";
export const GO_TO_RISK_REPORT = "GO_TO_RISK_REPORT";

//RiskManagement navigation
export const HALL_SIDE_MOVEMENT_URL = BASE_URL+"/api/risks/hillside-displacement";
export const TUNNEL_DEFORMATION_URL = BASE_URL+"/api/risks/tunnel-deformation";
export const HILL_SIDE_COLLAPSE_URL = BASE_URL+"/api/risks/hillside-round";
export const RAIN_FALL_URL = BASE_URL+"/api/risks/precipitation";
export const RIVER_COLLAPSE_URL = BASE_URL+"/api/risks/dryravine-round";
export const RISK_INDICATORS_URL = BASE_URL+"/api/project/risks";
//
export const SET_TUNNEL_DEFORMATION_LIST = "SET_TUNNEL_DEFORMATION_LIST";
export const HILL_SIDE_MOVEMENT_LIST = "HILL_SIDE_MOVEMENT_LIST";
export const RAIN_FALL_LIST = "RAIN_FALL_LIST";
export const HILL_SIDE_COLLAPSE_LIST = "HILL_SIDE_COLLAPSE_LIST";
export const RIVER_COLLAPSE_LIST = "RIVER_COLLAPSE_LIST";


export const SET_TUNNEL_DEFORMATION = "SET_TUNNEL_DEFORMATION";
export const SET_HILL_SIDE_MOVEMENT = "SET_HILL_SIDE_MOVEMENT";
export const SET_RAIN_FALL = "SET_RAIN_FALL";
export const SET_HILL_SIDE_COLLAPSE = "SET_HILL_SIDE_COLLAPSE";
export const SET_RIVER_COLLAPSE = "SET_RIVER_COLLAPSE";
export const SET_CURRENT_RISK_PHASE = "SET_CURRENT_RISK_PHASE";

export const SET_INVENTORY = "SET_INVENTORY";
//Risk indicators
export const SET_RISK_INDICATORS = "SET_RISK_INDICATORS";

//Inventory Management
export const GO_TO_INVENTORY_MANAGEMENT = "GO_TO_INVENTORY_MANAGEMENT";
export const GO_TO_MACHINERY_FORM = "GO_TO_MACHINERY_FORM";
export const GO_TO_FUEL_FORM = "GO_TO_FUEL_FORM";
export const SET_FUEL = "SET_FUEL";

//Errors
export const APP_ERROR = "APP_ERROR";

export const SET_RISK_OVERVIEW = "SET_RISK_OVERVIEW";

//MemoryActions
export const ADD_LOGGED_USER = "ADD_LOGGED_USER";
export const ADD_FUNCTIONAL_UNIT_OFFLINE = "ADD_FUNCTIONAL_UNIT_OFFLINE";

export const UPDATE_SERVER_FUNCTIONAL_UNIT = "UPDATE_SERVER_FUNCTIONAL_UNIT";
export const UPDATE_OFFLINE_FUNCTIONAL_UNIT = "UPDATE_OFFLINE_FUNCTIONAL_UNIT";
export const REMOVE_FROM_UPDATE_SERVER_FUNIT = "REMOVE_FROM_UPDATE_SERVER_FUNIT";
export const REMOVE_FROM_OFFLINE_FUNIT = "REMOVE_FROM_OFFLINE_FUNIT";

export const ADD_FOREST_UNIT_OFFLINE_PHASE1 = "ADD_FOREST_UNIT_OFFLINE_PHASE1";
export const UPDATE_SERVER_FOREST_UNIT_PHASE1 = "UPDATE_SERVER_FOREST_UNIT_PHASE1";
export const UPDATE_OFFLINE_FOREST_UNIT_PHASE1 = "UPDATE_OFFLINE_FOREST_UNIT_PHASE1";
export const REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE1 = "REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE1";
export const REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE1 = "REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE1";

export const ADD_FOREST_UNIT_OFFLINE_PHASE2 = "ADD_FOREST_UNIT_OFFLINE_PHASE2";
export const UPDATE_SERVER_FOREST_UNIT_PHASE2 = "UPDATE_SERVER_FOREST_UNIT_PHASE2";
export const UPDATE_OFFLINE_FOREST_UNIT_PHASE2 = "UPDATE_OFFLINE_FOREST_UNIT_PHASE2";
export const REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE2 = "REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE2";
export const REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE2 = "REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE2";

export const ADD_FOREST_UNIT_OFFLINE_PHASE3 = "ADD_FOREST_UNIT_OFFLINE_PHASE3";
export const UPDATE_SERVER_FOREST_UNIT_PHASE3 = "UPDATE_SERVER_FOREST_UNIT_PHASE3";
export const UPDATE_OFFLINE_FOREST_UNIT_PHASE3 = "UPDATE_OFFLINE_FOREST_UNIT_PHASE3";
export const REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE3 = "REMOVE_FROM_UPDATE_SERVER_FOREST_UNIT_PHASE3";
export const REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE3 = "REMOVE_FROM_OFFLINE_FOREST_UNIT_PHASE3";

//  PLANTATION
  //  Navigation
export const GO_TO_PLANTATION = "GO_TO_PLANTATION";
export const GO_TO_SELECT_PLANTATION_REPORT_TYPE = "GO_TO_SELECT_PLANTATION_REPORT_TYPE";
export const GO_TO_PLANTATION_REPORT = "GO_TO_PLANTATION_REPORT";
export const GO_TO_REPORT_LIST = "GO_TO_REPORT_LIST";

export const GO_TO_CIVIL_REPORT = "GO_TO_CIVIL_REPORT";

  //  API
export const GET_DEFAULT_ACTIVITIES_BY_TYPE = window.location.href.indexOf('localhost') > 0 && LOCAL_MODE ? 'http://plantarfuturo.com/test/api/default-activity/' : 'https://plantarfuturo.com/ws/api/default-activity/';
export const CREATE_PLANTATION_REPORT = window.location.href.indexOf('localhost') > 0 && LOCAL_MODE ? 'http://plantarfuturo.com/test/api/daily-report' : 'https://plantarfuturo.com/ws/api/daily-report';
export const GET_PLANTATION_REPORTS = window.location.href.indexOf('localhost') > 0 && LOCAL_MODE ? 'http://plantarfuturo.com/test/api/daily-report' : 'https://plantarfuturo.com/ws/api/daily-report';
export const GET_PLANTATION_REPORTS_BY_PROJECT = window.location.href.indexOf('localhost') > 0 && LOCAL_MODE ? 'http://plantarfuturo.com/test/api/daily-report/project/' : 'https://plantarfuturo.com/ws/api/daily-report/project/';
export const GET_PLANTATION_REPORT_BY_ID = window.location.href.indexOf('localhost') > 0 && LOCAL_MODE ? 'http://plantarfuturo.com/test/api/daily-report/' : 'https://plantarfuturo.com/ws/api/daily-report/';
export const UPDATE_PLANTATION_REPORT = window.location.href.indexOf('localhost') > 0 && LOCAL_MODE ? 'http://plantarfuturo.com/test/api/daily-report/' : 'https://plantarfuturo.com/ws/api/daily-report/';

//CIVIL

export const CIVIL_REPORT_URL = window.location.href.indexOf('localhost') > 0 && LOCAL_MODE ? 'http://plantarfuturo.com/test/api/civil-report' : 'https://plantarfuturo.com/ws/api/civil-report';


// OFFLINE

export const ADD_PLANTATION_REPORT_OFFLINE = "ADD_PLANTATION_REPORT_OFFLINE";
export const UPDATE_SERVER_PLANTATION_REPORT_OFFLINE = "UPDATE_SERVER_PLANTATION_REPORT_OFFLINE";
export const UPDATE_PLANTATION_REPORT_OFFLINE = "UPDATE_PLANTATION_REPORT_OFFLINE";
export const REMOVE_FROM_UPDATE_SERVER_PLANTATION_REPORT_OFFLINE = "REMOVE_FROM_UPDATE_SERVER_PLANTATION_REPORT_OFFLINE";
export const REMOVE_FROM_PLANTATION_REPORT_OFFLINE = "REMOVE_FROM_PLANTATION_REPORT_OFFLINE";

  //  Setters
export const SET_PLANTATION_REPORT_TYPE = "SET_PLANTATION_REPORT_TYPE";
export const SET_DEFAULT_ACTIVITIES = "SET_DEFAULT_ACTIVITIES";
export const SET_PLANTATION_REPORTS = "SET_PLANTATION_REPORTS";
export const SET_PLANTATION_REPORT = "SET_PLANTATION_REPORT";
export const SELECT_PLANTATION_PROJECT = "SELECT_PLANTATION_PROJECT";

export const SET_LIST_ESTABLISHMENT_REPORT = "SET_LIST_ESTABLISHMENT_REPORT";
export const SET_LIST_MAINTENANCE_REPORT = "SET_LIST_MAINTENANCE_REPORT";

export const SET_ESTABLISHMENT_REPORT = "SET_ESTABLISHMENT_REPORT";
export const SET_MAINTENANCE_REPORT = "SET_MAINTENANCE_REPORT";

//Offline in RISKS

export const ADD_TUNNEL_DEFORMATION_OFFLINE = "ADD_TUNNEL_DEFORMATION_OFFLINE";
export const UPDATE_SERVER_TUNNEL_DEFORMATION_OFFLINE = "UPDATE_SERVER_TUNNEL_DEFORMATION_OFFLINE";
export const UPDATE_TUNNEL_DEFORMATION_OFFLINE = "UPDATE_TUNNEL_DEFORMATION_OFFLINE";
export const REMOVE_FROM_UPDATE_SERVER_TUNNEL_DEFORMATION_OFFLINE = "REMOVE_FROM_UPDATE_SERVER_TUNNEL_DEFORMATION_OFFLINE";
export const REMOVE_FROM_TUNNEL_DEFORMATION_OFFLINE = "REMOVE_FROM_TUNNEL_DEFORMATION_OFFLINE";

export const ADD_HILLSIDE_MOVEMENT_OFFLINE = "ADD_HILLSIDE_MOVEMENT_OFFLINE";
export const UPDATE_SERVER_HILLSIDE_MOVEMENT_OFFLINE = "UPDATE_SERVER_HILLSIDE_MOVEMENT_OFFLINE";
export const UPDATE_HILLSIDE_MOVEMENT_OFFLINE = "UPDATE_HILLSIDE_MOVEMENT_OFFLINE";
export const REMOVE_FROM_UPDATE_SERVER_HILLSIDE_MOVEMENT_OFFLINE = "REMOVE_FROM_UPDATE_SERVER_HILLSIDE_MOVEMENT_OFFLINE";
export const REMOVE_FROM_UPDATE_HILLSIDE_MOVEMENT_OFFLINE = "REMOVE_FROM_UPDATE_HILLSIDE_MOVEMENT_OFFLINE";

export const ADD_RAINFALL_OFFLINE = "ADD_RAINFALL_OFFLINE";
export const UPDATE_SERVER_RAINFALL_OFFLINE = "UPDATE_SERVER_RAINFALL_OFFLINE";
export const UPDATE_RAINFALL_OFFLINE = "UPDATE_RAINFALL_OFFLINE";
export const REMOVE_FROM_UPDATE_SERVER_RAINFALL_OFFLINE = "REMOVE_FROM_UPDATE_SERVER_RAINFALL_OFFLINE";
export const REMOVE_FROM_UPDATE_RAINFALL_OFFLINE = "REMOVE_FROM_UPDATE_RAINFALL_OFFLINE";

export const ADD_HILLSIDE_COLLAPSE_OFFLINE = "ADD_HILLSIDE_COLLAPSE_OFFLINE";
export const UPDATE_SERVER_HILLSIDE_COLLAPSE_OFFLINE = "UPDATE_SERVER_HILLSIDE_COLLAPSE_OFFLINE";
export const UPDATE_HILLSIDE_COLLAPSE_OFFLINE = "UPDATE_HILLSIDE_COLLAPSE_OFFLINE";
export const REMOVE_FROM_UPDATE_SERVER_HILLSIDE_COLLAPSE_OFFLINE = "REMOVE_FROM_UPDATE_SERVER_HILLSIDE_COLLAPSE_OFFLINE";
export const REMOVE_FROM_UPDATE_HILLSIDE_COLLAPSE_OFFLINE = "REMOVE_FROM_UPDATE_HILLSIDE_COLLAPSE_OFFLINE";

export const ADD_RIVER_COLLAPSE_OFFLINE = "ADD_RIVER_COLLAPSE_OFFLINE";
export const UPDATE_SERVER_RIVER_COLLAPSE_OFFLINE = "UPDATE_SERVER_RIVER_COLLAPSE_OFFLINE";
export const UPDATE_RIVER_COLLAPSE_OFFLINE = "UPDATE_RIVER_COLLAPSE_OFFLINE";
export const REMOVE_FROM_UPDATE_SERVER_RIVER_COLLAPSE_OFFLINE = "REMOVE_FROM_UPDATE_SERVER_RIVER_COLLAPSE_OFFLINE";
export const REMOVE_FROM_UPDATE_RIVER_COLLAPSE_OFFLINE = "REMOVE_FROM_UPDATE_RIVER_COLLAPSE_OFFLINE";


//Expenses Module

export const GO_TO_EXPENSES_SELECTION = "GO_TO_EXPENSES_SELECTION";

export const GO_TO_FORM_BOX = "GO_TO_FORM_BOX";

export const GO_TO_FORM_EXPENSES = "GO_TO_FORM_EXPENSES";

export const EXPENSE_URL = BASE_URL+"/api/expense";

export const BOX_URL = BASE_URL+"/api/bill";

export const SET_REQUIRE_EXPENSES = "SET_REQUIRE_EXPENSES";

export const SET_CURRENT_REQUIRE_EXPENSE = "SET_CURRENT_REQUIRE_EXPENSE";

export const SET_BOX_EXPENSES = "SET_BOX_EXPENSES";

export const SET_CURRENT_BOX_EXPENSE = "SET_CURRENT_BOX_EXPENSE";

export const ADD_REQUIRE_EXPENSE = "ADD_REQUIRE_EXPENSE";

export const ADD_BOX_EXPENSE = "ADD_BOX_EXPENSE";

export const SET_EXPENSE_TYPE = "SET_EXPENSE_TYPE";

export const GO_TO_EXPENSES_LIST = "GO_TO_EXPENSES_LIST";
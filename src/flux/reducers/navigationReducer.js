//main
import Login from "../../pages/main/Login";
import ProjectManagement from '../../pages/main/ProjectManagement'
import ProjectList from '../../pages/main/ProjectList'
import NavigationResource from '../../pages/main/ResourceMain'

import ForestalUnitList from '../../pages/Forestal/ForestalUnitList'
import FormInventory from '../../pages/Forestal/FormInventory'
import FormProcess from '../../pages/Forestal/FormProcess'
import FormCompensation from '../../pages/Forestal/FormCompensation'
import FormFuel from '../../pages/InventoryManagement/FormFuel'
//Risk Management

import HillsideCollapse from '../../pages/RiskManagement/HillsideCollapse'
import Rainfall from '../../pages/RiskManagement/Rainfall'
import RiskIndicators from '../../pages/RiskManagement/RiskIndicators'
import RiskManagement from '../../pages/RiskManagement/RiskManagement'
import RiverCollapse from '../../pages/RiskManagement/RiverCollapse'
import TunnelDeformation from '../../pages/RiskManagement/TunnelDeformation'
import HillsideMovement from '../../pages/RiskManagement/HillsideMovement'
import RiskOverview from '../../pages/RiskManagement/RiskOverview'

import RiskReport from '../../pages/RiskManagement/RiskReport'


//Inventory Management
import SSTForm from '../../pages/SST/SSTForm'
import SSTList from '../../pages/SST/index'
import AssistanList from '../../pages/SST/AsistantList'
import CivilMain from '../../pages/main/CivilMain'
import inventoryList from '../../pages/InventoryManagement/InventoryUnitList'
import InventoryManagement from '../../pages/InventoryManagement/InventoryManagement'
import MachineryForm from '../../pages/InventoryManagement/MachineryForm'
import AssistanForm from '../../pages/SST/AssistantForm'

//  Plantation
import Plantation from '../../pages/Plantation/Plantation';
import SelectPlantationReportType from "../../pages/Plantation/SelectPlantationReportType";
import PlantationReport from '../../pages/Plantation/PlantationReport';
import ReportList from "../../pages/Plantation/ReportList";

import CivilReport from "../../pages/Plantation/CivilReport";


// expenses

import ExpenseType from "../../pages/Expenses/ExpenseType";

import FormBox from "../../pages/Expenses/FormBox";

import FormExpenses from "../../pages/Expenses/FormExpenses";

import ExpensesList from "../../pages/Expenses/ExpensesList";


import { GO_TO_LOGIN,
   GO_TO_MANAGEMENT,
   GO_TO_PROJECTS,
   GO_TO_FORESTAL_UNITS,
   GO_BACK,
   INSERT_NAVIGATOR,
   GO_TO_FORM_INVENTORY,
   GO_TO_FORM_PROCESS,
   GO_TO_FORM_COMPENSATION,
   GO_TO_RISK_MANAGEMENT,
   GO_TO_HILLSIDE_COLLAPSE,
   GO_TO_RAIN_FALL,
   GO_TO_RIVER_COLLAPSE,
   GO_TO_TUNNEL_DEFORMATION,
   GO_TO_RISK_INDICATORS,
   GO_TO_HILLSIDE_MOVEMENT,
   GO_TO_RISK_REPORT,
   GO_TO_INVENTORY_MANAGEMENT,
   GO_TO_MACHINERY_FORM,
   GO_TO_CIVIL_MANAGEMENT,
   GO_TO_NAVIGATION_RESOUCE,
   APP_ERROR,
   GO_TO_RISK_OVERVIEW,
   GO_TO_MACHINERY_LIST,
   GO_TO_ASSISTANT_LIST,
   GO_TO_SST_LIST,
   GO_TO_FUEL_FORM,
   GO_TO_SST_FORM,
   GO_TO_ASSISTANT_FORM,
   GO_TO_ESTABLISHMENT_REPORTS,
   GO_TO_MAINTENANCE_REPORTS,
   GO_TO_PLANTATION,
   GO_TO_SELECT_PLANTATION_REPORT_TYPE,
   GO_TO_PLANTATION_REPORT,
   GO_TO_REPORT_LIST,
   GO_TO_CIVIL_REPORT,
   GO_TO_EXPENSES_SELECTION,
   GO_TO_FORM_BOX,
   GO_TO_FORM_EXPENSES,
   GO_TO_EXPENSES_LIST
  } from "../types";






var Pagenavigator = null;

const initialState = {
  currentPagekey:null,
  navigator: {},
  initialRoute:{ component: Login , key: "LOGIN_PAGE"  },
};

const navigationReducer= (state = initialState, action) => {


  let currentPage = null;

  if(state.navigator.pages)
  {
    currentPage = state.navigator.pages.slice(-1)[0];
  }


  switch(action.type) {

    case INSERT_NAVIGATOR:
      state = {
        ...state,
        navigator:action.payload
      }

      Pagenavigator = action.payload;

      return state;
    case GO_TO_LOGIN:
      state = {
        ...state,
        currentPagekey: GO_TO_LOGIN
      }
      console.log(state);
      if(currentPage.key != GO_TO_LOGIN){
        state.navigator.resetPage({ component: Login , key: GO_TO_LOGIN  }, { animation: 'fade' });
      }
      return state;
    case GO_TO_MANAGEMENT:
      state = {
        ...state,
        currentPagekey: GO_TO_MANAGEMENT
      }
      if(currentPage.key != GO_TO_MANAGEMENT){
        setTimeout(()=>{
          state.navigator.resetPage({ component: ProjectManagement , key: GO_TO_MANAGEMENT  }, { animation: 'fade' });
        },1)
      }
      return state;
    case GO_TO_RISK_OVERVIEW:
      state = {
        ...state,
        currentPagekey: GO_TO_RISK_OVERVIEW
      }
      if(currentPage.key != GO_TO_RISK_OVERVIEW){
        state.navigator.pushPage({ component: RiskOverview , key: GO_TO_RISK_OVERVIEW  });
      }
      return state;
    case GO_TO_PROJECTS:
      state = {
        ...state,
        currentPagekey: GO_TO_PROJECTS
      }
      if(currentPage.key != GO_TO_PROJECTS){
        state.navigator.pushPage({ component: ProjectList , key: GO_TO_PROJECTS  });
      }
      return state;
    case GO_TO_SST_LIST:
      state = {
        ...state,
        currentPagekey:GO_TO_SST_LIST
      }
      if(currentPage.key !=GO_TO_SST_LIST){
        state.navigator.pushPage({ component: SSTList , key:GO_TO_SST_LIST  });
      }
      return state;
    case GO_TO_ASSISTANT_LIST:
      state = {
        ...state,
        currentPagekey:GO_TO_ASSISTANT_LIST
      }
      if(currentPage.key !=GO_TO_ASSISTANT_LIST){
        state.navigator.pushPage({ component: AssistanList , key:GO_TO_ASSISTANT_LIST  });
      }
      return state;
    case GO_TO_ASSISTANT_FORM:
      state = {
        ...state,
        currentPagekey:GO_TO_ASSISTANT_FORM
      }
      if(currentPage.key !=GO_TO_ASSISTANT_FORM){
        state.navigator.pushPage({ component: AssistanForm , key:GO_TO_ASSISTANT_FORM  });
      }
      return state;
    case GO_TO_FORESTAL_UNITS:
      state = {
        ...state,
        currentPagekey: GO_TO_FORESTAL_UNITS
      }
      if(currentPage.key != GO_TO_FORESTAL_UNITS){
        state.navigator.pushPage({ component: ForestalUnitList , key: GO_TO_FORESTAL_UNITS  });
      }
      return state;
    case GO_TO_FORM_INVENTORY:
      state = {
        ...state,
        currentPagekey: GO_TO_FORM_INVENTORY
      }
      if(currentPage.key != GO_TO_FORM_INVENTORY){
        state.navigator.pushPage({ component: FormInventory , key: GO_TO_FORM_INVENTORY  });
      }
      return state;
    case GO_TO_FUEL_FORM:
      state = {
        ...state,
        currentPagekey: GO_TO_FUEL_FORM
      }
      if(currentPage.key != GO_TO_FUEL_FORM){
        state.navigator.pushPage({ component: FormFuel , key: GO_TO_FUEL_FORM  });
      }
      return state;
    case GO_TO_FORM_PROCESS:
      state = {
        ...state,
        currentPagekey: GO_TO_FORM_PROCESS
      }
      if(currentPage.key != GO_TO_FORM_PROCESS){
        state.navigator.pushPage({ component: FormProcess , key: GO_TO_FORM_PROCESS  });
      }
      return state;
    case GO_TO_FORM_COMPENSATION:
      state = {
        ...state,
        currentPagekey: GO_TO_FORM_COMPENSATION
      }
      if(currentPage.key != GO_TO_FORM_COMPENSATION){
        state.navigator.pushPage({ component: FormCompensation , key: GO_TO_FORM_COMPENSATION  });
      }
      return state;
    case GO_TO_RISK_MANAGEMENT:
      state = {
        ...state,
        currentPagekey: GO_TO_RISK_MANAGEMENT
      }
      if(currentPage.key != GO_TO_RISK_MANAGEMENT){
        state.navigator.pushPage({ component: RiskManagement , key: GO_TO_RISK_MANAGEMENT  });
      }
      return state;
    case GO_TO_SST_FORM:
      state = {
        ...state,
        currentPagekey: GO_TO_SST_FORM
      }
      if(currentPage.key != GO_TO_SST_FORM){
        setTimeout(()=>{
          state.navigator.resetPage({ component: SSTForm , key: GO_TO_SST_FORM  });
        },1)
      }
      return state;
    case GO_TO_HILLSIDE_COLLAPSE:
      state = {
        ...state,
        currentPagekey: GO_TO_HILLSIDE_COLLAPSE
      }
      if(currentPage.key != GO_TO_HILLSIDE_COLLAPSE){
        state.navigator.pushPage({ component: HillsideCollapse , key: GO_TO_HILLSIDE_COLLAPSE  });
      }
      return state;
    case GO_TO_RAIN_FALL:
      state = {
        ...state,
        currentPagekey: GO_TO_RAIN_FALL
      }
      if(currentPage.key != GO_TO_RAIN_FALL){
        state.navigator.pushPage({ component: Rainfall , key: GO_TO_RAIN_FALL  });
      }
      return state;
    case GO_TO_NAVIGATION_RESOUCE:
      state = {
        ...state,
        currentPagekey: GO_TO_NAVIGATION_RESOUCE
      }
      if(currentPage.key != GO_TO_NAVIGATION_RESOUCE){
        state.navigator.pushPage({ component: NavigationResource , key: GO_TO_NAVIGATION_RESOUCE  });
      }
      return state;
    case GO_TO_CIVIL_MANAGEMENT:
      state = {
        ...state,
        currentPagekey: GO_TO_CIVIL_MANAGEMENT
      }
      if(currentPage.key != GO_TO_CIVIL_MANAGEMENT){
        state.navigator.pushPage({ component: CivilMain , key: GO_TO_CIVIL_MANAGEMENT  });
      }
      return state;
    case GO_TO_RIVER_COLLAPSE:
      state = {
        ...state,
        currentPagekey: GO_TO_RIVER_COLLAPSE
      }
      if(currentPage.key != GO_TO_RIVER_COLLAPSE){
        state.navigator.pushPage({ component: RiverCollapse , key: GO_TO_RIVER_COLLAPSE  });
      }
      return state;
    case GO_TO_MACHINERY_LIST:
      state = {
        ...state,
        currentPagekey: GO_TO_MACHINERY_LIST
      }
      if(currentPage.key != GO_TO_MACHINERY_LIST){
        state.navigator.pushPage({ component: inventoryList , key: GO_TO_MACHINERY_LIST  });
      }
      return state;
    case GO_TO_TUNNEL_DEFORMATION:
      state = {
        ...state,
        currentPagekey: GO_TO_TUNNEL_DEFORMATION
      }
      if(currentPage.key != GO_TO_TUNNEL_DEFORMATION){
        state.navigator.pushPage({ component: TunnelDeformation , key: GO_TO_TUNNEL_DEFORMATION  });
      }
      return state;
    case GO_TO_RISK_INDICATORS:
      state = {
        ...state,
        currentPagekey: GO_TO_RISK_INDICATORS
      }
      if(currentPage.key != GO_TO_RISK_INDICATORS){
        state.navigator.pushPage({ component: RiskIndicators , key: GO_TO_RISK_INDICATORS  });
      }
      return state;
    case GO_TO_HILLSIDE_MOVEMENT:
      state = {
        ...state,
        currentPagekey: GO_TO_HILLSIDE_MOVEMENT
      }
      if(currentPage.key != GO_TO_HILLSIDE_MOVEMENT){
        state.navigator.pushPage({ component: HillsideMovement , key: GO_TO_HILLSIDE_MOVEMENT  });
      }
      return state;
    case GO_TO_RISK_REPORT:
      state = {
        ...state,
        currentPagekey: GO_TO_RISK_REPORT
      }
      if(currentPage.key != GO_TO_RISK_REPORT){
        state.navigator.pushPage({ component: RiskReport , key: GO_TO_RISK_REPORT  });
      }
      return state;

    case GO_TO_INVENTORY_MANAGEMENT:

      state = {
        ...state,
        currentPagekey: GO_TO_INVENTORY_MANAGEMENT
      }
      if(currentPage.key != GO_TO_INVENTORY_MANAGEMENT){
        state.navigator.pushPage({ component: InventoryManagement , key: GO_TO_INVENTORY_MANAGEMENT  });
      }
      return state;

    case GO_TO_MACHINERY_FORM:

      state = {
        ...state,
      }
      if(currentPage.key != GO_TO_MACHINERY_FORM){
        state.navigator.pushPage({ component: MachineryForm , key: GO_TO_MACHINERY_FORM  });
      }
      return state;

    //  Plantation
    case GO_TO_PLANTATION:
      state = {
        ...state,
        currentPagekey: GO_TO_PLANTATION
      };
      if (currentPage.key != GO_TO_PLANTATION) {
        state.navigator.pushPage( { component: Plantation, key: GO_TO_PLANTATION } );
      }
      return state;

    case GO_TO_SELECT_PLANTATION_REPORT_TYPE:
      state = {
        ...state,
        currentPagekey: GO_TO_SELECT_PLANTATION_REPORT_TYPE
      };
      if (currentPage.key != GO_TO_SELECT_PLANTATION_REPORT_TYPE) {
        state.navigator.pushPage( { component: SelectPlantationReportType, key: GO_TO_SELECT_PLANTATION_REPORT_TYPE } );
      }
      return state;

    case GO_TO_PLANTATION_REPORT:
      state = {
        ...state,
        currentPagekey: GO_TO_PLANTATION_REPORT
      };
      if (currentPage.key != GO_TO_PLANTATION_REPORT) {
        state.navigator.pushPage( { component: PlantationReport, key: GO_TO_PLANTATION_REPORT } );
      }
      console.log( state );
      return state;

    case GO_TO_REPORT_LIST:
      state = {
        ...state,
        currentPagekey: GO_TO_REPORT_LIST
      };
      if (currentPage.key != GO_TO_REPORT_LIST) {
        state.navigator.pushPage( { component: ReportList, key: GO_TO_REPORT_LIST } );
      }
      return state;
    
    case GO_TO_CIVIL_REPORT:

      console.log("Go to civil report");

      state = {
        ...state,
        currentPagekey: GO_TO_CIVIL_REPORT
      };
      if (currentPage.key != GO_TO_CIVIL_REPORT) {
        state.navigator.pushPage( { component: CivilReport, key: GO_TO_CIVIL_REPORT } );
      }
      console.log( state );
      return state;

    case GO_TO_EXPENSES_SELECTION:

      state = {
        ...state,
        currentPagekey: GO_TO_EXPENSES_SELECTION
      };
      if (currentPage.key != GO_TO_EXPENSES_SELECTION) {
        state.navigator.pushPage( { component: ExpenseType, key: GO_TO_EXPENSES_SELECTION } );
      }

      return state

    case GO_TO_FORM_BOX:

      state = {
        ...state,
        currentPagekey: GO_TO_FORM_BOX
      };
      if (currentPage.key != GO_TO_FORM_BOX) {
        state.navigator.pushPage( { component: FormBox, key: GO_TO_FORM_BOX } );
      }

      return state

    case GO_TO_FORM_EXPENSES:

      state = {
        ...state,
        currentPagekey: GO_TO_FORM_EXPENSES
      };
      if (currentPage.key != GO_TO_FORM_EXPENSES) {
        state.navigator.pushPage( { component: FormExpenses, key: GO_TO_FORM_EXPENSES } );
      }

      return state

    case GO_TO_EXPENSES_LIST:

      state = {
        ...state,
        currentPagekey: GO_TO_EXPENSES_LIST
      };
      if (currentPage.key != GO_TO_EXPENSES_LIST) {
        state.navigator.pushPage( { component: ExpensesList, key: GO_TO_EXPENSES_LIST } );
      }

      return state

    case APP_ERROR:
      state = {
        ...state,
        currentPagekey: GO_TO_LOGIN
      }

      return state;

    case GO_BACK:
      state = {
        ...state,
        currentPagekey: state.navigator.pages.slice(-1)[0].key
      }
      state.navigator.popPage();
      return state;
    default:
      return state;
  }
}

export default navigationReducer;

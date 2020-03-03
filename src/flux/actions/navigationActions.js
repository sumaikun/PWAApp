import { GO_TO_LOGIN,
   GO_TO_MANAGEMENT,
   GO_TO_PROJECTS,
   GO_TO_FORESTAL_UNITS,
   GO_BACK,
   GO_TO_FORM_INVENTORY,
   INSERT_NAVIGATOR,
   GO_TO_FORM_PROCESS,
   GO_TO_FORM_COMPENSATION,
   GO_TO_RISK_MANAGEMENT,
   GO_TO_HILLSIDE_COLLAPSE,
   GO_TO_HILLSIDE_MOVEMENT,
   GO_TO_RAIN_FALL, 
   GO_TO_RIVER_COLLAPSE, 
   GO_TO_TUNNEL_DEFORMATION, 
   GO_TO_RISK_INDICATORS,
   GO_TO_INVENTORY_MANAGEMENT, 
   GO_TO_MACHINERY_FORM, 
   APP_ERROR, 
   GO_TO_RISK_OVERVIEW, 
   GO_TO_NAVIGATION_RESOUCE,
   GO_TO_MACHINERY_LIST, 
   GO_TO_CIVIL_MANAGEMENT, 
   GO_TO_SST_LIST, 
   GO_TO_SST_FORM, 
   GO_TO_ASSISTANT_LIST, 
   GO_TO_FUEL_FORM,
   GO_TO_ASSISTANT_FORM, 
   GO_TO_PLANTATION, 
   GO_TO_SELECT_PLANTATION_REPORT_TYPE, 
   GO_TO_PLANTATION_REPORT,
   GO_TO_REPORT_LIST, 
   GO_TO_CIVIL_REPORT,
   GO_TO_EXPENSES_SELECTION, 
   GO_TO_FORM_BOX, 
   GO_TO_FORM_EXPENSES, 
   GO_TO_EXPENSES_LIST   } from "../types";

import { closeMenu , notFetching } from "./appActions";

export const insertNavigator = (navigator) => ({
  type: INSERT_NAVIGATOR,
  payload: navigator,
});

export const goBack = () => ({
  type: GO_BACK
});

export const goToMain = () => ({
  type: GO_TO_MANAGEMENT
});

export const goToProjects = () => ({
  type: GO_TO_PROJECTS
});

export const goToForestalUnits = () => ({
  type: GO_TO_FORESTAL_UNITS
});

export const goToInventoryForm = () => ({
  type: GO_TO_FORM_INVENTORY
});
export const goToProcessForm = () => ({
  type:GO_TO_FORM_PROCESS
});

export const goToLogin = () => ({
  type: GO_TO_LOGIN
});

export const goToCompensationForm = () => ({
  type: GO_TO_FORM_COMPENSATION
});

export const goToRiskOverview = () => ({
  type: GO_TO_RISK_OVERVIEW
});

export const goToRiskManagement = () => ({
  type: GO_TO_RISK_MANAGEMENT
});

export const goToHillsideCollapse = () => ({
  type: GO_TO_HILLSIDE_COLLAPSE
});

export const goToHillsideMovement = () => ({
  type: GO_TO_HILLSIDE_MOVEMENT
});

export const goToRainFall = () => ({
  type: GO_TO_RAIN_FALL
});

export const goToRiverCollapse = () => ({
  type: GO_TO_RIVER_COLLAPSE
});

export const goToTunnelDeformation = () => ({
  type: GO_TO_TUNNEL_DEFORMATION
});

export const goToRiskIndicator = () => ({
  type: GO_TO_RISK_INDICATORS
});

export const goToNavigationResource = () => ({
  type:  GO_TO_NAVIGATION_RESOUCE
});

export const goToMachineryList = () => ({
  type: GO_TO_MACHINERY_LIST
});

//Inventarios de elementos
export const goToSSTForm = () => ({
  type: GO_TO_SST_FORM
})
export const goToSSTList = () => ({
  type:GO_TO_SST_LIST
});

export const goToInventoryManagement = () =>({
  type: GO_TO_INVENTORY_MANAGEMENT
});

export const goToFuelForm =() =>({
  type: GO_TO_FUEL_FORM
})

export const goToAssistantList = () =>({
  type: GO_TO_ASSISTANT_LIST
})

export const goToAssistantForm = () =>({
  type: GO_TO_ASSISTANT_FORM
})

 export const goToCivilManagement = () =>({
  type: GO_TO_CIVIL_MANAGEMENT
 });

export const goToMachineryForm = () =>({
  type: GO_TO_MACHINERY_FORM
});

//  Plantation
export const goToPlantation = () => ({
  type: GO_TO_PLANTATION
});

export const goToReportList = () => ({
  type: GO_TO_REPORT_LIST
});

export const goToSelectPlantationReportType = () => ({
  type: GO_TO_SELECT_PLANTATION_REPORT_TYPE
});

export const goToPlantationReport = () => ({
  type: GO_TO_PLANTATION_REPORT
});

export const goToCivilReport = () => ({
  type: GO_TO_CIVIL_REPORT
});


//Expenses

export const goToExpensesSelection = () => ({
  type: GO_TO_EXPENSES_SELECTION
});

export const goToFormBox = () => ({
  type: GO_TO_FORM_BOX
});

export const goToFormExpenses = () => ({
  type: GO_TO_FORM_EXPENSES
});


export const runfromStorage = (data) => {
  return async dispatch => {
    dispatch(runKey(data));
    dispatch(notFetching());
  }
};

export const runKey = (data) => ({
  type: data
});

export const LogOut = (data,successCallBack,errorCallBack) => {
  return async dispatch => {

    dispatch(goToLogin());
    dispatch(closeMenu());
  }
}

export const appError = () =>({
  type: APP_ERROR
});

export const goToExpensesList = () => ({
  type: GO_TO_EXPENSES_LIST
});
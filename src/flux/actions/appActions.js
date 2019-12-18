import { FETCH, CANCEL_FETCH, MENU_OPEN, MENU_CLOSE, SETUSER, SET_PROJECTS,
SET_PROJECT_PHASE, SET_FUNCTIONAL_UNITS, RESET_FUNCTIONAL_UNITS,RESET_FORESTAL_UNITS, SET_FORESTAL_UNITS,
SET_FORESTAL_UNIT , SET_FUNCTIONAL_UNIT , SELECT_PROJECT, SET_RISK_OVERVIEW, SET_INVENTORY,
SET_FUEL,SET_SST,SET_SST_ASSISTANTS,SET_SST_VISITORS,SET_SST_DATA,SET_VISITOR_DATA, SET_LIST_USER,
SET_PLANTATION_REPORT_TYPE,
  SET_ACTIVITIES,
  SET_PLANTATION_REPORTS,
  SET_PLANTATION_REPORT,
  SELECT_PLANTATION_PROJECT,
  PROJECT_DATA,
  SET_DEFAULT_ACTIVITIES,
  SET_VISITOR_ASSISTANTS_DATA} from "../types";

export const openMenu = () => ({
  type: MENU_OPEN
});

export const closeMenu = () => ({
  type: MENU_CLOSE
});

export const fetching = () => ({
  type: FETCH
});

export const notFetching = () => ({
  type: CANCEL_FETCH
});

export const setUser = (data) => ({
  type: SETUSER,
  payload: data
});

export const setProjects = (data) => ({
  type: SET_PROJECTS,
  payload: data
});
export const setRiskOverview = (data) => ({
  type: SET_RISK_OVERVIEW,
  payload: data
})

export const setInventory = (data) => ({
  type: SET_INVENTORY,
  payload: data
})

export const setFuel = (data) => ({
  type: SET_FUEL,
  payload: data
})

export const setProjectPhase = (data) => ({
  type: SET_PROJECT_PHASE,
  payload: data
});
export const setFunctionalUnits = (data) => ({
  type: SET_FUNCTIONAL_UNITS,
  payload: data
})

export const resetFunctionalUnits = () => ({
  type: RESET_FUNCTIONAL_UNITS
})

export const resetForestallUnits = () => ({
  type: RESET_FORESTAL_UNITS
})

export const setForestalUnits = (data) => ({
  type: SET_FORESTAL_UNITS,
  payload: data
})

export const setForestalUnit = (data) => ({
  type: SET_FORESTAL_UNIT,
  payload: data
})

export const setFunctionalUnit = (data) => ({
  type: SET_FUNCTIONAL_UNIT,
  payload: data,
})

export const selectProject = (data) => ({
  type: SELECT_PROJECT,
  payload: data,
})

//  Plantation

export const setPlantationReportType = (data) => ({
  type: SET_PLANTATION_REPORT_TYPE,
  payload: data,
});

export const setPlantationReports = (data) => ({
  type: SET_PLANTATION_REPORTS,
  payload: data,
});

export const selectPlantationProject = (data) => ({
  type: SELECT_PLANTATION_PROJECT,
  payload: data,
});

export const setPlantationReport = (data) => ({
  type: SET_PLANTATION_REPORT,
  payload: data,
});

// Civil

export const setDefaultActivities = (data) => ({
  type: SET_DEFAULT_ACTIVITIES,
  payload: data,
});

// list informe SST
export const setSST = (data) => ({
  type: SET_SST,
  payload: data
})

export const setListUser = (data) => ({
  type: SET_LIST_USER,
  payload: data
})

export const setSSTAssistants = (data) => ({
  type: SET_SST_ASSISTANTS,
  payload: data
})

export const setSSTVisitors = (data) => ({
  type: SET_SST_VISITORS,
  payload: data
})

export const setSSTVisitor = (data) => ({
  type: SET_VISITOR_DATA,
  payload: data
})

export const setSSTVisitorAssistants = (data) => ({
  type: SET_VISITOR_ASSISTANTS_DATA,
  payload: data
})

export const setDataSST = (data) => ({
  type: SET_SST_DATA,
  payload: data
})

export const setGoToResourceMain = (data) => ({
  type: PROJECT_DATA,
  payload: data
})

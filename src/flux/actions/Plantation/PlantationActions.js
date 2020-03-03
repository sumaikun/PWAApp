import { Request } from '../../../helpers/request';
import { fetching,
   notFetching,
   setPlantationReports,
   setPlantationReport,
   addPlantationReport } from "../appActions";
import { GET_PLANTATION_REPORTS,
  GET_PLANTATION_REPORTS_BY_PROJECT,
  GET_PLANTATION_REPORT_BY_ID,
  CREATE_PLANTATION_REPORT,
  UPDATE_PLANTATION_REPORT } from "../../types";
import { storeData , verifyAndSaveInArray } from '../../../helpers/indexDbModels'
import Ons from 'onsenui';
import {goBack} from "../navigationActions";

async function ManageOffline (dispatch,data){
  
  if(data.id == null)
  {
    let r = Math.random().toString(36).substring(7);
    console.log("random", r);    
    data.id = r;
  }
  
  data.synchroState = false;
  console.log(data);
  await storeData("dailyReports",data);
  dispatch(addPlantationReport(data));
  
}

export const getPlantationReports = (keepFetching = false ) => {  

  return async dispatch => {

    if(!navigator.onLine)
    {
      return;
    }

    dispatch( fetching() );

    let SuccessCallBack = (response) => {
      if(!keepFetching)
      {
          dispatch(notFetching());
      }

      dispatch(setPlantationReports(response.data));
    };

    let ErrorCallBack = () => {
      
        dispatch(notFetching());

    };

    //console.log(String( "HERE GOES THE TYPE" + project_id));

    Request.getRequest(
      GET_PLANTATION_REPORTS,
      SuccessCallBack,
      ErrorCallBack
    );
  };
};

export const getPlantationReportsByProject = (project_id) => {    

  return async dispatch => {

    dispatch( fetching() );

    if(!navigator.onLine)
    {

      console.log("Modo offline");

      let req = indexedDB.open("plantar");  
        
          req.onsuccess = async function (evt) {

              let filteredPlantationReports = [];
              const db = this.result;
              let tx = db.transaction(["dailyReports"], 'readonly');
              let store = tx.objectStore("dailyReports");
              let index = store.index("project_id");              
              let singleKeyRange = IDBKeyRange.only(project_id);
              let req = index.openCursor(singleKeyRange);

              await new Promise( (resolve) =>{

                req.onsuccess = function(event) {
                
                  let cursor = event.target.result;
                  if (cursor) {
                      // Do something with the matches.                      
                    let data = cursor.value;
                    data.civil_image_1 = "";
                    data.civil_image_2 = "";
                    data.civil_image_3 = "";
                    filteredPlantationReports.push(data);                                         
                    cursor.continue();
                  } 
                  else{
                        
                    dispatch(setPlantationReports(filteredPlantationReports));
      
                    dispatch(notFetching());
    
                    resolve("done");
                      
                  }                      
      
                }
    
              });          
                
              return;
          }

          req.onerror = (error) =>{
            dispatch(notFetching());
            return;
          }

      return;

    }
    
  

    let SuccessCallBack = async (response) => {     
      
      dispatch(setPlantationReports(response.data));

      if(response.data.length > 0)
      {
        await verifyAndSaveInArray(response.data,"dailyReports");
      }

      dispatch(notFetching());

    };

    let ErrorCallBack = () => {
      dispatch(notFetching());
    };

    //console.log(String( "HERE GOES THE TYPE" + project_id));

    Request.getRequest(
      GET_PLANTATION_REPORTS_BY_PROJECT + project_id,
      SuccessCallBack,
      ErrorCallBack
    );
  };
};

export const getPlantationReportById = (report_id) => {
 
  return async dispatch => {

    if(!navigator.onLine)
    {
      return;
    }
  
    dispatch( fetching() );

    let SuccessCallBack = (response) => {
      dispatch(notFetching());
      dispatch(setPlantationReport(response.data));
    };

    let ErrorCallBack = () => {
      dispatch(notFetching());
    };

    //console.log(String( "HERE GOES THE TYPE" + project_id));

    Request.getRequest(
      GET_PLANTATION_REPORT_BY_ID + report_id,
      SuccessCallBack,
      ErrorCallBack
    );
  };
};

export const createReport = (data, successCallBack = null, errorCallBack = null) => {
  return async dispatch => {
    console.log(data);

    if(!navigator.onLine)
    {
      console.log("Modo offline");     
      ManageOffline(dispatch,data);
      Ons.notification.alert({title:"¡Que bien!",message:"¡Reporte de plantación creado offline!"});
      return;
    }

    dispatch(fetching());

    let SuccessCallBack = successCallBack ? successCallBack :(response) => {
      dispatch(notFetching());
      Ons.notification.alert({ title:"¡Que bien!", message:"Se ha creado el reporte de plantacion" });
      // componentSuccess( response.data );
      dispatch(goBack());
    };

    let ErrorCallBack = errorCallBack ? errorCallBack : () => {
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido crear el reporte de plantation"});
      dispatch(notFetching());
    };

    Request.postRequest(
      CREATE_PLANTATION_REPORT,
      data,
      SuccessCallBack,
      ErrorCallBack
    );
  };
};

export const updateReport = (plantation_report_id, data, successCallBack = null, errorCallBack = null) => {
  return async dispatch => {

    if(!navigator.onLine || data.ToSynchro)
    {
      console.log("Modo offline");      
      ManageOffline(dispatch,data);
      Ons.notification.alert({title:"¡Que bien!",message:"¡Reporte de plantación editado en memoria!"});
      return;
    }



    dispatch(fetching());

    let SuccessCallBack = successCallBack ? successCallBack : (response) => {
      dispatch(notFetching());
      Ons.notification.alert({ title:"¡Que bien!", message:"Se ha actualizado el reporte de plantacion" });
      dispatch(goBack());
    }

    let ErrorCallBack = errorCallBack ? errorCallBack : (error) => {
      console.log(error);
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido actualizar el reporte de plantation"});
      dispatch(notFetching());
    }

    Request.putRequest(
      UPDATE_PLANTATION_REPORT + plantation_report_id,
      data,
      SuccessCallBack,
      ErrorCallBack
    );
  }
}

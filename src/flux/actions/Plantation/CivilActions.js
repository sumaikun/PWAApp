import { Request } from '../../../helpers/request';
import { fetching , notFetching, addPlantationReport } from "../appActions";
import { CIVIL_REPORT_URL } from "../../types";
import Ons from 'onsenui';
import { storeData } from '../../../helpers/indexDbModels'

import {
    getPlantationReportsByProject
} from "./PlantationActions";

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


export const createCivilReport = (data, successCallBack = null, errorCallBack = null) => {
  return async dispatch => {
    console.log(data);

    if(!navigator.onLine)
    {
      console.log("Modo offline");
      data.civil=true;     
      ManageOffline(dispatch,data);
      Ons.notification.alert({title:"¡Que bien!",message:"¡Reporte civil creado offline!"});      
      return;
    }

    dispatch(fetching());

    let SuccessCallBack = successCallBack ? successCallBack :(response) => {
      dispatch(notFetching());
      Ons.notification.alert({ title:"¡Que bien!", message:"Se ha creado el reporte civil" });  
      dispatch(getPlantationReportsByProject(data.project_id));
      dispatch(goBack());
    };

    let ErrorCallBack = errorCallBack ? errorCallBack:() => {
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido crear el reporte civil"});
      dispatch(notFetching());
    };

    Request.postRequest(
      CIVIL_REPORT_URL,
      data,
      SuccessCallBack,
      ErrorCallBack
    );
  };
};

export const updateCivilReport = (civil_report_id, data, successCallBack = null, errorCallBack = null) => {
  return async dispatch => {

    if(!navigator.onLine || data.ToSynchro)
      {
        console.log("Modo offline");    
        data.civil=true;            
        data.id = civil_report_id;        
        ManageOffline(dispatch,data);
        Ons.notification.alert({title:"¡Que bien!",message:"¡Reporte civil editado en memoria!"});
        return;
      }



    dispatch(fetching());

    let SuccessCallBack =  successCallBack ? successCallBack : (response) => {
      dispatch(notFetching());
      Ons.notification.alert({ title:"¡Que bien!", message:"Se ha actualizado el reporte civil" });
      dispatch(getPlantationReportsByProject(data.project_id));
      dispatch(goBack());
    }

    let ErrorCallBack = errorCallBack ? errorCallBack : (error) => {
      console.log(error);
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido actualizar el reporte civil"});
      dispatch(notFetching());
    }

    Request.putRequest(
      CIVIL_REPORT_URL + "/" + civil_report_id,
      data,
      SuccessCallBack,
      ErrorCallBack
    );
  }
}

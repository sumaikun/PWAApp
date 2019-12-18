import { Request } from '../../../helpers/request';
import { fetching , notFetching } from "../appActions";
import { CIVIL_REPORT_URL } from "../../types";
import Ons from 'onsenui';
import {
  addOfflinePlantationReport,
  updateServerPlantationReport,
  updateOfflinePlantationReport
} from "../memoryActions";

import {
    getPlantationReportsByProject
} from "./PlantationActions";

import {goBack} from "../navigationActions";


export const createCivilReport = (data, successCallBack = null, errorCallBack = null) => {
  return async dispatch => {
    console.log(data);

    if(!navigator.onLine)
    {
      console.log("Modo offline");
      data.civil=true;
      dispatch(addOfflinePlantationReport(data));
      Ons.notification.alert({title:"¡Que bien!",message:"¡Reporte civil creado offline!"});
      dispatch(goBack());
      return;
    }

    dispatch(fetching());

    let SuccessCallBack = successCallBack ? successCallBack :(response) => {
      dispatch(notFetching());
      Ons.notification.alert({ title:"¡Que bien!", message:"Se ha creado el reporte civil" });
      // componentSuccess( response.data );
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
        data.civil=true;
        console.log("Modo offline");
        
        data.id = civil_report_id;
        
        console.log(data.ToSynchro);

        if(data.ToSynchro)
        {
          console.log("editar offline");
          dispatch(updateOfflinePlantationReport(data));
          dispatch(goBack());          
        }
        else
        {
          console.log("editar del servidor");
          dispatch(updateServerPlantationReport(data));
          dispatch(goBack());
        }

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

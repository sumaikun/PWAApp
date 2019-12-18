import { Request } from '../../../helpers/request'
import { fetching , notFetching  } from "../appActions";
import { goBack } from "../navigationActions";
import {
  addOfflineRiverColl,
  updateServerRiverColl,
  updateOfflineRiverColl
} from "../memoryActions";
import {  BASE_URL, RIVER_COLLAPSE_URL } from "../../types"
import Ons from 'onsenui';


export const createRiverCollapse = (data,successCallBack  ,errorCallBack) => {
  return async dispatch => {

    if(!navigator.onLine)
    {
      console.log("Modo offline");
      data.created_at = new Date().toISOString().split('T')[0];
      dispatch(addOfflineRiverColl(data));
      Ons.notification.alert({title:"¡Que bien!",message:"¡Inspección de quebrada guardada en memoria!"});
      dispatch(goBack());
      return;
    }

    dispatch(fetching());

    let SuccessCallBack = successCallBack ? successCallBack : (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Bien!",message:"¡Recorrido de quebrada registrado!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido registrar la información"});
    }


    Request.postRequest(
      RIVER_COLLAPSE_URL,
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}



export const updateRiverCollapse = (id,data,successCallBack  ,errorCallBack) => {
  return async dispatch => {


    if(!navigator.onLine)
    {
      console.log("Modo offline");

      if(!data.ToSynchro)
      {
        console.log("editar del servidor");
        dispatch(updateServerRiverColl(data));
        dispatch(goBack());
      }
      else
      {
        console.log("editar offline");
        dispatch(updateOfflineRiverColl(data));
        dispatch(goBack());
      }

      Ons.notification.alert({title:"¡Que bien!",message:"¡Inspección de quebrada guardado en memoria!"});
      return;
    }

    dispatch(fetching());

    let SuccessCallBack = successCallBack ? successCallBack : (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Bien!",message:"¡Recorrido de quebrada actualizado!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido registrar la información"});
    }


    Request.putRequest(
      RIVER_COLLAPSE_URL+"/"+id,
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}

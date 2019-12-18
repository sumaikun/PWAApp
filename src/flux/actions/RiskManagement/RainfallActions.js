import { Request } from '../../../helpers/request'
import { fetching , notFetching  } from "../appActions";
import { goBack } from "../navigationActions";
import {
  addOfflineRainFall,
  updateServerRainFall,
  updateOfflineRainFall
} from "../memoryActions";
import {  BASE_URL, RAIN_FALL_URL } from "../../types"
import Ons from 'onsenui';


export const createRainfall = (data,successCallBack  ,errorCallBack) => {
  return async dispatch => {

    if(!navigator.onLine)
    {
      console.log("Modo offline");
      data.created_at = new Date().toISOString().split('T')[0];
      dispatch(addOfflineRainFall(data));
      Ons.notification.alert({title:"¡Que bien!",message:"¡Precipitación guardada en memoria!"});
      dispatch(goBack());
      return;
    }

    dispatch(fetching());

    let SuccessCallBack = successCallBack ? successCallBack :  (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Bien!",message:"¡Informe de precipitación registrado!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido registrar la información"});
    }


    Request.postRequest(
      RAIN_FALL_URL,
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}



export const updateRainfall = (id,data,successCallBack  ,errorCallBack) => {
  return async dispatch => {

    if(!navigator.onLine)
    {
      console.log("Modo offline");

      if(!data.ToSynchro)
      {
        console.log("editar del servidor");
        dispatch(updateServerRainFall(data));
        dispatch(goBack());
      }
      else
      {
        console.log("editar offline");
        dispatch(updateOfflineRainFall(data));
        dispatch(goBack());
      }

      Ons.notification.alert({title:"¡Que bien!",message:"¡Informe de precipitación editado en memoria!"});
      return;
    }

    dispatch(fetching());

    let SuccessCallBack = successCallBack ? successCallBack :  (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Bien!",message:"¡Informe de precipitación actualizada!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido registrar la información"});
    }


    Request.putRequest(
      RAIN_FALL_URL+"/"+id,
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}

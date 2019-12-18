import { Request } from '../../../helpers/request'
import { fetching , notFetching  } from "../appActions";
import { goBack } from "../navigationActions";
import {
  addOfflineHillSideColl,
  updateServerHillSideColl,
  updateOfflineHillSideColl
} from "../memoryActions";
import {  BASE_URL, HILL_SIDE_COLLAPSE_URL } from "../../types"
import Ons from 'onsenui';


export const createHillsideCollapse = (data,successCallBack  ,errorCallBack) => {
  return async dispatch => {

    if(!navigator.onLine)
    {
      console.log("Modo offline");
      data.created_at = new Date().toISOString().split('T')[0];
      dispatch(addOfflineHillSideColl(data));
      Ons.notification.alert({title:"¡Que bien!",message:"¡Recorrido de ladera guardado en memoria!"});
      dispatch(goBack());
      return;
    }

    dispatch(fetching());

    let SuccessCallBack = successCallBack ? successCallBack :  (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Bien!",message:"¡Recorrido de ladera registrada!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido registrar la información"});
    }


    Request.postRequest(
      HILL_SIDE_COLLAPSE_URL,
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}



export const updateHillsideCollapse = (id,data,successCallBack  ,errorCallBack) => {
  return async dispatch => {

    if(!navigator.onLine)
    {
      console.log("Modo offline");

      if(!data.ToSynchro)
      {
        console.log("editar del servidor");
        dispatch(updateServerHillSideColl(data));
        dispatch(goBack());
      }
      else
      {
        console.log("editar offline");
        dispatch(updateOfflineHillSideColl(data));
        dispatch(goBack());
      }

      Ons.notification.alert({title:"¡Que bien!",message:"¡Movmiento de ladera editado en memoria!"});
      return;
    }

    dispatch(fetching());

    let SuccessCallBack = successCallBack ? successCallBack :  (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Bien!",message:"¡Recorrido de ladera actualizada!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido registrar la información"});
    }


    Request.putRequest(
      HILL_SIDE_COLLAPSE_URL+"/"+id,
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}

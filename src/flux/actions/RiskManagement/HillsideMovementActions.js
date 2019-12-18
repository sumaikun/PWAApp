import { Request } from '../../../helpers/request'
import { fetching , notFetching  } from "../appActions";
import { goBack } from "../navigationActions";
import {
  addOfflineHillSideMov,
  updateServerHillSideMov,
  updateOfflineHillSideMov
} from "../memoryActions";
import {  BASE_URL, HALL_SIDE_MOVEMENT_URL } from "../../types"
import Ons from 'onsenui';


export const createHallsideMovement = (data,successCallBack  ,errorCallBack) => {
  return async dispatch => {

    if(!navigator.onLine)
    {
      console.log("Modo offline");
      data.created_at = new Date().toISOString().split('T')[0];
      dispatch(addOfflineHillSideMov(data));
      Ons.notification.alert({title:"¡Que bien!",message:"¡Movimiento de ladera guardada en memoria!"});
      dispatch(goBack());
      return;
    }

    dispatch(fetching());

    let SuccessCallBack = successCallBack ? successCallBack :  (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Bien!",message:"¡Movimiento de ladera registrado!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido registrar la información"});
    }


    Request.postRequest(
      HALL_SIDE_MOVEMENT_URL,
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}


export const updateHallsideMovement = (id,data,successCallBack  ,errorCallBack) => {
  return async dispatch => {

    if(!navigator.onLine)
    {
      console.log("Modo offline");

      if(!data.ToSynchro)
      {
        console.log("editar del servidor");
        dispatch(updateServerHillSideMov(data));
        dispatch(goBack());
      }
      else
      {
        console.log("editar offline");
        dispatch(updateOfflineHillSideMov(data));
        dispatch(goBack());
      }

      Ons.notification.alert({title:"¡Que bien!",message:"¡Movmiento de ladera editado en memoria!"});
      return;
    }

    dispatch(fetching());

    let SuccessCallBack = successCallBack ? successCallBack :  (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Bien!",message:"¡Movimiento de ladera actualizado!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido registrar la información"});
    }


    Request.putRequest(
      HALL_SIDE_MOVEMENT_URL+"/"+id,
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}

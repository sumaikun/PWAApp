import { Request } from '../../../helpers/request'
import { fetching , notFetching  } from "../appActions";
import { goBack } from "../navigationActions";
import {
  addOfflineTunnelDeformation,
  updateServerTunnelDeformation,
  updateOfflineTunnelDeformation
} from "../memoryActions";

import {  BASE_URL, TUNNEL_DEFORMATION_URL } from "../../types"
import Ons from 'onsenui';


export const createTunnelDeformation = (data,successCallBack  ,errorCallBack) => {
  return async dispatch => {


    if(!navigator.onLine)
    {
      console.log("Modo offline");
      data.created_at = new Date().toISOString().split('T')[0];
      dispatch(addOfflineTunnelDeformation(data));
      Ons.notification.alert({title:"¡Que bien!",message:"¡Deformacion de tunel guardada en memoria!"});
      dispatch(goBack());
      return;
    }

    dispatch(fetching());

    let SuccessCallBack = successCallBack ? successCallBack : (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Bien!",message:"¡Deformación de tunel registrada!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido registrar la información"});
    }


    Request.postRequest(
      TUNNEL_DEFORMATION_URL,
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}



export const updateTunnelDeformation = (id,data,successCallBack  ,errorCallBack) => {
  return async dispatch => {

    if(!navigator.onLine)
    {
      console.log("Modo offline");

      if(!data.ToSynchro)
      {
        console.log("editar del servidor");
        dispatch(updateServerTunnelDeformation(data));
        dispatch(goBack());
      }
      else
      {
        console.log("editar offline");
        dispatch(updateOfflineTunnelDeformation(data));
        dispatch(goBack());
      }

      Ons.notification.alert({title:"¡Que bien!",message:"¡Deformación de tunel editada en memoria!"});
      return;
    }

    dispatch(fetching());

    let SuccessCallBack = successCallBack ? successCallBack : (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Bien!",message:"¡Deformación de tunel actualizada!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido registrar la información"});
    }


    Request.putRequest(
      TUNNEL_DEFORMATION_URL+"/"+id,
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}

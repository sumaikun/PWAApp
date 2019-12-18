import { Request } from '../../../helpers/request'
import { fetching , notFetching, setInventory } from "../appActions";
import { GET_INVENTORY_URL  } from "../../types";


export const getInventory = (id) => {
  return async dispatch => {

      dispatch(fetching());

      let SuccessCallBack = (response) => {
        dispatch(notFetching());
        dispatch(setInventory(response.data));
      }

      let ErrorCallBack = () => {
        dispatch(notFetching());
      }
      Request.getRequest(
        GET_INVENTORY_URL,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}


export const createInventory = (data,successCallBack  ,errorCallBack) => {
  return async dispatch => {

    dispatch(fetching());

    let SuccessCallBack = (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Bien!",message:"¡Datos registrados!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido registrar la información"});
    }


    Request.postRequest(
       GET_INVENTORY_URL,
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}



export const updateInventory = (id,data,successCallBack  ,errorCallBack) => {
  return async dispatch => {

    dispatch(fetching());

    let SuccessCallBack = (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Bien!",message:"¡Datos registrados!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido registrar la información"});
    }


    Request.putRequest(
       GET_INVENTORY_URL+"/"+id,
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}

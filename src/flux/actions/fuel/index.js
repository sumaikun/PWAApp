import { Request } from '../../../helpers/request'
import { fetching , notFetching, setFuel } from "../appActions";
import { GET_FUEL_URL  } from "../../types";


export const getFuel = (id) => {
  return async dispatch => {

      dispatch(fetching());

      let SuccessCallBack = (response) => {
        dispatch(notFetching());
        dispatch(setFuel(response.data));
      }

      let ErrorCallBack = () => {
        dispatch(notFetching());
      }
      Request.getRequest(
        GET_FUEL_URL,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}

export const createFuel = (data,successCallBack  ,errorCallBack) => {
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
       GET_FUEL_URL,
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}



export const updateFuel = (id,data,successCallBack  ,errorCallBack) => {
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
       GET_FUEL_URL+"/"+id,
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}

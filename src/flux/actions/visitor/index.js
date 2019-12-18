import { Request } from '../../../helpers/request'
import { fetching , notFetching, setSSTVisitors} from "../appActions";
import { GET_VISITOR_URL } from "../../types";
import Ons from 'onsenui';

/// Cargar los visitantes de SST
export function getSSTVisitors  (id, successCallBack  ,errorCallBack)  {
  return async dispatch => {

      dispatch(fetching());

      let SuccessCallBack = (response) => {
        dispatch(notFetching());
        dispatch(setSSTVisitors(response.data));
        console.log("hi sst visitor")
      }

      let ErrorCallBack = () => {
        dispatch(notFetching());
      }
      Request.getRequest(
        GET_VISITOR_URL+'/'+id,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}

//crear
export function createVisitor(data, successCallBack  ,errorCallBack )  {
    console.log(data);
    return async dispatch => {
  
      let SuccessCallBack =  successCallBack ? successCallBack :  (response) => {
        dispatch(notFetching());
        Ons.notification.alert({title:"¡Que bien!",message:"¡Visitante creado exitosamente!"});
      }
  
      let ErrorCallBack = () => {
        dispatch(notFetching());
        Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido crear el nuevo visitante"});
      }
      Request.postRequest(
        GET_VISITOR_URL,
        data,
        SuccessCallBack,
        ErrorCallBack
      );
    }
  }
  
  // Actualizar reporte SST
  export function updateVisitor (id, data, successCallBack  ,errorCallBack ) {
    return async dispatch => {
   
      let SuccessCallBack =  successCallBack ? successCallBack :  (response) => {
        dispatch(notFetching());
        Ons.notification.alert({title:"¡Que bien!",message:"¡¡Visitante actualizado exitosamente!"});
      }
  
      let ErrorCallBack = () => {
        dispatch(notFetching());
        Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido actualizar el visitante"});
      }
      Request.putRequest(
        GET_VISITOR_URL+'/'+id,
        data,
        SuccessCallBack,
        ErrorCallBack
      );
    }
  }
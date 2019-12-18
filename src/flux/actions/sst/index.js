import { Request } from '../../../helpers/request'
import { fetching , notFetching, setSST, setSSTAssistants, setDataSST, setSSTVisitor, setSSTVisitorAssistants} from "../appActions";
import { GET_SST_URL, GET_VISITOR_URL } from "../../types";
import Ons from 'onsenui';
import moment from 'moment';
//Cargar repotes SST por proyecto
export function  getSST (id)  {
  return async dispatch => {
      dispatch(fetching());

      let SuccessCallBack = (response) => {
        dispatch(notFetching());
        dispatch(setSST(response.data));
      }

      let ErrorCallBack = () => {
        dispatch(notFetching());
      }
      Request.getRequest(
        GET_SST_URL+'/'+id,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}

// Crear reporte SST
export function createReportSST(data, successCallBack  ,errorCallBack )  {
  return async dispatch => {

    /*if(!navigator.onLine)
    {
      console.log("Modo offline");

      data.created_at = new Date().toISOString().split('T')[0];

      dispatch(addOfflineForestUnitP1(data));
      Ons.notification.alert({title:"¡Que bien!",message:"¡Unidad forestal guardada en memoria!"});
      dispatch(goBack());
      return;
    }
*/

    let SuccessCallBack =  successCallBack ? successCallBack :  (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Que bien!",message:"¡Informe SST creado exitosamente!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido crear el informe SST"});
    }
    Request.postRequest(
      GET_SST_URL,
      data,
      SuccessCallBack,
      ErrorCallBack
    );
  }
}

// Actualizar reporte SST
export function updateReportSST (id, data, successCallBack  ,errorCallBack ) {
  console.log(id, data);
  return async dispatch => {

    /*if(!navigator.onLine)
    {
      console.log("Modo offline");

      data.created_at = new Date().toISOString().split('T')[0];

      dispatch(addOfflineForestUnitP1(data));
      Ons.notification.alert({title:"¡Que bien!",message:"¡Unidad forestal guardada en memoria!"});
      dispatch(goBack());
      return;
    }
*/

    let SuccessCallBack =  successCallBack ? successCallBack :  (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Que bien!",message:"¡Informe SST creado exitosamente!"});
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido crear el informe SST"});
    }
    Request.putRequest(
      GET_SST_URL+'/'+id,
      data,
      SuccessCallBack,
      ErrorCallBack
    );
  }
}


// Cargar los Asistentes de SST
export function getSSTAssistants (id, successCallBack  ,errorCallBack)  {
  return async dispatch => {

      dispatch(fetching());

      let SuccessCallBack = (response) => {
        dispatch(notFetching());
        dispatch(setSSTAssistants(response.data));
        console.log("hi sst assistants")
      }

      let ErrorCallBack = () => {
        dispatch(notFetching());
      }
      Request.getRequest(
        GET_SST_URL + `/assistants/${id}`,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}



export function getSSTForm(data)  {
  let row = { ...data
    , date: moment(data.report_date).format("dd/mm/aaaa")
    , hour: moment(data.report_date).format("HH:mm")
  }
  return async dispatch => {
    if (row.id) return dispatch(setDataSST(row))
    return dispatch(setDataSST({}));
  }
}
export function getSSTVisitorAssistants(assistants, visitor)  {
  let row = { ...assistants, ...visitor  }
  console.log(row);
  return async dispatch => {
    dispatch(setSSTVisitorAssistants(row))
  }
}

export function getSSTVisitor(data)  {
  let row = { ...data }
  return async dispatch => {
    dispatch(setSSTVisitor(row))
  }
}

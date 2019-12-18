import { Request } from '../../helpers/request';
import { fetching , notFetching, setFunctionalUnits, resetFunctionalUnits } from "./appActions"
import { FUNCTIONAL_UNIT_URL, GET_FUNCTIONAL_UNITS  } from "../types"
import { storeData , getAllFromStore } from '../../helpers/indexDbModels'
import Ons from 'onsenui';


async function ManageOffline (dispatch,data){
  
  if(data.id == null)
  {
    let r = Math.random().toString(36).substring(7);
    console.log("random", r);    
    data.id = r;
  }
  
  data.synchroState = false;

  await storeData("functionalUnits",data);
  const dataSet =await getAllFromStore("functionalUnits");
  console.log(dataSet);
  dispatch(resetFunctionalUnits());
  dispatch(setFunctionalUnits(dataSet));  

}

export const createFunctionalUnit = (data,componentSuccess) => {
  return async dispatch => {

      
      if(!navigator.onLine)
      {
        console.log("Modo offline");
        componentSuccess(data.project_id);
        ManageOffline (dispatch,data);        
        Ons.notification.alert({title:"¡Que bien!", message:"Se ha registrado la unidad funcional en memoria"});
        return;
      }

      console.log(data);

      dispatch(fetching());

      let SuccessCallBack = (response) => {
        dispatch(notFetching());
        Ons.notification.alert({title:"¡Que bien!", message:"Se ha creado la unidad funcional"});
        componentSuccess(response.data);
      }

      let ErrorCallBack = () => {
        Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido crear la unidad funcional"});
        dispatch(notFetching());
      }

      console.log(String(FUNCTIONAL_UNIT_URL));

      Request.postRequest(
        FUNCTIONAL_UNIT_URL,
        data,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}

export const getFunctionalUnits = (id, SuccessCallBack, keepFetching = false) => {
  return async dispatch => {

      if(!navigator.onLine)
      {
        console.log("Modo offline");
        dispatch(notFetching());
        return;
      }


      console.log(id);

      if(!keepFetching)
      {
        dispatch(fetching());
      }



      if(!SuccessCallBack)
      {
        SuccessCallBack = (response) => {

          if(!keepFetching)
          {
            dispatch(notFetching());
          }

          if(response.data.length == 0)
          {
            Ons.notification.alert({title:"Espera",message:"Aun no hay unidades funcionales asociadas al proyecto"});
          }

          dispatch(setFunctionalUnits(response.data));
        }
      }


      let ErrorCallBack = () => {
        dispatch(notFetching());
      }

      //console.log(String(FUNCTIONAL_UNIT_URL+id));

      Request.getRequest(
        GET_FUNCTIONAL_UNITS+id,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}


export const updateFunctionalUnit = (id,data,componentSuccess) => {
  return async dispatch => {

      console.log(data);

      if(!navigator.onLine)
      {
        console.log("Modo offline");
        dispatch(notFetching());
        data.id = id;
        ManageOffline (dispatch,data);
        componentSuccess();
        return;
      }


      dispatch(fetching());

      let SuccessCallBack = (response) => {
        dispatch(notFetching());
        Ons.notification.alert({title:"¡Que bien!", message:"Se ha modificado la unidad funcional"});
        dispatch(resetFunctionalUnits());
        componentSuccess(response.data);
      }

      let ErrorCallBack = () => {
        Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido modificar la unidad funcional"});
        dispatch(notFetching());
      }



      Request.putRequest(
        FUNCTIONAL_UNIT_URL+"/"+id,
        data,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}

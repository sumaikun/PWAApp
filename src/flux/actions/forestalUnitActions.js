import { Request } from '../../helpers/request'
import { fetching , notFetching, setForestalUnits, resetForestallUnits } from "./appActions";
import { GET_FORESTAL_UNITS_URL , BASE_URL } from "../types"
import { storeData , getAllFromStore } from '../../helpers/indexDbModels'
import Ons from 'onsenui';


import { goBack } from "./navigationActions";

async function ManageOffline (dispatch,data){
  
  if(data.id == null)
  {
    let r = Math.random().toString(36).substring(7);
    console.log("random", r);    
    data.id = r;
  }
  
  data.synchroState = false;
  console.log(data);
  await storeData("forestalUnits",data);
  const dataSet =await getAllFromStore("forestalUnits");
  console.log(dataSet);
  dispatch(resetForestallUnits()) 
  dispatch(setForestalUnits(dataSet));  

}

export const getForestalUnits = (id, successCallBack = null  ,errorCallBack = null ,
  keepFetching = false , aditionalSuccessLogic = null ) => {
  return async dispatch => {

      //console.log(id);

      if(!keepFetching)
      {
        dispatch(fetching());
      }


      if(!navigator.onLine)
      {
        console.log("Modo offline");
        dispatch(notFetching());
        return;
      }

      let SuccessCallBack =  successCallBack ? successCallBack :  (response) => {
        if(!keepFetching)
        {
          dispatch(notFetching());
        }

        if(aditionalSuccessLogic)
        {
          aditionalSuccessLogic();
        }

        dispatch(setForestalUnits(response.data));
      }

      let ErrorCallBack = () => {
        dispatch(notFetching());
      }

      console.log(String(GET_FORESTAL_UNITS_URL+id));

      Request.getRequest(
        GET_FORESTAL_UNITS_URL+id,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}


export const createForestUnitPhase1 = (data,successCallBack  ,errorCallBack = null ) => {
  return async dispatch => {

    if(!navigator.onLine)
    {
      console.log("Modo offline");
      let now = new Date().toISOString().split('T');
      data.updated_at = now[0]+" "+now[1].substring(0,8);
      ManageOffline (dispatch,data);
      Ons.notification.alert({title:"¡Que bien!",message:"¡Unidad forestal guardada en memoria!"});
      dispatch(goBack());
      return;
    }

    dispatch(fetching());



    let SuccessCallBack =  successCallBack ? successCallBack :  (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Que bien!",message:"¡Unidad forestal creada!"});
    }

    let ErrorCallBack = errorCallBack ? errorCallBack: () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido crear la unidad forestal"});
    }


    Request.postRequest(
      BASE_URL+"/api/forest-unit/first-phase",
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}


export const updateForestUnitPhase1 = (id,data,successCallBack,errorCallBack = null) => {
  return async dispatch => {

      console.log(data);

      //Modifier string to int
       data.origin = data.origin === "1" || data.origin === 'Nativa'  ?  "1" :
       data.origin === "2" || data.origin === 'Exotica'  ? "2" : null;

      data.cup_density =  data.cup_density === "1" || data.cup_density === 'Clara'  ?  "1" :
        data.cup_density === "2" || data.cup_density === 'Media'  ? "2" :
        data.cup_density === "3" || data.cup_density === 'Espesa' ? "3":null;

      data.epiphytes = data.epiphytes === "1" || data.epiphytes === 'Si' ? "1" :
      data.epiphytes === "2" || data.epiphytes === 'No' ? "2" : null;

      data.condition = data.condition === "1" || data.condition === 'Malo' ? "1":
      data.condition === "2" || data.condition === 'Regular' ? "2":
      data.condition === "3" || data.condition === 'Bueno' ? "3": null;

      data.health_status = data.health_status === "1" || data.health_status === 'Malo' ? "1":
      data.health_status === "2" || data.health_status === 'Regular' ? "2":
      data.health_status === "3" || data.health_status === 'Bueno' ? "3": null;

      data.origin = !data.origin ? null : data.origin;


      if(!navigator.onLine)
      {
        console.log("Modo offline");

        let now = new Date().toISOString().split('T');

        data.updated_at = now[0]+" "+now[1].substring(0,8);

        data.id = id;
        
        ManageOffline (dispatch,data);

        dispatch(goBack());
        Ons.notification.alert({title:"¡Que bien!",message:"¡Unidad forestal editada en memoria!"});
        return;
      }


      dispatch(fetching());

      let SuccessCallBack = successCallBack ? successCallBack : (response) => {
        dispatch(notFetching());
        Ons.notification.alert({title:"¡Que bien!", message:"Unidad forestal actualizada"});


      }

      let ErrorCallBack = errorCallBack ? errorCallBack: (error) => {
        console.log(error);
        Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido modificar la unidad forestal"});
        dispatch(notFetching());
      }

      Request.putRequest(
        BASE_URL+"/api/forest-unit/first-phase/"+id,
        data,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}


export const createForestUnitPhase2 = (data,successCallBack  ,errorCallBack = null) => {
  return async dispatch => {

    if(!navigator.onLine)
    {
      console.log("Modo offline");

      let now = new Date().toISOString().split('T');

      data.updated_at = now[0]+" "+now[1].substring(0,8);

      ManageOffline (dispatch,data);
    
      Ons.notification.alert({title:"¡Que bien!",message:"¡Unidad forestal guardada en memoria!"});
      dispatch(goBack());
      return;
    }

    dispatch(fetching());

    let SuccessCallBack = successCallBack ? successCallBack : (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Que bien!",message:"¡Unidad forestal creada!"});
    }

    let ErrorCallBack = errorCallBack ? errorCallBack: () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido crear la unidad forestal"});
    }


    Request.postRequest(
      BASE_URL+"/api/forest-unit",
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}

export const updateForestUnitPhase2 = (id,data,successCallBack, errorCallBack = null) => {
  return async dispatch => {

      console.log(data);

      //Modifier string to int
       data.origin = data.origin === "1" || data.origin === 'Nativa'  ?  "1" :
       data.origin === "2" || data.origin === 'Exotica'  ? "2" : null;

      data.cup_density =  data.cup_density === "1" || data.cup_density === 'Clara'  ?  "1" :
        data.cup_density === "2" || data.cup_density === 'Media'  ? "2" :
        data.cup_density === "3" || data.cup_density === 'Espesa' ? "3":null;

      data.epiphytes = data.epiphytes === "1" || data.epiphytes === 'Si' ? "1" :
      data.epiphytes === "2" || data.epiphytes === 'No' ? "2" : null;

      data.condition = data.condition === "1" || data.condition === 'Malo' ? "1":
      data.condition === "2" || data.condition === 'Regular' ? "2":
      data.condition === "3" || data.condition === 'Bueno' ? "3": null;

      data.health_status = data.health_status === "1" || data.health_status === 'Malo' ? "1":
      data.health_status === "2" || data.health_status === 'Regular' ? "2":
      data.health_status === "3" || data.health_status === 'Bueno' ? "3": null;

      data.origin = !data.origin ? null : data.origin;

      if(!navigator.onLine)
      {

        let now = new Date().toISOString().split('T');

        data.updated_at = now[0]+" "+now[1].substring(0,8);

        console.log("Modo offline");

        ManageOffline (dispatch,data);
       
        dispatch(goBack());
        Ons.notification.alert({title:"¡Que bien!",message:"¡Unidad forestal editada en memoria!"});
        return;
      }

      dispatch(fetching());

      let SuccessCallBack = successCallBack ? successCallBack : (response) => {
        dispatch(notFetching());
        Ons.notification.alert({title:"¡Que bien!", message:"Unidad forestal actualizada"});


      }

      let ErrorCallBack = errorCallBack ? errorCallBack:(error)  => {
        console.log(error);
        Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido modificar la unidad forestal"});
        dispatch(notFetching());
      }

      Request.putRequest(
        BASE_URL+"/api/forest-unit/"+id,
        data,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}


export const createForestUnitPhase3 = (data,successCallBack  ,errorCallBack = null) => {
  return async dispatch => {

    if(!navigator.onLine)
    {
      console.log("Modo offline");
      let now = new Date().toISOString().split('T');
      data.updated_at = now[0]+" "+now[1].substring(0,8);
      ManageOffline (dispatch,data);
      Ons.notification.alert({title:"¡Que bien!",message:"¡Unidad forestal guardada en memoria!"});
      dispatch(goBack());
      return;
    }

    dispatch(fetching());

    let SuccessCallBack = successCallBack ? successCallBack : (response) => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Que bien!",message:"¡Unidad forestal creada!"});
    }

    let ErrorCallBack = errorCallBack ? errorCallBack: () => {
      dispatch(notFetching());
      Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido crear la unidad forestal"});
    }


    Request.postRequest(
      BASE_URL+"/api/forest-unit/third-phase",
      data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}

export const updateForestUnitPhase3 = (id,data,successCallBack,errorCallBack = null) => {
  return async dispatch => {

      console.log(data);

      //Modifier string to int
       data.origin = data.origin === "1" || data.origin === 'Nativa'  ?  "1" :
       data.origin === "2" || data.origin === 'Exotica'  ? "2" : null;

      data.cup_density =  data.cup_density === "1" || data.cup_density === 'Clara'  ?  "1" :
        data.cup_density === "2" || data.cup_density === 'Media'  ? "2" :
        data.cup_density === "3" || data.cup_density === 'Espesa' ? "3":null;

      data.epiphytes = data.epiphytes === "1" || data.epiphytes === 'Si' ? "1" :
      data.epiphytes === "2" || data.epiphytes === 'No' ? "2" : null;

      data.condition = data.condition === "1" || data.condition === 'Malo' ? "1":
      data.condition === "2" || data.condition === 'Regular' ? "2":
      data.condition === "3" || data.condition === 'Bueno' ? "3": null;

      data.health_status = data.health_status === "1" || data.health_status === 'Malo' ? "1":
      data.health_status === "2" || data.health_status === 'Regular' ? "2":
      data.health_status === "3" || data.health_status === 'Bueno' ? "3": null;

      data.origin = !data.origin ? null : data.origin;

      if(!navigator.onLine)
      {
        let now = new Date().toISOString().split('T');

        data.updated_at = now[0]+" "+now[1].substring(0,8);
       
        ManageOffline (dispatch,data);       

        Ons.notification.alert({title:"¡Que bien!",message:"¡Unidad forestal editada en memoria!"});
        return;
      }

      dispatch(fetching());

      let SuccessCallBack = successCallBack ? successCallBack : (response) => {
        dispatch(notFetching());
        Ons.notification.alert({title:"¡Que bien!", message:"Unidad forestal actualizada"});


      }

      let ErrorCallBack = errorCallBack ? errorCallBack: (error) => {
        console.log(error);
        Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido modificar la unidad forestal"});
        dispatch(notFetching());
      }

      Request.putRequest(
        BASE_URL+"/api/forest-unit/third-phase/"+id,
        data,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}

import { Request } from '../../../helpers/request'
import { fetching,
     notFetching,
     setRequireExpenses,
     setBoxExpenses,
     addRequireExpense,
     addBoxExpense } from "../appActions";
import { EXPENSE_URL , BOX_URL } from "../../types"
import Ons from 'onsenui'
import { storeData, getAllFromStore } from '../../../helpers/indexDbModels'


async function ManageOffline (dispatch,data,dbName){
  
    if(data.id == null)
    {
      let r = Math.random().toString(36).substring(7);
      console.log("random", r);    
      data.id = r;
    }
    
    data.synchroState = false;
    console.log(data);
    await storeData(dbName,data);

    if(dbName === "expenses")
    {
        dispatch(addRequireExpense(data));
    }

    if(dbName === "boxExpenses")
    {
        dispatch(addBoxExpense(data));
    }

    
    
  }


export const getRequiredExpenses = ( successCallBack = null  ,errorCallBack = null ) => {
    return async dispatch => {

        dispatch(fetching());

        if(!navigator.onLine)
        {
          console.log("Modo offline");

          const dataSet = await getAllFromStore("expenses");
        
          dispatch(setRequireExpenses(dataSet));

          dispatch(notFetching());

          return;
          
        }

        let SuccessCallBack =  successCallBack ? successCallBack :  async (response) => {      
        
            console.log("success reponse");

            if(response.data.length > 0)
            {
               // await verifyAndSaveInArray(response.data,"forestalUnits");
            }

            dispatch(setRequireExpenses(response.data));

            dispatch(notFetching());

        }
    
        let ErrorCallBack = errorCallBack ? errorCallBack : () => {
            dispatch(notFetching());
        }
    
        
        Request.getRequest(
            EXPENSE_URL,
            SuccessCallBack,
            ErrorCallBack
        );
    }
}

export const createRequireExpense = (data,successCallBack = null ,errorCallBack = null ) => {
    
    return async dispatch => {
  
       if(!navigator.onLine)
       {
            ManageOffline(dispatch,data,"expenses");
            Ons.notification.alert({title:"¡Que bien!",message:"¡Gasto creado offline!"});  
            return;
       }

        dispatch(fetching());

        let SuccessCallBack =  successCallBack ? successCallBack :  (response) => {

            dispatch(notFetching());

            Ons.notification.alert({title:"¡Que bien!",message:"¡Gasto creado!"});

        }
  
        let ErrorCallBack = errorCallBack ? errorCallBack: () => {

            dispatch(notFetching());

            Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido crear la información"});
      
        }
  
  
        Request.postRequest(
            EXPENSE_URL,
            data,
            SuccessCallBack,
            ErrorCallBack
        );

    }
}

export const updateRequireExpense = (id,data,successCallBack,errorCallBack = null) => {
    return async dispatch => {  
  
        if(!navigator.onLine)
        {
            ManageOffline(dispatch,data,"expenses");
            Ons.notification.alert({title:"¡Que bien!",message:"¡Gasto editado offline!"});  
            return;
        }
  
        if(!Number.isInteger(id))
        {
          return dispatch(createRequireExpense(data));
        }
  
        dispatch(fetching());
  
        let SuccessCallBack = successCallBack ? successCallBack : (response) => {
          
          dispatch(notFetching());
          
          Ons.notification.alert({title:"¡Que bien!", message:"Gasto actualizado"});
  
        }
  
        let ErrorCallBack = errorCallBack ? errorCallBack: (error) => {
          
          console.log(error);
          
          Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido modificar el gasto"});
          
          dispatch(notFetching());
        
        }
  
        Request.putRequest(
          EXPENSE_URL+"/"+id,
          data,
          SuccessCallBack,
          ErrorCallBack
        );
    }
}


export const getBoxExpenses = ( successCallBack = null  ,errorCallBack = null ) => {
    return async dispatch => {

        dispatch(fetching());

        if(!navigator.onLine)
        {
          console.log("Modo offline");

          const dataSet = await getAllFromStore("boxExpenses");
        
          dispatch(setBoxExpenses(dataSet));

          dispatch(notFetching());

          return;
        }

        let SuccessCallBack =  successCallBack ? successCallBack :  async (response) => {      
        
            console.log("success reponse");

            if(response.data.length > 0)
            {
               // await verifyAndSaveInArray(response.data,"forestalUnits");
            }

            dispatch(setBoxExpenses(response.data));

            dispatch(notFetching());

        }
    
        let ErrorCallBack = errorCallBack ? errorCallBack : () => {
            dispatch(notFetching());
        }
    
        
        Request.getRequest(
            BOX_URL,
            SuccessCallBack,
            ErrorCallBack
        );
    }
}

export const createBoxExpense = (data,successCallBack = null ,errorCallBack = null ) => {
    
    return async dispatch => {
  
       if(!navigator.onLine)
       {
            ManageOffline(dispatch,data,"boxExpenses");
            Ons.notification.alert({title:"¡Que bien!",message:"¡Gasto creado offline!"});  
            return;
       }

        dispatch(fetching());

        let SuccessCallBack =  successCallBack ? successCallBack :  (response) => {

            dispatch(notFetching());

            Ons.notification.alert({title:"¡Que bien!",message:"¡Gasto creado!"});

        }
  
        let ErrorCallBack = errorCallBack ? errorCallBack: () => {

            dispatch(notFetching());

            Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido crear la información"});
      
        }
  
  
        Request.postRequest(
            BOX_URL,
            data,
            SuccessCallBack,
            ErrorCallBack
        );

    }
}

export const updateBoxExpense = (id,data,successCallBack,errorCallBack = null) => {
    return async dispatch => {  
  
        if(!navigator.onLine)
        {
            ManageOffline(dispatch,data,"boxExpenses");
            Ons.notification.alert({title:"¡Que bien!",message:"¡Gasto editado offline!"});  
            return;
        }
  
        if(!Number.isInteger(id))
        {
          return dispatch(createRequireExpense(data));
        }
  
        dispatch(fetching());
  
        let SuccessCallBack = successCallBack ? successCallBack : (response) => {
          
          dispatch(notFetching());
          
          Ons.notification.alert({title:"¡Que bien!", message:"Gasto actualizado"});
  
        }
  
        let ErrorCallBack = errorCallBack ? errorCallBack: (error) => {
          
          console.log(error);
          
          Ons.notification.alert({title:"¡Algo anda mal!", message:"No se ha podido modificar el gasto"});
          
          dispatch(notFetching());
        
        }
  
        Request.putRequest(
          BOX_URL+"/"+id,
          data,
          SuccessCallBack,
          ErrorCallBack
        );
    }
}
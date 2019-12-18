import { Request } from '../../../helpers/request';
import {
  fetching,
  notFetching,
  setDefaultActivities
} from "../appActions";
import { GET_DEFAULT_ACTIVITIES_BY_TYPE, BASE_URL } from "../../types";
import Ons from 'onsenui';

/*
type_id (1: Establecimiento, 2: Mantenimiento, 3: Civil, 4: Plantación)
 */
export const getDefaultActivitiesByType = (project_id , keepFetching = false,
  successCallBack = null, errorCallBack = null) => {
  return async dispatch => {

    console.log("on get default activities");
    //console.log(type_id);

    dispatch( fetching() );

    if(!navigator.onLine) {
      console.log("Modo offline");
      keepFetching == false ? dispatch(notFetching()) : false ;      
      return;
    }

    let SuccessCallBack = successCallBack ? successCallBack: (response) => {
      
      keepFetching == false ? dispatch(notFetching()) : false ;
    
        console.log("set default activities");

        console.log({default:response.data,project:project_id});

        dispatch(setDefaultActivities({default:response.data,project:project_id}))

    };

    let ErrorCallBack = errorCallBack ? errorCallBack : () => {
      dispatch(notFetching());
    };

    //console.log(String(GET_FORESTAL_UNITS_URL + project_id));

    Request.getRequest(
      GET_DEFAULT_ACTIVITIES_BY_TYPE + project_id,
      SuccessCallBack,
      ErrorCallBack
    );
  };
};
import { Request } from '../../../helpers/request';
import {
  fetching,
  notFetching,
  setDefaultActivities
} from "../appActions";
import { GET_DEFAULT_ACTIVITIES_BY_TYPE, BASE_URL } from "../../types";
import { getAllFromStore , verifyAndSaveInArray } from '../../../helpers/indexDbModels'

/*
type_id (1: Establecimiento, 2: Mantenimiento, 3: Civil, 4: Plantación)
 */
export const getDefaultActivitiesByType = (project_id ,
  successCallBack = null, errorCallBack = null) => {
  return async dispatch => {

    console.log("on get default activities");
    //console.log(type_id);

    dispatch( fetching() );

    if(!navigator.onLine) {
      console.log("Modo offline");
      const dataSet = await getAllFromStore("defaultActivities");
      console.log("data in db",dataSet);
      let dataFiltered = dataSet.filter(  data => data.project == project_id );
      dispatch(setDefaultActivities({default:dataFiltered,project:project_id}))
      dispatch(notFetching());            
      return;
    }

    let SuccessCallBack = successCallBack ? successCallBack:  async (response) => {
      
        let data;

        response.data == "" ?  data = [] : data = response.data ;

        if(data.length > 0)
        {
          await verifyAndSaveInArray(data,"defaultActivities");
        }
        
        
        console.log({default:data,project:project_id});

        dispatch(setDefaultActivities({default:data,project:project_id}))

        //dispatch(notFetching()); 

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
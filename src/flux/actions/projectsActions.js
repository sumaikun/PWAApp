import { Request } from '../../helpers/request'
import { fetching , notFetching , setProjects , setFunctionalUnits,   resetFunctionalUnits,
  resetForestallUnits } from "./appActions";
import { GET_PROJECTS_URL , GET_PROJECTS_BY_USER } from "../types"
import Ons from 'onsenui';
 

export const fetchProjects = (id) => {
  return async dispatch => {

      dispatch(fetching());

      if(!navigator.onLine)
      {
        console.log("Modo offline");
        dispatch(notFetching());
        return;
      }

      let SuccessCallBack = (response) => {
        dispatch(notFetching());
        dispatch(setProjects(response.data));
      }

      let ErrorCallBack = () => {
        dispatch(notFetching());
      }

      Request.getRequest(
        GET_PROJECTS_URL/* + '/'+ id*/,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}



export const getProjectByUser = (user) => {
  return async dispatch => {     

     
      let id = user.id;
    
      dispatch(fetching());
      
      if(!navigator.onLine)
      {
        console.log("Modo offline");
        dispatch(notFetching());
        return;
      }

      dispatch(resetFunctionalUnits());
      dispatch(resetForestallUnits());     

      let SuccessCallBack = (response) => {

        dispatch(notFetching());

        if(response.status == "204")
        {
          Ons.notification.alert({title:"",message:"El usuario actual no tiene proyectos asociados"});
          return;
        }       

        let totalProjects = response.data;

        dispatch(setProjects(totalProjects));

      }

      let ErrorCallBack = () => {
        dispatch(notFetching());
      }

      Request.getRequest(
        GET_PROJECTS_BY_USER+id,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}

import { Request } from '../../../helpers/request'
import { fetching , notFetching, setListUser} from "../appActions";
import { GET_USERS_BY_PROJECT } from "../../types";
import Ons from 'onsenui';
import moment from 'moment';
//Cargar repotes SST por proyecto
export function  getListUsers (id)  {
  return async dispatch => {
      console.log(GET_USERS_BY_PROJECT)
      dispatch(fetching());

      let SuccessCallBack = (response) => {
        dispatch(notFetching());
        dispatch(setListUser(response.data));
      }

      let ErrorCallBack = () => {
        dispatch(notFetching());
      }
      Request.getRequest(
        GET_USERS_BY_PROJECT+id,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}
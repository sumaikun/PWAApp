import { Request } from '../../../helpers/request'
import { fetching , notFetching, setRiskOverview } from "../appActions";
import { GET_RISK_OVERVIEW_URL  } from "../../types";


export const getRiskOverview = (id) => {
  return async dispatch => {

      dispatch(fetching());

      let SuccessCallBack = (response) => {
        dispatch(notFetching());
        dispatch(setRiskOverview(response.data));
      }

      let ErrorCallBack = () => {
        dispatch(notFetching());
      }
      Request.getRequest(
        GET_RISK_OVERVIEW_URL+id,
        SuccessCallBack,
        ErrorCallBack
      );
  }
}
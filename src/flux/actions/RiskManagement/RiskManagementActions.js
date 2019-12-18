import { Request } from '../../../helpers/request'
import { fetching , notFetching  } from "../appActions";
import {  BASE_URL,
   RAIN_FALL_URL,
   TUNNEL_DEFORMATION_URL,
   HILL_SIDE_COLLAPSE_URL,
   HALL_SIDE_MOVEMENT_URL,
   RIVER_COLLAPSE_URL,
   SET_TUNNEL_DEFORMATION_LIST,
   HILL_SIDE_MOVEMENT_LIST,
   RAIN_FALL_LIST,
   HILL_SIDE_COLLAPSE_LIST,
   RIVER_COLLAPSE_LIST,
   SET_TUNNEL_DEFORMATION,
   SET_HILL_SIDE_MOVEMENT,
   SET_RAIN_FALL,
   SET_HILL_SIDE_COLLAPSE,
   SET_RIVER_COLLAPSE,
   GO_TO_RISK_REPORT,
   SET_CURRENT_RISK_PHASE,
   SET_RISK_INDICATORS,
   RISK_INDICATORS_URL  } from "../../types"
import Ons from 'onsenui';

export const goToRiskReport = () => ({
  type: GO_TO_RISK_REPORT,
});

export const setCurrentRiskPhase = (data) => ({
  type: SET_CURRENT_RISK_PHASE,
  payload: data,
});

export const setTunnelDeformation = (data) => ({
  type: SET_TUNNEL_DEFORMATION,
  payload: data
});

export const setHillsideMovement = (data) => ({
  type: SET_HILL_SIDE_MOVEMENT,
  payload: data
});

export const setRainfall = (data) => ({
  type: SET_RAIN_FALL,
  payload: data
});

export const setHillSideCollapse = (data) => ({
  type: SET_HILL_SIDE_COLLAPSE,
  payload: data
});

export const setRiverCollapse = (data) => ({
  type: SET_RIVER_COLLAPSE,
  payload: data
});


export const setTunnelDeformationList = (data) => ({
  type: SET_TUNNEL_DEFORMATION_LIST,
  payload: data
});

export const getTunnelsDeformation = (data,successCallBack  ,errorCallBack
  , keepFetching = false) => {
  return async dispatch => {

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

    let SuccessCallBack = (response) => {

      if(!keepFetching)
      {
        dispatch(notFetching());
      }

      dispatch(setTunnelDeformationList(response.data));
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());

    }


    Request.getRequest(
      TUNNEL_DEFORMATION_URL+"/"+data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}

export const setHillsideMovementList = (data) => ({
  type: HILL_SIDE_MOVEMENT_LIST,
  payload: data
});

export const getHillsidesMovement = (data,successCallBack  ,errorCallBack,
  keepFetching = false) => {
  return async dispatch => {

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

    let SuccessCallBack = (response) => {
      if(!keepFetching)
      {
        dispatch(notFetching());
      }

      dispatch(setHillsideMovementList(response.data))
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());

    }


    Request.getRequest(
      HALL_SIDE_MOVEMENT_URL+"/"+data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}

export const setRainfallList = (data) => ({
  type: RAIN_FALL_LIST,
  payload: data
});


export const getRainfalls = (data,successCallBack  ,errorCallBack,
   keepFetching = false ) => {
  return async dispatch => {

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

    let SuccessCallBack = (response) => {
      if(!keepFetching)
      {
          dispatch(notFetching());
      }

      dispatch(setRainfallList(response.data));
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());

    }


    Request.getRequest(
      RAIN_FALL_URL+"/"+data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}


export const setHillSlideCollapseList = (data) => ({
  type: HILL_SIDE_COLLAPSE_LIST,
  payload: data
});

export const getHillsidesCollapse = (data,successCallBack  ,errorCallBack
  , keepFetching = false) => {
  return async dispatch => {

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

    let SuccessCallBack = (response) => {
      if(!keepFetching)
      {
        dispatch(notFetching());
      }
      dispatch(setHillSlideCollapseList(response.data));
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());

    }


    Request.getRequest(
      HILL_SIDE_COLLAPSE_URL+"/"+data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}

export const setRiverCollapseList = (data) => ({
  type: RIVER_COLLAPSE_LIST,
  payload: data
});

export const getRiversCollapse = (data,successCallBack  ,errorCallBack
,keepFetching = false) => {
  return async dispatch => {

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

    let SuccessCallBack = (response) => {
      if(!keepFetching)
      {
          dispatch(notFetching());
      }

      dispatch(setRiverCollapseList(response.data));
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());

    }


    Request.getRequest(
      RIVER_COLLAPSE_URL+"/"+data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}

export const setRiskIndicators = (data) => ({
  type: SET_RISK_INDICATORS,
  payload: data
});

export const getRiskIndicators = (data,successCallBack  ,errorCallBack) => {
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
      dispatch(setRiskIndicators(response.data));
    }

    let ErrorCallBack = () => {
      dispatch(notFetching());

    }

    Request.getRequest(
      RISK_INDICATORS_URL+"/"+data,
      SuccessCallBack,
      ErrorCallBack
    );

  }
}

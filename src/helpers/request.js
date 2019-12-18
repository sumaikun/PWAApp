import { handleCodeError } from "./handleRequest";

const axios = require('axios');

let axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
  }
};

export const Request =
{

 postRequest : (URL,DATA,successCallBack,errorCallBack) =>
 {
    let request = axios.post(URL,DATA, axiosConfig).then( response => {

      //console.log(response);

      successCallBack ? successCallBack(response):null;

    }).catch( error => {

      //console.log(error);
      handleCodeError(error);

      errorCallBack ? errorCallBack(error):null;

    });
  },

  getRequest:(URL,successCallBack,errorCallBack) =>
  {

    let request = axios.get(URL).then( response => {

      //console.log(response);

      successCallBack ? successCallBack(response):null;

    }).catch( error => {

      //console.log(error);
      handleCodeError(error);

      errorCallBack ? errorCallBack(error):null;

    });

  },

  putRequest:(URL,DATA,successCallBack,errorCallBack) =>
  {
    let request = axios.put(URL,DATA,axiosConfig).then( response => {

      successCallBack ? successCallBack(response):null;

    }).catch( error => {

      //console.log(error);
      handleCodeError(error);

      errorCallBack ? errorCallBack(error):null;

    });

  }
}

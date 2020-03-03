import React from 'react';
import ReactDOM from 'react-dom';

//css assets
import './index.css';
import './css/App.css';
import './css/Login.css';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

//Main Container
import AppNavigation from './pages/main/AppNavigation';

//errorHandler
import ErrorBoundary from './containers/ErrorBoundary';

//Default service worker
import * as serviceWorker from './serviceWorker';
// eslint-disable-next-line
import Worker from 'worker-loader!./workers/synchroData.worker.js';

//REDUX
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducers from "./flux/reducers/";

//indexedb
import { getAllFromStore } from "./helpers/indexDbModels";

import { fetching , notFetching } from "./flux/actions";

// Demo views


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

var store = createStoreWithMiddleware(reducers);




ReactDOM.render(
    <Provider store={store}>
      <ErrorBoundary>
        <AppNavigation/>
      </ErrorBoundary>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


//Prevent stuck in fetching
store.dispatch(notFetching());


var synchroProccess = () =>{
  console.log('online'); 

  let synchroWorker = new Worker();

  synchroWorker.postMessage("start");

  synchroWorker.addEventListener('message', async event => {
    console.log(event);

    switch(event.data)
    {
      case "update":
        break;
      default:
        break;
    }
   
  });
}

if(navigator.onLine)
{
  setTimeout(function(){
      synchroProccess(); 
  }, 8000);  
}

window.addEventListener('offline', function(e) { 
  
  console.log('offline');

});

window.addEventListener('online', function(e) { 
  synchroProccess();
});


/* if(mobileAppMode)
{
  console.log("cordova app initialized");
  document.addEventListener("deviceready", appInit);
}
else
{
  //console.log("app initialized as normal react project");
  appInit();
} */
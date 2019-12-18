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

import { setFunctionalUnits, resetFunctionalUnits, setForestalUnits,
   resetForestallUnits } from "./flux/actions";

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



var synchroProccess = () =>{
  console.log('online'); 

  let synchroWorker = new Worker();

  synchroWorker.postMessage("start");

  synchroWorker.addEventListener('message', async event => {
    console.log(event);

    switch(event.data)
    {
      case "update":
        console.log("to update info");
        //update fi
        let dataSet =await getAllFromStore("functionalUnits");
        console.log(dataSet);
        store.dispatch(resetFunctionalUnits());
        store.dispatch(setFunctionalUnits(dataSet)); 
        
        //update fu   
        dataSet =await getAllFromStore("forestalUnits");
        console.log(dataSet);
        store.dispatch(resetForestallUnits()); 
        store.dispatch(setForestalUnits(dataSet));
        break;
      default:
        break;
    }
   
  });
}

if(navigator.onLine)
{
  synchroProccess();
}

window.addEventListener('offline', function(e) { 
  
  console.log('offline');

});

window.addEventListener('online', function(e) { 
  synchroProccess();
});
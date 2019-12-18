import { fromJS } from 'immutable';

import { createFile } from './writeFiles';


export const loadState = () => {
  try {
    const serializedData = localStorage.getItem('state')
    if (serializedData === null){
      return undefined // Si no existe el state en el local storage devolvemos undefined para que cargue el state inicial que hayamos definido
    }
    return fromJS(JSON.parse(serializedData)) // Si encontramos con exito nuestro storage lo devolvemos.
  } catch (error) {
    return undefined // Si ocurre algun error, devuelvo undefined para cargar el state inicial.
  }
}
export const saveState = (state,saveAppState = true ,saveMemory = true ) => {
  try {
    //console.log(state);
    if(state.navigation.currentPagekey)
    {
      let storeState = {
        navigationIndex: state.navigation.currentPagekey,
      }

      if(!window.cordova)
      {
        storeState.appState = state.appState;
      }

      let serializedData = JSON.stringify(fromJS(storeState).toJS());

      console.log("ruta a guardar");

      console.log(serializedData);

      localStorage.setItem('state', serializedData);

      if(window.cordova)
      {
          if(state.appState && saveAppState)
          {
            let a = () => {
              console.log("appState writed");
            }
            let storeText = JSON.stringify(fromJS(state.appState).toJS());
            //console.log("store text");
            console.log(storeText);
            createFile("appStorage.json",storeText,a);
          }

          if(state.memory && saveMemory)
          {
              let a = () => {
                console.log("memoryState writed");
              }
              let storeText = JSON.stringify(fromJS(state.memory).toJS());
              //console.log("store text");
              //console.log(storeText);
              createFile("memoryStorage.json",storeText,a);
          }
      }

    }


    //console.log(localStorage.getItem('state'));
  } catch (error) {
    console.log("error salvando el estado");
    console.error(error);
    console.log(state);
	// Acá podemos capturar o crear cualquier log que deseemos en caso de que falle el salvado en el storage.
  }
}

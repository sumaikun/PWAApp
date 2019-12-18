import { combineReducers } from "redux";
import navigationReducer from './navigationReducer';
import appReducer from './appReducer';
import memoryReducer from './memoryReducer';

export default combineReducers({
  navigation: navigationReducer,
  appState: appReducer,
  memory: memoryReducer
});

import { setGoToResourceMain } from "./appActions";


export function getGoToResourceMain(data)  {
  console.log("data",data);
  let row = { ...data }
  return async dispatch => {
    dispatch(setGoToResourceMain(row))
  }
}

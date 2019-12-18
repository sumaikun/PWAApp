
//remove paramter from a json parsed in string

export const removeFromJsonString = (jsonString,removeKey,returnString = false ) => {
  ////console.log(jsonString);
  let jsonObject =  JSON.parse(jsonString);
  delete jsonObject[removeKey];
  return returnString ? JSON.stringify(jsonObject) : jsonObject;

}

//get parameter from a json parsed in string

export const getFromJsonString = (jsonString,getKey,returnString = false ) => {
  ////console.log(jsonString);
  try{
    let jsonObject =  JSON.parse(jsonString);
    return returnString ? JSON.stringify(jsonObject[getKey]) : jsonObject[getKey];
  }
  catch(error)
  {
    //console.log(error);
    return null;
  }

}


export const editOrAddToArray = (array , object ) => {

        let foundIndex = array.findIndex(data => data.id === object.id );

        if(foundIndex != -1)
        {
          array[foundIndex] = object;
        }
        else{
          array.push(object);
        }

      return array;
}

export const removeFromArray = (array,object) => {

     let i =  array.indexOf(object);

     if(i>0)
     {
       array = array.splice(i, 1);
     }
     else{
       array = [];
     }

    return array;
}

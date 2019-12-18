export const getFileContentAsBase64 = (path,callback, errorCallback) =>{

  console.log(path);
  window.resolveLocalFileSystemURL(path, gotFile, fail);

  function fail(e) {
        console.log('Cannot found requested file');
        //alert('Cannot found requested file');
        errorCallback();
  }

  function gotFile(fileEntry) {
     fileEntry.file(function(file) {
        var reader = new FileReader();
        reader.onloadend = function(e) {
             var content = this.result;
             callback(content);
        };
        // The most important point, use the readAsDatURL Method from the file plugin
        reader.readAsDataURL(file);
     });
  }
}

export const getInputFileBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


export const forestUnitsImgConvert = (unit) => {

  let promiseArray = [];

  if(unit.id_image)
  {

    if(unit.id_image.indexOf("base64") == -1)
    {
      let a =  new Promise((resolve, reject) => {

      getFileContentAsBase64(unit.id_image,function(base64Image){
          unit.id_image = base64Image;
          resolve("¡Éxito!");
        },()=> resolve("error"));
      });

      promiseArray.push(a);

    }
  }

  if(unit.general_image)
  {
    console.log("verificar que pasa");
    console.log(unit.general_image.indexOf("base64"));
    if(unit.general_image.indexOf("base64") == -1)
    {
      console.log("dentro de condición");
      let b =  new Promise((resolve, reject) => {
        getFileContentAsBase64(unit.general_image,function(base64Image){
          console.log("base 64 equivalente");
          //console.log(base64Image);
          unit.general_image = base64Image;
          resolve("¡Éxito!");
        },()=> resolve("error"));
      });

      promiseArray.push(b);
    }
  }

  if(unit.after_image)
  {
    if(unit.after_image.indexOf("base64") == -1)
    {
      let c = new Promise((resolve, reject) => {
          getFileContentAsBase64(unit.after_image,function(base64Image){
          unit.after_image = base64Image;
          resolve("¡Éxito!");
        },()=> resolve("error"));
      });
      promiseArray.push(c);
    }
  }

  if(unit.reference_image)
  {
    if(unit.reference_image.indexOf("base64") == -1)
    {
       let d = new Promise((resolve, reject) => {
         getFileContentAsBase64(unit.reference_image,function(base64Image){
           unit.reference_image = base64Image;
           resolve("¡Éxito!");
         },()=> resolve("error"));
      });
      promiseArray.push(d);
    }
  }

  if(unit.civil_image_1)
  {
    if(unit.civil_image_1.indexOf("base64") == -1)
    {
       let e = new Promise((resolve, reject) => {
         getFileContentAsBase64(unit.civil_image_1,function(base64Image){
           unit.civil_image_1 = base64Image;
           resolve("¡Éxito!");
         },()=> resolve("error"));
      });
      promiseArray.push(e);
    }
  }

  if(unit.civil_image_2)
  {
    if(unit.civil_image_2.indexOf("base64") == -1)
    {
       let f = new Promise((resolve, reject) => {
         getFileContentAsBase64(unit.civil_image_2,function(base64Image){
           unit.civil_image_2 = base64Image;
           resolve("¡Éxito!");
         },()=> resolve("error"));
      });
      promiseArray.push(f);
    }
  }

  return {promiseArray,unit};
}

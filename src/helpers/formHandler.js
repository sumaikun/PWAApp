import { getFileContentAsBase64 , getInputFileBase64 } from './imageHandler';
import Ons from 'onsenui';

export const saveImage = (key,self) => {

   

    console.log(self);

    ////console.log("react ambit prev cordova");

    ////console.log(self);

    if (window.cordova) {

      let base64Type = {
        quality : 30,
        correctOrientation : true,
        destinationType : navigator.camera.DestinationType.FILE_URI,
        sourceType : navigator.camera.PictureSourceType.CAMERA,
        
      }
  
      let fileType = {
        quality : 30,
        correctOrientation : true,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        mediaType: navigator.camera.MediaType.PICTURE,
          sourceType: navigator.camera.PictureSourceType.CAMERA,
          saveToPhotoAlbum: true
    }

      console.log("device version");

      console.log(window.device.version);

      if (window.device.platform.toLowerCase() == 'android' && parseInt( window.device.version, 10 ) < 8){
        
        window.cordova.plugins.backgroundMode.enable();
      }

      navigator.camera.getPicture(image => {

        window.cordova.plugins.backgroundMode.disable();

          /*if(!navigator.onLine)
          {
            console.log("No hay internet");
            console.log(image);

            self.setState({
              formData:
              {
                ...self.state.formData,
                [key]:image
              }
            },()=>{
               
            });

            return;
          }*/

          getFileContentAsBase64(image,function(base64Image){

            console.log(base64Image);

      
            self.setState({
              formData:
              {
                ...self.state.formData,
                [key]:base64Image
              }
            },()=>{
               
            });


          });


        }, null,base64Type);

    } else{
      ////console.log("please run the cordova project");
    }


}

export const fileUpload = (key,e,self) => {
    //////console.log(e.target.files);
   
     const file = e.target.files[0];
     const  fileType = file['type'];
     const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
     if (validImageTypes.includes(fileType)) {
        ////console.log(key);
       
        getInputFileBase64(e.target.files[0]).then(
          base64Image => {
          
            console.log(base64Image);

                  self.setState({
                    formData:
                    {
                      ...self.state.formData,
                      [key]:base64Image
                    }
                  },()=>{
                      ////console.log(self.state);
                  });
        });
    }
    else{
      e.preventDefault();
      Ons.notification.alert({title:"",message:"No se pueden subir otros archivos que no sean imagenes"});
    }
  } 
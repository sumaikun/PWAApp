import Ons from 'onsenui';

export const formValidation = (inputs) =>{

  let validation = true;
  let validationText = ' Porfavor ingrese los siguientes campos: ';
  let i = 0;
  inputs.forEach(input => {

      if(input.ref.value == "" || input.ref.value == null)
      {
          validation = false;
          console.log(input.name);
          (i === inputs.length - 1) ? validationText += input.name+".":validationText += input.name+", ";
      }

      i++;

  });

  validation ? true : (()=>{
    Ons.notification.alert({title:'Oops',message:validationText});
    inputs[0].ref.focus;
  })();

  return validation;

}

export const Validation_400 = (array) => {

  if(array.message){

      array = [array.message];
  }

  let htmlMessage = "<ul>";

  array.forEach(message => {
      console.log(message);
      htmlMessage += "<li>"+message+"</li>";
  });

  htmlMessage += "</ul>";

  console.log(htmlMessage);

  Ons.notification.alert({title:'¡Oops!',messageHTML:htmlMessage});
}

export const Validation_401 = () => {
    Ons.notification.alert({title:'¡Alto ahí!',message:"No puede autorizarse su entrada al sistema"});
}

export const Validation_405 = () => {
    Ons.notification.alert({title:'¡Error!',message:"Incosistencias en la conexión con la API"});
}

export const DefaultError = (message = null) => {
    //!message ? Ons.notification.alert({title:'¡Tenemos un problema!',message:"Ha sucedido un error"}) : Ons.notification.alert({title:'¡Tenemos un problema!',message});
}

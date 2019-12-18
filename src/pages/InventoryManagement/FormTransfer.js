import React, { Component } from 'react';
//sources
import "../../css/simpleForm.css";
import placeholderImage from "../../img/image-placeholder.png";

//Onsen Ui
import {  Col, Row, Card, Button, Input, Select, Radio} from 'react-onsenui';
import Ons from 'onsenui';

//Libraries

//components
import Loading from "../../components/Loading";
//container
import AppPage from '../../containers/AppPage';

//flux
import { connect } from 'react-redux';
import { createForestUnitPhase3,
   updateForestUnitPhase3,
   getForestalUnits,
   addOfflineForestUnitP3,
   updateOfflineForestUnitP3,
   goBack
   } from '../../flux/actions';
//helper

import { getFileContentAsBase64 , getInputFileBase64 } from '../../helpers/imageHandler';

const styles = {
  cardInput:{
    height: "40px",
    display: "flex",
    alignItems: "center",
    padding:"3px"
  },
  cardRadio:{
    height: "40px",
    display: "flex",
    alignItems: "center",
    padding:"3px",
    justifyContent:"space-around"
  },
  cardLabel:{
    height: "40px",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#61af2e",
    padding:"3px",
    color:"white"
  },
  textInput:{
    fontSize:"14px"
  },
  dateInput:{
    fontSize:"14px",
    textAlign:"center",
    color:"grey"
  },
  buttonCard:{
    backgroundColor:"rgb(97, 175, 46)",
    width:"100%",
    textAlign:"center"
  },
  textInCard:{
    fontSize:"14px",
    textAlign:"center",
    color:"grey",
    fontWeight:"bold",
    borderStyle: "dotted"
  }
}

class FormCompensation extends Component {
  constructor(props) {
    super(props);
    this.saveImage = this.saveImage.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.state = { formData:{} , selectSearch:{} ,
      projectInfo:this.props.appState.selectedProject };
    this.submitData = this.submitData.bind(this);
    this.contentPage = this.contentPage.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    //console.log(this.props);
  }

  componentDidMount(){
    //console.log(this.props);
    if(this.props.appState.forestalUnitE)
    {
      this.setState({
        formData:{
          ...this.state.formData,
          ...this.props.appState.forestalUnitE
        }
      },()=>{
        //console.log(this.state);
      });
    }
  }

  fileUpload(key,e){

     const file = e.target.files[0];
     const  fileType = file['type'];
     const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
     if (validImageTypes.includes(fileType)) {
        //console.log(key);
        let self = this;
        getInputFileBase64(e.target.files[0]).then(
          base64Image => {

          ////console.log(base64Image);

                  self.setState({
                    formData:
                    {
                      ...self.state.formData,
                      [key]:base64Image
                    }
                  },()=>{
                      //console.log(self.state);
                  });
        });
    }
    else{
      e.preventDefault();
      Ons.notification.alert({title:"",message:"No se pueden subir otros archivos que no sean imagenes"});
    }
  }

  saveImage(){

      let self = this;

      //console.log("react ambit prev cordova");

      //console.log(self);

      if (window.cordova) {

        navigator.camera.getPicture(image => {

          getFileContentAsBase64(image,function(base64Image){

            //console.log("react ambit post cordova");

            //console.log(self);

            //window.open(base64Image);
            //console.log(base64Image);
            // Then you'll be able to handle the myimage.png file as base64

            self.setState({
              formData:
              {
                ...self.state.formData,
                general_image:base64Image
              }
            },()=>{
                //console.log(self.state);
            });


          });


        }, null,{
            quality : 40,
            correctOrientation : true
        });
      } else{
        //console.log("please run the cordova project");
      }


  }

  handleChangeInput(event){

    if(event.target.name && event.target.value.length > 0)
    {
      //console.log(event.target.name);
      //console.log(event.target.value);
       this.setState(
         {
           formData:{
               ...this.state.formData,
               [event.target.name] : event.target.value
           }

         },() => {
           //console.log(this.state);
         }
       );
    }

    if (event.target.value[0] == "="){
      event.target.value = event.target.value.substr(1)
    }
  }

  submitData(e){

    e.preventDefault();

    if(!this.props.appState.isFetching)
    {
      if(this.props.appState.forestalUnitE)
      {
        //console.log("editMode");
        //console.log(this.state.formData);
        //console.log(this.state.formData.id);
        //return;
        let data = this.state.formData;
        data.user_id = this.props.appState.user.id;

        if(this.props.appState.currentFunctionalUnit.ToSynchro)
        {
          Ons.notification.alert({title:"",message:"Esta registrando datos a una Unidad fuctional no sincronizada se guardara en memoria hasta la sincronización"});
          this.props.updateOfflineForestUnitP3(data);
          this.props.goBack();
          return;
        }


        this.props.updateForestUnitPhase3(this.state.formData.id,data);
      }else{
        let data = this.state.formData;
        data.functional_unit_id = this.props.appState.currentFunctionalUnit.id;
        data.user_id = this.props.appState.user.id;

        if(this.props.appState.currentFunctionalUnit.ToSynchro)
        {
          data.created_at = new Date().toISOString().split('T')[0];
          Ons.notification.alert({title:"",message:"Esta registrando datos a una Unidad fucional no sincronizada se guardara en memoria hasta la sincronización"});
          this.props.addOfflineForestUnitP3(data);
          this.props.goBack();
          return;
        }

        this.props.createForestUnitPhase3(data);
        //console.log("createMode");
      }
    }
    else{
      Ons.notification.alert({title:"¡Espera!",message:"Estamos realizando otro proceso en el momento"});
    }

  }

  contentPage(){

    return(

      <div style={{backgroundColor:"#e6e7e8",height:"100%"}}>
        <br/>
        <form className="simpleForm"  onSubmit={this.submitData}>

        {}

          <Row>
            <Col width="49%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="code" value={this.state.formData.code} onChange={this.handleChangeInput} maxLength={10}  placeholder="ID" maxLength="10" required/>
              </Card>
            </Col>
            <Col width="49%">
              <Card style={styles.cardInput}>
                <Input style={{...styles.dateInput}} type="date" name="date" onChange={this.handleChangeInput}value={this.state.formData.date} disabled={this.state.isDisable} required/>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card style={styles.cardLabel}>
                <span>
                  INFORMACIÓN REPORTE
                </span>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="49%">
              <Card style={styles.cardInput}>
                <Select style={{width:"100%"}} onChange={this.handleChangeInput} name='origin' value={this.state.formData.origin === "1" || this.state.formData.origin === 'Si'  ?  1 :
                 this.state.formData.origin === "2" || this.state.formData.origin === 'No'  ? 2 : ''
              } >
                  <option value="" disabled selected>Tipo de combustible</option>
                  <option value="1">Si</option>
                  <option value="2">No</option>
                </Select>
              </Card>
            </Col>
            <Col width="49%">
              <Card style={styles.cardInput}>
                <Select style={{width:"100%"}} onChange={this.handleChangeInput} name='origin' value={this.state.formData.origin === "1" || this.state.formData.origin === 'Galones'  ?  1 : ''
              } >
                  <option value="" disabled selected>Unidad de medida</option>
                  <option value="1">Galones</option>
                </Select>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="49%">
                <Card style={styles.cardInput}>
                    <Input style={{...styles.dateInput}} type="number" name="date" placeholder="Cantidad" onChange={this.handleChangeInput}value={this.state.formData.date} disabled={this.state.isDisable} required/>
                </Card>
            </Col>
            <Col width="49%">
                <Card style={styles.cardInput}>
                    <Input style={{...styles.dateInput}} type="number" name="date" placeholder="Costo$" onChange={this.handleChangeInput}value={this.state.formData.date} disabled={this.state.isDisable} required/>
                </Card>
            </Col>

          </Row>
          <Row>
            <Row>
              <Col>
                <Card style={styles.cardLabel}>
                  <span>
                    Evidencias Fotográficas
                  </span>
                </Card>
              </Col>
            </Row>
          <Col>
            <br/>
            <Card style={styles.greenCard} >
              <div>
                <img src={this.state.formData.general_image ? this.state.formData.general_image : placeholderImage } style={{width:"100%"}} />
              </div>
              <Row>
                <Button style={styles.buttonCard}
                  onClick={this.saveImage}
                >Tomar foto</Button>
                <label className="fileContainer" style={{ "font-size": "17px",
                  color: "white"
                }}>
                  Subir archivo
                  <input  type="file" onChange={(event)=>{this.fileUpload("general_image",event)}}
                     />
                </label>
              </Row>
            </Card>
          </Col>
          </Row>
          <Row>
            <button type="submit"
              style={{fontSize:"18px",padding:'5px',marginTop:"10px",backgroundColor:"#61af2e",boxShadow:"rgba(0, 0, 0, 0.85) 0px 10px 10px -2px",
              color:"white",width:"100%",borderRadius:"10%"}}
              ><b>Registrar</b></button>
          </Row>
        </form>
      </div>


    );
  }

render() {

    const { isFetching , currentFunctionalUnit } = this.props.appState;

    return (
      <AppPage title={["Formulario de ", <strong>COMBUSTIBLE</strong>]} backButton={true}>

          {  isFetching ?
            <div style={{backgroundColor:"white",height:"100%"}}>
              <Loading/>
            </div> :

             this.contentPage()

          }

      </AppPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    project: state.project,
    appState: state.appState,
  };
}

export default  connect(mapStateToProps, { createForestUnitPhase3,
    updateForestUnitPhase3,
    getForestalUnits,
    addOfflineForestUnitP3,
    updateOfflineForestUnitP3,goBack })(FormCompensation);

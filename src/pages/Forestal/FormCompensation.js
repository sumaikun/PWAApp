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

import { saveImage , fileUpload } from '../../helpers/formHandler';

const styles = {
  cardInput:{
    height: "30px",
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
    //width:"100%",
    textAlign:"center",
    width: "85%",
    height: "35px",
    margin: "0 auto",
    padding: "0",
    display: "table-cell",
    lineHeight: "35px",
    verticalAlign: "middle",
  },
  textInCard:{
    fontSize:"14px",
    textAlign:"center",
    color:"grey",
    fontWeight:"bold",
    borderStyle: "dotted"
  },
  uploadFile:{
    backgroundColor:"rgb(97, 175, 46)",
    //width:"100%",
    textAlign:"center",
    width: "85%",
    height: "35px",
    margin: "3px auto",
    padding: "0",
    display: "table-cell",
    lineHeight: "35px",
    verticalAlign: "middle",
    borderRadius: "5px",
    fontSize: "17px",
    color: "white"
  }
}

class FormCompensation extends Component {
  constructor(props) {
    super(props);
    this.saveImage = saveImage.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.state = { formData:{
      origin:"1",
      condition:"3",
      health_status:"3",
      treatment:"1",
      cup_density:"2",
      products:"1"
    } , selectSearch:{} ,
      projectInfo:this.props.appState.selectedProject };
    this.submitData = this.submitData.bind(this);
    this.contentPage = this.contentPage.bind(this);
    this.fileUpload = fileUpload.bind(this);
    ///////console.log(this.props);
  }

  componentDidMount(){
    //////console.log(this.props);
    if(this.props.appState.forestalUnitE)
    {
      this.setState({
        formData:{
          ...this.state.formData,
          ...this.props.appState.forestalUnitE
        }
      },()=>{
        //////console.log(this.state);
      });
    }
  } 

  handleChangeInput(event){

    if(event.target.name && event.target.value.length > -1)
    {
      //////console.log(event.target.name);
      //////console.log(event.target.value);
       this.setState(
         {
           formData:{
               ...this.state.formData,
               [event.target.name] : event.target.value
           }

         },() => {
           //////console.log(this.state);
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
        ////console.log("editMode");
        ////console.log(this.state.formData);
        ////console.log(this.state.formData.id);
        //return;
        let data = this.state.formData;
        data.user_id = this.props.appState.user.id;

        if(this.props.appState.currentFunctionalUnit.ToSynchro)
        {
          data.updated_at = new Date().toISOString().split('T')[0];
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
          data.updated_at = new Date().toISOString().split('T')[0];
          Ons.notification.alert({title:"",message:"Esta registrando datos a una Unidad fucional no sincronizada se guardara en memoria hasta la sincronización"});
          this.props.addOfflineForestUnitP3(data);
          this.props.goBack();
          return;
        }

        this.props.createForestUnitPhase3(data);
        ////console.log("createMode");
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
            <Col>
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="code" value={this.state.formData.code} onChange={this.handleChangeInput} maxLength={10}  placeholder="ID" maxLength="10" required/>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card style={styles.cardLabel}>
                <span>
                  INFORMACIÓN GENERAL
                </span>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="compensation_site" value={this.state.formData.compensation_site} onChange={this.handleChangeInput} maxLength={10}  placeholder="Sitio de compensacion"  />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="common_name" value={this.state.formData.common_name} onChange={this.handleChangeInput}placeholder="Nombre común" required />
              </Card>
            </Col>
            <Col width="50%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="scientific_name" value={this.state.formData.scientific_name} onChange={this.handleChangeInput}placeholder="Nombre cientifico" />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="50%">
              <Card style={styles.cardInput}>
                <Select style={{width:"100%"}} onChange={this.handleChangeInput} name='origin' value={this.state.formData.origin === "1" || this.state.formData.origin === 'Nativa'  ?  1 :
                 this.state.formData.origin === "2" || this.state.formData.origin === 'Exotica'  ? 2 : ''
              } >
                  <option value="" disabled selected>Origen</option>
                  <option value="1">Nativa</option>
                  <option value="2">Exótica</option>
                </Select>
              </Card>
            </Col>
            <Col>
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name='cap_cm' onChange={this.handleChangeInput}value={this.state.formData.cap_cm} placeholder="CAP" min="0" type="number" step="any" />
              </Card>
            </Col>
            <Col>
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="total_heigth_m" onChange={this.handleChangeInput}value={this.state.formData.total_heigth_m} placeholder="HT" min="0" type="number" step="any" />
              </Card>
            </Col>
          </Row>
          <Row>
          <Col>
            <Card style={styles.cardInput}>
              <Select style={{width:"100%"}} name="cup_density" onChange={this.handleChangeInput} value={this.state.formData.cup_density === "1" || this.state.formData.cup_density === 'Clara'  ?  1 :
               this.state.formData.cup_density === "2" || this.state.formData.cup_density === 'Media'  ? 2 :
               this.state.formData.cup_density === "3" || this.state.formData.cup_density === 'Espesa' ? 3:''
            } >
                <option value="" disabled selected>Densidad de copa</option>
                <option value="1">Clara</option>
                <option value="2">Media</option>
                <option value="3">Espesa</option>
              </Select>
            </Card>
          </Col>
          <Col width="50%">
              <Card style={styles.cardInput}>
                <Select style={{width:"100%"}} onChange={this.handleChangeInput} name='epiphytes'
                value={
                  this.state.formData.epiphytes === "1" || this.state.formData.epiphytes === 'Si'  ?  1 :
                  this.state.formData.epiphytes === "2" || this.state.formData.epiphytes === 'No'  ? 2 : ''
              } >
                  <option value="" disabled selected>Epifitas</option>
                  <option value="1">Si</option>
                  <option value="2">No</option>
                </Select>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card style={styles.cardLabel}>
                <span>
                  Estado GRAL
                </span>
              </Card>
            </Col>
            <Col>
              <Card style={styles.cardLabel}>
                <span>
                  Díametro de copa
                </span>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="25%">
              <Card style={styles.cardInput} >
                <Select onChange={this.handleChangeInput} style={{width:"100%"}} name='condition' value = {
                  this.state.formData.condition === "1" || this.state.formData.condition === 'Malo' ? 1:
                  this.state.formData.condition === "2" || this.state.formData.condition === 'Regular' ? 2:
                  this.state.formData.condition === "3" || this.state.formData.condition === 'Bueno' ? 3: ''
                } >
                  <option value="" disabled selected>Fisico</option>
                  <option value="1">Malo</option>
                  <option value="2">Regular</option>
                  <option value="3">Bueno</option>
                </Select>
              </Card>
            </Col>
            <Col width="25%">
              <Card style={styles.cardInput}>
              <Select onChange={this.handleChangeInput} style={{width:"100%"}} value = {
                this.state.formData.health_status === "1" || this.state.formData.health_status === 'Malo' ? 1:
                this.state.formData.health_status === "2" || this.state.formData.health_status === 'Regular' ? 2:
                this.state.formData.health_status === "3" || this.state.formData.health_status === 'Bueno' ? 3: ''
              }  name='health_status'  >
                <option value="" disabled selected>Sanitario</option>
                <option value="1">Malo</option>
                <option value="2">Regular</option>
                <option value="3">Bueno</option>
              </Select>
              </Card>
            </Col>
            <Col width="25%">
              <Card style={styles.cardInput}>
                <Input onChange={this.handleChangeInput}style={styles.textInput} name="x_cup_diameter_m" value={this.state.formData.x_cup_diameter_m} placeholder="X" min="0" type="number" step="any" />
              </Card>
            </Col>
            <Col width="25%">
              <Card style={styles.cardInput}>
                <Input onChange={this.handleChangeInput}style={styles.textInput} name="y_cup_diameter_m" value={this.state.formData.y_cup_diameter_m} placeholder="Y" min="0" type="number" step="any" />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="50">
              <Card style={styles.cardLabel}>
                  <span>
                    Coordenadas
                  </span>
              </Card>
            </Col>
            <Col>
              <Card style={styles.cardInput}>

                <Input onChange={this.handleChangeInput}style={styles.textInput} name="waypoint" value={this.state.formData.waypoint}  placeholder="WayPoint" type="number" step="any"/>

              </Card>
            </Col>
          </Row>

          <Row>
            <Col width="100%">
              <br/>
              <Card>
                <textarea onChange={this.handleChangeInput} style={{width:"100%",borderRadius:"10%",height:"80px", borderColor:"white"}} name="note" value={this.state.formData.note}  placeholder="Observaciones" disabled={this.state.isDisable}></textarea>

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
                  onClick={()=>{this.saveImage("general_image",this)}}
                >Tomar foto</Button>
                <label className="fileContainer" style={ styles.uploadFile }>
                  Subir archivo
                  <input  type="file" onChange={(event)=>{this.fileUpload("general_image",event,this)}}
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
      <AppPage title={["", <strong>GEOREFERENCIACIÓN</strong>]} backButton={true} backButtonCallBack={()=>{ this.props.getForestalUnits(currentFunctionalUnit.id) }}>

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

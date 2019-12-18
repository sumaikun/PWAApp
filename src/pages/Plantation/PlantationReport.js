import React, { Component, Fragment } from 'react';
//sources
import "../../css/style.css";
import "../../css/simpleForm.css";
import { formCardStyles , workingRowStyles , modalStyles } from "../../jsStyles/Styles";
import "./data";


//Onsen Ui
import {  Col, Row, Card, Button, Input, Select, Radio, Checkbox } from 'react-onsenui';
import Ons from 'onsenui';

//Libraries

//components

import Loading from "../../components/Loading";
import Modal from "../../components/Modal";

//container
import AppPage from '../../containers/AppPage';

//flux
import { connect } from 'react-redux';
import {
  //  API
  createReport,
  updateReport,
} from '../../flux/actions';

import {exampleActivities} from "./data";
//helper


const styles =  {
  ...formCardStyles,
  ...workingRowStyles,
};

class PlantationReport extends Component {
  constructor(props) {
    super(props);
    this.state = { isDisable: false, formData: { activities: [] }, selectSearch: {} };
    this.submitData = this.submitData.bind(this);
    this.contentPage = this.contentPage.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleArrayChangeInput = this.handleArrayChangeInput.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.enableForm = this.enableForm.bind(this);
    this.itemActivity = this.itemActivity.bind(this);
    this.helperActivitiesArray = [];
    console.log(this.props);
  }

  componentDidMount(){
    console.log(this.props);
    console.log( this.state.formData );

    if( this.props.appState.plantationReportToEdit ) {

      //console.log("here on edit");

      //let activitiesFromPlantationReportToEdit = this.props.appState.plantationReportToEdit.report_activities;
      
      /*console.log("plantation report to edit");
      console.log(this.props.appState.plantationReportToEdit);
      
      console.log("activities from plantation report");
      console.log(activitiesFromPlantationReportToEdit);

      console.log("Tipo de reporte");

      console.log(this.props.appState.plantationReportType);

      console.log(this.props.appState.establishmentDefaultActivities);

      console.log(this.props.appState.maintenanceDefaultActivities);
      
      console.log(activitiesArray);*/

       //Crear arreglo en edición

       let activities = [];

       activities = this.props.appState.defaultActivities[this.props.appState.plantationProject.id];
       
       console.log("actividades");
       console.log(activities);

       console.log(this.props.appState.plantationReportToEdit); 
 
       let activitiesArray = [];
        
       if(this.props.appState.plantationReportToEdit.activities)
       {
        this.props.appState.plantationReportToEdit.activities.forEach( activity =>{

          let index = activities.findIndex( data =>  data.id == activity.default_activity_id );
      
            //console.log(index);
    
            activitiesArray[ index ] = {
              default_activity_id:activity.default_activity_id,
              hours:activity.hours,
              quantity:activity.quantity 
            }
        });
         //activitiesArray = this.props.appState.plantationReportToEdit.activities;
       }else
       {
          if(this.props.appState.plantationReportToEdit.report_activities){
            this.props.appState.plantationReportToEdit.report_activities.forEach(activity => {
  
              let index = activities.findIndex( data =>  data.id == activity.default_activity_id );
      
              //console.log(index);
      
              activitiesArray[ index ] = {
                default_activity_id:activity.default_activity_id,
                hours:activity.hours,
                quantity:activity.quantity 
              }
            });
          }
       }

        
        
       
 
       console.log(activities);
       console.log("Activities Array");
       console.log(activitiesArray);     


      this.setState({
        isDisable:true,
        formData:{
          ...this.state.formData,
          //...this.props.appState.plantationReportToEdit,
          responsible: this.props.appState.plantationReportToEdit.responsible,
          field_assistant: this.props.appState.plantationReportToEdit.field_assistant,
          report_date: this.props.appState.plantationReportToEdit.report_date,
          people_number: this.props.appState.plantationReportToEdit.people_number,
          location: this.props.appState.plantationReportToEdit.location,
          activities: activitiesArray,
        }
      },()=> {
        console.log(this.state);
      });
      
    }
  }

  enableForm(){
    this.setState({ isDisable: !this.state.isDisable },()=>{
      console.log(this.state);
    });
  }

  handleChangeInput(event){
    if(event.target.name && event.target.value.length > -1) {
      console.log(event.target.name);
      console.log(event.target.value);
      this.setState(
        {
          formData:{
            ...this.state.formData,
            [event.target.name]: event.target.value
          }
        },() => {
          console.log(this.state);
        }
      );
    }

    if (event.target.value[0] == "=") {
      event.target.value = event.target.value.substr(1);
    }
  }

  handleArrayChangeInput(event, index){
    if(event.target.name && event.target.value.length > 0) {
      console.log(event.target.name);
      console.log(event.target.value);

      console.log(this.state);

      let self = this;

      this.helperActivitiesArray =   this.state.formData.activities;

      this.helperActivitiesArray[index] = { ...this.state.formData.activities[index], [event.target.name]: event.target.value };

      /*let obj = { ...this.state.formData.activities[index], [event.target.name]: event.target.value };
      this.helperActivitiesArray[index] = obj;

      this.helperActivitiesArray = obj;*/

      console.log(this.helperActivitiesArray);

      //return;

      this.setState(
        {
          formData: {
            ...this.state.formData,
            activities: this.helperActivitiesArray,
          }
        },() => {
          console.log(this.state);
        }
      );
    }

    if (event.target.value[0] == "=") {
      event.target.value = event.target.value.substr(1);
    }
  }

  handleCheck(event, index, activity) {
    if ( event.target.checked ) {
      event.target.value = activity.id;
      //console.log("checked");
      this.handleArrayChangeInput(event, index);
    }
    else {
      let currentArray = this.state.formData.activities;
      //console.log(currentArray.length);
      if (currentArray.length > 0) {
        delete currentArray[index];
      }
      else {
        currentArray = [];
      }

      //console.log(currentArray);

      this.setState({
        formData: {
          ...this.state.formData,
          activities: currentArray
        }
      }, () => {
          console.log(this.state);
        }
      );
    }
  }

  submitData(e) {
    e.preventDefault();

    if(this.state.formData.responsible == null ||  this.state.formData.report_date == null){
      Ons.notification.alert(
      {title:"",message:"Los datos del responsable y la fecha del reporte son obligatorios"});
      return;
    }

    //  Pre-process activities array
    let act = [];

    this.state.formData.activities.forEach(activity => {
      if ( activity ) {
        act.push( activity );
      }
      if ( !activity.quantity  ) {
        activity.quantity = null;
      }
    });



    if ( this.props.appState.isFetching ) {
      return Ons.notification.alert({title:"¡Espera!",message:"Estamos realizando otro proceso en el momento"});
    }

    if ( this.props.appState.plantationReportToEdit ) {
      console.log( "Entro a edicion" );
      let data = this.state.formData;

      if(this.props.appState.plantationReportToEdit.ToSynchro)
      {
        data.ToSynchro = true;
      }

      if(this.props.appState.plantationReportToEdit.ToSynchroEdit)
      {
        data.ToSynchroEdit = true;
      }

      data.activities = act;
      //data.report_date = data.report_date.date + " " + data.report_date.hour;
      data.project_id = this.props.appState.plantationReportToEdit.project_id;
      data.type = this.props.appState.plantationReportToEdit.type;
      let plantation_report_id = this.props.appState.plantationReportToEdit.id;
      console.log( data );
      this.props.updateReport( plantation_report_id, data );
    }
    else {
      let data = this.state.formData;
      data.activities = act;
      //data.report_date = data.report_date.date + " " + data.report_date.hour;
      data.project_id = this.props.appState.plantationProject.id;
      data.type = this.props.appState.plantationReportType;

      console.log( data );
      this.props.createReport( data );
    }

      /*if(this.props.appState.isFetching)
      {
        return Ons.notification.alert({title:"¡Espera!",message:"Estamos realizando otro proceso en el momento"});
      }

      if(this.props.appState.currentHillsideMovement)
      {
        let data = this.state.formData;
        data.user_id = this.props.appState.user.id;
        data.report_date = data.date+" "+data.hour;
        console.log(data);
        console.log("edit hall side movement");
        this.props.updateHallsideMovement(this.state.formData.id,data);
      }
      else
      {
        let data = this.state.formData;
        data.user_id = this.props.appState.user.id;
        data.project_id = this.props.appState.selectedProject.id;
        data.report_date = data.date+" "+data.hour;
        console.log(data);
        console.log("create hall side movement");
        this.props.createHallsideMovement(data);

      }*/

  }

  itemActivity(activity, activityIndex) {
    return(
      <Row>
        <Col width="35%">
          <Card style={styles.cardInput}>
            <label style={ { fontSize: "16px" } }>{ activity.name }</label>
          </Card>
        </Col>
        <Col width="12%">
          <Card style={styles.cardInput}>
            <Checkbox
              name="default_activity_id"
              checked={ this.state.formData.activities[activityIndex] ? ( this.state.formData.activities[activityIndex].default_activity_id == activity.id.toString() ? true : false ) : false }
              onChange={ (event) => {
                this.handleCheck(event, activityIndex, activity);
              } }
              disabled={ this.state.isDisable }
            />
          </Card>
        </Col>
        {
          ( activity.measuring_unit != null ) ?
            <Fragment>
              <Col width={'25.5%'}>
                <Card style={styles.cardInput}>
                  <Input
                    style={styles.textInput}
                    type="number"
                    name={ 'hours' }
                    value={ this.state.formData.activities[activityIndex] ? ( ( this.state.formData.activities[activityIndex].default_activity_id == activity.id.toString() ) && this.state.formData.activities[activityIndex].hours ? this.state.formData.activities[activityIndex].hours : null ) : null }
                    placeholder="Horas"
                    disabled={this.state.isDisable || !this.state.formData.activities[activityIndex] }
                    onChange={ (event) => { this.handleArrayChangeInput(event, activityIndex ) } }
                    required={ this.state.formData.activities[activityIndex] }
                  />
                </Card>
              </Col>
              <Col width={'25.5%'}>
                <Card style={styles.cardInput}>
                  <Input
                    style={styles.textInput}
                    type="number"
                    name={ 'quantity' }
                    value={ this.state.formData.activities[activityIndex] ? ( ( this.state.formData.activities[activityIndex].default_activity_id == activity.id.toString() ) && this.state.formData.activities[activityIndex].quantity ? this.state.formData.activities[activityIndex].quantity : null ) : null }
                    placeholder={ activity.measuring_unit }
                    disabled={ this.state.isDisable || !this.state.formData.activities[activityIndex] }
                    onChange={ (event) => { this.handleArrayChangeInput(event, activityIndex ) } }
                    required={ this.state.formData.activities[activityIndex] }
                  />
                </Card>
              </Col>
            </Fragment>
            :
            <Col width={'51%'}>
              <Card style={styles.cardInput}>
                <Input
                  style={styles.textInput}
                  type="number"
                  name={ 'hours' }
                  value={ this.state.formData.activities ? ( this.state.formData.activities[activityIndex] ? ( ( this.state.formData.activities[activityIndex].default_activity_id == activity.id.toString() ) && this.state.formData.activities[activityIndex].hours ? this.state.formData.activities[activityIndex].hours : null ) : null ) : null }
                  placeholder="Horas" disabled={this.state.isDisable || !this.state.formData.activities[activityIndex] }
                  onChange={ (event) => { this.handleArrayChangeInput(event, activityIndex ) } }
                  required={ this.state.formData.activities[activityIndex] }
                />
              </Card>
            </Col>
        }
      </Row>
    );
  }

  contentPage(activities){
    return(
      <div style={{backgroundColor:"#e6e7e8", height:"100%"}}>
        <br/>
        {
          this.props.appState.plantationReportToEdit ?
            <Row>
              <button
                onClick={this.enableForm}
                style={styles.disableButton}>
                Habilitar edición
              </button>
            </Row>
            :
            null
        }
        <form className="simpleForm" onSubmit={ this.submitData }>
          <Row>
            <Col>
              <Card style={styles.cardLabel}>
                <span style={{fontSize:"14px", fontWeight: "bold", textAlign:"center"}}>
                  FORMATO DE CONTROL DE ACTIVIDADES DIARIAS
                </span>
              </Card>
            </Col>
          </Row>

          <Row>

            <Col width="49%">
              <Card style={styles.cardInput}>
                <Input
                  style={styles.textInput}
                  type="text"
                  name="responsible"
                  value={this.state.formData.responsible}
                  onChange={this.handleChangeInput}
                  placeholder="Responsable"
                  disabled={this.state.isDisable}
                  required
                />
              </Card>
            </Col>

            <Col width="49%">
              <Card style={styles.cardInput}>
                <Input
                  style={styles.textInput}
                  type="text"
                  name="field_assistant"
                  value={this.state.formData.field_assistant}
                  onChange={this.handleChangeInput}
                  placeholder="Auxiliar de campo"
                  disabled={this.state.isDisable}
                  required
                />
              </Card>
            </Col>

          </Row>

          <Row>

            <Col width="49%">
              <Card style={styles.cardInput}>
                <Input
                  style={styles.textInput}
                  type="text"
                  name="location"
                  value={ this.state.formData.location }
                  onChange={this.handleChangeInput}
                  placeholder="Sitio"
                  disabled={this.state.isDisable}
                  required
                />
              </Card>
            </Col>

            <Col width="49%">
              <Card style={{...styles.cardInput, alignItems:"unset"}}>
                <label>Fecha:</label>
                <Input
                  style={{...styles.dateInput}}
                  type="date"
                  name="report_date"
                  onChange={this.handleChangeInput}
                  value={this.state.formData.report_date}
                  disabled={this.state.isDisable}
                  required
                />
              </Card>
            </Col>

          </Row>


          <Row>

            <Col width="49%">
              <Card style={styles.cardInput}>
                <Input
                  style={styles.textInput}
                  type="number"
                  step="any"
                  name="people_number"
                  value={this.state.formData.people_number}
                  onChange={this.handleChangeInput}
                  placeholder="No. personas campo"
                  disabled={this.state.isDisable}
                  required
                />
              </Card>
            </Col>

            <Col width="49%">

            </Col>

          </Row>

          <Row>
            <Col>
              <Card style={styles.cardLabel}>
                <span style={{fontSize:"14px", fontWeight: "bold", textAlign:"center"}}>
                  ACTIVIDAD
                </span>
              </Card>
            </Col>
            <Col>
              <Card style={styles.cardLabel}>
                <span style={{fontSize:"14px", fontWeight: "bold", textAlign:"center"}}>
                  CANTIDAD
                </span>
              </Card>
            </Col>
          </Row>

          {
            activities.length > 0 ?
              activities.map( (activity, index) => {
                return (
                  this.itemActivity(activity, index)
                );
              })
              :
              null
          }

          <Row>
            <button
              type="submit"
              disabled={this.state.isDisable}
              onClick={ this.submitData }
              style={{fontSize:"18px",padding:'5px',marginTop:"10px",marginLeft:"50%",marginRight:"1%",backgroundColor:"#61af2e",boxShadow:"rgba(0, 0, 0, 0.85) 0px 1px 1px -2px", color:"white",width:"49%",borderRadius:"10%"}}
            >
              <b>Registrar</b>
            </button>
          </Row>
        </form>
      </div>
    );
  }



  render() {

    let { isFetching , plantationReportType, establishmentDefaultActivities, maintenanceDefaultActivities } = this.props.appState;
    let headerTitle = null;
    let activities = [];
    activities = this.props.appState.defaultActivities[this.props.appState.plantationProject.id];

    return (
      <AppPage  title={["", <strong> {headerTitle} </strong>]} backButton={true} backButtonCallBack={()=>{ }}>
        {
          isFetching ?
          <div style={{backgroundColor:"white",height:"100%"}}>
            <Loading/>
          </div>
          :
          this.contentPage(activities)
        }
      </AppPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    navigation: state.navigation,
    appState: state.appState,
    memory: state.memory
  };
}

//export default MachineryForm;
export default connect(mapStateToProps, {
  //  API
  createReport,
  updateReport,
})(PlantationReport);

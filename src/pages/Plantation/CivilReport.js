import React, { Component , Fragment } from 'react';

//Sources

import { formCardStyles , workingRowStyles , modalStyles } from "../../jsStyles/Styles";

import placeholderImage from "../../img/image-placeholder.png";

import { saveImage , fileUpload } from '../../helpers/formHandler';

//components

import Loading from "../../components/Loading";

//container
import AppPage from '../../containers/AppPage';

//flux
import { connect } from 'react-redux';

//Onsen Ui
import {  Col, Row, Card, Button, Input, Select, Radio, Checkbox } from 'react-onsenui';
import Ons from 'onsenui';



import {
    //  API
    createCivilReport,
    updateCivilReport,
    getPlantationReportsByProject,
  } from '../../flux/actions';

const styles =  {
    ...formCardStyles,
    ...workingRowStyles,
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
};


class CivilReport extends Component {
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
        console.log("In civil report constructor");
    }

    componentDidMount(){

        console.log("default activities");
        console.log(this.props.appState.defaultActivities);

        if( this.props.appState.plantationReportToEdit ) {
            console.log(this.props.appState.plantationReportToEdit);

            let activities = this.props.appState.defaultActivities[this.props.appState.plantationProject.id];

            console.log("proyecto actual "+this.props.appState.plantationProject);

            console.log(activities);

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
             
            }else
            {
               console.log("edición"); 
               console.log("activities");
               console.log(activities);
               if(this.props.appState.plantationReportToEdit.report_activities){

                 this.props.appState.plantationReportToEdit.report_activities.forEach(activity => {
       
                   let index = activities.findIndex( data =>  data.id == activity.default_activity_id );
           
                   //console.log(index);
           
                   activitiesArray[ index ] = {
                     ...activity
                   }
                 });
               }
            }

            console.log("activities array");

            console.log(activitiesArray);

            this.setState({
                isDisable:true,
                formData:{
                  ...this.state.formData,
                  //...this.props.appState.plantationReportToEdit,
                  responsible: this.props.appState.plantationReportToEdit.responsible,
                  field_assistant: this.props.appState.plantationReportToEdit.field_assistant,
                  report_date: this.props.appState.plantationReportToEdit.report_date,
                  officials: this.props.appState.plantationReportToEdit.officials,
                  assistants: this.props.appState.plantationReportToEdit.assistants,
                  notes: this.props.appState.plantationReportToEdit.notes,
                  civil_image_1: this.props.appState.plantationReportToEdit.civil_image_1,
                  civil_image_2: this.props.appState.plantationReportToEdit.civil_image_2,
                  civil_image_2: this.props.appState.plantationReportToEdit.civil_image_3,
                  activities: activitiesArray,
                }
              },()=> {
                console.log(this.state);
              });

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
        if( !activity.hours ){
            activity.hours = null;
        }
        if( !activity.location ){
          activity.location = null;
        }
        });




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
            
            let civil_report_id = this.props.appState.plantationReportToEdit.id;
            console.log( data );

            data.required_staffs = [];
            data.required_tools = [];

            this.props.updateCivilReport( civil_report_id, data );
        }
        else {
            let data = this.state.formData;
            data.activities = act;
            //data.report_date = data.report_date.date + " " + data.report_date.hour;
            data.project_id = this.props.appState.plantationProject.id;            
            console.log( data );
            data.required_staffs = [];
            data.required_tools = [];
            this.props.createCivilReport( data );
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
        if(event.target.name && event.target.value.length > -1) {
          console.log(event.target.name);
          console.log(event.target.value);
    
          console.log(this.state);    
    
          this.helperActivitiesArray =   this.state.formData.activities;
    
          this.helperActivitiesArray[index] = { ...this.state.formData.activities[index], [event.target.name]: event.target.value };
    
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

    itemActivity(activity, activityIndex) {
        return(
          <Row>            
            <Col width="100%">
              
                <label style={ { fontSize: "16px" } }>{ activity.name }</label>
              
            </Col>
            <Col width="25%">
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
            <Col width="75%">
              <Card style={styles.cardInput}>
                    <Input
                    style={styles.textInput}
                    type="text"
                    name={ 'required_material' }
                    value={ this.state.formData.activities[activityIndex] ? ( (
                         this.state.formData.activities[activityIndex].default_activity_id == activity.id.toString() ) && this.state.formData.activities[activityIndex].required_material ?
                         this.state.formData.activities[activityIndex].required_material : null ) : null }
                    placeholder="Material"
                    disabled={this.state.isDisable || !this.state.formData.activities[activityIndex] }
                    onChange={ (event) => { this.handleArrayChangeInput(event, activityIndex ) } }
                    required={ this.state.formData.activities[activityIndex] }
                    />
                </Card>
            </Col>
            <Col width="100%">
                <Card style={{...styles.cardInput, alignItems:"unset"}}>
                            <label>Clima:</label>

                    <Select style={{width:"100%"}} onChange={ (event) => { this.handleArrayChangeInput(event, activityIndex ) } }
                     name='weather' placeholder="clima" value={ this.state.formData.activities[activityIndex] ? ( (
                        this.state.formData.activities[activityIndex].default_activity_id == activity.id.toString() ) && this.state.formData.activities[activityIndex].weather ?
                        this.state.formData.activities[activityIndex].weather : null ) : null }
                    >
                        <option value="" disabled selected>Clima</option>
                        <option value="1">Soleado</option>
                        <option value="2">Parcialmente nublado</option>
                        <option value="3">Lluvia</option>
                    </Select>

                </Card>
            </Col>


            
            <Col>
                <Card style={{...styles.cardInput, alignItems:"unset"}}>
                    <label>Ubicación:</label>
                    <Input
                    style={{...styles.dateInput}}
                    type="text"
                    name="location"
                    value={ this.state.formData.activities[activityIndex] ? ( ( this.state.formData.activities[activityIndex].default_activity_id == activity.id.toString() ) && this.state.formData.activities[activityIndex].location ? this.state.formData.activities[activityIndex].location : null ) : null }                       
                    disabled={this.state.isDisable || !this.state.formData.activities[activityIndex] }
                    onBlur={ (event) => { this.handleArrayChangeInput(event, activityIndex ) } }
                    required={ this.state.formData.activities[activityIndex] }
                    />
                </Card>
            </Col>
        
            
            {
              ( activity.measuring_unit != null ) ?
                <Fragment>
                  <Col width={'25.5%'}>
                    <label>Horas:</label>
                    <Card style={styles.cardInput}>
                      <Input
                        style={styles.textInput}
                        type="number"
                        step="any"
                        name={ 'hours' }
                        value={ this.state.formData.activities[activityIndex] ? ( ( this.state.formData.activities[activityIndex].default_activity_id == activity.id.toString() ) && this.state.formData.activities[activityIndex].hours ? this.state.formData.activities[activityIndex].hours : null ) : null }                       
                        disabled={this.state.isDisable || !this.state.formData.activities[activityIndex] }
                        onBlur={ (event) => { this.handleArrayChangeInput(event, activityIndex ) } }
                        required={ this.state.formData.activities[activityIndex] }
                      />
                    </Card>
                  </Col>
                  <Col width={'25.5%'}>
                     <label>{ activity.measuring_unit }</label>
                    <Card style={styles.cardInput}>
                      <Input
                        style={styles.textInput}
                        type="number"
                        step="any"
                        name={ 'quantity' }
                        value={ this.state.formData.activities[activityIndex] ? ( ( this.state.formData.activities[activityIndex].default_activity_id == activity.id.toString() ) && this.state.formData.activities[activityIndex].quantity ? this.state.formData.activities[activityIndex].quantity : null ) : null }                        
                        disabled={ this.state.isDisable || !this.state.formData.activities[activityIndex] }
                        onBlur={ (event) => { this.handleArrayChangeInput(event, activityIndex ) } }
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
                      step="any"
                      name={ 'hours' }
                      value={ this.state.formData.activities ? ( this.state.formData.activities[activityIndex] ? ( ( this.state.formData.activities[activityIndex].default_activity_id == activity.id.toString() ) && this.state.formData.activities[activityIndex].hours ? this.state.formData.activities[activityIndex].hours : null ) : null ) : null }
                      placeholder="Horas" disabled={this.state.isDisable || !this.state.formData.activities[activityIndex] }
                      onBlur={ (event) => { this.handleArrayChangeInput(event, activityIndex ) } }
                      required={ this.state.formData.activities[activityIndex] }
                    />
                  </Card>
                </Col>
            }
          </Row>
        );
      }

    contentPage(){

        let activities = [];

        //activities = this.props.appState.defaultActivities;

        activities = this.props.appState.defaultActivities[this.props.appState.plantationProject.id];

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
                    <Col width="99%">
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
                </Row>    

                <Row>
                    <Col width="49%">
                        <Card style={styles.cardInput}>
                            <Input
                            style={styles.textInput}
                            type="number"
                            name="officials"
                            value={this.state.formData.officials}
                            onChange={this.handleChangeInput}
                            placeholder="Colaboradores"
                            disabled={this.state.isDisable}
                            required
                            />
                        </Card>
                    </Col>
                    <Col width="49%">
                        <Card style={styles.cardInput}>
                            <Input
                            style={styles.textInput}
                            type="number"
                            name="assistants"
                            value={this.state.formData.assistants}
                            onChange={this.handleChangeInput}
                            placeholder="Asistentes"
                            disabled={this.state.isDisable}
                            required
                            />
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col width="100%">
                        <br/>
                        <Card>
                            <textarea onChange={this.handleChangeInput}
                            style={{width:"100%",borderRadius:"10%",height:"80px", borderColor:"white"}}
                            name="notes" value={this.state.formData.notes}
                            placeholder="Observaciones"
                            disabled={this.state.isDisable}></textarea>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col width="99%">
                        <Card style={{...styles.cardInput, alignItems:"unset"}}>
                            <label>Fecha de reporte:</label>
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
                    <Col width="49%">
                        <Card style={styles.greenCard} >
                            <div>
                                <img src={this.state.formData.civil_image_1 ? 
                                    this.state.formData.civil_image_1 : placeholderImage } style={{width:"100%"}} />
                            </div>
                            <Row>
                                <Button style={styles.buttonCard}
                                onClick={()=>{saveImage('civil_image_1',this)}}
                                >Tomar foto</Button>
                                <label className="fileContainer" style={ styles.uploadFile }>
                                Subir archivo
                                <input  type="file" onChange={(event)=>{fileUpload("civil_image_1",event,this)}}
                                    />
                                </label>
                            </Row>
                        </Card>
                    </Col>

                    <Col width="49%">
                        <Card style={styles.greenCard} >
                            <div>
                                <img src={this.state.formData.civil_image_2 ? 
                                    this.state.formData.civil_image_2 : placeholderImage } style={{width:"100%"}} />
                            </div>
                            <Row>
                                <Button style={styles.buttonCard}
                                onClick={()=>{saveImage('civil_image_2',this)}}
                                >Tomar foto</Button>
                                <label className="fileContainer" style={ styles.uploadFile }>
                                Subir archivo
                                <input  type="file" onChange={(event)=>{fileUpload("civil_image_2",event,this)}}
                                    />
                                </label>
                            </Row>
                        </Card>
                    </Col>

                </Row>

                <Row>
                  <Col width="99%">
                          <Card style={styles.greenCard} >
                              <div>
                                  <img src={this.state.formData.civil_image_3 ? 
                                      this.state.formData.civil_image_3 : placeholderImage } style={{width:"100%"}} />
                              </div>
                              <Row>
                                  <Button style={styles.buttonCard}
                                  onClick={()=>{saveImage('civil_image_3',this)}}
                                  >Tomar foto</Button>
                                  <label className="fileContainer" style={ styles.uploadFile }>
                                  Subir archivo
                                  <input  type="file" onChange={(event)=>{fileUpload("civil_image_3",event,this)}}
                                      />
                                  </label>
                              </Row>
                          </Card>
                    </Col>
                </Row>

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
        let { isFetching  } = this.props.appState;
        return(
            <AppPage  title={["", <strong> {"Reporte Civil"} </strong>]} backButton={true} backButtonCallBack={()=>{ }}>
            {
              isFetching ?
              <div style={{backgroundColor:"white",height:"100%"}}>
                <Loading/>
              </div>
              :
              this.contentPage()
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
  export default connect(mapStateToProps, 
    { createCivilReport , updateCivilReport, getPlantationReportsByProject })(CivilReport);
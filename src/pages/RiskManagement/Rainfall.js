import React, { Component } from 'react';
//sources
import "../../css/simpleForm.css";
import "../../css/style.css";
import { formCardStyles } from "../../jsStyles/Styles";

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
import { createRainfall , updateRainfall } from '../../flux/actions';
//helper

import moment from 'moment';

const styles = formCardStyles;



class Rainfall extends Component {
  constructor(props) {
    super(props);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.state = { isDisable:false, formData:{} , selectSearch:{} };
    this.submitData = this.submitData.bind(this);
    this.contentPage = this.contentPage.bind(this);
    this.enableForm = this.enableForm.bind(this);
    this.checkRiskParamenter = this.checkRiskParamenter.bind(this);
    this.setRiskLevel = this.setRiskLevel.bind(this);
    console.log(this.props);
  }

  componentDidMount(){

    if(this.props.appState.currentRainfall)
    {
      this.setState({
        isDisable:true,
        formData:{
          ...this.state.formData,
          ...this.props.appState.currentRainfall,
          date:this.props.appState.currentRainfall.report_date.split(" ")[0],
          hour:this.props.appState.currentRainfall.report_date.split(" ")[1],
          start:moment(new Date(this.props.appState.currentRainfall.start)).utc().format().slice(0, -4),
          finish:moment(new Date(this.props.appState.currentRainfall.finish)).utc().format().slice(0, -4)
        }
      },()=>{
        //console.log(this.state);
      });
    }
  }

  enableForm(){

    this.setState({ isDisable: !this.state.isDisable },()=>{
      //console.log(this.state);
    });

  }

  handleChangeInput(event){

    if(event.target.name && event.target.value.length > -1)
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

    if(this.props.appState.isFetching)
    {
      return Ons.notification.alert({title:"¡Espera!",message:"Estamos realizando otro proceso en el momento"});
    }

    if(this.props.appState.currentRainfall)
    {
      let data = this.state.formData;
      data.user_id = this.props.appState.user.id;
      data.report_date = data.date+" "+data.hour;
      //console.log(data);
      this.props.updateRainfall(this.state.formData.id,data);
    }
    else
    {
      let data = this.state.formData;
      data.user_id = this.props.appState.user.id;
      data.project_id = this.props.appState.selectedProject.id;
      data.report_date = data.date+" "+data.hour;
      //console.log(data);
      this.props.createRainfall(data);

    }


  }

  checkRiskParamenter(value) {
    if (value < 40) {
      this.setState(
        {
          formData:{
            ...this.state.formData,
            level: "1"
          }

        },() => {
          console.log(this.state);
        }
      );
    }
    else if (value >= 40 && value < 70) {
      this.setState(
        {
          formData:{
            ...this.state.formData,
            level: "2"
          }

        },() => {
          console.log(this.state);
        }
      );
    }
    else if (value >= 70 && value < 100) {
      this.setState(
        {
          formData:{
            ...this.state.formData,
            level: "3"
          }

        },() => {
          console.log(this.state);
        }
      );
    }
    else if (value >= 100 && value < 200) {
      this.setState(
        {
          formData:{
            ...this.state.formData,
            level: "4"
          }

        },() => {
          console.log(this.state);
        }
      );
    }
    else if (value >= 200) {
      this.setState(
        {
          formData:{
            ...this.state.formData,
            level: "5"
          }

        },() => {
          console.log(this.state);
        }
      );
    }
  }

  setRiskLevel(event) {
    if (event.target.value.length > 0) {
      this.checkRiskParamenter(event.target.value);
    }
  }

  contentPage(){

    return(

      <div style={{backgroundColor:"#e6e7e8",height:"100%"}}>
        <br/>
        {
          this.props.appState.currentRainfall ?
            <Row>
              <button onClick={this.enableForm} style={styles.disableButton}>Habilitar edición</button>
            </Row>:null
        }
        <form className="simpleForm"  onSubmit={this.submitData}>
          <Row>
            <Col width="33%">
              <Card style={styles.cardInput}>
                <Input style={{...styles.textInput, position:"absolute", width:"33%"}} name="code" value={this.state.formData.code} onChange={this.handleChangeInput} maxLength={10} placeholder="Codigo" maxLength="10" disabled={this.state.isDisable} required/>
              </Card>
            </Col>
            <Col width="33%">
              <Card style={{...styles.cardInput, alignItems:"unset"}}>
                  <label>Fecha:</label>
                <Input style={{...styles.dateInput, position:"absolute", width:"33%"}} type="date" name="date" onChange={this.handleChangeInput} value={this.state.formData.date} disabled={this.state.isDisable} required/>
              </Card>
            </Col>
            <Col width="33%">
              <Card style={{...styles.cardInput, alignItems:"unset"}}>
                <label>Hora:</label>
                <Input style={{...styles.dateInput, position:"absolute", width:"33%"}} type="time" name="hour" onChange={this.handleChangeInput} value={this.state.formData.hour} disabled={this.state.isDisable} required/>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col width="99%">
              <Card style={styles.cardLabel}>
                <span>
                  Intensidad
                </span>
              </Card>
            </Col>
          </Row>


          <Row>
            <Col width="49.5%">
              <Card style={styles.cardInput}>
                <Select style={{width:"100%"}} value={ this.state.formData.type === "Llovizna" || this.state.formData.type === "1" ? 1:
                  this.state.formData.type === "Lluvia" || this.state.formData.type === "2" ? 2:
                  this.state.formData.type === "Lluvia Torrencial" || this.state.formData.type === "3" ? 3:
                  this.state.formData.type === "Tormenta" || this.state.formData.type === "4" ? 4 : ""
                 } onChange={this.handleChangeInput} disabled={this.state.isDisable} name='type'>
                  <option value="" disabled selected>Tipo</option>
                  <option value="1">LLovizna</option>
                  <option value="2">Lluvia</option>
                  <option value="3">Lluvia torrencial</option>
                  <option value="4">Tormenta</option>
                </Select>
              </Card>
            </Col>
            <Col width="49.5%">
              <Card style={{...styles.cardInput, alignItems:"unset"}}>
                  <label>Milimetros/hora:</label>
                <Input style={{...styles.dateInput, position:"absolute", width:"30%"}} type="number" step="any" name="mm_hours" onChange={this.handleChangeInput} value={this.state.formData.mm_hours} disabled={this.state.isDisable} required/>
              </Card>
            </Col>
            {/*<Col width="33%">
              <Card style={{...styles.cardInput, alignItems:"unset"}}>
                <label>Horas:</label>
                <Input style={{...styles.dateInput, position:"absolute", width:"30%"}} decimal name="start_treatment" onChange={this.handleChangeInput}value={this.state.formData.start_treatment} disabled={this.state.isDisable} required/>
              </Card>
            </Col>*/}
          </Row>


          <Row>
            <Col width="99%">
              <Card style={styles.cardLabel}>
                <span>
                  Duración
                </span>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col width="49.5%">
              <Card style={{...styles.cardInput, alignItems:"unset"}}>
              <label>Inicio:</label>
            <Input style={{...styles.dateInput, position:"absolute", width:"40%"}} type="datetime-local"  onChange={this.handleChangeInput} value={this.state.formData.start} name="start" disabled={this.state.isDisable} required/>
              </Card>
            </Col>
            <Col width="49.5%">
              <Card style={{...styles.cardInput, alignItems:"unset"}}>
                  <label>Final:</label>
                <Input style={{...styles.dateInput, position:"absolute", width:"40%"}} type="datetime-local"  onChange={this.handleChangeInput} value={this.state.formData.finish} name="finish" disabled={this.state.isDisable} required/>
              </Card>
            </Col>

          </Row>



          <Row>
            <Col width="99%">
              <Card style={styles.cardInput}>
                <Select style={{width:"100%"}} onChange={this.handleChangeInput} name='level' disabled={this.state.isDisable} value={this.state.formData.level} >
                  <option value="level" disabled selected>Estado de emergencia</option>
                  <option value="1">
                    Estado de emergencia: 1
                  </option>
                  <option value="2">Estado de emergencia: 2</option>
                  <option value="3">Estado de emergencia: 3</option>
                  <option value="4">Estado de emergencia: 4</option>
                  <option value="5">Estado de emergencia: 5</option>
                </Select>
              </Card>
            </Col>
          </Row>

          <Row>

            <Col width="49.5%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="responsible_name" value={this.state.formData.responsible_name} disabled={this.state.isDisable} onChange={this.handleChangeInput}placeholder="Responsable" required />
              </Card>
            </Col>

            <Col width="49.5%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="responsible_id" value={this.state.formData.responsible_id} onChange={this.handleChangeInput} disabled={this.state.isDisable} placeholder="Identificación" required />
              </Card>
            </Col>

          </Row>

          <Row>
            <Col width="96%">
              <Card style={{...styles.cardInput, height:"auto"}}>
              <textarea onChange={this.handleChangeInput} style={{width:"100%",border:"0",height:"80px"}} name="observations" value={this.state.formData.observations} disabled={this.state.isDisable}  placeholder="Observaciones" ></textarea>
              </Card>
            </Col>
          </Row>

          <Row>
            <button type="submit"
              style={{fontSize:"18px",padding:'5px',marginTop:"10px",marginLeft:"50%",marginRight:"1%",backgroundColor:"#61af2e",boxShadow:"rgba(0, 0, 0, 0.85) 0px 1px 1px -2px",
              color:"white",width:"50%",borderRadius:"10%"}}
              ><b>Registrar</b></button>
          </Row>
        </form>
      </div>


    );
  }



  render() {

    const { isFetching , currentFunctionalUnit } = this.props.appState;

    return (
      <AppPage  title={["", <strong>Precipitación</strong>]} backButton={true} backButtonCallBack={()=>{ }}>

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

export default  connect(mapStateToProps, { createRainfall , updateRainfall })(Rainfall);

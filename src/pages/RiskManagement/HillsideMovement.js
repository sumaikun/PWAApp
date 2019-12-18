import React, { Component } from 'react';
//sources
import "../../css/simpleForm.css";
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
import { createHallsideMovement , updateHallsideMovement } from '../../flux/actions';
//helper

//
import moment from 'moment';

const styles = formCardStyles;

class HillsideMovement extends Component {
  constructor(props) {
    super(props);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.state = { isDisable:false , formData:{} , selectSearch:{} };
    this.submitData = this.submitData.bind(this);
    this.contentPage = this.contentPage.bind(this);
    this.enableForm = this.enableForm.bind(this);
    //console.log(this.props);
  }

  componentDidMount(){
    //console.log(this.props);
    if(this.props.appState.currentHillsideMovement)
    {
      this.setState({
        isDisable:true,
        formData:{
          ...this.state.formData,
          ...this.props.appState.currentHillsideMovement,
          date:this.props.appState.currentHillsideMovement.report_date.split(" ")[0],
          hour:this.props.appState.currentHillsideMovement.report_date.split(" ")[1]
        }
      },()=>{
        //console.log(this.state);
      });
    }
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

      if(this.props.appState.currentHillsideMovement)
      {
        let data = this.state.formData;
        data.user_id = this.props.appState.user.id;
        data.report_date = data.date+" "+data.hour;
        //console.log(data);
        //console.log("edit hall side movement");
        this.props.updateHallsideMovement(this.state.formData.id,data);
      }
      else
      {
        let data = this.state.formData;
        data.user_id = this.props.appState.user.id;
        data.project_id = this.props.appState.selectedProject.id;
        data.report_date = data.date+" "+data.hour;
        //console.log(data);
        //console.log("create hall side movement");
        this.props.createHallsideMovement(data);

      }

  }

  enableForm(){

    this.setState({ isDisable: !this.state.isDisable },()=>{
      //console.log(this.state);
    });

  }

  checkRiskParamenter(value) {
    if (value < 5) {
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
    else if (value >= 5 && value < 15) {
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
    else if (value >= 15 && value < 20) {
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
    else if (value >= 20 && value < 30) {
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
    else if (value >= 30) {
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
          this.props.appState.currentHillsideMovement ?
             <Row>
              <button onClick={this.enableForm} style={styles.disableButton}>Habilitar edición</button>
            </Row>:null
        }
        <form className="simpleForm"  onSubmit={this.submitData}>
          <Row>
            <Col width="50%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="code" value={this.state.formData.code} onChange={this.handleChangeInput} maxLength={10}  placeholder="Codigo" maxLength="10" disabled={this.state.isDisable} required/>
              </Card>
            </Col>
            <Col width="24.5%">
              <Card style={{...styles.cardInput, alignItems:"unset"}}>
                  <label>Fecha:</label>
                <Input style={{...styles.dateInput, position:"absolute",  width:"30%"}} type="date" name="date" onChange={this.handleChangeInput}value={this.state.formData.date} disabled={this.state.isDisable} required/>
              </Card>
            </Col>
            <Col width="24.5%">
              <Card style={{...styles.cardInput, alignItems:"unset"}}>
                <label>Hora:</label>
                <Input style={{...styles.dateInput, position:"absolute", width:"30%"}} type="time" name="hour" onChange={this.handleChangeInput}value={this.state.formData.hour} disabled={this.state.isDisable} required/>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col width="25%">
              <Card style={styles.cardInput}>
                <Input type="number" step="any" style={styles.textInput} name="longitude" value={this.state.formData.longitude} onInput={this.setRiskLevel} onChange={this.handleChangeInput} placeholder="Longitud" disabled={this.state.isDisable} required />
              </Card>
            </Col>
            <Col width="25%">
              <Card style={styles.cardInput}>
                <Input type="number" step="any" style={styles.textInput} name="width" value={this.state.formData.width} onChange={this.handleChangeInput} placeholder="Ancho" disabled={this.state.isDisable} required />
              </Card>
            </Col>
            <Col width="49%">
              <Card style={styles.cardInput}>
                <Select style={{width:"100%"}} onChange={this.handleChangeInput} disabled={this.state.isDisable} value={
                  this.state.formData.new === "Nueva" || this.state.formData.new === "1" ? 1:
                  this.state.formData.new === "Existente" || this.state.formData.new === "2" ? 2: ""
                 } name='new'>
                  <option value="" disabled selected>Grieta</option>
                  <option value="1">Nueva</option>
                  <option value="2">Existente</option>
                </Select>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col width="99%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="location" value={this.state.formData.location} onChange={this.handleChangeInput}  disabled={this.state.isDisable} placeholder="Ubicación" required />
              </Card>
            </Col>
          </Row>

          <Row>
            <Col width="99%">
              <Card style={{...styles.cardInput, height:"auto"}}>

                <textarea onChange={this.handleChangeInput}style={{width:"100%",border:"0",height:"80px"}} name="description" value={this.state.formData.description} disabled={this.state.isDisable} placeholder="Descripción" ></textarea>

              </Card>
            </Col>
          </Row>

          <Row>
            <Col width="99%">
              <Card style={styles.cardInput}>
                <Select style={{width:"100%"}} onChange={this.handleChangeInput} name='level' disabled={this.state.isDisable} value={this.state.formData.level} >
                  <option value="level" disabled selected>Estado de emergencia</option>
                  <option value="1">Estado de emergencia: 1</option>
                  <option value="2">Estado de emergencia: 2</option>
                  <option value="3">Estado de emergencia: 3</option>
                  <option value="4">Estado de emergencia: 4</option>
                  <option value="5">Estado de emergencia: 5</option>
                </Select>
              </Card>
            </Col>
          </Row>

          <Row>

            <Col width="59.5%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="responsible_name" value={this.state.formData.responsible_name} disabled={this.state.isDisable} onChange={this.handleChangeInput} placeholder="Responsable" required />
              </Card>
            </Col>

            <Col width="39.5%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="responsible_id" value={this.state.formData.responsible_id} onChange={this.handleChangeInput} disabled={this.state.isDisable} placeholder="Identificación" required />
              </Card>
            </Col>

          </Row>

          <Row>
            <Col width="99%">
              <Card style={{...styles.cardInput, height:"auto"}}>
                <textarea onChange={this.handleChangeInput} style={{width:"100%",border:"0",height:"80px"}} name="observations" value={this.state.formData.observations}  disabled={this.state.isDisable} placeholder="Observaciones"></textarea>
              </Card>
            </Col>
          </Row>



          <Row>
            <button type="submit" disabled={this.state.isDisable}
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
      <AppPage  title={["Desplazamiento de ", <strong>Ladera</strong>]} backButton={true} backButtonCallBack={()=>{ }}>

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

export default  connect(mapStateToProps, { createHallsideMovement, updateHallsideMovement })(HillsideMovement);

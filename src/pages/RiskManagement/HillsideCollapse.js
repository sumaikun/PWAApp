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
import { createHillsideCollapse , updateHillsideCollapse } from '../../flux/actions';
//helper

const styles = formCardStyles;


class hillsideCollapse extends Component {
  constructor(props) {
    super(props);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.state = { isDisable:false, formData:{} , selectSearch:{} };
    this.submitData = this.submitData.bind(this);
    this.contentPage = this.contentPage.bind(this);
    this.enableForm = this.enableForm.bind(this);
    //console.log(this.props);
  }

  componentDidMount(){
    //console.log(this.props);
    if(this.props.appState.currentHillsideCollapse)
    {
      this.setState({
        isDisable:true,
        formData:{
          ...this.state.formData,
          ...this.props.appState.currentHillsideCollapse,
          date:this.props.appState.currentHillsideCollapse.report_date.split(" ")[0],
          hour:this.props.appState.currentHillsideCollapse.report_date.split(" ")[1]
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
               [event.target.name] : event.target.value,
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

    if(this.props.appState.currentHillsideCollapse)
    {
      let data = this.state.formData;
      data.user_id = this.props.appState.user.id;
      data.report_date = data.date+" "+data.hour;
      //console.log(data);
      //console.log("edit hall side movement");
      this.props.updateHillsideCollapse(this.state.formData.id,data);
    }
    else
    {
      let data = this.state.formData;
      data.user_id = this.props.appState.user.id;
      data.project_id = this.props.appState.selectedProject.id;
      data.report_date = data.date+" "+data.hour;
      //console.log(data);
      //console.log("create hall side movement");
      this.props.createHillsideCollapse(data);

    }


  }

  contentPage(){

    return(

      <div style={{backgroundColor:"#e6e7e8",height:"100%"}}>
        <br/>
        {
          this.props.appState.currentHillsideCollapse ?
             <Row>
              <button onClick={this.enableForm} style={styles.disableButton}>Habilitar edición</button>
            </Row>:null
        }
        <form className="simpleForm"  onSubmit={this.submitData}>
          <Row>
            <Col width="100%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="code" value={this.state.formData.code} onChange={this.handleChangeInput} maxLength={10}  placeholder="Codigo" disabled={this.state.isDisable} maxLength="10" required/>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="50%">
              <Card style={{...styles.cardInput, alignItems:"unset"}}>
              <label>fecha:</label>
            <Input style={{...styles.dateInput, position:"absolute", width:"40%"}} type="date" name="date" onChange={this.handleChangeInput} value={this.state.formData.date} disabled={this.state.isDisable} required/>
              </Card>
            </Col>
            <Col width="49.5%">
              <Card style={{...styles.cardInput, alignItems:"unset"}}>
                  <label>Hora reporte:</label>
                <Input style={{...styles.dateInput, position:"absolute", width:"40%"}} type="time" name="hour" onChange={this.handleChangeInput}value={this.state.formData.hour} disabled={this.state.isDisable} required/>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col width="100%">
              <Card style={styles.cardLabel}>
                <span>
                  Deslizamientos
                </span>
              </Card>
            </Col>
          </Row>

          <div>

            <Row>
              <Col width="40%">
                <Card style={styles.cardInput}>
                  <Select style={{width:"100%"}} onChange={this.handleChangeInput} name='landslides' value={ this.state.formData.landslides === "Si" || this.state.formData.landslides === "1" ? 1 :
                    this.state.formData.landslides === "No" || this.state.formData.landslides === "2" ? 2 : ""
                 }  disabled={this.state.isDisable}>
                    <option value="" disabled selected></option>

                    <option value="1">Si</option>
                    <option value="2">No</option>
                  </Select>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col width="99%">
                <Card style={styles.cardInput}>
                  <Input style={styles.textInput} name="ls_location" value={this.state.formData.ls_location} onChange={this.handleChangeInput} placeholder="Ubicación" disabled={this.state.isDisable} required />
                </Card>
              </Col>
            </Row>

            <Row>
              <Col width="99%">
                <Card style={{...styles.cardInput, height:"auto"}}>

                  <textarea onChange={this.handleChangeInput} style={{width:"100%",border:"0",height:"80px"}} name="ls_description" value={this.state.formData.ls_description}  placeholder="Descripción" disabled={this.state.isDisable}></textarea>

                </Card>
              </Col>
            </Row>

          </div>

          <Row>
            <Col width="100%">
              <Card style={styles.cardLabel}>
                <span>
                  Caida de rocas
                </span>
              </Card>
            </Col>
          </Row>


          <div>

            <Row>
              <Col width="40%">
                <Card style={styles.cardInput}>

                  <Select style={{width:"100%"}} onChange={this.handleChangeInput} value={this.state.formData.rockfall === "Si" || this.state.formData.rockfall === "1" ? 1 :
                    this.state.formData.rockfall === "No" || this.state.formData.rockfall === "2" ? 2 : ""} disabled={this.state.isDisable} name='rockfall'>
                    <option value="" disabled selected></option>

                    <option value="1">Si</option>
                    <option value="2">No</option>
                  </Select>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col width="99%">
                <Card style={styles.cardInput}>
                  <Input style={styles.textInput} name="rf_location" value={this.state.formData.rf_location} onChange={this.handleChangeInput} placeholder="Ubicación" disabled={this.state.isDisable} required />
                </Card>
              </Col>
            </Row>

            <Row>
              <Col width="99%">
                <Card style={{...styles.cardInput, height:"auto"}}>

                  <textarea onChange={this.handleChangeInput}style={{width:"100%",border:"0",height:"80px"}} name="rf_description" value={this.state.formData.rf_description}  placeholder="Descripción" disabled={this.state.isDisable}></textarea>

                </Card>
              </Col>
            </Row>

          </div>


          <Row>
            <Col width="100%">
              <Card style={styles.cardLabel}>
                <span>
                  Presencia de ruidos
                </span>
              </Card>
            </Col>
          </Row>


          <div>

            <Row>
              <Col width="40%">
                <Card style={styles.cardInput}>

                  <Select style={{width:"100%"}} onChange={this.handleChangeInput} value={this.state.formData.noises === "Si" || this.state.formData.noises === "1" ? 1 :
                    this.state.formData.noises === "No" || this.state.formData.noises === "2" ? 2 : ""}  disabled={this.state.isDisable} name='noises'>
                    <option value="" disabled selected></option>
                    <option value="1">Si</option>
                    <option value="2">No</option>
                  </Select>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col width="99%">
                <Card style={styles.cardInput}>
                  <Input style={styles.textInput} name="ns_location" value={this.state.formData.ns_location} onChange={this.handleChangeInput} disabled={this.state.isDisable} placeholder="Ubicación" required />
                </Card>
              </Col>
            </Row>

            <Row>
              <Col width="99%">
                <Card style={{...styles.cardInput, height:"auto"}}>

                  <textarea onChange={this.handleChangeInput} style={{width:"100%",border:"0",height:"80px"}} name="ns_description" value={this.state.formData.ns_description} disabled={this.state.isDisable}  placeholder="Descripción"></textarea>

                </Card>
              </Col>
            </Row>

          </div>


          <Row>
            <Col width="100%">
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

            <Col width="59.5%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="responsible_name" value={this.state.formData.responsible_name} disabled={this.state.isDisable} onChange={this.handleChangeInput}placeholder="Responsable" required />
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
                <textarea onChange={this.handleChangeInput} style={{width:"100%",border:"0",height:"80px"}} name="observations" value={this.state.formData.observations} disabled={this.state.isDisable}  placeholder="Observaciones"></textarea>
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
      <AppPage  title={["Recorrido de ", <strong>Ladera</strong>]} backButton={true} backButtonCallBack={()=>{ }}>

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

export default  connect(mapStateToProps, { createHillsideCollapse , updateHillsideCollapse })(hillsideCollapse);

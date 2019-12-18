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
import { createRiverCollapse , updateRiverCollapse  } from '../../flux/actions';
//helper

const styles = formCardStyles;


class RiverCollapse extends Component {
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
    if(this.props.appState.currentRiverCollapse)
    {
      this.setState({
        isDisable:true,
        formData:{
          ...this.state.formData,
          ...this.props.appState.currentRiverCollapse,
          date:this.props.appState.currentRiverCollapse.report_date.split(" ")[0],
          hour:this.props.appState.currentRiverCollapse.report_date.split(" ")[1],
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

    if(this.props.appState.currentRiverCollapse)
    {
      let data = this.state.formData;
      data.user_id = this.props.appState.user.id;
      data.report_date = data.date+" "+data.hour;
      //console.log(data);
      this.props.updateRiverCollapse(this.state.formData.id,data);
    }
    else
    {
      let data = this.state.formData;
      data.user_id = this.props.appState.user.id;
      data.project_id = this.props.appState.selectedProject.id;
      data.report_date = data.date+" "+data.hour;
      //console.log(data);
      this.props.createRiverCollapse(data);

    }

  }

  contentPage(){

    return(

      <div style={{backgroundColor:"#e6e7e8",height:"100%"}}>
        <br/>
        {
          this.props.appState.currentRiverCollapse ?
             <Row>
              <button onClick={this.enableForm} style={styles.disableButton}>Habilitar edición</button>
            </Row>:null
        }
        <form className="simpleForm"  onSubmit={this.submitData}>
          <Row>
            <Col width="100%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} name="code" value={this.state.formData.code} onChange={this.handleChangeInput} maxLength={10}  placeholder="Codigo" maxLength="10" disabled={this.state.isDisable} required/>
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
                <Input style={{...styles.dateInput, position:"absolute", width:"40%"}} type="time" name="hour" onChange={this.handleChangeInput} value={this.state.formData.hour} disabled={this.state.isDisable} required/>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col width="100%">
              <Card style={styles.cardLabel}>
                <span>
                  Represamiento
                </span>
              </Card>
            </Col>
          </Row>

          <div>

            <Row>
              <Col width="40%">
                <Card style={styles.cardInput}>
                  <Select style={{width:"100%"}} onChange={this.handleChangeInput} value={ this.state.formData.waterdam === "Si" || this.state.formData.waterdam === "1" ? 1 :
                    this.state.formData.waterdam === "No" || this.state.formData.waterdam === "2" ? 2 : ""
                    } disabled={this.state.isDisable} name='waterdam' disabled={this.state.isDisable}>
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
                  <Input style={styles.textInput} name="wd_location" value={this.state.formData.wd_location} onChange={this.handleChangeInput} disabled={this.state.isDisable} placeholder="Ubicación" required />
                </Card>
              </Col>
            </Row>

            <Row>
              <Col width="99%">
                <Card style={{...styles.cardInput, height:"auto"}}>

                  <textarea onChange={this.handleChangeInput} style={{width:"100%",border:"0",height:"80px"}} name="wd_description" value={this.state.formData.wd_description} disabled={this.state.isDisable}  placeholder="Descripción" ></textarea>

                </Card>
              </Col>
            </Row>

          </div>

          <Row>
            <Col width="100%">
              <Card style={styles.cardLabel}>
                <span>
                  Arrastre de material
                </span>
              </Card>
            </Col>
          </Row>


          <div>

            <Row>
              <Col width="40%">
                <Card style={styles.cardInput}>
                  <Select style={{width:"100%"}} value={ this.state.formData.materialdrag === "Si" || this.state.formData.materialdrag === "1" ? 1 :
                    this.state.formData.materialdrag === "No" || this.state.formData.materialdrag === "2" ? 2 : ""
                    } onChange={this.handleChangeInput} disabled={this.state.isDisable} name='materialdrag'>
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
                  <Input style={styles.textInput} name="md_location" value={this.state.formData.md_location} onChange={this.handleChangeInput} disabled={this.state.isDisable} placeholder="Ubicación" required />
                </Card>
              </Col>
            </Row>

            <Row>
              <Col width="99%">
                <Card style={{...styles.cardInput, height:"auto"}}>

                  <textarea onChange={this.handleChangeInput} style={{width:"100%",border:"0",height:"80px"}} name="md_description" value={this.state.formData.md_description} disabled={this.state.isDisable}  placeholder="Descripción"></textarea>

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
            <Col width="100%">
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

          <Col width="60%">
            <Card style={styles.cardInput}>
              <Input style={styles.textInput} name="responsible_name" value={this.state.formData.responsible_name} disabled={this.state.isDisable} onChange={this.handleChangeInput}placeholder="Responsable" required />
            </Card>
          </Col>

          <Col width="40%">
            <Card style={styles.cardInput}>
              <Input style={styles.textInput} name="responsible_id" value={this.state.formData.responsible_id} onChange={this.handleChangeInput} disabled={this.state.isDisable} placeholder="Identificación" required />
            </Card>
          </Col>

        </Row>

        <Row>
          <Col width="100%">
            <Card style={{...styles.cardInput, height:"auto"}}>
              <textarea onChange={this.handleChangeInput} style={{width:"100%",border:"0",height:"80px"}} name="observations" value={this.state.formData.observations} disabled={this.state.isDisable}  placeholder="Observaciones"></textarea>
            </Card>
          </Col>
        </Row>

          <Row>
            <button type="submit"
              style={{fontSize:"18px",padding:'5px',marginTop:"10px",backgroundColor:"#61af2e",boxShadow:"rgba(0, 0, 0, 0.85) 0px 10px 10px -2px",
              color:"white",width:"100%",borderRadius:"10%"}} disabled={this.state.isDisable}
              ><b>Registrar</b></button>
          </Row>
        </form>
      </div>


    );
  }



  render() {

    const { isFetching , currentFunctionalUnit } = this.props.appState;

    return (
      <AppPage  title={["Recorrido de ", <strong>Quebrada</strong>]} backButton={true} backButtonCallBack={()=>{ }}>

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

export default  connect(mapStateToProps, { createRiverCollapse , updateRiverCollapse })(RiverCollapse);

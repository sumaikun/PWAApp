import React, { Component } from 'react';
//sources
import "../../css/simpleForm.css";
import { formCardStyles , workingRowStyles , modalStyles } from "../../jsStyles/Styles";


//Onsen Ui
import {  Col, Row, Card, Button, Input, Select} from 'react-onsenui';

import placeholderImage from "../../img/image-placeholder.png";
//Libraries

//components

import Loading from "../../components/Loading";
import Modal from "../../components/Modal";

//container
import AppPage from '../../containers/AppPage';

//flux
import { connect } from 'react-redux';
import {  } from '../../flux/actions';
//helper

//
import moment from 'moment';

const styles =  {
  ...formCardStyles,
  ...workingRowStyles,
  ...modalStyles
};

class MachineryForm extends Component {
  constructor(props) {
    super(props);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.state = { isDisable:false , formData:{} , selectSearch:{} };
    this.submitData = this.submitData.bind(this);
    this.contentPage = this.contentPage.bind(this);
    this.enableForm = this.enableForm.bind(this);
    console.log(this.props);
  }

  componentDidMount(){
    console.log(this.props);

    /*if(this.props.appState.currentHillsideMovement)
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
        console.log(this.state);
      });
    }*/
  }



  handleChangeInput(event){

    if(event.target.name && event.target.value.length > -1)
    {
      console.log(event.target.name);
      console.log(event.target.value);
       this.setState(
         {
           formData:{
               ...this.state.formData,
               [event.target.name] : event.target.value
           }

         },() => {
           console.log(this.state);
         }
       );
    }
    if (event.target.value[0] == "="){
      event.target.value = event.target.value.substr(1)
    }
  }

  submitData(e){


      e.preventDefault();

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

  enableForm(){

    this.setState({ isDisable: !this.state.isDisable },()=>{
      console.log(this.state);
    });

  }

  contentPage(){

    return(
    <div style={{backgroundColor:"#e6e7e8",height:"100%"}}>
      <form className="simpleForm"  onSubmit={this.submitData}>
        <br/>
          <Row>
            <Col width="98%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="place" value={this.state.formData.place} onChange={this.handleChangeInput} placeholder="Lugar" disabled={this.state.isDisable} required />
              </Card>
            </Col>
          </Row>
          <Row>

            <Col width="49%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="code" value={this.state.formData.code} onChange={this.handleChangeInput} placeholder="Código" disabled={this.state.isDisable} required />
              </Card>
            </Col>

            <Col width="50%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="name" value={this.state.formData.name} onChange={this.handleChangeInput} placeholder="Nombre" disabled={this.state.isDisable} required />
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
            <Col width="49%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="type" value={this.state.formData.type} onChange={this.handleChangeInput} placeholder="Tipo" disabled={this.state.isDisable} required />
              </Card>
            </Col>
            <Col width="50%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="model" value={this.state.formData.model} onChange={this.handleChangeInput} placeholder="Modelo" disabled={this.state.isDisable} required />
              </Card>
            </Col>
          </Row>


          <Row>
            <Col width="98%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="customer" value={this.state.formData.customer} onChange={this.handleChangeInput} placeholder="Cliente" disabled={this.state.isDisable} required />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="49%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="front" value={this.state.formData.front} onChange={this.handleChangeInput} placeholder="Frente de obra" disabled={this.state.isDisable} required />
              </Card>
            </Col>
            <Col width="50%">
              <Card style={styles.cardInput}>
                <Select style={{width:"100%"}} onChange={this.handleChangeInput} name='condition' value={this.state.formData.condition === "1" || this.state.formData.condition === 'Bueno'  ?  1 :
                  this.state.formData.condition === "2" || this.state.formData.condition === 'Regular'  ? 2 : 
                  this.state.formData.condition === "3" || this.state.formData.condition === 'Malo'  ? 3 : ''
                } >
                    <option value="" disabled selected>Condicion</option>
                    <option value="1">Bueno</option>
                    <option value="2">Regular</option>
                    <option value="3">Malo</option>
                  </Select>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="49%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="provider" value={this.state.formData.provider} onChange={this.handleChangeInput} placeholder="Proveedor" disabled={this.state.isDisable} required />
              </Card>
            </Col>

            <Col width="50%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="service" value={this.state.formData.service} onChange={this.handleChangeInput} placeholder="Servicio restante" disabled={this.state.isDisable} required />
              </Card>
            </Col>

          </Row>

          <Row>

            <Col width="49%">
              <Card style={{...styles.cardInput, alignItems:"unset"}}>
                  <label>Fecha de adquisición:</label>
                <Input style={{...styles.dateInput , width:"30%"}} type="date" name="adquisition_date" onChange={this.handleChangeInput}value={this.state.formData.adquisition_date} disabled={this.state.isDisable} required/>
              </Card>
            </Col>

            <Col width="50%">
              <Card style={styles.cardInput}>
                <Input style={styles.textInput} type="text" name="initial_value" value={this.state.formData.initial_value} onChange={this.handleChangeInput} placeholder="Valor inicial" disabled={this.state.isDisable} required />
              </Card>
            </Col>

          </Row>


          <Row>
            <Col width="99%">
              <Card style={{...styles.cardInput, height:"auto"}}>
                <textarea onChange={this.handleChangeInput}style={{width:"100%",border:"0",height:"80px"}} name="observations" value={this.state.formData.observations}  disabled={this.state.isDisable} placeholder="Observaciones"></textarea>
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
            <button type="submit" disabled={this.state.isDisable}
              style={{fontSize:"18px",padding:'5px',marginTop:"10px",marginLeft:"50%",marginRight:"1%",backgroundColor:"red",boxShadow:"rgba(0, 0, 0, 0.85) 0px 1px 1px -2px",
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
      <AppPage  title={["Inventario de ", <strong>Maquinaría</strong>]} backButton={true} backButtonCallBack={()=>{ }}>

        {  isFetching ?
          <div style={{backgroundColor:"white",height:"100%"}}>
            <Loading/>
          </div> :

           this.contentPage()

        }


        <Modal title="Traslado de unidad" ModalStyles={styles.modalStyles}>
          ...info
        </Modal>

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

//export default MachineryForm;

export default  connect(mapStateToProps, { })(MachineryForm);

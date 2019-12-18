import React, { Component } from 'react';
//sources
import "../../css/simpleForm.css";
import placeholderImage from "../../img/image-placeholder.png";

import Styles from  './styles'

//Onsen Ui
import {  Col, Row, Card, Button, Input, Select, Radio, Checkbox } from 'react-onsenui';

//Libraries

//components
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";

//container
import AppPage from '../../containers/AppPage';

//flux
import { connect } from 'react-redux';
import { goToAssistantList, createReportSST,updateReportSST, getSSTAssistants, getSSTVisitors } from '../../flux/actions';
//helper


class SSTForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisable:false ,
      formData:this.props.sst,
      assistants:this.props.listSSTAssistants,
      visitors:this.props.listSSTVisitors,
      selectSearch:{}
    };
  }
  componentDidMount(){
    this.props.loadListAssistants(this.props.sst.id)
    this.props.loadListVisitors(this.props.sst.id)
  }
  handleChangeInput(event){

    if(event.target.name && event.target.value.length > -1) {
       this.setState({
           formData: {
               ...this.state.formData,
               [event.target.name] : event.target.value
           }
         }
       );
    }
    if (event.target.value[0] == "=") event.target.value = event.target.value.substr(1)
  }

  submitData(e){
    e.preventDefault();
    let {formData} = this.state //
    ,  {project_id, sst}  = this.props
    , data = {
      goal: formData.goal,
      location: formData.location,
      notes: formData.notes,
      progress_img1: null,
      progress_img2: null,
      progress_img3: null,
      progress_img4: null,
      project_id: project_id,
      report_date:`${formData.date} ${formData.hour}` ,
      responsible: formData.responsible,
      assistants: [],
      visitors:[]
    }
    //console.log(data);
    if (sst.id) return  this.props.handleChangeUpdate(sst.id, data) //console.log('update');
    this.props.handleChangeCreate(data);
  }
  enableForm(){
    this.setState({ isDisable: !this.state.isDisable });
  }
  render() {
    const { isFetching } = this.props.appState;

    if (isFetching) {
      return <div style={{backgroundColor:"white",height:"100%"}}>
        <Loading/>
      </div>
    }
    return (
      <AppPage  title={["FORMULARIO ", <strong>SST</strong>]} backButton={true} backButtonCallBack={()=>{ }}>
      <div style={{backgroundColor:"#e6e7e8",height:"100%"}}>
        <br/>
        <form className="simpleForm"   onSubmit={this.submitData.bind(this)}>
          <Row>
            <Col width="99%">
              <Card style={{...Styles.cardInput, alignItems:"unset"}}>
                  <label>Fecha:</label>
                <Input style={{...Styles.dateInput}} type="date" name="date" onChange={this.handleChangeInput.bind(this)} value={this.state.formData.date} disabled={this.state.isDisable}/>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col width="45%">
              <Card style={{...Styles.cardInput, alignItems:"unset"}}>
                  <label>Hora reporte:</label>
                <Input style={{...Styles.dateInput, position:"absolute", width:"40%"}} type="time" name="hour" onChange={this.handleChangeInput.bind(this)} value={this.state.formData.hour} disabled={this.state.isDisable}/>
              </Card>
            </Col>
            <Col width="54%">
              <Card style={Styles.cardInput}>
                  <label>Lugar:</label>
                  <Input style={Styles.textInput} type="text" name="location" value={this.state.formData.location} onChange={this.handleChangeInput.bind(this)} disabled={this.state.isDisable} />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="99%">
              <Card style={{...Styles.cardInput, height:"auto"}}>
                <textarea onChange={this.handleChangeInput}style={{width:"100%",border:"0",height:"80px"}} name="goal" value={this.state.formData.goal} onChange={this.handleChangeInput.bind(this)} placeholder="objetivo" ></textarea>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="99%">
              <Card style={Styles.cardInput}>
                <Input style={Styles.textInput} type="text" name="responsible" value={this.state.formData.responsible} onChange={this.handleChangeInput.bind(this)} placeholder="Responsable" disabled={this.state.isDisable} />
              </Card>
            </Col>

          </Row>
          <Row>
            <Col>
              <Card style={Styles.cardLabel}>
                <span style={{ textAlign:"center" }}>
                  Asistentes
                </span>
              </Card>
            </Col>

          </Row>
          <Row>

            <Card width="99%" style={{width:"99%",
                borderLeft: "yellow",
                borderStyle: "solid",
                borderWidth: "0px 0px 0px 10px"}}>
              <div style={{...Styles.buttonContainer, "background-color":'white'}}>
                <div className="margin" style={Styles.imageIcon}>
                    <i style={{color:"#30bfce"}} className="fas fa-user font Awesome"></i>
                </div>
                <div style={{position:"absolute", marginLeft:"30%"}}  onClick={()=>{this.props.goToAssistantList()}}>
                  <span style={{color:"gray"}}>Listado de asistentes</span>
                </div>
                <div>
                  <button className="nextButton" style={{marginLeft:"80%"}} >
                    <i className="fas fa-arrow-right font Awesome"></i>
                  </button>
                </div>
              </div>
            </Card>

          </Row>

          <Row>
            <Col width="99%">
              <Card style={{...Styles.cardInput, height:"auto"}}>

                <textarea onChange={this.handleChangeInput}style={{width:"100%",border:"0",height:"80px"}} name="notes" value={this.state.formData.notes} onChange={this.handleChangeInput.bind(this)} placeholder="Comentarios" ></textarea>

              </Card>
            </Col>
          </Row>

          <Row>

            <Col>
              <Card style={Styles.cardLabel}>
                <span style={{ textAlign:"center" }}>
                  Foto de avance de obra
                </span>
              </Card>
            </Col>

          </Row>

          <Row>

            <Col width="50%">
              <br/>
              <Card style={Styles.greenCard} >
                <div>
                  <img src={this.state.formData.general_image ? this.state.formData.general_image : placeholderImage } style={{width:"100%"}} />
                </div>
                {this.state.formData.general_image ?  null :
                  <Row>
                    <Button style={{...Styles.buttonCard, fontSize:"13px"}}
                      onClick={()=>{this.saveImage('general_image')}}
                    >Tomar foto</Button>
                    <label className="fileContainer" style={{ fontSize: "12px",
                      color: "white"
                    }}>
                      Subir archivo
                      <input  type="file" onChange={(event)=>{this.fileUpload("general_image",event)}}
                         />
                    </label>
                  </Row>
                }

              </Card>
            </Col>

            <Col width="50%">
              <br/>
              <Card style={Styles.greenCard} >
                <div>
                  <img src={this.state.formData.id_image ? this.state.formData.id_image : placeholderImage } style={{width:"100%"}} />
                </div>
                {this.state.formData.id_image ?
                  null:
                  <Row>
                    <Button style={{...Styles.buttonCard, fontSize:"13px"}}
                      onClick={()=>{this.saveImage('id_image')}}
                    >Tomar foto</Button>
                    <label className="fileContainer" style={{ fontSize: "12px",
                      color: "white"
                    }}>
                      Subir archivo
                      <input  type="file" onChange={(event)=>{this.fileUpload("id_image",event)}}
                         />
                    </label>
                  </Row>
                }
              </Card>
            </Col>

          </Row>

          <Row>

            <Col width="50%">
              <br/>
              <Card style={Styles.greenCard} >
                <div>
                  <img src={this.state.formData.general_image ? this.state.formData.general_image : placeholderImage } style={{width:"100%"}} />
                </div>
                {this.state.formData.general_image ?  null :
                  <Row>
                    <Button style={{...Styles.buttonCard, fontSize:"13px"}}
                      onClick={()=>{this.saveImage('general_image')}}
                    >Tomar foto</Button>
                    <label className="fileContainer" style={{ fontSize: "12px",
                      color: "white"
                    }}>
                      Subir archivo
                      <input  type="file" onChange={(event)=>{this.fileUpload("general_image",event)}}
                         />
                    </label>
                  </Row>
                }

              </Card>
            </Col>

            <Col width="50%">
              <br/>
              <Card style={Styles.greenCard} >
                <div>
                  <img src={this.state.formData.id_image ? this.state.formData.id_image : placeholderImage } style={{width:"100%"}} />
                </div>
                {this.state.formData.id_image ?
                  null:
                  <Row>
                    <Button style={{...Styles.buttonCard, fontSize:"13px"}}
                      onClick={()=>{this.saveImage('id_image')}}
                    >Tomar foto</Button>
                    <label className="fileContainer" style={{ fontSize: "12px",
                      color: "white"
                    }}>
                      Subir archivo
                      <input  type="file" onChange={(event)=>{this.fileUpload("id_image",event)}}
                         />
                    </label>
                  </Row>
                }
              </Card>
            </Col>
          </Row>
          <Row>
            <button type="submit" disabled={this.state.isDisable} style={Styles.button}
              ><b>Registrar</b></button>
          </Row>
        </form>
      </div>
      </AppPage>
    );
  }


}

const mapStateToProps = state => {
  return {
    sst:  state.appState.sstData,
    listSSTVisitors: state.appState.listSSTVisitors,
    listSSTAssistants: state.appState.listSSTAssistants,
    appState: state.appState,
    project_id: state.appState.sstData.project_id
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToAssistantList: ()=> {dispatch(goToAssistantList())},
    handleChangeCreate: (data)=>{dispatch(createReportSST(data))},
    handleChangeUpdate: (id, data)=>{dispatch(updateReportSST(id, data))},
    loadListAssistants: (idSST)=> {dispatch(getSSTAssistants(idSST))},
    loadListVisitors: (idSST)=> {dispatch(getSSTVisitors(idSST))},
  }
}

export default  connect(mapStateToProps,mapDispatchToProps)(SSTForm);

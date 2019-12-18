import React, { Component } from 'react';
//sources
import "../../css/simpleForm.css";

import Styles from  './styles'

//Onsen Ui
import {  Col, Row, Card, Button, Input, Select } from 'react-onsenui';

//Libraries

//components
import Loading from "../../components/Loading";

//container
import AppPage from '../../containers/AppPage';

//flux
import { connect } from 'react-redux';

import {createVisitor, updateVisitor} from '../../flux/actions';
//helper


class AssistantForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisable:false ,
      formData:this.props.visitor,
      selectSearch:{}
    };
  }
  componentDidMount(){
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
    console.log(this.props.appState);
    let {formData} = this.state
    ,  {project_id, visitor }  = this.props
    , data = {
      name: formData.name,
      document: formData.document,
      entity: formData.entity,
      position: formData.position,
      state: formData.state,
      project_id: project_id,
    }
    if (visitor.id) return  this.props.handleChangeUpdate(visitor.id, data)
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
      <AppPage  title={["Formulario de", <strong>Visitantes</strong>]} backButton={true} backButtonCallBack={()=>{ }}>
      <div style={{backgroundColor:"#e6e7e8",height:"100%"}}>
        <br/>
        <form className="simpleForm" onSubmit={this.submitData.bind(this)} >
          <Row>
            <Col width="99%">
              <Card style={{...Styles.cardInput, alignItems:"unset"}}>
                  <label>Nombre</label>
                  <Input style={Styles.textInput} type="text" name="name" value={this.state.formData.name} onChange={this.handleChangeInput.bind(this)} disabled={this.state.isDisable} />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="45%">
              <Card style={{...Styles.cardInput, alignItems:"unset"}}>
                  <label>C.C</label>
                  <Input style={Styles.textInput} type="text" name="document" value={this.state.formData.document} onChange={this.handleChangeInput.bind(this)} disabled={this.state.isDisable} />
              </Card>
            </Col>
            <Col width="54%">
              <Card style={Styles.cardInput}>
                  <label>Entidad</label>
                  <Input style={Styles.textInput} type="text" name="entity" value={this.state.formData.entity} onChange={this.handleChangeInput.bind(this)} disabled={this.state.isDisable} />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="45%">
              <Card style={Styles.cardInput}>
              <Select style={{width:"100%"}} onChange={this.handleChangeInput.bind(this)} name='position'
                value={this.state.formData.position === "Trabajador" || this.state.formData.position === 'Trabajador'  ?  'Trabajador' :
                this.state.formData.position === "Visitante" || this.state.formData.position === 'Visitante'  ? 'Visitante' : ''
              } >
                  <option value="" disabled selected>Rol</option>
                  <option value="Trabajador">Trabajador</option>
                  <option value="Visitante">Visitante</option>
                </Select>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="45%">
              <Card style={Styles.cardInput}>

                <Select style={{width:"100%"}} onChange={this.handleChangeInput.bind(this)} name='state'
                  value={this.state.formData.state === "1" || this.state.formData.state === 'Activo'  ?  1 :
                  this.state.formData.state === "2" || this.state.formData.state === 'Inactivo'  ? 2 : ''
                } >
                    <option value="" disabled selected>Estado</option>
                    <option value="1">Activo</option>
                    <option value="2">Inactivo</option>
                </Select>
              </Card>
            </Col>
          </Row>
          <Row>
            <button type="submit" style={Styles.button}
              ><b>Registrar</b></button>
          </Row>
        </form >
      </div>
      </AppPage>
    );
  }


}

const mapStateToProps = state => {
  return {
    visitor:  state.appState.sstVisitor,
    appState: state.appState,
    project_id: state.appState.sstData.project_id
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeCreate: (data)=>{dispatch(createVisitor(data))},
    handleChangeUpdate: (id,data)=>{dispatch(updateVisitor(id,data))}
  }
}

export default  connect(mapStateToProps,mapDispatchToProps)(AssistantForm);

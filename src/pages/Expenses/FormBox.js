import React, { Component } from 'react';

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
    createBoxExpense,
    updateBoxExpense,
    getBoxExpenses
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



class FormBox extends Component {
  constructor(props) {
    
    super(props);
    this.state = {
      isDisable:false ,
      formData:{},
      selectSearch:{}
    };
    this.handleChangeInput = this.handleChangeInput.bind(this)
    this.submitData = this.submitData.bind(this)
    this.enableForm = this.enableForm.bind(this)
    this.saveImage = saveImage.bind(this);
    this.fileUpload = fileUpload.bind(this);

  }

  componentDidMount(){

    if(this.props.appState.currentBoxExpense)
    {
      this.setState({
        isDisable:true,
        formData:{
          ...this.state.formData,
          ...this.props.appState.currentBoxExpense
        }
      })
    }

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
    
    if(!this.props.appState.isFetching)
    {

      let data = this.state.formData

      data.user_id = this.props.appState.user.id

      if( this.props.appState.currentBoxExpense )
      {                
        this.props.updateBoxExpense(data.id,data);
      
      }else{
        
        this.props.createBoxExpense(data);
        
      }
    }
    else{
      Ons.notification.alert({title:"¡Espera!",message:"Estamos realizando otro proceso en el momento"});
    }
 
  }

  enableForm(){
    this.setState({ isDisable: !this.state.isDisable });
  }

  render() {
    const { isFetching , projects } = this.props.appState;

    let projectList = projects.map((location, index) => <option key={index} value={location.id} >{location.name}</option>);

    if (isFetching) {
      return <div style={{backgroundColor:"white",height:"100%"}}>
        <Loading/>
      </div>
    }
    return (
        <AppPage  title={["", <strong> {"Reporte de Caja"} </strong>]} backButton={true} backButtonCallBack={()=>{  this.props.getBoxExpenses() }}>
            <div style={{backgroundColor:"#e6e7e8", height:"100%"}}>
                <br/>
                {
                    this.props.appState.currentBoxExpense ?
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
                        <Select style={{width:"100%"}} name="project_id" onChange={this.handleChangeInput} value={this.state.formData.project_id} >
                            <option value="" disabled selected>Proyecto</option>
                            { projectList }
                        </Select>
                        </Card>
                    </Col>

                </Row>

                <Row>
                    <Col width="99%">
                        <Card style={{...styles.cardInput, alignItems:"unset"}}>
                            <label>Fecha de la factura:</label>
                            <Input
                            style={{...styles.dateInput}}
                            type="date"
                            name="bill_date"
                            onChange={this.handleChangeInput}
                            value={this.state.formData.bill_date}
                            disabled={this.state.isDisable}
                            required
                            />
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col width="49%">
                        <Card style={styles.cardInput}>
                        <Select style={{width:"100%"}} name="bill_category" onChange={this.handleChangeInput} value={this.state.formData.bill_category} >
                            <option value="" disabled selected>Categoria</option>
                            <option value="1">Materiales</option>
                            <option value="2">Herramientas</option>
                            <option value="3">Transporte</option>
                            <option value="4">Combustible</option>
                            <option value="5">Otros</option>
                        </Select>
                        </Card>
                    </Col>
                    <Col width="49%">
                        <Card style={styles.cardInput}>
                            <Input
                            style={styles.textInput}
                            type="number"
                            name="price"
                            value={ this.state.formData.price }
                            onChange={ this.handleChangeInput }
                            placeholder="Valor"
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
                            name="measuring_unit"
                            value={this.state.formData.measuring_unit}
                            onChange={this.handleChangeInput}
                            placeholder="Unidad de medida"
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
                            name="quantity"
                            value={this.state.formData.quantity}
                            onChange={this.handleChangeInput}
                            placeholder="Cantidad"
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
                    <Col>
                        <Card style={styles.cardLabel}>
                        <span>
                            Evidencias fotográficas
                        </span>
                        </Card>
                    </Col>
                </Row>               

                <Row>
                    <Col width="99%">
                        <Card style={styles.greenCard} >
                            <div>
                                <img src={this.state.formData.voucher ? 
                                    this.state.formData.voucher : placeholderImage } style={{width:"100%"}} />
                            </div>
                            <Row>
                                <Button style={styles.buttonCard}
                                onClick={()=>{saveImage('voucher',this)}}
                                >Tomar foto</Button>
                                <label className="fileContainer" style={ styles.uploadFile }>
                                Subir archivo
                                <input  type="file" onChange={(event)=>{fileUpload("voucher",event,this)}}
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
      </AppPage>
    );
  }


}

const mapStateToProps = state => {
  return {  
    appState: state.appState    
  };
}



export default  connect(mapStateToProps,{ createBoxExpense,
    updateBoxExpense,
    getBoxExpenses })(FormBox);

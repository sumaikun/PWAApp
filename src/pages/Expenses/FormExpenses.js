import React, { Component } from 'react';

//Sources

import { formCardStyles , workingRowStyles , modalStyles } from "../../jsStyles/Styles";

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
  createRequireExpense,
  updateRequireExpense,
  getRequiredExpenses
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



class FormExpenses extends Component {
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
  }
  componentDidMount(){
    
    if(this.props.appState.currentRequireExpense)
    {
      this.setState({
        isDisable:true,
        formData:{
          ...this.state.formData,
          ...this.props.appState.currentRequireExpense
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
      if( this.props.appState.currentRequireExpense )
      {                
        this.props.updateRequireExpense(this.state.formData.id,this.state.formData);
      
      }else{
        
        this.props.createRequireExpense(this.state.formData);
        
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
    const { isFetching ,projects } = this.props.appState;

    //console.log("projects",projects);

    //projects.forEach(element => { console.log(element)  } );

    let projectList = projects.map((location, index) => <option key={index} value={location.id} >{location.name}</option>);

    if (isFetching) {
      return <div style={{backgroundColor:"white",height:"100%"}}>
        <Loading/>
      </div>
    }
    return (
        <AppPage  title={["", <strong> {"Reporte de gasto"} </strong>]} backButton={true} backButtonCallBack={()=>{
            this.props.getRequiredExpenses()
         }}>
            <div style={{backgroundColor:"#e6e7e8", height:"100%"}}>
                <br/>
                {
                    this.props.appState.currentRequireExpense ?
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
                        <Select style={{width:"100%"}} name="project_id" onChange={ this.handleChangeInput } value={ this.state.formData.project_id } >
                            <option value="" disabled selected>Proyecto</option>
                            { projectList }
                        </Select>
                        </Card>
                    </Col>

                </Row>

                <Row>
                    <Col width="99%">
                        <Card style={{...styles.cardInput, alignItems:"unset"}}>
                            <label>Fecha de entrega de dinero:</label>
                            <Input
                            style={{...styles.dateInput}}
                            type="date"
                            name="delivery_date"
                            onChange={this.handleChangeInput}
                            value={this.state.formData.delivery_date}
                            disabled={this.state.isDisable}
                            required
                            />
                        </Card>
                    </Col>
                </Row>

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
                            name="price"
                            value={this.state.formData.price}
                            onChange={this.handleChangeInput}
                            placeholder="Valor"
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
                            name="concept"
                            value={this.state.formData.concept}
                            onChange={this.handleChangeInput}
                            placeholder="Concepto"
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



export default  connect(mapStateToProps,{ 
  createRequireExpense,
  updateRequireExpense,
  getRequiredExpenses })(FormExpenses);

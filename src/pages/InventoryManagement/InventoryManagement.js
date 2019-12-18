import React, { Component } from 'react';
//sources
import yellowArrow from "../../img/yellowArrow.png";
import "../../css/accordion.css";


//Onsen Ui
import {  Col, Row, Card, Button, List, ListItem} from 'react-onsenui';
import Ons from 'onsenui';
//import Ons from 'onsenui';

//Libraries

//components
import ListAccordion from "../../components/ListAccordion";
import CardOptionButton from "../../components/CardOptionButton";

//container
import AppPage from '../../containers/AppPage';

//flux
import { goToMachineryList } from '../../flux/actions';
import { connect } from 'react-redux';

//helpers


const styles = {
  accordionIcons:{
    "background-color": "#006828",
    "width": "25px",
    "height": "25px",
    "border-radius": "50%",
    display: "flex",
    "justify-content": "center",
    "align-items": "center"
  },
  centerAll:{
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
  }

}

class InventoryManagement extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editMode:false,
      idToModify:null,
      functionalList:{
      }
    }

  }
  componenDidMount(){
  }

  render() {

    return (
      <AppPage  title={[<strong>{"Gestión de Inventarios"}</strong>]} backButton={true} backButtonCallBack={()=>{  }}>

              <div style={{height:"25px", backgroundColor:"#efeff4"}}></div>

              <div  style={{display:"flex",justifyContent:"center"}} >
                <div style={{width:"95%"}} >
                  <div  onClick={()=>{this.props.goToMachineryList()}}>
                    <ListAccordion counter={1} projectName={"Maquinaría"} projectInfo={""} /> 
                  </div>
                </div>
              </div>

              <div style={{height:"25px", backgroundColor:"#efeff4"}}></div>

              <div  style={{display:"flex",justifyContent:"center"}} >
                <div style={{width:"95%"}} >
                  <div  onClick={()=>{this.props.goToMachineryList()}}>
                    <ListAccordion counter={2} projectName={"Equipo"} projectInfo={""} />
                  </div>
                </div>
              </div>
              <div style={{height:"25px", backgroundColor:"#efeff4"}}></div>
              <div  style={{display:"flex",justifyContent:"center"}} >
                <div style={{width:"95%"}} >
                  <div  onClick={()=>{this.props.goToMachineryList()}}>
                    <ListAccordion counter={3}  projectName={["Vehiculo",<span>{"   "}</span>]} projectInfo={""} />
                  </div>
                </div>
              </div>

      </AppPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    navigation: state.navigation,
    appState: state.appState
  };
}

export default  connect(mapStateToProps,{ goToMachineryList })(InventoryManagement);

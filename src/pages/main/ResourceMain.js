import React, { Component } from 'react';
//sources
import inventory from "../../img/checkList.png";
import fuel from "../../img/fuel.png";
import "../../css/accordion.css";
import "../../css/Modal.css";

//Onsen Ui
import {  Col, Row, Card, Button} from 'react-onsenui';
import Ons from 'onsenui';

//Libraries

//components
import CardButton from "../../components/CardButton";
import Loading from "../../components/Loading";

//container
import AppPage from '../../containers/AppPage';

//flux
import {
  setProjectPhase,
  goToProjects,
  fetchProjects,
  goToRiskManagement,
  goToInventoryManagement,
  goToCivilManagement,
  goToSSTList,
  } from '../../flux/actions';
import { connect } from 'react-redux';

//css
import "../../css/style.css";

class ResourceMain extends Component {
  constructor(props) {
    super(props);
    this.contentPage = this.contentPage.bind(this);
  }

  componentDidMount(){
    //this.props.fetchProjects();
  }

  contentPage(){

    return (
      <div style={{height:"100%",backgroundColor:"white"}}>
        <br/>

        <div onClick={()=>{this.props.goToInventoryManagement()
            }}>
            <CardButton
              imgIcon = {inventory}
              title="Inventario"
              />
            </div>
        <div style={{height:"10px"}} ></div>

        <div onClick={()=>{this.props.goToInventoryManagement()
            }}>
            <CardButton
            imgIcon = {fuel}
              title="Combustible"
              />
            </div>
        <div style={{height:"10px"}} ></div>
        <div onClick={()=>{this.props.goToSSTList()}}>
          <CardButton
            title="Informe SST"
            />
          </div>
        <div style={{height:"10px"}} ></div>
      </div>
    );
  }

  render() {
    const { isFetching } = this.props;
    console.log(this.props);
    return (
      <AppPage  title={["CONTROL DE ", <strong>RECURSOS</strong>]}>

          {
            isFetching ?
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
    navigation: state.navigation,
    isFetching: state.appState.isFetching
  };
}

export default  connect(mapStateToProps, {
  fetchProjects,
  goToSSTList,
  goToCivilManagement,
  goToProjects,
  setProjectPhase,
  goToRiskManagement,
  goToInventoryManagement
 })(ResourceMain);

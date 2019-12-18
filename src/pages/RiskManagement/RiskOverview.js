import React, { Component } from 'react';
//sources
import checkList from "../../img/checkList.png";
import tree from "../../img/tree.png";
import chart from "../../img/chart.png";
import plant from "../../img/plant.png";
import yellowArrow from "../../img/yellowArrow.png";
import "../../css/accordion.css";
import { workingRowStyles , OverviewColors } from "../../jsStyles/Styles";

//Onsen Ui
import { Col, Row, Card } from 'react-onsenui';

//Libraries

import Loading from "../../components/Loading";
//components
import ListOverview from "../../components/ListOverview";
import CardOptionButton from "../../components/CardOptionButton";
//container
import AppPage from '../../containers/AppPage';

//flux
import {  goToRiskOverview, setRiskOverview, getRiskOverview } from '../../flux/actions';
import { connect } from 'react-redux';

const styles = workingRowStyles;

class Riskoverview extends Component {
  constructor(props) {
    super(props);

    this.contentPage = this.contentPage.bind(this);
    this.OverviewRisk = this.props.appState.RiskOverview;
  }
  contentPage(){
    return(
      <div>
        <Card style={{textAlign:"center", marginTop:"20px",height:"10px",backgroundColor:"rgb(0, 104, 40)"}}>
          <div style={{marginTop:"-8px"}}>
            <span style={{color:"white", fontSize:"0.8em" }}>NIVELES DE RIESGO</span>
          </div>
          <div  style={{marginTop:"25px"}} >
            <div style={{width:"100%"}} >
              <ListOverview counter={1} projectName={"Deformación tunel"} value={this.OverviewRisk.tunnel_deformations.round_avg || 0}>
              </ListOverview>
            </div>
          </div>
          <div  style={{marginTop:"5px"}} >
            <div style={{width:"100%"}} >
              <ListOverview counter={2} projectName={"Desplazamiento ladera"} value={this.OverviewRisk.hillside_displacements.round_avg || 0} >
              </ListOverview>
            </div>
          </div>
          <div  style={{marginTop:"5px"}} >
            <div style={{width:"100%"}} >
              <ListOverview counter={3} projectName={"Precipitación"} value={this.OverviewRisk.precipitations.round_avg || 0}>
              </ListOverview>
            </div>
          </div>
          <div  style={{marginTop:"5px"}} >
            <div style={{width:"100%"}} >
              <ListOverview counter={4} projectName={"Recorrido Ladera"} value={this.OverviewRisk.dry_ravine_rounds.round_avg || 0}>
              </ListOverview>
            </div>
          </div>
          <div  style={{marginTop:"5px"}} >
            <div style={{width:"100%"}} >
              <ListOverview counter={5} projectName={"Inspección quebrada"} value={this.OverviewRisk.hillside_rounds.round_avg || 0}>
              </ListOverview>
            </div>
          </div>
        </Card>
        
      </div>
    );
  }

  render() {
    const {  isFetching } = this.props.appState
    return (
      <AppPage  title={["REPORTE GENERAL"]} backButton={true} >
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
    navigation: state.navigation,
    appState: state.appState
  };
}

export default  connect(mapStateToProps, {goToRiskOverview, setRiskOverview, OverviewColors })(Riskoverview);

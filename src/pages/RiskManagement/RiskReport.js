import React, { Component } from 'react';
//sources
import checkList from "../../img/checkList.png";
import tree from "../../img/tree.png";
import chart from "../../img/chart.png";
import plant from "../../img/plant.png";
import yellowArrow from "../../img/yellowArrow.png";
import "../../css/accordion.css";
import "../../css/style.css";
import { workingRowStyles , riskColors } from "../../jsStyles/Styles";

//Onsen Ui
import {  List , ListItem, Col, Row, Card, ListHeader } from 'react-onsenui';
import Ons from 'onsenui';

//Libraries

//components
import NotFound from "../../components/NotFound";
import Loading from "../../components/Loading";
//container
import AppPage from '../../containers/AppPage';

//flux
import { goToHillsideCollapse,
   goToRainFall,
   goToRiverCollapse,
   goToTunnelDeformation,
   goToRiskIndicator,
   goToHillsideMovement,
   setTunnelDeformation,
   setHillsideMovement,
   setRainfall,
   setHillSideCollapse,
   setRiverCollapse,
   setCurrentRiskPhase,
   removeFromTunnelDeformationServerUpdate,
   removeFromOfflineTunnelDeformation,
   removeFromHillSideMovServerUpdate,
   removeFromOfflineHillSideMov,
   removeFromRainFallServerUpdate,
   removeFromOfflineRainFall,
   removeFromHillSideCollServerUpdate,
   removeFromOfflineHillSideColl,
   removeFromRiverCollServerUpdate,
   removeFromOfflineRiverColl
  } from '../../flux/actions';
import { connect } from 'react-redux';

const styles = workingRowStyles;

class RiskReport extends Component {
  constructor(props) {
    super(props);

    this.contentPage = this.contentPage.bind(this);
    this.removeFromMemory = this.removeFromMemory.bind(this);
    this.state = {
      searchName: '',
      searchDate: ''
    }
  }

  removeFromMemory(e,risk){
    e.stopPropagation();


      let self = this;

      Ons
      .notification.confirm({ title:'',message: '¿Deseas eliminar los datos de memoría?' })
      .then(function(res) {
      if(res){

        switch(self.props.appState.currentRiskPhase)
        {
          case 1:

            if(risk.ToSynchroEdit)
            {
              self.props.removeFromTunnelDeformationServerUpdate(risk);
            }
            else{
              self.props.removeFromOfflineTunnelDeformation(risk);
            }

            break;
          case 2:

            if(risk.ToSynchroEdit)
            {
              self.props.removeFromHillSideMovServerUpdate(risk);
            }
            else{
              self.props.removeFromOfflineHillSideMov(risk);
            }

            break;
          case 3:

            if(risk.ToSynchroEdit)
            {
              self.props.removeFromRainFallServerUpdate(risk);
            }
            else{
              self.props.removeFromOfflineRainFall(risk);
            }

            break;
          case 4:

            if(risk.ToSynchroEdit)
            {
              self.props.removeFromHillSideCollServerUpdate(risk);
            }
            else{
              self.props.removeFromOfflineHillSideColl(risk);
            }

            break;
          case 5:

            if(risk.ToSynchroEdit)
            {
              self.props.removeFromRiverCollServerUpdate(risk);
            }
            else{
              self.props.removeFromOfflineRiverColl(risk);
            }

            break;
          default:
              break;
        }

      }
    });
  }

  contentPage(){

    let currentRiskList;
    let action;

    //console.log(this.props.appState.currentRiskPhase);

    switch(this.props.appState.currentRiskPhase)
    {
      case 1:

        currentRiskList = this.props.appState.TunnelDeformationList[this.props.appState.selectedProject.id];

        action = (risk) => {
          this.props.setTunnelDeformation(risk);
          this.props.goToTunnelDeformation();
        }

        currentRiskList = currentRiskList.concat(this.props.memory.offLineTunnelDeformations.filter(
          memory => memory.project_id === this.props.appState.selectedProject.id
        ));

        break;
      case 2:

        currentRiskList = this.props.appState.HillsideMovementList[this.props.appState.selectedProject.id];

        action = (risk) => {
          this.props.setHillsideMovement(risk);
          this.props.goToHillsideMovement();
        }

        currentRiskList = currentRiskList.concat(this.props.memory.offLineHillSideMovements.filter(
          memory => memory.project_id === this.props.appState.selectedProject.id
        ));

        break;
      case 3:

        currentRiskList = this.props.appState.RainfallList[this.props.appState.selectedProject.id];

        action = (risk) => {
          this.props.setRainfall(risk);
          this.props.goToRainFall();
        }

        currentRiskList = currentRiskList.concat(this.props.memory.offLineRainFall.filter(
          memory => memory.project_id === this.props.appState.selectedProject.id
        ));

        break;
      case 4:

        currentRiskList = this.props.appState.HallsideCollapseList[this.props.appState.selectedProject.id];

        action = (risk) => {
          this.props.setHillSideCollapse(risk);
          this.props.goToHillsideCollapse();
        }

        currentRiskList = currentRiskList.concat(this.props.memory.offLineHillSideCollapse.filter(
          memory => memory.project_id === this.props.appState.selectedProject.id
        ));

        break;
      case 5:

        currentRiskList = this.props.appState.RiverCollapseList[this.props.appState.selectedProject.id];

        action = (risk) => {
          this.props.setRiverCollapse(risk);
          this.props.goToRiverCollapse();
        }

        currentRiskList = currentRiskList.concat(this.props.memory.offLineRiverCollapse.filter(
          memory => memory.project_id === this.props.appState.selectedProject.id
        ));

        break;
      default:
          break;
    }

    currentRiskList.sort((a,b) => {
      if (a.created_at > b.created_at) return -1
      if (a.created_at < b.created_at) return 1
      return 0
    })

    const { searchName, searchDate } = this.state;

    let foundIndex;

    return(
    <div>
      <div style={styles.formContainer}>
        <div className="login-form" >
          <div className="group" style={styles.searchInputContainer}>
            <div>
              <input id="search" value={searchName} name="buscador" onChange={e => this.setState({ searchName: e.target.value })} className="input fontAwesome" placeholder="Buscar" type="text"   style={{fontFamily:'Arial', marginTop:"8px", width:"90%", height:"10px"}} />
              <input type="date" value={searchDate}  onChange={e => this.setState({ searchDate: e.target.value })} className="input fontAwesome" style={{fontFamily:'Arial', marginTop:"8px", width:"90%", height:"2px"}} />
            </div>
          </div>
        </div>
      </div>


        { currentRiskList.length > 0  ?

          <List
            renderHeader={this.renderHeader}>


           {currentRiskList.filter(f => f.report_date.split(' ')[0].includes(searchDate)).filter(e => e.code.includes(searchName)).map((risk, i) => {

             switch(this.props.appState.currentRiskPhase)
             {
               case 1:
                 foundIndex = this.props.memory.serverTunnelDeformations.findIndex( memory =>   memory.id == risk.id  );
                 ////console.log("foundIndex"+foundIndex);
                 risk = foundIndex != -1 ? this.props.memory.serverTunnelDeformations[foundIndex] : risk ;
                 break;
               case 2:
                 foundIndex = this.props.memory.serverHillSideMovements.findIndex( memory =>   memory.id == risk.id  );
                 //console.log("foundIndex"+foundIndex);
                 risk = foundIndex != -1 ? this.props.memory.serverHillSideMovements[foundIndex] : risk ;
                 break;
               case 3:
                 foundIndex = this.props.memory.serverRainFall.findIndex( memory =>   memory.id == risk.id  );
                 ////console.log("foundIndex"+foundIndex);
                 risk = foundIndex != -1 ? this.props.memory.serverRainFall[foundIndex] : risk ;
                 break;
               case 4:
                 foundIndex = this.props.memory.serverHillSideCollapse.findIndex( memory =>   memory.id == risk.id  );
                 ////console.log("foundIndex"+foundIndex);
                 risk = foundIndex != -1 ? this.props.memory.serverHillSideCollapse[foundIndex] : risk ;
                 break;
               case 5:
                 foundIndex = this.props.memory.serverRiverCollapse.findIndex( memory =>   memory.id == risk.id  );
                 ////console.log("foundIndex"+foundIndex);
                 risk = foundIndex != -1 ? this.props.memory.serverRiverCollapse[foundIndex] : risk ;
                 break;
               default:
                   break;
             }




              return (
              <div>
                <ListItem tappable onClick={()=>{

                    action(risk);

                  }}>
                  <div className="center" style={styles.mainListItem}>
                    <span className="Level4" style={styles.counter}>{i+1}</span>
                    { risk.ToSynchro || risk.ToSynchroEdit ?  <i class="fas fa-wifi" onClick={(e)=>{ this.removeFromMemory(e,risk);   }} style={{marginLeft:"5px"}} ></i> : null }
                    <span className="Level3" style={styles.projectName}>{risk.code}</span>
                    <div>
                      <div className="Level2" style={{...styles.projectInfo,
                        ...riskColors['level'+risk.level],
                        "text-align":"center",
                      }}>Riesgo nivel {" "+risk.level}</div>
                      <br/>
                      <span style={styles.projectInfo}>{risk.report_date}</span>
                    </div>
                    <div className="Level" style={styles.buttonContainer}>
                      <div style={styles.ProjectButton}>
                        <i className="fas fa-arrow-right fontAwesome"></i>
                      </div>
                    </div>
                  </div>
                </ListItem>
                <div style={{
                    height: "10px",
                    backgroundColor: "#e6e7e8",
                }}>
                </div>
              </div>
            );
          })}

          </List>:<NotFound/>

        }

      </div>
    );
  }

  render() {

      //console.log("fase de riesgo actual "+this.props.appState.currentRiskPhase);

      const {  isFetching } = this.props.appState

    return (
      <AppPage  title={["Reporte de ", <strong>{"Riesgos"}</strong>]} backButton={true} >

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
    appState: state.appState,
    memory: state.memory
  };
}

export default  connect(mapStateToProps, { goToHillsideCollapse,
   goToRainFall,
   goToRiverCollapse,
   goToTunnelDeformation,
   goToRiskIndicator,
   goToHillsideMovement,
   setHillsideMovement,
   setRainfall,
   setHillSideCollapse,
   setRiverCollapse,
   setTunnelDeformation,
   setCurrentRiskPhase,
   removeFromTunnelDeformationServerUpdate,
   removeFromOfflineTunnelDeformation,
   removeFromHillSideMovServerUpdate,
   removeFromOfflineHillSideMov,
   removeFromRainFallServerUpdate,
   removeFromOfflineRainFall,
   removeFromHillSideCollServerUpdate,
   removeFromOfflineHillSideColl,
   removeFromRiverCollServerUpdate,
   removeFromOfflineRiverColl
})(RiskReport);

import React, { Component } from 'react';
//sources

import "../../css/accordion.css";
import "../../css/style.css";
import { workingRowStyles } from "../../jsStyles/Styles";

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
import {
  //  Navigation
  goToPlantationReport,
  goToCivilReport,
  goToSelectPlantationReportType,

  //  AppActions
  setPlantationReport,
  setPlantationReportType,

  //  API
  getDefaultActivitiesByType,
  getPlantationReportById,
  getPlantationReportsByProject,


  removeFromPlantationReportUpdate,
  removeFromOfflinePlantationReport

} from '../../flux/actions';

import { connect } from 'react-redux';
import { exampleReports } from "./data";

const styles = workingRowStyles;

class ReportList extends Component {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
    this.contentPage = this.contentPage.bind(this);
    this.state = {
      searchName: '',
      searchDate: ''
    };
  }

  renderHeader(){
    return(
      <ListHeader style={{position: "fixed", zIndex: 1, width:"95%", fontSize: 15, padding:"0px", marginTop:"-40px"}} >
        <Row>
          <Col width="100%" style={{
            backgroundColor: "rgba(0, 104, 40, 0.8)",
            textAlign: "center",
            color: "white",
            fontWeight: "300",
            display: "fixed",
            whiteSpace: 'normal',
            fontFamily: 'Raleway',
          }}>
            <span># DE REPORTES</span>
          </Col>
        </Row>
      </ListHeader>
    );
  }

  contentPage(plantationReports){

    plantationReports.sort((a,b) => {
      if (a.date > b.date) return -1
      if (a.date < b.date) return 1
      return 0
    });

    const { searchName, searchDate } = this.state;

    return(
      <div>
          <div className={'filter-container'} style={{backgroundColor:"orange", position:"fixed", width:"100%", zIndex:"1"}}>
            <div className="login-form" >
              <div className="group" style={styles.searchInputContainer}>
                <div>
                  <input id="search" value={searchName} name="buscador" onChange={e => this.setState({ searchName: e.target.value })} className="input fontAwesome" placeholder="Buscar" type="text" style={{fontFamily:'Arial', marginTop:"8px", width:"90%", height:"10px"}} />
                  <input type="date" value={searchDate} onChange={e => this.setState({ searchDate: e.target.value })} className="input fontAwesome" style={{fontFamily:'Arial', marginTop:"8px", width:"90%", height:"2px"}} />
                </div>
                <div className={'plus-icon-container'}
                     style={styles.searchButton}
                     onClick={ ( ) => {
                       
                      this.props.setPlantationReport( null );

                       if(this.props.appState.currentPhase == 5 )
                       {
                         this.props.goToSelectPlantationReportType();
                       }

                       if(this.props.appState.currentPhase == 6 )
                       {
                         this.props.goToCivilReport();
                       }
                       
                     }}
                >
                  <span className="fas fa-plus fontAwesome plus-icon" ></span>
                </div>
              </div>
            </div>
          </div>

        {
          plantationReports.length > 0  ?
          <div className={'list-container-and-header'} style={{display:"flex", justifyContent:"center"}} >
            <div style={{width: '95%'}}>
              <List
                renderHeader={this.renderHeader}
              >
                {
                  plantationReports
                    .filter( r => r.report_date.split(' ')[0].includes(searchDate) )
                    .map( (report, i) => {
                      return (
                        <div
                          className={'select-report'}
                          onClick={()=>{

                            if(this.props.appState.currentPhase == 6)
                            {
                              //console.log(this.props.appState);
                              //this.props.getDefaultActivitiesByType(this.props.appState.plantationProject.id);
                              this.props.setPlantationReport( report );                              
                              this.props.goToCivilReport();                             
                              return;
                            }

                          }}
                        >
                          <ListItem tappable onClick={()=>{
                            
                          }}>
                            <div className={'left'}>
                              <span className={'list-counter'}>{ i+1 }</span>
                            </div>
                            <div className={'center'}>

                              <div onClick={(e)=>{
                                
                                e.stopPropagation();                      
                                let self = this;

                                
                                  Ons
                                  .notification.confirm({ title:'',message: '¿Deseas eliminar los datos de memoría?' })
                                  .then(function(res) {
                                    if(res){
                                      if(report.ToSynchro)
                                      {
                                        self.props.removeFromOfflinePlantationReport(report);
                                      }
                                      if(report.ToSynchroEdit)
                                      {
                                        self.props.removeFromPlantationReportUpdate(report);
                                      }
                                    }
                                  });
                                }} 
                              >
                              
                              { report.ToSynchro || report.ToSynchroEdit ?
                                  <i class="fas fa-wifi" style={{marginLeft:"5px"}} ></i> : null }

                              </div>

                              <span className={'project-list-title-font project-list-project-name margin-between-right'}>{ report.report_date }</span>
                              <span className={'project-list-project-info margin-between-left'}>{ parseInt( report.type ) === 1 ? 'ESTABLECIMIENTO' : parseInt( report.type ) === 2 ? 'MANTENIMIENTO' : parseInt( report.type ) === 3 ? 'CIVIL' : '' }</span>
                            </div>
                            <div className={'right'}>
                              <div className={'arrow-button-container'}>
                                <div className={'tree-dots-button'}>
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
                    })
                }
              </List>
            </div>
          </div>
          :
          <div className={'not-found'}>
            <NotFound/>
          </div>
        }
      </div>
    );
  }

  render() {
    let {  isFetching, plantationProject, plantationReports } = this.props.appState;

    //console.log( plantationProject );
    //console.log( plantationReports );

    let filteredPlantationReportsByProject = [];

    if ( plantationReports ) {
      
      if(plantationReports.length > 0)
      {
        filteredPlantationReportsByProject = plantationReports.filter( (pReport) => {
          //console.log( plantationProject.id === parseInt( pReport.project_id ) );
          return ( plantationProject.id === parseInt( pReport.project_id ) );
        });
      }

    }

    let foundIndex;

    let index = 0;
    
    filteredPlantationReportsByProject.forEach(  record =>{

      if(this.props.memory.serverPlantationReport)
      {
        foundIndex = this.props.memory.serverPlantationReport.findIndex( memory =>   memory.id == record.id  );
          console.log("foundIndex"+foundIndex);
        record = foundIndex != -1 ? this.props.memory.serverPlantationReport[foundIndex] : record ;
      }      

      filteredPlantationReportsByProject[index] = record;
      index++;

    });

    //console.log("datos offline");

    //console.log(this.props.memory.offLinePlantationReport);

    //console.log(plantationProject.id);

    /*console.log(this.props.memory.offLinePlantationReport.filter(
      report => report.project_id == plantationProject.id
    ));*/

    if(this.props.memory.offLinePlantationReport)
    {
      //add offline records
      filteredPlantationReportsByProject = filteredPlantationReportsByProject.concat(this.props.memory.offLinePlantationReport.filter(
        report => report.project_id == plantationProject.id
      ));

    }
    

    //console.log(exampleReports);

    return (
      <AppPage title={["REPORTES"]} backButton={true} >
        {
          isFetching ?
            <div style={{backgroundColor:"white",height:"100%"}}>
              <Loading/>
            </div>
            :
            this.contentPage( filteredPlantationReportsByProject )
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

export default  connect(mapStateToProps, {
//  Navigation
  goToPlantationReport,
  goToCivilReport,
  goToSelectPlantationReportType,

  //  AppActions
  setPlantationReport,
  setPlantationReportType,

  //  API
  getDefaultActivitiesByType,
  getPlantationReportById,
  getPlantationReportsByProject,

  // MEMORY ACTIONS

  removeFromOfflinePlantationReport,
  removeFromPlantationReportUpdate

})(ReportList);

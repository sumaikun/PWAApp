import React, { Component } from 'react';

//Onsen ui

import {   List, ListItem, Icon, BottomToolbar, Page } from 'react-onsenui';

import Ons from 'onsenui';

//helpers



// Pages

//flux
import { goToProjects, LogOut, setProjectPhase, goToMain,
  updateFunctionalUnit,
  createFunctionalUnit,
  removeFromFunctionalUnitServerUpdate,
  removeFromOfflineFunctionalUnit,
  createForestUnitPhase1,
  createForestUnitPhase2,
  createForestUnitPhase3,
  updateForestUnitPhase1,
  updateForestUnitPhase2,
  updateForestUnitPhase3,
  removeFromForestUnitP1ServerUpdate,
  removeFromOfflineForestUnitP1,
  removeFromForestUnitP2ServerUpdate,
  removeFromOfflineForestUnitP2,
  removeFromForestUnitP3ServerUpdate,
  removeFromOfflineForestUnitP3,
  updateOfflineForestUnitP1,
  updateOfflineForestUnitP2,
  updateOfflineForestUnitP3,
  notFetching,

  createTunnelDeformation,
  updateTunnelDeformation,
  removeFromTunnelDeformationServerUpdate,
  removeFromOfflineTunnelDeformation,

  createHallsideMovement,
  updateHallsideMovement,
  removeFromHillSideMovServerUpdate,
  removeFromOfflineHillSideMov,


  createRainfall,
  updateRainfall,
  removeFromRainFallServerUpdate,
  removeFromOfflineRainFall,


  createHillsideCollapse,
  updateHillsideCollapse,
  removeFromHillSideCollServerUpdate,
  removeFromOfflineHillSideColl,

  createRiverCollapse,
  updateRiverCollapse,
  removeFromRiverCollServerUpdate,
  removeFromOfflineRiverColl,


  //Plantarion Report
  createReport,
  updateReport,

  removeFromPlantationReportUpdate,
  removeFromOfflinePlantationReport,

  //Civil Report

  createCivilReport,
  updateCivilReport,


 } from '../flux/actions';
import { connect } from 'react-redux';

import { VERSION  } from  '../flux/types';

//synchro script

import { synchroDataToServer  } from  '../helpers/synchroScript';

// CSS
import './../css/style.css';




class CollapseMenu extends Component {

  constructor() {
    super();
    this.state = {
      memoryUsed:0,
      memoryAvaliable:0,
    }
  }

  componentDidMount(){
    this.getMemoryUsed = this.getMemoryUsed.bind(this);
    this.getMemoryAvaliable = this.getMemoryAvaliable.bind(this);

    this.getMemoryUsed();
    this.getMemoryAvaliable();
  }

  async getMemoryUsed(){
    const {usage, quota} = await navigator.storage.estimate();
    //console.log(usage,quota)
    const percentUsed = Math.round(usage / quota * 100);
    //console.log("percentedUsed",percentUsed);
    this.setState({
      memoryUsed:percentUsed
    });
  }

  async getMemoryAvaliable(){
    console.log("get memory avaliable");
    const {usage, quota} = await navigator.storage.estimate();   
    const usageInMib = Math.round(usage / (1024 * 1024));
    const quotaInMib = Math.round(quota / (1024 * 1024));
    this.setState({
      memoryAvaliable:(quotaInMib - usageInMib)
    });
   
  }

  render() {
      
      return (
      <Page>
        <div style = {{ backgroundColor:" white", height: '100%' }}>
          <List>
            <ListItem className={'collapse-menu-list'} tappable onClick={()=>{this.props.setProjectPhase(1); this.props.goToMain()}}>
              <div style={{ width: '14px' }}><Icon icon="fa-home" className="fontAwesome" size={12} style={{color:"#193146"}}></Icon></div> <span style={{marginLeft:"15px"}}>Inicio</span>
            </ListItem>
            <ListItem tappable onClick={()=>{this.props.setProjectPhase(1); this.props.goToProjects()}}>
              <div style={{ width: '14px' }}><Icon icon="fa-check" className="fontAwesome" size={12} style={{color:"#193146"}}></Icon></div> <span style={{marginLeft:"15px"}}>Inventario</span>
            </ListItem>
            <ListItem   tappable onClick={()=>{this.props.setProjectPhase(2); this.props.goToProjects()}}>
              <div style={{ width: '14px' }}><Icon icon="fa-tree" className="fontAwesome" size={12} style={{color:"#193146"}}></Icon></div><span style={{marginLeft:"15px"}}>Aprovechamiento</span>
            </ListItem>
            <ListItem   tappable onClick={()=>{this.props.setProjectPhase(3); this.props.goToProjects()}}>
              <div style={{ width: '14px' }}><Icon icon="fa-chart-line" className="fontAwesome" size={12} style={{color:"#193146"}}></Icon></div> <span style={{marginLeft:"15px"}}>Compensación</span>
            </ListItem>
            <ListItem   tappable onClick={this.props.goToProjects}>
              <div style={{ width: '14px' }}><Icon icon="fa-leaf" className="fontAwesome" size={12} style={{color:"#193146"}}></Icon></div> <span style={{marginLeft:"15px"}}>Vivero</span>
            </ListItem>         
            <ListItem   tappable onClick={()=>{
              let self = this;
              Ons.notification.confirm({title:"",message:'!Estas seguro, esto borrar los datos de memoria!'}).then(function(res) {
                res ? (()=>{
                  localStorage.removeItem('state');
                  self.props.LogOut();
                })() : false;
                //ons.notification.alert('Hello ' + name);
              });

            }}>
              <div style={{ width: '14px' }}>
                <Icon icon="fa-key" className="fontAwesome" size={12} style={{color:"#193146"}}></Icon>
              </div>
              <span style={{marginLeft:"15px"}}>Finalizar sesión</span>
            </ListItem>
            <ListItem  tappable onClick={()=>{
                this.getMemoryUsed();
                this.getMemoryAvaliable();
              }}>
              Procentaje utilizado:<span>{ this.state.memoryUsed + "%" }</span>
              
              Memoria Disponible:<span>{ this.state.memoryAvaliable +"Mib" }</span>
            </ListItem>           
          </List>
        </div>
        <BottomToolbar modifier="material" style={{backgroundColor:"#2a6317"}}>
          <span className={'collapse-menu-footer'} style={{fontWeight:"bold",fontStyle:"italic"}}> ver. { VERSION } </span>

          <span className={'collapse-menu-footer'} style={{fontWeight:"bold",fontStyle:"italic"}}>Plantar <span className={'collapse-menu-footer-futuro'} style={{fontWeight:"bold",fontStyle:"italic"}}>Futuro</span></span>
        </BottomToolbar>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    navigation: state.navigation,
    memory: state.memory
  };
}

export default  connect(mapStateToProps, { goToProjects, LogOut, setProjectPhase,
   goToMain,
   updateFunctionalUnit,
   createFunctionalUnit,
   removeFromFunctionalUnitServerUpdate,
   removeFromOfflineFunctionalUnit,
   createForestUnitPhase1,
   createForestUnitPhase2,
   createForestUnitPhase3,
   updateForestUnitPhase1,
   updateForestUnitPhase2,
   updateForestUnitPhase3,
   removeFromForestUnitP1ServerUpdate,
   removeFromOfflineForestUnitP1,
   removeFromForestUnitP2ServerUpdate,
   removeFromOfflineForestUnitP2,
   removeFromForestUnitP3ServerUpdate,
   removeFromOfflineForestUnitP3,
   updateOfflineForestUnitP1,
   updateOfflineForestUnitP2,
   updateOfflineForestUnitP3,
   notFetching,

   createTunnelDeformation,
   updateTunnelDeformation,
   removeFromTunnelDeformationServerUpdate,
   removeFromOfflineTunnelDeformation,

   createHallsideMovement,
   updateHallsideMovement,
   removeFromHillSideMovServerUpdate,
   removeFromOfflineHillSideMov,


   createRainfall,
   updateRainfall,
   removeFromRainFallServerUpdate,
   removeFromOfflineRainFall,


   createHillsideCollapse,
   updateHillsideCollapse,
   removeFromHillSideCollServerUpdate,
   removeFromOfflineHillSideColl,

   createRiverCollapse,
   updateRiverCollapse,
   removeFromRiverCollServerUpdate,
   removeFromOfflineRiverColl,

   createReport,
   updateReport,

   removeFromPlantationReportUpdate,
   removeFromOfflinePlantationReport,

   createCivilReport,
   updateCivilReport

 })(CollapseMenu);

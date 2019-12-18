import React, { Component } from 'react';

//  Sources
import "../../css/style.css";

//  Onsen UI
import {  Col, Row, Card, Button, List, ListItem} from 'react-onsenui';
import Ons from 'onsenui';

//  Components
import NotFound from "../../components/NotFound";

//container
import AppPage from '../../containers/AppPage';

//  Flux
import {
  //  Navigation
  goToPlantationReport,

  //  AppActions
  setPlantationReportType,
  setPlantationReport,

  // API
  getDefaultActivitiesByType,
} from '../../flux/actions';
import { connect } from 'react-redux';



class SelectPlantationReportType extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { plantationProject  } = this.props.appState;

    console.log( plantationProject );

    return (
      <AppPage title={ [ <strong> { "REPORTE PLANTACION" } </strong> ] } backButton={true}>
        <div className={ 'first-gap-list-element' }></div>
        <div className={ 'flex-center' }>
          <div className={ 'list-margin' }>
            <List>
              <ListItem
                tappable={true}
                onClick={ () => {
                  //this.props.getDefaultActivitiesByType(1);
                  this.props.setPlantationReportType(1);
                  this.props.setPlantationReport(null);
                  this.props.goToPlantationReport();
                }}
              >
                <div className={'left'}>
                  <span className={'list-counter'}> 1 </span>
                </div>
                <div className={'center white-space-control'}>
                  <span className={'project-list-title-font project-list-project-name'}> Establecimiento </span>
                </div>
                <div className={'right'}>
                  <div className={'button-container'}>
                    <div className={'tree-dots-button'}><span>...</span></div>
                  </div>
                </div>
              </ListItem>
            </List>
          </div>
        </div>
        <div className={ 'gap-list-element' }></div>
        <div className={ 'flex-center' }>
          <div className={ 'list-margin' }>
            <List>
              <ListItem
                tappable={true}
                onClick={ () => {
                  //this.props.getDefaultActivitiesByType(2);
                  this.props.setPlantationReportType(2);
                  this.props.setPlantationReport(null);
                  this.props.goToPlantationReport();
                }}
              >
                <div className={'left'}>
                  <span className={'list-counter'}> 2 </span>
                </div>
                <div className={'center white-space-control'}>
                  <span className={'project-list-title-font project-list-project-name'}> Mantenimiento </span>
                </div>
                <div className={'right'}>
                  <div className={'button-container'}>
                    <div className={'tree-dots-button'}><span>...</span></div>
                  </div>
                </div>
              </ListItem>
            </List>
          </div>
        </div>
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
};

export default  connect(mapStateToProps, {
  //  Navigation
  goToPlantationReport,

  //  AppActions
  setPlantationReportType,
  setPlantationReport,

  //  API
  getDefaultActivitiesByType,
})(SelectPlantationReportType);

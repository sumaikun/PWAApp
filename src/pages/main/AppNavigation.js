import React, { Component } from 'react';


import { VERSION  } from  '../../flux/types';

//Onsen ui

import {  Navigator, Splitter, SplitterSide, SplitterContent } from 'react-onsenui';

// Pages

import ProjectManagement from "./ProjectManagement";

//components
import CollapseMenu from "../../components/CollapseMenu";


// REDUX
import { connect } from 'react-redux';
import { insertNavigator , closeMenu  } from '../../flux/actions';
import { setProjects , setUser, setFunctionalUnits, setForestalUnits, fetching, notFetching } from '../../flux/actions';

//indexdb
import { generateDb , getAllFromStore , deleteDb } from '../../helpers/indexDbModels';


class AppNavigation extends Component {

  constructor() {
    super();
    this.renderPage = this.renderPage.bind(this);

  }

  componentDidMount(){

    //reload if new VERSION

    let version = localStorage.getItem('version');

    if( version === null ||  version != VERSION )
    {
      localStorage.clear();
      localStorage.setItem('version',VERSION);
    }

    this.props.insertNavigator(this.navigator);

    //delete db if needed

    //deleteDb();

    //Generate user db

    generateDb();



    let generateData = async () =>
    {
      this.props.fetching(); 
      const users = await getAllFromStore("users");
      if(users.length > 0)
      {
        this.props.setUser(users[0]);
        const projects = await getAllFromStore("projects");
        this.props.setProjects(projects);
        this.props.notFetching();
        //const functionalUnits = await getAllFromStore("functionalUnits");
        //console.log(functionalUnits);
        //this.props.setFunctionalUnits(functionalUnits);
        //const forestallUnits = await getAllFromStore("forestalUnits");
        //console.log(forestallUnits);
        //this.props.setForestalUnits(forestallUnits);              
      }
      else{
        this.props.notFetching();
      }
    }

    generateData();

  }

  renderPage(route, navigator) {
    route.props = route.props || {};
    route.props.navigator = navigator;
    route.props.key = route.key;

    ////console.log(React.createElement(route.component, route.props));
    return React.createElement(route.component, route.props);
  }





  render() {

    let initialRoute = this.props.navigation.initialRoute;

    //let storedData = JSON.parse(localStorage.getItem('state'));

    let storedData = null;

    storedData = localStorage.getItem('state');
    

    if(storedData)
    {
      
      //if(storedData.navigationIndex && storedData.navigationIndex != "GO_TO_LOGIN" )
      //{

        initialRoute = { component: ProjectManagement , key: "GO_TO_MANAGEMENT"  }
      //}
    }



    this.props.appState.isOpen ? this.props.closeMenu() : null ;

    return (
      <Splitter>
        <SplitterSide side='left' width={220} collapse={true} swipeable={false} isOpen={this.props.appState.isOpen} >
          <CollapseMenu/>
        </SplitterSide>
          <SplitterContent>
            <Navigator
              renderPage={this.renderPage}
              initialRoute={initialRoute}
              ref={(navigator) => { this.navigator = navigator; }}
            />
        </SplitterContent>
      </Splitter>
    );
  }

}

const mapStateToProps = state => {
  return {
    navigation: state.navigation,
    appState: state.appState
  };
}

export default  connect(mapStateToProps, { insertNavigator , closeMenu,
  setProjects , setUser, setFunctionalUnits, setForestalUnits, fetching, notFetching })(AppNavigation);

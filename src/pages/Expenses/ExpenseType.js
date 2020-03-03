import React, { Component } from 'react';
//sources

import chart from "../../img/chart.png";



//Onsen Ui

import Ons from 'onsenui';

//Libraries

//components
import CardButton from "../../components/CardButton";
import Loading from "../../components/Loading";

//container
import AppPage from '../../containers/AppPage';

//flux
import {
  getRequiredExpenses,
  getBoxExpenses,
  setExpenseType,
  goToExpensesList 
} from '../../flux/actions';

import { connect } from 'react-redux';

//css
import "../../css/style.css";

class ExpenseType extends Component {

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

          <div onClick={()=>{
            this.props.getRequiredExpenses()
            this.props.setExpenseType(1)
            this.props.goToExpensesList()
          }}>
            <CardButton
              imgIcon = {chart}
              title="Gastos"
              subtitle="Total reportes"
              infoContainer="Ultima actualizacion 13/05/2019 9:25 am"
              />
          </div>
          <div style={{height:"10px"}} ></div>

          <div onClick={()=>{
            this.props.getBoxExpenses()
            this.props.setExpenseType(2)
            this.props.goToExpensesList()
          }}>
            <CardButton
              imgIcon = {chart}
              title="Caja menor"
              subtitle="Total reportes"
              infoContainer="Ultima actualizacion 13/05/2019 9:25 am"
              />
          </div>
          <div style={{height:"10px"}} ></div>     


      </div>
    );
  }

  render() {
  


    const { isFetching } = this.props.appState;

    return (
      <AppPage  title={["CONTROL DE ", <strong>RECURSOS</strong>]}>

          {  isFetching ?
            <div style={{backgroundColor:"white",height:"100%"}}>
              <Loading/>
            </div>
            :
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

export default  connect(mapStateToProps,
  { getRequiredExpenses,
    getBoxExpenses,
    setExpenseType ,
    goToExpensesList
  })(ExpenseType);

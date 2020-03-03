import React, { Component } from 'react';
//sources

import "../../css/accordion.css";
import "../../css/style.css";
import { workingRowStyles } from "../../jsStyles/Styles";

//Onsen Ui
import {  List , ListItem, Col, Row, Card, ListHeader } from 'react-onsenui';


//Libraries

//components
import NotFound from "../../components/NotFound";
import Loading from "../../components/Loading";
//container
import AppPage from '../../containers/AppPage';

//flux
import {
    goToFormBox,
    goToFormExpenses,
    setCurrentRequireExpense,
    setCurrentBoxExpense
} from '../../flux/actions';

import { connect } from 'react-redux';


const styles = workingRowStyles;

class ExpensesList extends Component {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
    this.contentPage = this.contentPage.bind(this);
    this.state = {
      searchName: '',
      searchDate: ''
    };
  }

  componentDidMount(){
      console.log("app state",this.props.appState);
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

  contentPage(data, expenseType, projects){

    let dateKey = "update_at"

    if(expenseType == 1)
    {
        dateKey = "delivery_date"
    }

    if(expenseType == 2)
    {
        dateKey = "bill_date"
    }
    

    data.sort((a,b) => {
      if (a[dateKey] > b[dateKey] ) return -1
      if (a[dateKey] < b[dateKey] ) return 1
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
                       
                        if(expenseType == 1)
                        {
                            this.props.setCurrentRequireExpense( null )
                            this.props.goToFormExpenses()
                        }

                        if(expenseType == 2)
                        {
                            this.props.setCurrentBoxExpense( null )
                            this.props.goToFormBox()
                        }
                       
                     }}
                >
                  <span className="fas fa-plus fontAwesome plus-icon" ></span>
                </div>
              </div>
            </div>
          </div>

        {
          data.length > 0  ?
          <div className={'list-container-and-header'} style={{display:"flex", justifyContent:"center"}} >
            <div style={{width: '95%'}}>
              <List
                renderHeader={this.renderHeader}
              >
                {
                  data
                    .filter( r => r[dateKey].split(' ')[0].includes(searchDate) )
                    .map( (report, i) => {
                      return (
                        <div
                          className={'select-report'}
                          onClick={ async ()=>{ }}
                        >
                          <ListItem tappable onClick={()=>{

                                if(expenseType == 1)
                                {
                                    this.props.setCurrentRequireExpense(report)
                                    this.props.goToFormExpenses()
                                }

                                if(expenseType == 2)
                                {
                                    this.props.setCurrentBoxExpense(report)
                                    this.props.goToFormBox()
                                }
                            
                          }}>
                            <div className={'left'}>
                              <span className={'list-counter'}>{ i+1 }</span>
                            </div>
                            <div className={'center'}>
                              <span className={'project-list-title-font project-list-project-name margin-between-right'}>{ report[dateKey] }</span>
                        <span className={'project-list-project-info margin-between-left'}>
                            {  projects.filter( data => data.id == report.project_id )[0].name }
                            </span>
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
    let {  isFetching ,expenseType, requireExpenses, boxExpenses, projects } = this.props.appState;

    let data = [];    

    if(expenseType == 1)
    {
        data = requireExpenses
    }

    if(expenseType == 2)
    {
        data = boxExpenses
    }

    return (
      <AppPage title={["REPORTES"]} backButton={true} >
        {
          isFetching ?
            <div style={{backgroundColor:"white",height:"100%"}}>
              <Loading/>
            </div>
            :
            this.contentPage( data , expenseType , projects )
        }
      </AppPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    navigation: state.navigation,
    appState: state.appState,  
  };
}

export default  connect(mapStateToProps, {
    goToFormBox,
    goToFormExpenses,
    setCurrentRequireExpense,
    setCurrentBoxExpense
})(ExpensesList);

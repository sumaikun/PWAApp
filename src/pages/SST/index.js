import React, { Component } from 'react';
import moment from 'moment'


//sources
import yellowArrow from "../../img/yellowArrow.png";
import "../../css/accordion.css";


//Onsen Ui
import {  Col, Row, Card, Button, ListHeader, ListItem} from 'react-onsenui';
import Ons from 'onsenui';

import { workingRowStyles} from "../../jsStyles/Styles";
//components
import ListAccordion from "../../components/ListAccordion";
import CardOptionButton from "../../components/CardOptionButton";

//container
import AppPage from '../../containers/AppPage';

//flux
import { goToSSTForm, getSST, getSSTForm} from '../../flux/actions';
import { connect } from 'react-redux';
import Styles from './styles'


class ListSSTByProject extends Component {
  componentDidMount(){
    this.props.getList(this.props.project_id)
  }
  render() {
    let {listSST}= this.props
    if (!listSST) return null;
    return (
      <AppPage title={[<strong>{"Lista de informes SST"}</strong>]} backButton={true} backButtonCallBack={()=>{  }}>
        <div style={Styles.formContainer}>
          <div className="login-form" >
              <div className="group" style={Styles.searchInputContainer}>
                  <input id="search" /*value={searchName} name="buscador" onChange={e => this.setState({ searchName: e.target.value })} */className="input fontAwesome" placeholder="Buscar" type="text"   style={{fontFamily:'Arial', marginTop:"8px", width:"9GO_TO_MACHINERY_LIST0%", height:"10px"}} /><br />
                <div style={Styles.searchButton} onClick={()=>{this.onClickSSTCreate();}}>
                  <span className="fas fa-plus fontAwesome" ></span>
                </div>
              </div>
          </div>
        </div>
        <div  style={{display:"flex",justifyContent:"center"}} >
          <div style={{width:"95%"}} >
          <ListHeader style={{fontSize: 15, padding:"0px"}} className="testClass">
            <Row>
              <Col width="100%" style={workingRowStyles.tableHeaders}>
                  <span>Fecha</span>
              </Col>
            </Row>
          </ListHeader>
          {
            listSST.map((memo, i) => {
                return  (
                  <div  style={{marginBottom: "1em"}} key={i} onClick={()=>{this.onClickSSTForm(memo)}}>
                    <ListItem counter={i + 1} projectInfo={""}>

                    <Col width="100%">
                      <div className="center" style={Styles.mainListItem}>
                        <span style={Styles.counter}>{i+1}</span>
                        <span style={Styles.projectName}>{moment(memo.report_date).format("DD/MM/YYYY")}</span>
                        <div>
                          <span style={Styles.projectInfo}>{memo.state}</span>
                        </div>
                        <div style={Styles.buttonContainer}>
                          <div style={Styles.ProjectButton}>
                            <i className="fas fa-arrow-right fontAwesome"></i>
                          </div>
                        </div>
                      </div>
                    </Col>
                    </ListItem>
                  </div>
                );
            })
          }
          </div>
        </div>
      </AppPage>
    );
  }
  onClickSSTForm(memo) {
    this.props.getForm(memo)
    this.props.goToSSTForm()
  }
  onClickSSTCreate() {
    this.props.getForm({})
    this.props.goToSSTForm()
  }
}

const mapStateToProps = state => {

  return {
    navigation: state.navigation,
    listSST: state.appState.listSST,
    project_id: state.appState.project_data.id
  };
}
//report_date
const mapDispatchToProps = (dispatch) => {
  return {
    getList: (id) => {dispatch(getSST(id))},
    getForm: (sst) => {dispatch(getSSTForm(sst))},
    goToSSTForm: ()=> {dispatch(goToSSTForm())}
  }
}

export default  connect(mapStateToProps,mapDispatchToProps )(ListSSTByProject);

import React, { Component } from 'react';
//sources
import "../../css/accordion.css";
import "../../css/style.css";
import { workingRowStyles , grayIndicator, redIndicator } from "../../jsStyles/Styles";



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
import { goToInventoryForm,
   setForestalUnit,
  goToProcessForm,
  goToCompensationForm,
  removeFromForestUnitP1ServerUpdate,
  removeFromOfflineForestUnitP1,
  removeFromForestUnitP2ServerUpdate,
  removeFromOfflineForestUnitP2,
  removeFromForestUnitP3ServerUpdate,
  removeFromOfflineForestUnitP3
} from '../../flux/actions';

import { connect } from 'react-redux';

const styles = workingRowStyles;

class ForestalUnitList extends Component {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
    this.contentPage = this.contentPage.bind(this);
    this.state = {
      searchName: '',
      searchDate: ''
    }
  }

  renderHeader(){
    return(
      <ListHeader style={{position: "fixed", zIndex:1,width:"95%", fontSize: 15, padding:"0px",marginTop:"-40px"}} className="testClass">
        <Row>
          <Col width="42%" style={{
            backgroundColor: "rgba(0, 104, 40, 0.8)",
            textAlign: "center",
            color: "white",
            fontWeight: "300",
            display: "fixed",
            whiteSpace: 'normal',
            fontFamily: 'Raleway',
          }}>
            {/*<Card style={styles.CardHeaders}>*/}
              <span>Individuo Forestal</span>
            {/*</Card>*/}
          </Col>
          <Col width="58%" style={{
            backgroundColor: "rgba(97, 175, 46, 0.88)",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            color: "white",
            fontWeight: "300",
            fontFamily: "Raleway"
          }}>
            {/*<Card style={styles.CardHeaders}>*/}
              <span>Estado</span>
            {/*</Card>*/}
          </Col>
        </Row>
      </ListHeader>
    );
  }

  contentPage(currentPhase,forestalUnits){

    //////console.log("Unidades forestales");
    //////console.log(forestalUnits);


    forestalUnits.sort((a,b) => {
      if (a.updated_at > b.updated_at){
        //console.log(a);
        //console.log(b);
        return -1;
      }
      if (a.updated_at < b.updated_at){
        //console.log(a.updated_at);
        //console.log(b.updated_at);
        //console.log("b bigger than a ");
        return 1;
      }
      return 0;
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
            <div className={'plus-icon-container'} style={styles.searchButton} onClick={()=>{
                ////console.log(currentPhase);
                this.props.setForestalUnit(null);
                switch(currentPhase)
                {
                  case 1:
                    this.props.goToInventoryForm();
                    break;
                  case 2:
                    this.props.goToProcessForm();
                    break;
                  case 3:
                    this.props.goToCompensationForm();
                    break;
                  default:
                      break;
                }

              }}>
              <span className="fas fa-plus fontAwesome plus-icon" ></span>
            </div>
          </div>
        </div>
      </div>

        { forestalUnits.length > 0  ?
        <div className={'list-container-and-header'} style={{display:"flex",justifyContent:"center"}} >
          <div style={{width: '95%'}}>
            <List renderHeader={this.renderHeader}>
              {forestalUnits.filter(f => {
                return f.updated_at? f.updated_at.split(' ')[0].includes(searchDate): null;
              }).filter(e => e.code.includes(searchName)).map((unit, i) => {

              return (
              <div>
                <ListItem tappable onClick={()=>{
                    this.props.setForestalUnit(unit);
                    switch(currentPhase)
                    {
                      case 1:
                        this.props.goToInventoryForm();
                        break;
                      case 2:
                        this.props.goToProcessForm();
                        break;
                      case 3:
                        this.props.goToCompensationForm();
                        break;
                      default:
                          break;
                    }

                  }}>
                  <div className="center" style={styles.mainListItem}>
                    <div>
                      <span style={styles.counter}>{i+1}</span>                      
                    </div>
                    <div>
                      <span style={styles.projectName}>{unit.code}</span>
                    </div>
                    <div>
                      <span style={styles.projectInfo}>{unit.state}</span>
                      <div style={  unit.updated_at === unit.created_at ? grayIndicator : redIndicator }></div>
                      <br/>
                      <span style={styles.projectInfo}>{unit.updated_at}</span>
                    </div>
                    <div style={styles.buttonContainer}>
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
                </List>
            </div>
        </div> : <div className={'not-found'}><NotFound/></div>

        }
      </div>
    );
  }

  render() {


      let {  isFetching , currentPhase, forestalUnits, currentFunctionalUnit } = this.props.appState;

      console.log(this.props.appState);

      forestalUnits = forestalUnits[this.props.appState.currentFunctionalUnit.id] ? forestalUnits[this.props.appState.currentFunctionalUnit.id] : [];
 
      //forestalUnits = forestalUnits.reverse();

    return (
      <AppPage  title={["Unidad funcional ", <strong>{currentFunctionalUnit.code}</strong>]}
       backButton={true} >

          {  isFetching ?
            <div style={{backgroundColor:"white",height:"100%"}}>
              <Loading/>
            </div> :

             this.contentPage(currentPhase,forestalUnits)

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

export default  connect(mapStateToProps, { goToInventoryForm,
   setForestalUnit,
   goToProcessForm,
   goToCompensationForm,
   removeFromOfflineForestUnitP1,
   removeFromForestUnitP1ServerUpdate,
   removeFromForestUnitP2ServerUpdate,
   removeFromOfflineForestUnitP2,
   removeFromForestUnitP3ServerUpdate,
   removeFromOfflineForestUnitP3
})(ForestalUnitList);

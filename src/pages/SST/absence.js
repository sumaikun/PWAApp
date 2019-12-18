import React, { Component } from 'react';
//sources
import "../../css/accordion.css";
import { workingRowStyles, modalStyles } from "../../jsStyles/Styles";


//Onsen Ui
import {  List , ListItem, Col, Row, Checkbox, ListHeader, Radio } from 'react-onsenui';
import Ons from 'onsenui';

//Libraries

//components
import NotFound from "../../components/NotFound";
import Loading from "../../components/Loading";
import SearchInput from "../../components/SearchInput";
import Modal from "../../components/Modal";

//container
import AppPage from '../../containers/AppPage';

//flux
import { getListUsers, getSSTAssistants, getSSTVisitors, goToAssistantForm } from '../../flux/actions';
import { connect } from 'react-redux';

//const styles = workingRowStyles;

const styles =  {
  ...workingRowStyles,
  ...modalStyles
};

styles.modalOverride = {

  header:{backgroundColor:"white"},
  body:{backgroundColor:"white"}

}

styles.modalCell = {
  backgroundColor: "#E5E5E5",
  padding: "5%",
  textAlign: "center",
  color: "#25315a",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  borderStyle: "solid",
  borderWidth: "5px",
  borderColor: "white"
}

styles.modalColumn = {
  borderStyle: "solid",
  borderWidth: "0px -1px",
  borderColor: "white"
}


workingRowStyles.tableHeaders = {
    backgroundColor: "rgb(0, 104, 40)",
    textAlign: "center",
    color: "white",
    fontWeight: "bold"
}

workingRowStyles.tableHeadersBorders = {
  borderStyle: "solid",
  borderWidth: "0px 1px"
}

workingRowStyles.radioCircle = {
  borderStyle: "solid",
  borderWidth: "5px",
  borderRadius: "50%"
}

workingRowStyles.listText = {
  color: "#205286",
  fontWeight: "bold"
}

class Adsence extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {  isFetching } = this.props.appState
    return (
      <Modal title="" ModalStyles={{...styles.modalStyles, ...styles.modalOverride  }}>
          <Row style={ styles.modalCell }>
            <div>MOTIVO AUSENCIA</div>
          </Row>

          <Row>
            <Col style={ styles.modalCell }>
              <span>Incapacidad</span>
            </Col>
            <Col width="25%" style={{ ...styles.modalCell , ...styles.modalColumn }} >
              <Radio name="excuse"  />
            </Col>
          </Row>

          <Row>
            <Col style={ styles.modalCell }>
              <span>Permiso</span>
            </Col>
            <Col width="25%" style={{ ...styles.modalCell , ...styles.modalColumn }} >
              <Radio name="excuse"  />
            </Col>
          </Row>

          <Row>
            <Col style={ styles.modalCell }>
              <span>Injustificado</span>
            </Col>
            <Col  width="25%" style={{ ...styles.modalCell , ...styles.modalColumn }} >
              <Radio name="excuse"  />
            </Col>
          </Row>
      </Modal>
    );
  }
}
const mapStateToProps = state => {

  return {
    navigation: state.navigation,
    appState: state.appState,
    project_id: state.appState.sstData.project_id
  };
}
//report_date
const mapDispatchToProps = (dispatch) => {
  return {
    getList: (id) => {dispatch(getSSTVisitors(id))},
    getForm: (visitor) => {dispatch(getSSTVisitors(visitor))},
    goToAssistantForm: ()=> {dispatch(goToAssistantForm())}
  }
}

export default  connect(mapStateToProps,mapDispatchToProps )(Adsence);

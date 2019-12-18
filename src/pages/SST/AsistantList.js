
import React, { Component } from 'react';
//sources
import "../../css/accordion.css";
import { workingRowStyles, modalStyles } from "../../jsStyles/Styles";


//Onsen Ui
import {  List , ListItem, Col, Row, Checkbox, ListHeader, Radio, Input, Modal, Button} from 'react-onsenui';
import Ons from 'onsenui';

//Libraries

//components
import Loading from "../../components/Loading";
//import Modal from "../../components/Modal";
//import ModalAssitant from "../../components/modalAssitant";

//container
import AppPage from '../../containers/AppPage';

//flux
import { getListUsers, getSSTAssistants, getSSTVisitors, goToAssistantForm, getSSTVisitor, getSSTVisitorAssistants } from '../../flux/actions';
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

class AsistantList extends Component {
  constructor(props) {
    super(props);
    this.state={
      modalAssitant:false,
      modalAbsence:false,
      formData:[]
    }
    this.renderHeader = this.renderHeader.bind(this);
  }
  componentDidMount(){
    this.props.getList(this.props.project_id);
    this.props.getListUsers(this.props.project_id)
  }
  handleChangeInput(event){

    if(event.target.name && event.target.value.length > -1) {
       this.setState({
           formData: {
               ...this.state.b,
               [event.target.name] : event.target.value
           }
         }
       );
    }
    if (event.target.value[0] == "=") event.target.value = event.target.value.substr(1)
  }
  onOpenAssiten(){
    this.setState({modalAssitant: true})
  }
  opOpenAbsence(){
    this.setState({modalAbsence: true})
  }

  onCloseAssiten(){
    this.setState({modalAssitant: false})
  }
  opCloseAbsence(){
    this.setState({modalAbsence: false})
  }

  onCreateAssiten(){
    console.log(this.state.formData);
    this.setState({modalAssitant: true})
  }
  opCreateAbsence(){
    this.setState({modalAbsence: true})
  }

  onClickVisitorForm(memo) {
    console.log(memo);
    this.props.getSSTVisitor(memo, 'update')
    this.props.goToAssistantForm()
  }

  onClickSSTCreate() {
    //this.props.getSSTVisitor({})
    //this.props.goToAssistantForm()
  }
  renderHeader(){
    return(
      <ListHeader style={{fontSize: 15, padding:"0px"}} className="testClass">
        <Row>
          <Col width="50%" style={workingRowStyles.tableHeaders}>
              <span>Nombre</span>
          </Col>
          <Col width="25%" style={{ ...workingRowStyles.tableHeaders,
            ...workingRowStyles.tableHeadersBorders}}>
              <span>Si</span>
          </Col>
          <Col width="25%" style={{...workingRowStyles.tableHeaders,
            ...workingRowStyles.tableHeadersBorders}}>
              <span>No</span>
          </Col>
        </Row>
      </ListHeader>
    );
  }

  render() {
    let  {  isFetching, listSSTVisitors, listSSTAssistants, listUser } = this.props.appState,  listData = []
    if (listSSTVisitors) listData.push(...listSSTVisitors);
    //if (listSSTAssistants)  listData.push(...listSSTAssistants);
    if(listUser) listData.push(...listUser);
    return (
      <AppPage  title={["Lista de ", <strong>Asistentes</strong>]} backButton={true} >
        <div>
          <div style={styles.formContainer}>
            <div className="login-form" >
              <div className="group" style={styles.searchInputContainer}>
                  <input id="search" /*value={searchName} name="buscador" onChange={e => this.setState({ searchName: e.target.value })} */className="input fontAwesome" placeholder="Buscar" type="text"   style={{fontFamily:'Arial', marginTop:"8px", width:"9GO_TO_MACHINERY_LIST0%", height:"10px"}} /><br />
                <div style={styles.searchButton} onClick={()=>{this.onClickSSTCreate()}}>
                    <span className="fas fa-plus fontAwesome" ></span>
                </div>
              </div>
          </div>
        </div>
            <List renderHeader={this.renderHeader}>
            {
              listData.map((memo, i) => {
                  return  (
                  <div>
                    <ListItem>

                    <Col width="50%">
                      <div onClick={()=>{this.onClickVisitorForm(memo)}} className="center" style={styles.mainListItem}>
                        <span style={styles.counter}>{i+1}</span>
                        <span style={styles.projectName}>{memo.name}</span>
                        <div>
                          <span style={styles.projectInfo}>{memo.state}</span>
                        </div>
                        <div style={styles.buttonContainer}>
                          <div style={styles.ProjectButton}>
                            <i className="fas fa-arrow-right fontAwesome"></i>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col width="25%" style={{textAlign:"center"}}>
                      <Radio onChange={()=>{this.onOpenAssiten()}} id="modal-btn-Assistant" name="test" style={ workingRowStyles.radioCircle } />
                    </Col>
                    <Col width="25%" style={{textAlign:"center"}}>
                      <Radio onChange={()=> {this.opOpenAbsence()}} id="modal-btn" name="test" style={ workingRowStyles.radioCircle } />
                    </Col>
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
          <div style={{overflow:'hidden',marginTop:"130%", backgroundColor: 'orange' }}>
            <div className="group" style={{...styles.searchInputContainer, "justify-content":"left"}}>
              <div style={styles.buttonContainer}>
                <div style={styles.ProjectButton} >
                  <i className="fas fa-pencil-alt fontAwesome"></i>
                </div>
              </div>
              <div style={{ ...styles.buttonContainer, 'margin-left':'50%' }}>
                <div style={styles.ProjectButton}>
                  <i className="far trash-alt fontAwesome"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.modalAssitant()}

        {this.modalAbsence()}


      </AppPage>
    );
  }

  modalAssitant(){
    return(
      <Modal style={{padding:'0 30px 0px 30px'}} isOpen={this.state.modalAssitant} animation="fade">
        <Row style={ styles.modalCell }>
          <div>REGISTRO DE HORAS DE TRABAJO</div>
        </Row>

        <Row>
          <Col style={ styles.modalCell }>
            <span>Entrada: </span>
          </Col>
          <Col width="25%" style={{ ...styles.modalCell , ...styles.modalColumn }} >
            <Input name="checkIn"  onChange={this.handleChangeInput.bind(this)} />
          </Col>
        </Row>

        <Row>
          <Col style={ styles.modalCell }>
            <span>Salida</span>
          </Col>
          <Col  width="25%" style={{ ...styles.modalCell , ...styles.modalColumn }} >
            <Input name="checkout" onChange={this.handleChangeInput.bind(this)}  />
          </Col>
        </Row>
        <Row>
          <Col  width="50%" style={ styles.modalCell }>
            <Button onClick={()=>{this.onCreateAssiten()}} modifier="large--cta">
                REGISTRAR
            </Button>
          </Col>
          <Col  width="50%" style={{ ...styles.modalCell , ...styles.modalColumn }} >
            <Button onClick={()=>{this.onCloseAssiten()}}   modifier="large--cta">CERRAR</Button>
          </Col>
        </Row>
      </Modal>
    )
  }

  modalAbsence(){
    return(
      <Modal  style={{padding:'0 30px 0px 30px'}} isOpen={this.state.modalAbsence}>
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
        <Row>
          <Col width="50%" style={ styles.modalCell }>
            <Button modifier="large--cta">
              REGISTRAR
            </Button>
          </Col>
          <Col onClick={()=>{this.opCloseAbsence()}}  width="50%" style={{ ...styles.modalCell , ...styles.modalColumn }} >
            <Button modifier="large--cta">CERRAR</Button>
          </Col>
        </Row>

      </Modal>
    )
  }

}
const mapStateToProps = state => {

  return {
    navigation: state.navigation,
    appState: state.appState,
    project_id: state.appState.project_data.id
  };
}
//report_date
const mapDispatchToProps = (dispatch) => {
  return {
    //getList: (id) => {dispatch(getSSTAssistants(id))},
    getList: (id) => {dispatch(getSSTVisitors(id))},
    getSSTVisitorAssistants:(assistant, visitor)=>{dispatch(getSSTVisitorAssistants(assistant,visitor))},
    //getList: (id) => {dispatch(getListUsers(id))},
    //getForm: (visitor) => {dispatch(getSSTVisitors(visitor))},
    goToAssistantForm: ()=> {dispatch(goToAssistantForm())},
    getListUsers: (id)=> {dispatch(getListUsers(id))},
    getSSTVisitor: (visitor)=> {dispatch(getSSTVisitor(visitor))}

  }
}

export default  connect(mapStateToProps,mapDispatchToProps )(AsistantList);

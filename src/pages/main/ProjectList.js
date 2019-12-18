import React, { Component } from 'react';
//sources
import yellowArrow from "../../img/yellowArrow.png";
import "../../css/accordion.css";
import "../../css/Modal.css";
import "../../css/style.css";

//Onsen Ui
import {  Col, Row, Card, Button, List, ListItem} from 'react-onsenui';
import Ons from 'onsenui';
//import Ons from 'onsenui';

//Libraries

//components
import ListAccordion from "../../components/ListAccordion";
import CardOptionButton from "../../components/CardOptionButton";
import Modal from "../../components/Modal";
import NotFound from "../../components/NotFound";

//container
import AppPage from '../../containers/AppPage';

//flux
import { goToForestalUnits,
  createFunctionalUnit,
  getFunctionalUnits,
  updateFunctionalUnit,
  getForestalUnits,
  setFunctionalUnit,
  getProjectByUser,
  resetFunctionalUnits,
  selectProject,
  goToRiskManagement,
  removeFromFunctionalUnitServerUpdate,
  removeFromOfflineFunctionalUnit,
  updateOfflineFunctionalUnit } from '../../flux/actions';
import { connect } from 'react-redux';

//helpers
import { formValidation } from '../../helpers/formValidation';


const styles = {
  accordionIcons:{
    "background-color": "#006828",
    "width": "25px",
    "height": "25px",
    "border-radius": "50%",
    display: "flex",
    "justify-content": "center",
    "align-items": "center"
  },
  modalStyles:
  {
    view:{display:"none"},
    content:{width:"80%"},
    header:{backgroundColor:"#006828"},
    closeButton:{marginLeft:"15px",fontSize:"10px"},
    title:{fontSize:"18px"},
    body:{backgroundColor:"#008931"},
    footer:{fontSize:"8px",display:"none"}
  }
}

class ProjectList extends Component {

  constructor(props) {
    super(props);
    this.registerUnit = this.registerUnit.bind(this);
    this.editFunctionalUnit = this.editFunctionalUnit.bind(this);
    this.renderFunctionalList = this.renderFunctionalList.bind(this);
    this.validateFuncionalUnit = this.validateFuncionalUnit.bind(this);
    this.state = {
      editMode:false,
      idToModify:null,
      functionalList:{

      }
    }
    //this.props.resetFunctionalUnits();

    //La propiedad functionalList esta hecha para ocultar o mostrar la lista

  }

  componenDidMount(){

  }

  validateFuncionalUnit(project_id){
    //Crear unidad funcional
    let found = false;

    this.props.memory.offLineFunctionalUnits.forEach(offline => {
      if( offline.project_id === project_id &&  offline.code.toLowerCase()  === this.Code.value.toLowerCase() )
      {
        found = true;
      }
    })

    if(found == true){
        Ons.notification.alert({title:"¡Espera!",message:"Ya esta esta unidad funcional guardada en memoria"});
        return found;
    }

    //Verificar si el dato si existe en datos del servidor

    let found2 = false;

    this.props.appState.functionalUnits.forEach(data => {
      if( data.project_id === project_id &&  data.code.toLowerCase()  === this.Code.value.toLowerCase() )
      {
        found2 = true;
      }
    })

    if(found2 == true){
        Ons.notification.alert({title:"¡Espera!",message:"Ya esta esta unidad funcional en el servidor"});
        return found2;
    }


    return false;

  }

  registerUnit(e){

    e.preventDefault();

    console.log(this.validateFuncionalUnit(this.project_id));

    if(!this.validateFuncionalUnit(this.project_id) == false)
    {
      console.log("is false");
      return;
    }

    if(!this.props.appState.isFetching)
    {
        let validation = formValidation([
          {
            ref:this.Code,
            name:"codigo"
          }
        ]);

        let componentSuccess = (response) => {

          let reloadProjectId = this.state.projectIdToModify ? this.state.projectIdToModify : this.project_id;
          // //console.log(reloadProjectId);
          //return;
          this.Code.value = "";
          let modal = document.querySelector('#my-modal');
          modal.style.display = 'none';

          this.props.getFunctionalUnits(reloadProjectId);

        }

        if(this.state.editMode == true)
        {

          //console.log(this.state);
          //return ;

          /*if(this.validateFuncionalUnit(this.state.projectIdToModify) == false )
          {
            console.log("false on edit");
            return;
          }*/


          if(!this.state.isOfflineFunit)
          {
              validation ?  this.props.updateFunctionalUnit(this.state.idToModify,{
                code: this.Code.value,
                type: 1,
                project_id: this.state.projectIdToModify
              },componentSuccess) : false;

          }else{
            validation ?  this.props.updateOfflineFunctionalUnit({
              code: this.Code.value,
              type: 1,
              project_id: this.state.projectIdToModify,
              ToSynchro:true,
              id:this.state.idToModify
            }) : false;
            componentSuccess(null);
          }

          this.Code.value = "";
          this.setState({
            editMode:false
          });

          return;
        }


        console.log("here");

        validation ?  this.props.createFunctionalUnit({
          code: this.Code.value,
          type: 1,
          project_id: this.project_id
        },componentSuccess) : false;


    }else{
      Ons.notification.alert({title:"¡Espera!",message:"Estamos realizando otro proceso en el momento"});
    }

  }

  editFunctionalUnit(unit){

    let self = this;

    Ons
    .notification.confirm({ title:'',message: '¿Estas seguro de editar?' })
    .then(function(res) {
        if(res){

          self.Code.value = unit.code;

          let modal = document.querySelector('#my-modal');
          modal.style.display = 'block';
          let button = document.querySelector("#functionalSubmitButton");
          button.textContent = "Editar";

          self.setState({
            editMode:true,
            idToModify: unit.id,
            projectIdToModify: unit.project_id,
            isOfflineFunit: unit.ToSynchro
          });

        }

    });

  }

  renderFunctionalList(functionalUnits,project){   

    ////console.log(serverMemoryFunctionals);

    return(
      functionalUnits.filter(unit => {
            return unit.project_id === project.id
          }).map((funit, i) => {


          return(
            <List>
              <ListItem  tappable style={{
                color: "rgb(53, 40, 101)",
                fontSize: "12px",
                fontWeight: "bold"}}
              >
                <div className="center" style={{display: "flex",
                  justifyContent: "space-between"
                }}>

                  <div>

                    <span style={{color:"gray"}} >
                      {i+1}
                    </span>                    

                  </div>

                    <span onClick={()=>{

                      if(this.props.appState.isFetching)
                      {
                        return Ons.notification.alert({title:"Espera",message:"Estamos cargando la información"});
                      }
                      console.log("nav");

                      this.props.setFunctionalUnit(funit);

                      //persist if this data change
                      this.props.getForestalUnits(funit.id,null,null,false,()=>{                       
                        console.log("Save if changed");
                      });

                      this.props.goToForestalUnits();

                    }} >{ project.phase != "3" ? <div> {funit.code}</div> : <div> Indiviuo forestal {i+1} </div>
                  }</span>
                  <div>
                  { project.phase != "3" ?
                    <button onClick={()=>{this.editFunctionalUnit(funit)}} style={{backgroundColor:"green",width:"20px",height:"20px",borderRadius:"50%",color:"white",display:"flex",justifyContent:"center",alignItems:"center"}}>
                      <i className="fas fa-edit fontAwesome"></i>
                    </button>
                    :<div />
                  }
                  </div>

                </div>

              </ListItem>
            </List>
        );
      })
    );
  }

  render() {

    //console.log(this.props.appState);

    const { projects , currentPhase, functionalUnits  } = this.props.appState

    const currentPhaseProjects = projects.filter( project => {
      return parseInt(project.phase) === currentPhase
    });

    let titlePage = null;

    switch(currentPhase)
    {
      case 1:
        titlePage = "INVENTARIOS"
        break;
      case 2:
        titlePage = "APROVECHAMIENTO"
        break;
      case 3:
        titlePage = "GEOREFERENCIACIÓN"
        break;
      case 4:
        titlePage = "RIESGO"
        break;
    }
    return (
      <AppPage  title={[<strong>{titlePage}</strong>]} backButton={true} backButtonCallBack={()=>{

        if(!this.props.appState.isFetching)
        {
            this.props.getProjectByUser(this.props.appState.user);
        }

       }}>
        { currentPhaseProjects.length > 0   ?
          currentPhaseProjects.map((project, i) => {
              return(

              <div className={'select-project'} onClick={()=>{ this.props.appState.currentPhase == "4" ? (()=>{
                    console.log("fase de riesgos");
                    console.log(project); this.props.selectProject(project);
                    this.props.goToRiskManagement();
                  })(): (()=>{
                      //console.log(project); this.props.selectProject(project)
                    })()
                  }}>

                  <div className={ ( i < 1 ) ? 'first-gap-list-element' : 'gap-list-element' }></div>
                  <div  style={{display:"flex",justifyContent:"center"}} >
                    <div style={{width:"95%"}} >
                      <ListAccordion counter={i+1} project={project} projectName={project.name} phase={this.props.appState.currentPhase}  projectInfo={project.customer.name} >
                        <Row>
                          <Col width="6%">
                          </Col>
                          <Col width="47%">
                            <div onClick={ ()=>{
                              this.props.getFunctionalUnits(project.id);
                              this.setState({
                                functionalList:{
                                  ...this.state.functionalList,
                                  [project.id] : this.state.functionalList[project.id] ? !this.state.functionalList[project.id] : true
                                }
                              },()=>{
                                //console.log(this.state);
                              });
                            }}>
                            { this.props.appState.currentPhase != "3" ?
                              <CardOptionButton
                                accordionIconsStyles={styles.accordionIcons}
                                iconStyles={{fontSize:"10px", color:"white"}}
                                iconReference="fas fa-eye fontAwesome"
                                textStyles={{fontSize:"11px", marginLeft:"10px"}}
                                imgStyles={{height:"5vmin"}}
                                image={yellowArrow}
                                title="Ver unidades funcionales"
                              />
                              :
                              <CardOptionButton
                                accordionIconsStyles={styles.accordionIcons}
                                iconStyles={{fontSize:"10px", color:"white"}}
                                iconReference="fas fa-eye fontAwesome"
                                textStyles={{fontSize:"11px", marginLeft:"10px"}}
                                imgStyles={{height:"5vmin"}}
                                image={yellowArrow}
                                title="Ver individuos forestales"
                              />
                            }
                            </div>
                          </Col>
                          <Col width="47%">
                            <div onClick={()=>{
                                let button = document.querySelector("#functionalSubmitButton");
                                button.textContent = "Registrar";
                                this.project_id = project.id;
                            }}>

                            { this.props.appState.currentPhase != "3" ?
                            <CardOptionButton
                              className="modal-btn"
                              accordionIconsStyles={styles.accordionIcons}
                              iconStyles={{fontSize:"10px", color:"white"}}
                              iconReference="fas fa-plus fontAwesome"
                              textStyles={{fontSize:"11px", marginLeft:"10px"}}
                              imgStyles={{height:"5vmin"}}
                              image={yellowArrow}
                              title="Nueva unidad funcional"
                              />: <div></div>
                            }

                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col width="20%"></Col>
                          <Col width="80%">
                            { this.state.functionalList[project.id] ? this.renderFunctionalList(functionalUnits , project) : null }
                          </Col>
                        </Row>
                      </ListAccordion>
                    </div>
                  </div>
              </div>
              );
            })
          :<NotFound/>
        }
        <Modal title="Registro de información" ModalStyles={styles.modalStyles}>
          <form onSubmit={this.registerUnit}>
            <div className="input-icon-wrap">
              <span className="input-icon"><span className="fa fa-user fontAwesome"></span></span>
              <input type="text" ref={(input) => this.Code = input} style={{width:"50%"}} className="input-with-icon" autoCorrect="false" placeholder="Codigo" id="form-name"   maxLength="10"  required/>
            </div>
            <br/>
            <button  type="submit" id="functionalSubmitButton"   modifier="large"
              style={{fontSize:"18px",padding:'5px',backgroundColor:"#61af2e",boxShadow:" 10px 10px 5px -2px rgba(0,0,0,0.75)",width:"100%"}}
              ><b>Registrar</b></button>
          </form>
        </Modal>
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

export default  connect(mapStateToProps, { goToForestalUnits,
   createFunctionalUnit,
   getFunctionalUnits,
   updateFunctionalUnit,
   getForestalUnits,
   setFunctionalUnit,
   getProjectByUser,
   resetFunctionalUnits,
   selectProject,
   goToRiskManagement,
   removeFromFunctionalUnitServerUpdate,
   removeFromOfflineFunctionalUnit,
   updateOfflineFunctionalUnit })(ProjectList);

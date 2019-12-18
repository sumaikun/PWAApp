import React, { Component } from 'react';
//sources
import checkList from "../../img/checkList.png";
import tree from "../../img/tree.png";
import chart from "../../img/chart.png";
import plant from "../../img/plant.png";
import yellowArrow from "../../img/yellowArrow.png";
import civil from "../../img/civil.png";
import "../../css/accordion.css";
import "../../css/Modal.css";

//Onsen Ui
import {  Col, Row, Card, Button} from 'react-onsenui';
import Ons from 'onsenui';

//Libraries

//components
import CardButton from "../../components/CardButton";
import Loading from "../../components/Loading";

//container
import AppPage from '../../containers/AppPage';

//flux
import {
  setProjectPhase,
  goToProjects,
  fetchProjects,
  goToRiskManagement,
  goToInventoryManagement,
  goToPlantation,
  goToCivi,
  goToCivilManagement,
  } from '../../flux/actions';
import { connect } from 'react-redux';

//css
import "../../css/style.css";

class ProjectManagement extends Component {
  constructor(props) {
    super(props);
    this.contentPage = this.contentPage.bind(this);
  }

  componentDidMount(){
    //this.props.fetchProjects();
  }

  contentPage(phase1Projects, phase2Projects, phase3Projects, phase4Projects, phase5Projects, phase6Projects){
    return (
      <div style={{height:"100%",backgroundColor:"white"}}>
        <br/>

        {
          phase1Projects.length > 0   ?

          <div>
            <div onClick={()=>{this.props.setProjectPhase(1);
               this.props.goToProjects()}}>
              <CardButton
                imgIcon = {checkList}
                title="Inventario"
                subtitle = {"Total proyectos "+phase1Projects.length }
                infoContainer = { "Ultima actualizacion "+phase1Projects[phase1Projects.length -1 ].created_at }
               />
             </div>
             <div style={{height:"10px"}} ></div>
          </div>

           : null
         }

         {
           phase2Projects.length > 0   ?
           <div>
            <div onClick={()=>{this.props.setProjectPhase(2);
               this.props.goToProjects()}}>
              <CardButton
                imgIcon = {tree}
                title="Aprovechamiento"
                subtitle = {"Total proyectos "+phase2Projects.length }
                infoContainer = { "Ultima actualizacion "+phase2Projects[phase2Projects.length -1 ].created_at }
                />
             </div>
              <div style={{height:"10px"}} ></div>
            </div> : null

         }

         {
           phase3Projects.length > 0   ?
           <div>
            <div onClick={()=>{this.props.setProjectPhase(3);
               this.props.goToProjects()}}>
              <CardButton
                imgIcon = {plant}
                title="Georeferenciación"
                subtitle = {"Total proyectos "+phase3Projects.length }
                infoContainer = { "Ultima actualizacion "+phase3Projects[phase3Projects.length -1 ].created_at }
                />
              </div>
              <div style={{height:"10px"}} ></div>
            </div> : null

           }

          <div onClick={()=>{Ons.notification.alert({title:"",message:"¡Proximamente!"})}}>
            <CardButton
              imgIcon = {chart}
              title="Vivero"
              subtitle="Total reportes"
              infoContainer="Ultima actualizacion 13/05/2019 9:25 am"
              />
          </div>
          <div style={{height:"10px"}} ></div>

        { this.props.appState.user ? this.props.appState.user.risk && phase4Projects.length > 0 ?
          <div>
            <div onClick={()=>{this.props.setProjectPhase(4),
              this.props.goToProjects()
              }}>
              <CardButton
                imgIcon = {checkList}
                title="Riesgo"
                subtitle = {"Total proyectos "+phase4Projects.length }
                infoContainer = { "Ultima actualizacion "+phase4Projects[phase4Projects.length -1 ].created_at }
               />
             </div>
            <div style={{height:"10px"}} ></div>
           </div> : null : null
        }

        {
          ( phase5Projects.length > 0 ) ?
            <div>
              <div
                onClick={() => {
                  this.props.setProjectPhase(5);
                  this.props.goToPlantation();
                }}
              >
                <CardButton
                  imgIcon={checkList}
                  title="Plantación"
                  subtitle={"Total proyectos: " + phase5Projects.length}
                  infoContainer={"Ultima actualizacion: " + phase5Projects[ phase5Projects.length - 1 ].created_at }
                />
              </div>
              <div style={{height: "10px"}}></div>
            </div>
            :
            null
        }
        
        {

        phase6Projects.length > 0   ?
        
        <div onClick={()=>{
          this.props.setProjectPhase(6);
          this.props.goToPlantation();
          console.log("Clicked on civil like plantation");
        }}>
          <CardButton
            imgIcon = {civil}
            title="Civíl"
            subtitle={"Total proyectos: " + phase6Projects.length}
            infoContainer={"Ultima actualizacion: " + phase6Projects[ phase6Projects.length - 1 ].created_at }
            />
        </div>:null

        }

      <div style={{height:"10px"}} ></div>

        {/*<div onClick={()=>{
          this.props.goToInventoryManagement();
        }}>
          <CardButton
            imgIcon = {civil}
            title="Ingeniería Civíl"
            subtitle="Total Reportes"
            infoContainer="Ultima actualizacion 13/05/2019 9:25 am"
            />
        </div>
      <div style={{height:"10px"}} ></div>*/}

        {/*<div onClick={()=>{
          this.props.goToInventoryManagement();
        }}>
          <CardButton
            imgIcon = {chart}
            title="Combustible"
            subtitle="Total reportes"
            infoContainer="Ultima actualizacion 13/05/2019 9:25 am"
            />
        </div>*/}

        <div style={{height:"10px"}} ></div>


      </div>
    );
  }

  render() {
    let phase1Projects = this.props.appState.projects.filter( project => {

      return project.phase == 1

    });
    let phase2Projects = this.props.appState.projects.filter( project => {

      return project.phase == 2

    });
    let phase3Projects = this.props.appState.projects.filter( project => {

      return project.phase == 3

    });
    let phase4Projects = this.props.appState.projects.filter( project => {

      return project.phase == 4

    });
    let plantationProjects = this.props.appState.projects.filter( project => {
      return project.phase == 5;
    });

    let civilProjects = this.props.appState.projects.filter( project => {
      return project.phase == 6;
    });


    const { isFetching } = this.props.appState;

    return (
      <AppPage  title={["GESTION DE ", <strong>PROYECTOS</strong>]}>

          {  isFetching ?
            <div style={{backgroundColor:"white",height:"100%"}}>
              <Loading/>
            </div>
            :
             this.contentPage(phase1Projects, phase2Projects, phase3Projects, phase4Projects, plantationProjects, civilProjects)

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
  { fetchProjects,
    goToProjects,
    setProjectPhase,
    goToRiskManagement,
    goToInventoryManagement,
    goToPlantation })(ProjectManagement);

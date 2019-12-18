import React, { Component } from 'react';

//images
import logo from '../../img/Logo.png';
import fbicon from '../../img/fbIcon.png';
import insicon from '../../img/InstagramIcon.png';
import youicon from '../../img/youtubeIcon.png';

//components or pages
//Libraries
import ReactResizeDetector from 'react-resize-detector';
//import { connect } from 'react-redux';

//Onsen Ui
import {  Page,  Button, ProgressBar } from 'react-onsenui';
import Ons from 'onsenui';

//flux

import { connect } from 'react-redux';
import { fetching , notFetching, goToMain } from '../../flux/actions';

import { setProjects , setUser, setFunctionalUnits, setForestalUnits } from '../../flux/actions';

//helpers
import { formValidation } from '../../helpers/formValidation';

//workers

// eslint-disable-next-line
import Worker from 'worker-loader!../../workers/userDataBase.worker.js';


//indexdb
import { generateDb , getAllFromStore , deleteDb } from '../../helpers/indexDbModels';

class Login extends Component {

  constructor(props)
  {
    super(props);
    this.makeLogin = this.makeLogin.bind(this);

  }

  componentDidMount() {
    const backgContainer = document.getElementById('backgContainer');
    
    this.setState({ backgHeight:backgContainer.clientHeight });

    //register web worker
    this.worker = new Worker();

    //wait to web worker finish
    this.worker.addEventListener('message', async event => {
      console.log("message from second thread");
      console.log(event);
      switch(event.data)
      {
        case "success":
          const users = await getAllFromStore("users");
          this.props.setUser(users[0]);
          const projects = await getAllFromStore("projects");
          this.props.setProjects(projects);
          const functionalUnits = await getAllFromStore("functionalUnits");
          this.props.setFunctionalUnits(functionalUnits);
          const forestallUnits = await getAllFromStore("forestalUnits");
          this.props.setForestalUnits(forestallUnits);
          localStorage.setItem("state","logged");
          this.props.goToMain();
          break;
        case "unauthorized":
            Ons.notification.alert({title:"",message:"Datos incorrectos, ¡Verifique los datos suministrados!"});
          break;
        case "error":
            Ons.notification.alert({title:"",message:"Ha sucedido un error"});
          break;
        default:
            Ons.notification.alert({title:"",message:"Ha sucedido un error"});
          break;    
      }
      this.props.notFetching();
		});

  }



  makeLogin(){

      if(this.props.appState.isFetching)
      {
        console.log("is already fetching");
        return;
      }
      
      this.props.fetching();
  
      let validation = formValidation([
        {
          ref:this.userName,
          name:"usuario"
        },
        {
          ref:this.userPassword,
          name:"Contraseña"
        }
      ]); 

      console.log("worker info");
      console.log(this.worker);

      validation ?  this.worker.postMessage({email:this.userName.value,
         password:this.userPassword.value}) : false;

  }



  onResize = (width,height) =>{
    const backgContainer = document.getElementById('backgContainer');


    if(height < this.state.backgHeight)
    {
      ////console.log("prevent that resize");
      backgContainer.style.height = this.state.backgHeight+"px";
    }

  }

  render() {

    const { isFetching } = this.props.appState;

    return (
      <Page id="login">
        { isFetching ? <ProgressBar indeterminate  /> : null }

           <div className="login-wrap" id="backgContainer" style={{backgroundSize:'cover',overflow:'hidden'}} >
            <div style={{marginTop:"-25px",height:"120%",backgroundColor:"#5a5b5d42"}}>
              <div className="login-html">
              <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
               <div className="App">
                 <a href="tel:460-6552">
                   <i className="fas fa-phone fa-lg fa-2x phone"></i>
                 </a>
                <br/>
                <img id='logo' className="App-logo" src={logo} />
                  <div id='logoTitle'>
                    <br/>
                    <span style={{color:'white'}} >Bienvenidos a <b>PLANTAR FUTURO</b>{" "}
                      <i className="fas fa-tree"></i>
                    </span>
                  </div>
                  <br/><br/>
                </div>
                <div className="login-form">
                  <div className="group">
                    <input className="input" placeholder="Usuario" type="email" ref={(input) => this.userName = input}/>
                    <i className="fa fa-user fa-lg fa-fw" aria-hidden="true"></i>
                  </div>
                  <div className="group">
                    <input  className="input fontAwesome" placeholder="Contraseña" type="password" ref={(input) => this.userPassword = input}  />
                    <i className="fas fa-lock fa-lg fa-fw" aria-hidden="true"></i>
                  </div>
                  <div className="group">
                    <Button id='signIn' onClick={this.makeLogin}  modifier="large"
                      style={{fontSize:"24px",padding:'5px'}}
                      >Ingresar</Button>
                  </div>
                  <a href="" className="a">Olvidaste tu contraseña?</a>
                </div>
                <div style={{display:'flex',justifyContent:'center', marginTop:'25%'}}>
                  <a target={'_blank'} href="https://www.facebook.com/plantarfuturoingenieria/"><img id='logo' className="Social-logo"  src={fbicon} /></a>
                  <a target={'_blank'} href="https://www.instagram.com/plantarfuturo/"><img id='logo' className="Social-logo" src={insicon} /></a>
                  <a target={'_blank'} href="https://www.youtube.com/watch?v=t_55VJA3p-M"><img id='logo' className="Social-logo" src={youicon} /></a>
                </div>
              </div>
            </div>
          </div>
        </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    navigation: state.navigation,
    appState: state.appState
  };
}

export default  connect(mapStateToProps, { fetching, notFetching, goToMain,
  setUser,
  setProjects,
  setFunctionalUnits,
  setForestalUnits

})(Login);

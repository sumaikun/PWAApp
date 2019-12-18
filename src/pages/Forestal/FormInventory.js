import React, { Component } from 'react';
//sources
import "../../css/simpleForm.css";
import "../../css/style.css";
import placeholderImage from "../../img/image-placeholder.png";

//Onsen Ui
import {  Col, Row, Card, Button, Input, Select, Radio} from 'react-onsenui';
import Ons from 'onsenui';

//Libraries

//components
import Loading from "../../components/Loading";
//container
import AppPage from '../../containers/AppPage';

//flux
import { connect } from 'react-redux';
import {
   createForestUnitPhase1,
   updateForestUnitPhase1,
   getForestalUnits,
   addOfflineForestUnitP1,
   updateOfflineForestUnitP1,
   goBack
} from '../../flux/actions';
//helper

import { saveImage , fileUpload } from '../../helpers/formHandler';

const styles = {
  cardInput:{
    height: "30px",
    display: "flex",
    alignItems: "center",
    padding:"3px"
  },
  cardRadio:{
    height: "40px",
    display: "flex",
    alignItems: "center",
    padding:"3px",
    justifyContent:"space-around"
  },
  cardLabel:{
    height: "30px",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#61af2e",
    padding:"3px",
    color:"white"
  },
  textInput:{
    fontSize:"14px"
  },
  dateInput:{
    fontSize:"14px",
    textAlign:"center",
    color:"grey"
  },
  buttonCard:{
    backgroundColor:"rgb(97, 175, 46)",
    //width:"100%",
    textAlign:"center",
    width: "85%",
    height: "35px",
    margin: "0 auto",
    padding: "0",
    display: "table-cell",
    lineHeight: "35px",
    verticalAlign: "middle",
  },
  uploadFile:{
    backgroundColor:"rgb(97, 175, 46)",
    //width:"100%",
    textAlign:"center",
    width: "85%",
    height: "35px",
    margin: "3px auto",
    padding: "0",
    display: "table-cell",
    lineHeight: "35px",
    verticalAlign: "middle",
    borderRadius: "5px",
    fontSize: "17px",
    color: "white"
  }
}

class FormInventory extends Component {
  constructor(props) {
    super(props);
    this.saveImage = saveImage.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.state = { formData:{
      origin:"1",
      condition:"3",
      health_status:"3",
      treatment:"1",
      cup_density:"2",
      products:"1"
    } , selectSearch:{} };
    this.submitData = this.submitData.bind(this);
    this.contentPage = this.contentPage.bind(this);
    this.fileUpload = fileUpload.bind(this);
    ////console.log(this.props);
  }

  componentDidMount(){
    ////console.log(this.props);
    if(this.props.appState.forestalUnitE)
    {
      this.setState({
        formData:{
          ...this.state.formData,
          ...this.props.appState.forestalUnitE
        }
      },()=>{
        ////console.log(this.state);
      });
    }
  }  

  handleChangeInput(event){

    if(event.target.name && event.target.value.length > -1)
    {
      ////console.log(event.target.name);
      ////console.log(event.target.value);
       this.setState(
         {
           formData:{
               ...this.state.formData,
               [event.target.name] : event.target.value
           }

         },() => {
           ////console.log(this.state);
         }
       );
    }

    if (event.target.value[0] == "="){
      event.target.value = event.target.value.substr(1)
    }

  }

  submitData(e){

    e.preventDefault();

    if(!this.props.appState.isFetching)
    {
      if(this.props.appState.forestalUnitE)
      {
        ////console.log("editMode");
        ////console.log(this.state.formData);
        ////console.log(this.state.formData.id);
        let data = this.state.formData;
        data.user_id = this.props.appState.user.id;
        //return;

        if(this.props.appState.currentFunctionalUnit.ToSynchro)
        {
          data.updated_at = new Date().toISOString().split('T')[0];
          Ons.notification.alert({title:"",message:"Esta registrando datos a una Unidad fuctional no sincronizada se guardara en memoria hasta la sincronización"});
          this.props.updateOfflineForestUnitP1(data);
          this.props.goBack();
          return;
        }

        this.props.updateForestUnitPhase1(this.state.formData.id,data);
        //this.props.goBack();

      }else{
        let data = this.state.formData;
        data.user_id = this.props.appState.user.id;
        data.functional_unit_id = this.props.appState.currentFunctionalUnit.id;

        if(this.props.appState.currentFunctionalUnit.ToSynchro)
        {
          data.updated_at = new Date().toISOString().split('T')[0];
          Ons.notification.alert({title:"",message:"Esta registrando datos a una Unidad fucional no sincronizada se guardara en memoria hasta la sincronización"});
          this.props.addOfflineForestUnitP1(data);
          this.props.goBack();
          return;
        }

        this.props.createForestUnitPhase1(data);

        //this.props.goBack();
        ////console.log("createMode");

      }
    }
    else{
      Ons.notification.alert({title:"¡Espera!",message:"Estamos realizando otro proceso en el momento"});
    }

  }

  contentPage(){

    return(

      <div style={{backgroundColor:"#e6e7e8",height:"100%"}}>
        <br/>
        <form className="simpleForm"  onSubmit={this.submitData}>
          <Row>
            <Col>
              <Card style={styles.cardInput}>
                <Input disableUnderline={true} style={styles.textInput} name="code" value={this.state.formData.code} onChange={this.handleChangeInput} maxLength={10}  placeholder="Codigo" maxLength="10" required/>
              </Card>
            </Col>
            {/*}<Col>
              <Card style={styles.cardInput}>
                <Input disableUnderline={true} style={styles.dateInput} type="date" name="start_treatment" onChange={this.handleChangeInput}value={this.state.formData.start_treatment} required/>
              </Card>
            </Col>*/}
          </Row>
          <Row>
            <Col>
              <Card style={styles.cardInput}>
                <Input disableUnderline={true} style={styles.textInput} name="common_name" value={this.state.formData.common_name} onChange={this.handleChangeInput}placeholder="Nombre" required />
              </Card>
            </Col>
            <Col width="50%">
              <Card style={styles.cardInput}>
                <Input disableUnderline={true} style={styles.textInput} name="scientific_name" value={this.state.formData.scientific_name} onChange={this.handleChangeInput}placeholder="Nombre cientifico" />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="50%">
              <Card style={styles.cardInput}>
                <Select style={{width:"100%"}} onChange={this.handleChangeInput} name='origin' value={this.state.formData.origin === "1" || this.state.formData.origin === 'Nativa'  ?  1 :
                 this.state.formData.origin === "2" || this.state.formData.origin === 'Exotica'  ? 2 : ''
              } >
                  <option value="" disabled selected>Origen</option>
                  <option value="1">Nativa</option>
                  <option value="2">Exótica</option>
                </Select>
              </Card>
            </Col>
            <Col>
              <Card style={styles.cardInput}>
                <Input disableUnderline={true} style={styles.textInput} name='cap_cm' onChange={this.handleChangeInput}value={this.state.formData.cap_cm} placeholder="CAP" min="0" type="number" step="any" />
              </Card>
            </Col>
            <Col>
              <Card style={styles.cardInput}>
                <Input disableUnderline={true} style={styles.textInput} name="total_heigth_m" onChange={this.handleChangeInput}value={this.state.formData.total_heigth_m} placeholder="HT" min="0" type="number" step="any" />
              </Card>
            </Col>
            <Col>
              <Card style={styles.cardInput}>
                <Input disableUnderline={true} style={styles.textInput} name="commercial_heigth_m" onChange={this.handleChangeInput}value={this.state.formData.commercial_heigth_m} placeholder="HC" min="0" type="number" step="any" />
              </Card>
            </Col>
          </Row>
          <Row>
          <Col>
            <Card style={styles.cardInput}>
              <Select style={{width:"100%"}} name="cup_density" onChange={this.handleChangeInput} value={this.state.formData.cup_density === "1" || this.state.formData.cup_density === 'Clara'  ?  1 :
               this.state.formData.cup_density === "2" || this.state.formData.cup_density === 'Media'  ? 2 :
               this.state.formData.cup_density === "3" || this.state.formData.cup_density === 'Espesa' ? 3:''
            } >
                <option value="" disabled selected>Densidad de copa</option>
                <option value="1">Clara</option>
                <option value="2">Media</option>
                <option value="3">Espesa</option>
              </Select>
            </Card>
          </Col>
          <Col>
            <Card style={styles.cardRadio}>
                <span style={{fontSize:"10px",color:"gray"}} >
                  Epifitas
                </span>
                <span style={{fontSize:"10px",color:"gray"}} >
                  Si
                </span>
                <Radio onChange={this.handleChangeInput}name="epiphytes" value="1" checked={this.state.formData.epiphytes === "1" || this.state.formData.epiphytes === 'Si'} modifier='material' />
                <span style={{fontSize:"10px",color:"gray"}} >
                  No
                </span>
                <Radio onChange={this.handleChangeInput}name="epiphytes" value="2" checked={this.state.formData.epiphytes === "2" || this.state.formData.epiphytes === 'No'}  modifier='material' />
            </Card>
          </Col>
          </Row>
          <Row>
            <Col>
              <Card style={styles.cardLabel}>
                <span>
                  Estado GRAL
                </span>
              </Card>
            </Col>
            <Col>
              <Card style={styles.cardLabel}>
                <span>
                  Díametro de copa
                </span>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="25%">
              <Card style={styles.cardInput} >
                <Select onChange={this.handleChangeInput} style={{width:"100%"}} name='condition' value = {
                  this.state.formData.condition === "1" || this.state.formData.condition === 'Malo' ? 1:
                  this.state.formData.condition === "2" || this.state.formData.condition === 'Regular' ? 2:
                  this.state.formData.condition === "3" || this.state.formData.condition === 'Bueno' ? 3: ''
                } >
                  <option value="" disabled selected>Fisico</option>
                  <option value="1">Malo</option>
                  <option value="2">Regular</option>
                  <option value="3">Bueno</option>
                </Select>
              </Card>
            </Col>
            <Col width="25%">
              <Card style={styles.cardInput}>
              <Select onChange={this.handleChangeInput} style={{width:"100%"}} value = {
                this.state.formData.health_status === "1" || this.state.formData.health_status === 'Malo' ? 1:
                this.state.formData.health_status === "2" || this.state.formData.health_status === 'Regular' ? 2:
                this.state.formData.health_status === "3" || this.state.formData.health_status === 'Bueno' ? 3: ''
              }  name='health_status'  >
                <option value="" disabled selected>Sanitario</option>
                <option value="1">Malo</option>
                <option value="2">Regular</option>
                <option value="3">Bueno</option>
              </Select>
              </Card>
            </Col>
            <Col width="25%">
              <Card style={styles.cardInput}>
                <Input disableUnderline={true} onChange={this.handleChangeInput}style={styles.textInput} name="x_cup_diameter_m" value={this.state.formData.x_cup_diameter_m} placeholder="X" min="0" type="number" step="any" />
              </Card>
            </Col>
            <Col width="25%">
              <Card style={styles.cardInput}>
                <Input disableUnderline={true} onChange={this.handleChangeInput}style={styles.textInput} name="y_cup_diameter_m" value={this.state.formData.y_cup_diameter_m} placeholder="Y" min="0" type="number" step="any" />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col width="50%">
              <Card style={styles.cardLabel}>
                  <span>
                    Coordenadas
                  </span>
              </Card>
            </Col>
            <Col>
              <Card style={styles.cardInput}>
                <Input disableUnderline={true} onChange={this.handleChangeInput} style={styles.textInput} name="waypoint" value={this.state.formData.waypoint}  placeholder="WayPoint" type="text"  />
              </Card>
            </Col>
          </Row>

          <Row>
            <Col width="100%">
              <br/>
              <Card>
                <textarea onChange={this.handleChangeInput}style={{width:"100%",borderRadius:"10%",height:"80px", borderColor:"white"}} name="note" value={this.state.formData.note}  placeholder="Observaciones"></textarea>

              </Card>
            </Col>
          </Row>

          <Row>

            <Row>
              <Col>
                <Card style={styles.cardLabel}>
                  <span>
                    Foto general
                  </span>
                </Card>
              </Col>
            </Row>

          <Col>
            <br/>
            <Card style={styles.greenCard} >
              <div>
                <img src={this.state.formData.general_image ? this.state.formData.general_image : placeholderImage } style={{width:"100%"}} />
              </div>
              <Row>
                <Button className='take-picture-button' style={styles.buttonCard}
                  onClick={()=>{this.saveImage("general_image",this)}}
                >Tomar foto</Button>
                <label className="fileContainer" style={ styles.uploadFile }>
                  Subir archivo
                  <Input disableUnderline={true}  type="file" onChange={(event)=>{

                    this.fileUpload("general_image",event,this);
                  
                  }}
                     />
                </label>
              </Row>
            </Card>
          </Col>
          </Row>


          <Row>
            <Col>
              <Card style={styles.cardLabel}>
                <span>
                  Foto del individuo
                </span>
              </Card>
            </Col>
          </Row>

        <Row>
          <Col>
            <br/>
            <Card style={styles.greenCard} >
              <div>
                <img src={this.state.formData.id_image ? this.state.formData.id_image : placeholderImage } style={{width:"100%"}} />
              </div>
              <Row>
                <Button style={styles.buttonCard}
                  onClick={()=>{this.saveImage("id_image",this)}}
                >Tomar foto</Button>
                <label className="fileContainer" style={ styles.uploadFile }>
                  Subir archivo
                  <Input disableUnderline={true}  type="file" onChange={(event)=>{                   
                    
                    this.fileUpload("id_image",event,this);
                    
                    }}   />
                </label>
              </Row>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card style={styles.cardLabel}>
              <span>
                Foto de referencia
              </span>
            </Card>
          </Col>
        </Row>

      <Row>
        <Col>
          <br/>
          <Card style={styles.greenCard} >
            <div>
              <img src={this.state.formData.reference_image ? this.state.formData.reference_image : placeholderImage } style={{width:"100%"}} />
            </div>
            <Row>
              <Button style={styles.buttonCard}
                onClick={()=>{this.saveImage("reference_image",this)}}
              >Tomar foto</Button>
              <label className="fileContainer" style={ styles.uploadFile }>
                Subir archivo
                <Input disableUnderline={true}  type="file" onChange={(event)=>{
                    
                    this.fileUpload("reference_image",event,this);
                  }}/>
              </label>
            </Row>
          </Card>
        </Col>
      </Row>


          <Row>
            <button type="submit"
              style={{fontSize:"18px",padding:'5px',marginTop:"10px",backgroundColor:"#61af2e",boxShadow:"rgba(0, 0, 0, 0.85) 0px 10px 10px -2px",
              color:"white",width:"100%",borderRadius:"10%"}}
              ><b>Registrar</b></button>
          </Row>
        </form>
      </div>


    );
  }



  render() {

    const { isFetching , currentFunctionalUnit } = this.props.appState;

    return (
      <AppPage  title={["Formulario de ", <strong>INVENTARIO</strong>]} backButton={true} backButtonCallBack={()=>{ this.props.getForestalUnits(currentFunctionalUnit.id) }}>

          {  isFetching ?
            <div style={{backgroundColor:"white",height:"100%"}}>
              <Loading/>
            </div> :

             this.contentPage()

          }

      </AppPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    project: state.project,
    appState: state.appState,
  };
}

export default  connect(mapStateToProps, { createForestUnitPhase1,
    updateForestUnitPhase1,
    getForestalUnits,
    addOfflineForestUnitP1,
    updateOfflineForestUnitP1,
    goBack
})(FormInventory);

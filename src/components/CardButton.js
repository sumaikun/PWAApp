import React, { Component } from 'react';
//sources
//import checkList from "../img/checkList.png";
//Onsen Ui
import {  Card , Icon } from 'react-onsenui';
import Ons from 'onsenui';
//Libraries

//components

//container
import AppPage from '../containers/AppPage';

//css
import "../css/style.css";

const styles = {
  cardButton:{
    "borderLeft":"8px solid #00471c",
    "padding":"5px",
    backgroundColor:'#f1f2f2',
  },
  imageIcon:{
    "marginTop": "5px",
    "backgroundColor":"#00471c",
    "display": "flex",
    "borderRadius": "50%",
    "width": "32.5px",
    "height": "32.5px",
    "justifyContent":"center",
    "alignItems":"center"
  },
  title:{
    "fontWeight":"bold",
    "fontSize":"19.25px",
  },
  subTitle:{
    "fontSize":"12px"
  },
  buttonContainer:{
    backgroundColor:'#f1f2f2',
    "display": "flex",
    "alignItems": "center"
  },
  infoContainer:{
    fontSize: "12px",
    marginTop: "13px",
    marginLeft: "-5px",
    marginBottom: "-5px",
    backgroundColor: "#e6e7e8",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}

class CardButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {


    return (
        <Card style={styles.cardButton}>
          <div style={styles.buttonContainer}>
            <div className="margin" style={styles.imageIcon}>
                <img style={{height:"6vmin"}}  src={this.props.imgIcon} />
            </div>
            <div>
              <span className={'project-management-title-font'} style={styles.title}>{this.props.title}</span>
              <br/>
              <span style={styles.subTitle}>{this.props.subTitle}</span>
            </div>
            <div>
              <button className="nextButton">
                <i className="fas fa-arrow-right font Awesome"></i>
              </button>
            </div>
            <div className="margin2 review-status">
            </div>
          </div>
          <div style={styles.infoContainer}>
            <span>{this.props.infoContainer}</span>
          </div>
        </Card>
    );
  }
}

/*const mapStateToProps = state => {
  return {
    project: state.project,
  };
}

export default  connect(mapStateToProps, { getProjects , getFunctionalUnits })(ListProjects);*/

export default CardButton;

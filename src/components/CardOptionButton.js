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


const styles = {
  accordionButtons:{
    "borderLeft":"8px solid #00471c",
    "padding":"7px",
    backgroundColor:'#f1f2f2',
    display:"flex",
    "justify-content":"center",
    "alignItems":"center",
    borderRadius:"0"
  },
  accordionIcons:{
    "background-color": "#006828",
    "width": "25px",
    "height": "25px",
    "border-radius": "50%",
    display: "flex",
    "justify-content": "center",
    "align-items": "center"
  }
}

class CardOptionButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {


    return (
      <Card style={ styles.accordionButtons } className={this.props.className}>
        <div style={this.props.accordionIconsStyles}>
          <i style={this.props.iconStyles} className={this.props.iconReference}></i>
        </div>
        <div style={this.props.textStyles}>
          {this.props.title}
        </div>
        <div>
          <img className="Social-logo" style={this.props.imgStyles}  src={this.props.image} />
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

export default CardOptionButton;

import React, { Component } from 'react';
//sources
import checkList from "../img/checkList.png";
import tree from "../img/tree.png";
import chart from "../img/chart.png";
import plant from "../img/plant.png";
import "../css/riskLevel.css";

//Onsen Ui
import {  List , ListItem } from 'react-onsenui';
import Ons from 'onsenui';

//Libraries

//components

//container

const styles = {
  mainListItem:{
    display: "flex",
    justifyContent: "space-around"
  },
  counter:{
    color: "#e6e7e8"
  },
  RiskName:{
    color: "#352865",
    fontSize: "13px",
    fontWeight: "bold"
  },

}

class SemaphoreList extends Component {
  constructor(props) {
    super(props);

  }

  render() {


    return (
      <List key={1}>
        <ListItem key={1}   tappable >
          <div className="left" style={styles.mainListItem}>
            <span style={{...styles.counter, "margin-right":"10px"}}>{this.props.counter}</span>
            <span style={styles.RiskName}>{this.props.RiskName}</span>
            <div style={styles.buttonContainer}>

            </div>
          </div>
          <div className="right">
            <ol class="risk-level">
              <li className={ this.props.outStand == 1 ?  " isActive" : null  }>Level 1</li>
              <li style={{display:"none"}}>Level 2</li>
              <li style={{display:"none"}}>Level 3</li>
              <li className={ this.props.outStand == 2 ?  " isActive" : null  } >Level 4</li>
              <li className={ this.props.outStand == 3 ?  " isActive" : null  }>Level 5</li>
              <li className={ this.props.outStand == 4 ?  " isActive" : null  }>Level 6</li>
              <li className={ this.props.outStand == 5 ?  " isActive" : null  }>Level 7</li>
            </ol>
          </div>
        </ListItem>
      </List>
    );
  }
}

/*const mapStateToProps = state => {
  return {
    project: state.project,
  };
}

export default  connect(mapStateToProps, { getProjects , getFunctionalUnits })(ListProjects);*/

export default SemaphoreList;

import React, { Component } from 'react';
//Onsen Ui
import { List , ListItem } from 'react-onsenui';

const styles = {
  mainListItem:{
    display: "flex",
    justifyContent: "space-between"
  },
  counter:{
    color: "#e6e7e8"
  },
  projectName:{
    color: "#352865",
    fontSize: "13px",
    fontWeight: "bold"
  },
  projectInfo:{
    color: "#e6e7e8",
    fontSize: "10px",
  },
  button:{
    backgroundColor: "#f1f2f2",
    width: "13px",
    height: "13px",
    borderRadius: "50%",
    margin: "0.5px",
    textAlign: "center",
    lineHeight: "25px",
    fontSize: "30px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  green:{
    backgroundColor:"green"
  }
}

class ListOverview extends Component {
  constructor(props) {
    super(props);
    let self = this;
    window.fn = {};
    window.fn.toggle = function(el) {

        if(self.props.phase == 4 )
        {
          return;
        }

        el.classList.toggle("active");
        el.nextElementSibling.classList.toggle("show");
    }
  }
  render() {
    return (
      <List key={1}>
        <ListItem key={1} tappable class="accordion" onclick="fn.toggle(this)">
          <div className="center" style={styles.mainListItem}>
            <span className="left" style={styles.counter}>{this.props.counter}</span>
            <div className={'list__accordion__center'}>
              <div className="left" ><span className="left" style={styles.projectName}>{this.props.projectName}</span></div>
            </div>
            <div style={styles.buttonContainer}>
              <div style={styles.button} className={this.props.value >= 1 ? 'Green' : ''} />
              <div style={styles.button} className={this.props.value >= 2 ? 'Yellow' : ''}/>
              <div style={styles.button} className={this.props.value >= 3 ? 'Orange' : ''}/>
              <div style={styles.button} className={this.props.value >= 4 ? 'Red' : ''}/>
              <div style={styles.button} className={this.props.value >= 5 ? 'RedWine' : ''}/>
            </div>
          </div>
        </ListItem>
        <div className="panel">
          {this.props.children}
        </div>
      </List>
    );
  }
}
export default ListOverview;

import React, { Component } from 'react';
//sources
import checkList from "../img/checkList.png";
import tree from "../img/tree.png";
import chart from "../img/chart.png";
import plant from "../img/plant.png";
import yellowArrow from "../img/yellowArrow.png";
import "../css/accordion.css";
import "../css/Modal.css";

//Onsen Ui

//Libraries

//components

//container


class Modal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    // Get DOM Elements
    const modal = document.querySelector('#my-modal');
    const modalBtn = document.querySelector('#modal-btn');
    const modalMultiple = document.querySelectorAll('.modal-btn');
    const closeBtn = document.querySelector('.close');

    // Events
    if(modalMultiple)
    {
      if(modalMultiple.length > 0)
      {
        modalMultiple.forEach(unit =>{
          unit.addEventListener('click', openModal);
        })
      }
    }

    if(modalBtn)
    {
      modalBtn.addEventListener('click', openModal);
    }

    if(closeBtn)
    {
        closeBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', outsideClick);

    // Open
    function openModal() {
    modal.style.display = 'block';
    }

    // Close
    function closeModal() {
    modal.style.display = 'none';
    }

    // Close If Outside Click
    function outsideClick(e) {
      if (e.target == modal) {
      modal.style.display = 'none';
      }
    }
  }


  render() {


    return (
      <div id="my-modal" class="modal" style={this.props.ModalStyles.view}>
        <div class="modal-content" style={this.props.ModalStyles.content}>
          <div class="modal-header" style={this.props.ModalStyles.header}>
            <div>
              <span className="close">&times;</span>
            </div>
            <br/>
            <div style={{textAlign:"center"}}>
              <span style={this.props.ModalStyles.title} >{this.props.title}</span>
            </div>
          </div>
          <div class="modal-body" style={this.props.ModalStyles.body}>
            {/* <button id="modal-btn" className="button">Click Here</button*/}
            {this.props.children}
          </div>
          <div  class="modal-footer" style={this.props.ModalStyles.footer}>
            <span>{this.props.footer}</span>
          </div>
        </div>
      </div>
    );
  }
}

/*const mapStateToProps = state => {
  return {
    project: state.project,
  };
}

export default  connect(mapStateToProps, { getProjects , getFunctionalUnits })(ListProjects);*/

export default Modal;

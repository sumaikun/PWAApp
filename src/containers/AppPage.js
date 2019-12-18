import React, { Component } from 'react';

//onsen ui
import { Page, Toolbar,  BackButton,  Icon,  ToolbarButton, ProgressBar } from 'react-onsenui';

//flux
import { openMenu , closeMenu , goBack } from '../flux/actions';
import { connect } from 'react-redux';

//components
//import ErrorBoundary from './ErrorBoundary';

const styles = {
   customToolBar:{
     backgroundColor: '#006828'
   },
   customToolBarIcon:{
     color: 'white',
   },
   toolBarTitle:{
     color:"white",
     fontSize:"15px",
     marginRight:"5%"
   },
   toolBarButton:{
     /* border-radius: 50%; */
     backgroundColor: "#00471c",
     width: "40px",
/* margin-top: -25px !important; */
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding:"0",
    borderRadius:"50%",
    height:"40px",
    marginTop:"2px",
  },
  toolBarBack:{
    ...this.toolBarButton,
    marginLeft:"28px",
  }
 }


class AppPage extends Component {

  constructor(props) {
    super(props);
    //console.log(props);
    this.appToolBar = this.appToolBar.bind(this);
    this.showMenu = this.showMenu.bind(this);
  }

  componentDidCatch(error, errorInfo) {
    //console.log(error);
    //console.log(errorInfo);
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }

  componentDidMount(){

    //console.log(this.props.children);

  }

  showMenu(){
    this.props.appState.isOpen ? this.props.closeMenu()  : this.props.openMenu();

  }


  appToolBar(){

    return(
      <Toolbar style={styles.customToolBar}>
        <div className={this.props.backButton ? 'right':'left'}>
          <ToolbarButton style={this.props.backButton ? styles.toolBarBack : styles.toolBarButton}  onClick={this.showMenu}>
            <Icon style={styles.customToolBarIcon} icon='ion-navicon, material:md-menu' />
          </ToolbarButton>
        </div>
        <div className='center' style={styles.toolBarTitle}>{this.props.title}</div>
        { this.props.backButton  ?
          <div className='left' >
             <BackButton onClick={()=>{
               console.log(this.props);
               if(!this.props.appState.isFetching)
               {
                 this.props.backButtonCallBack ? this.props.backButtonCallBack() : null
                 this.props.goBack();
               }
             }} style={styles.customToolBarIcon}>
             </BackButton>
           </div> : null }
      </Toolbar>
    );
  }


  render() {
    //console.log(this.props.styles);
    const { isFetching } = this.props.appState;
    return (

      <Page id="ListProjects"
          renderToolbar={this.appToolBar}
        >
        { isFetching ? <ProgressBar indeterminate  /> : null }
            {this.props.children}

      </Page>

    );
  }
}

const mapStateToProps = state => {
  return {
    appState:state.appState,
    navigation:state.navigation
  };
}

export default  connect(mapStateToProps, { openMenu , closeMenu , goBack })(AppPage);

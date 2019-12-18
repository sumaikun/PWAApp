import React, { Component } from 'react';
import { appError } from '../flux/actions';
import { connect } from 'react-redux';

class ErrorBoundary extends Component {

  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
    console.log(errorInfo);
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Oops algo salio mal toma nota del error.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
          <div style={{
              display:"flex",
              justifyContent:"center"
          }} >

            <button
            style={{
                width: "80%",
                marginTop: "15%",
                backgroundColor: "#315633",
                color: "white",
                fontSize: "20px"
            }} onClick={()=>{

                this.props.appError();
                window.location.reload();

            }}
            >Volver al inicio</button>
          </div>
        </div>
      );
    }
      // Normally, just render children
      return this.props.children;

  }
}

const mapStateToProps = state => {
  return {
    appState:state.appState,
    navigation:state.navigation
  };
}

export default  connect(mapStateToProps, { appError })(ErrorBoundary);

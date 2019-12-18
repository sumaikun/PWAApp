import React, { Component } from 'react';
//sources
import { workingRowStyles } from "../jsStyles/Styles";

const styles = workingRowStyles;

class SearchInput extends Component {

  render()
  {
    return(
      <div style={styles.formContainer}>
        <div className="login-form" >

          <div className="group" style={styles.searchInputContainer}>
            <input className="input fontAwesome" placeholder="Buscar" type="text"   style={{fontFamily:'Arial', marginTop:"8px", width:"80%"}} />
            <div style={styles.searchButton} onClick={()=>{
            }}>
              <span className="fas fa-plus fontAwesome" ></span>
            </div>
          </div>

        </div>
      </div>
    );

  }

}

export default SearchInput;

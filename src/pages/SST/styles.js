import { formCardStyles , workingRowStyles , modalStyles } from "../../jsStyles/Styles";

const Styles = {
  accordionIcons:{
    "background-color": "#006828",
    "width": "25px",
    "height": "25px",
    "border-radius": "50%",
    display: "flex",
    "justify-content": "center",
    "align-items": "center"
  },
  centerAll:{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button:{
    fontSize:"18px",
    padding:'5px',
    marginTop:"10px",
    marginTop:"10px",
    marginLeft:"50%",
    marginRight:"1%",
    backgroundColor:"#61af2e",
    marginBottom:'1em',
    boxShadow:"rgba(0, 0, 0, 0.85) 0px 1px 1px -2px",
    color:"white",
    width:"50%",
    borderRadius:"10%"
  },
  ...formCardStyles,
  ...workingRowStyles,
  ...modalStyles
}


export default Styles;

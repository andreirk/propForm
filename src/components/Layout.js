import React from 'react';
import {connect} from "react-redux";
import {formContentSelector, formSubmit, loadForm} from "../redux/ducks/app";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Form from './Form';


const Layout = (props) => (
  <div className="container">
    Super form
    <MuiThemeProvider>
    <Form loadForm={props.loadForm} formContent={props.formContent} onSubmit={(values) => {
      props.formSubmit(values);
    }}/>
    </MuiThemeProvider>
  </div>
);



export default connect(null,
  { formSubmit, loadForm }
) (Layout);

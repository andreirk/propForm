import React, {Component} from 'react';
import {Field, formValueSelector, getFormAsyncErrors, reduxForm} from 'redux-form'
import {
  FORM_NAME, serverErrorsSelector, serverValidateFaild, serverValidateRequest,
  serverValidateSuccess, submitFailureSelector, submitSuccessSelector
} from '../redux/ducks/app';
import {connect} from 'react-redux';
import GenericField from './common/GenericField';
import {checkIt} from '../api/index';
import MenuItem from 'material-ui/MenuItem'
import { RadioButton } from 'material-ui/RadioButton'
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
} from 'redux-form-material-ui'



class Form extends Component {


    handleSubmit = (e) => {
      return this.props.handleSubmit(e)
    }

    render() {
        const {is_Block_A_Filled,
          is_Block_B_Filled,
          is_Block_C_Filled,
          is_Block_Check_Checked,
          submitSuccess,
          serverErrors } = this.props
        return (
            <div className="container-fluid">
              {submitSuccess && <h1>CONGRADS form submited successfuly</h1>}
              {serverErrors.submitError && <h3>{JSON.stringify(serverErrors.submitError)}</h3>}
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                       <Field component={Checkbox} label="A1" name='A1'/>
                       <Field component={Checkbox} label="A2" name='A2'/>
                    </div>


                  {  is_Block_A_Filled && (<div className="row">
                    <Field name="B" component={RadioButtonGroup}>
                      <RadioButton value="B1" label="B1"/>
                      <RadioButton value="B2" label="B2"/>
                    </Field>
                    </div>)
                  }

                  {
                    is_Block_B_Filled && ( <div className="row">
                        <Field component={GenericField} type="text" name="Check"/>
                    </div>)
                  }

                   {
                   is_Block_Check_Checked && !serverErrors.checkError && ( <div className="row">

                     <Field name="C" component={SelectField} hintText="Select C">
                       <MenuItem value="C1" primaryText="C1"/>
                       <MenuItem value="C2" primaryText="C2"/>
                       <MenuItem value="C3" primaryText="C3"/>
                     </Field>


                    </div>)
                    }

                   { is_Block_C_Filled && (<button className="btn btn-success" type="submit">GO</button>)}
                </form>
            </div>
        );
    }
}

Form.propTypes = {};
Form.defaultProps = {};


const asyncValidate = (values , dispatch ) => {
  dispatch(serverValidateRequest())

  return checkIt(values.Check)
    .then(() => {
      dispatch(serverValidateSuccess())
    })
    .catch((err) => {
      dispatch(serverValidateFaild(err))
      throw { Check: `Validation ${err.message}` }
    })
}


let SelectingFormValuesForm = reduxForm({
  form: FORM_NAME,
  asyncValidate,
  asyncBlurFields: ['Check']
})(Form)

const  formValuesSelector = formValueSelector(FORM_NAME)

SelectingFormValuesForm = connect(state => {

  const is_Block_A_Filled = formValuesSelector(state, 'A1') || formValuesSelector(state, 'A2')
  const is_Block_B_Filled = formValuesSelector(state, 'B');
  const is_Block_C_Filled = formValuesSelector(state, 'C');
  const is_Block_Check_Checked = formValuesSelector(state, 'Check');
  const is_Block_Check_Server_Errors = getFormAsyncErrors(FORM_NAME)(state, 'Check' );
  const serverErrors = serverErrorsSelector(state);

  return {
    submitSuccess: submitSuccessSelector(state),
    is_Block_A_Filled,
    is_Block_B_Filled,
    is_Block_C_Filled,
    is_Block_Check_Checked,
    is_Block_Check_Server_Errors,
    serverErrors
  }
})(SelectingFormValuesForm)

export default SelectingFormValuesForm





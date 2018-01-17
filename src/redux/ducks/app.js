import {appName} from '../../config'
import {createSelector} from 'reselect'
import {formValueSelector} from 'redux-form';
import {submitIt} from '../../api/index';

/**
 * Constants
 * */
export const moduleName = 'progFormApp'
const prefix = `${appName}/${moduleName}`

export const FORM_SUBMIT_REQUEST = `${prefix}/FORM_SUBMIT_REQUEST`
export const FORM_SUBMIT_SUCCESS = `${prefix}/FORM_SUBMIT_SUCCESS`
export const FORM_SUBMIT_FAILURE = `${prefix}/FORM_SUBMIT_FAILURE`
export const LOAD_FORM = `${prefix}/LOAD_FORM`

export const SERVER_VALIDATE_REQUEST = `${prefix}/SERVER_VALIDATE_REQUEST`
export const SERVER_VALIDATE_SUCCESS = `${prefix}/SERVER_VALIDATE_SUCCESS`
export const SERVER_VALIDATE_FAILURE = `${prefix}/SERVER_VALIDATE_FAILURE`

export const FORM_NAME = `selectingFormValues`


/**
 * Reducer
 * */

export const AppState = {
  formContent: {
    a: ["A1"],
    b: "B1",
    text: "@abcdef",
    c: "C1"
  },
  submitSuccess : false,
  errors: {},
  serverErrors: {
    checkError: '',
    submitError: ''
  },
}


export default function reducer(state = AppState, action) {
  const {type, payload} = action

  switch (type) {
    case LOAD_FORM:
      return { ...state,
        formContent: payload
      };
    case FORM_SUBMIT_SUCCESS:
      return { ...state,
        submitSuccess: true
      };
    case FORM_SUBMIT_FAILURE:
      return { ...state,
        submitSuccess: false,
        serverErrors: {submitError: payload}
      };
    case SERVER_VALIDATE_SUCCESS:
      return { ...state,
        serverErrors: {checkError:''},
      };
    case SERVER_VALIDATE_FAILURE:
      let serverErrors = {checkError:payload.message}
      return { ...state,
        serverErrors,
      };

    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const serverErrorsSelector = createSelector(stateSelector, state => state.serverErrors)
export const submitSuccessSelector = createSelector(stateSelector, state => state.submitSuccess)

/**
 * Action Creators
 * */

export const formSubmit = (content) => dispatch => {

  return submitIt(content)
    .then((result) => {
        dispatch({
          type: FORM_SUBMIT_SUCCESS,
          payload: result
        })
    })
    .catch((err) => {
      dispatch({
        type: FORM_SUBMIT_FAILURE,
        payload: err.message,
      })
    })
};

export const loadForm = () => ({
  type: LOAD_FORM,
});

export const serverValidateRequest = () => ({
  type: SERVER_VALIDATE_REQUEST,
});

export const serverValidateSuccess = () => ({
  type: SERVER_VALIDATE_SUCCESS,
});

export const serverValidateFaild = (payload) => ({
  type: SERVER_VALIDATE_FAILURE,
  payload
});

// to show loader
export const submitFormRequest = () => ({
  type: FORM_SUBMIT_REQUEST,
});




/**
 * Sagas
 **/




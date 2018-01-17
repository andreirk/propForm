import {combineReducers} from 'redux'
import progFormReducer, {moduleName as progFormModule} from '../redux/ducks/app'
import {reducer as form} from 'redux-form'
// import the root reducer


export default combineReducers({
  form,
  [progFormModule]: progFormReducer,
})
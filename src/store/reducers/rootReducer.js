import authReducer from './authReducer'
import adminHireReducer from './adminHireReducer'
import adminReducer from './adminReducer'
import customerReducer from './customerReducer'
// import adminNotificationsReducer from './adminNotificationsReducer'

import {combineReducers} from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    auth: authReducer,
    hire: adminHireReducer,
    customer:customerReducer,
    vehicle: adminReducer,
    // notifications: adminNotificationsReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer 

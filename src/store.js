import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'

// import filterReducer from './reducers/filterReducer'
// import anecdoteReducer from './reducers/anecdoteReducer'


const reducer = combineReducers({
  notification: notificationReducer,
})
const store = createStore(reducer, applyMiddleware(thunk))

export default store

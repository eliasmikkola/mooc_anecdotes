import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'


const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filters: filterReducer
})
const store = createStore(reducer)
console.log(store.getState())

export default store
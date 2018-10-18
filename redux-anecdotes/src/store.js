import { createStore, combineReducers } from 'redux'
import anecdoteReducer, { anecdoteInitialization } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import anecdoteService from './services/anecdotes'


const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filters: filterReducer
})
const store = createStore(reducer)

anecdoteService.getAll().then(anecdotes => {
    console.log("here", anecdotes)
    store.dispatch(anecdoteInitialization(anecdotes))
})

export default store
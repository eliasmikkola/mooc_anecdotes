import { createStore, combineReducers, applyMiddleware } from 'redux'
import anecdoteReducer, { anecdoteInitialization } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import anecdoteService from './services/anecdotes'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filters: filterReducer
})
const store = createStore(reducer,
    applyMiddleware(thunk)
)



export default store
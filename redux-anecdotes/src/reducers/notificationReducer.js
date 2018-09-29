const anecdotesAtStart = []



const initialState = {
    message: 'Initial state notification..'
}

const reducer = (store = initialState, action) => {
    if (action.type==='ADD_NOTIFICATION') {
        return { message: action.message }
    }
    if (action.type === 'CLEAR_NOTIFICATION') {
        return { message: '' }
    }
    return store
}

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}

export const addNotification = (message) => {

    return {
        type: 'ADD_NOTIFICATION',
        message
    }
}

export default reducer
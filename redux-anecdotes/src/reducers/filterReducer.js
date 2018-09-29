const initialState = {
    filter: ''
}

const reducer = (store = initialState, action) => {
    if (action.type==='ADD_FILTER') {
        return { filter: action.filter }
    }
    if (action.type === 'CLEAR_FILTER') {
        return { filter: '' }
    }
    return store
}

export const clearFilter = () => {
    return {
        type: 'CLEAR_FILTER'
    }
}

export const addFilter = (filter) => {

    return {
        type: 'ADD_FILTER',
        filter
    }
}

export default reducer
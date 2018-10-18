import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = []

const getId = () => (100000*Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (store = initialState, action) => {
    if (action.type==='VOTE') {
        console.log(action.id, store)
        const old = store.filter(a => a.id !==action.id)
        const voted = store.find(a => a.id === action.id)

        return [...old, { ...voted, votes: voted.votes + 1 } ]
    }
    if (action.type === 'CREATE') {
        return [...store, action.content]
    }
    if (action.type === 'INIT_ANECDOTES') {
        return action.content
    }

    return store
}

export const giveVote = (anecdote) => {
    return async (dispatch) => {
        await anecdoteService.updateVote(anecdote.id, {
            votes: anecdote.votes + 1
        })
        dispatch({
            type: 'VOTE',
            id: anecdote.id
        })
    }
}


export const createAnecdote = (content) => {
    return async (dispatch) => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch({
            type: 'CREATE',
            content: newAnecdote
        })
    }
}

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            content: anecdotes
        })
    }
}



export default reducer
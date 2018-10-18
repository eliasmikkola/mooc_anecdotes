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
        console.log(action.id, store);
        const old = store.filter(a => a.id !==action.id)
        const voted = store.find(a => a.id === action.id)

        return [...old, { ...voted, votes: voted.votes + 1 } ]
    }
    if (action.type === 'CREATE') {
        return [...store, { content: action.content, id: getId(), votes:0 }]
    }
    if (action.type === 'INIT_ANECDOTES') {
        return action.content
    }

    return store
}

export const giveVote = (id) => {

    return {
        type: 'VOTE',
        id
    }
}

export const createAnecdote = (content) => {
    return {
        type: 'CREATE',
        content
    }
}
export const anecdoteInitialization = (content) => {
    return {
        type: 'INIT_ANECDOTES',
        content
    }
}



export default reducer
import React from 'react'
import { giveVote } from '../reducers/anecdoteReducer.js'
import { clearNotification, addNotification } from '../reducers/notificationReducer.js'

class AnecdoteList extends React.Component {
  vote = (anecdote) => {
      this.props.store.dispatch(giveVote(anecdote.id))

      this.props.store.dispatch(addNotification(`Vote registered for ${anecdote.content}`))
      setTimeout(() => {
          this.props.store.dispatch(clearNotification())
      }, 5000)
  }
  render() {
      const filter = this.props.store.getState().filters.filter.toLowerCase()
      const anecdotes = this.props.store.getState().anecdotes.filter(n => n.content.toLowerCase().includes(filter))
      return (
          <div>
              <h2>Anecdotes</h2>
              {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                  <div key={anecdote.id}>
                      <div>
                          {anecdote.content}
                      </div>
                      <div>
                          has {anecdote.votes}
                          <button onClick={() =>
                              this.vote(anecdote)
                          }>
                              vote
                          </button>
                      </div>
                  </div>
              )}
          </div>
      )
  }
}

export default AnecdoteList

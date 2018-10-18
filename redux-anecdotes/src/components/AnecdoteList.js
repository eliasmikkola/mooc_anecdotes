import React from 'react'
import { giveVote } from '../reducers/anecdoteReducer.js'
import { clearNotification, addNotification } from '../reducers/notificationReducer.js'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes.js'


class AnecdoteList extends React.Component {
  vote = async (anecdote) => {
        const updatedAnecdote = await anecdoteService.updateVote(anecdote.id, {
            votes: anecdote.votes + 1
        })
        this.props.giveVote(updatedAnecdote.id)

        this.props.addNotification(`Vote registered for ${anecdote.content}`)
      setTimeout(() => {
          this.props.clearNotification()
      }, 5000)
  }
  render() {
      return (
          <div>
              <h2>Anecdotes</h2>
              {this.props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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
const filterAnecdotes = (anecdotes, filters) => {
    return anecdotes.filter(n => n.content.toLowerCase().includes(filters.filter.toLowerCase()))
}

const mapStateToProps = (state) => {
    return {
        anecdotes: filterAnecdotes(state.anecdotes, state.filters)
    }
}

const mapDispatchToProps = {
    clearNotification,
    addNotification,
    giveVote
}


const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdoteList
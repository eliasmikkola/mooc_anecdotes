import React from 'react'
import { giveVote } from '../reducers/anecdoteReducer.js'
import { clearNotification, addNotification } from '../reducers/notificationReducer.js'
import { connect } from 'react-redux'



class AnecdoteList extends React.Component {
  vote = (anecdote) => {
      this.props.giveVote(anecdote.id)

      this.props.addNotification(`Vote registered for ${anecdote.content}`)
      setTimeout(() => {
          this.props.clearNotification()
      }, 5000)
  }
  render() {
      const filter = this.props.filters.filter.toLowerCase()
      const anecdotes = this.props.anecdotes.filter(n => n.content.toLowerCase().includes(filter))
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
const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filters: state.filters
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
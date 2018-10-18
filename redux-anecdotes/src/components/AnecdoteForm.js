import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer.js'
import { clearNotification, addNotification } from '../reducers/notificationReducer.js'
import { connect } from 'react-redux'


/* eslint no-undef: 0 */ // --> OFF
class AnecdoteForm extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        this.props.createAnecdote(content)
        this.props.addNotification(`New anecdote "${content}" added.`)
        setTimeout(() => {
            this.props.clearNotification()
        }, 5000)
        e.target.anecdote.value = ''
    }
    render() {
        return (
            <div>
                <h2>create new</h2>
                <form onSubmit={this.handleSubmit}>
                    <div><input name='anecdote'/></div>
                    <button>create</button>
                </form>
            </div>
        )
    }
}


const mapDispatchToProps = {
    clearNotification,
    addNotification,
    createAnecdote
}

const ConnectedAnecdoteForm = connect(null,mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm

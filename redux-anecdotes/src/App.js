import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        anecdote: ''
    }
  }
  
  createNew = (e) => {
    e.preventDefault()
    this.props.store.dispatch({type:'CREATE',data: this.state.anecdote })
  }
  onInput = (e) => {
    console.log("here");
    this.setState({anecdote: e.target.value})
  }

  render() {
    const anecdotes = this.props.store.getState().sort((a,b) => b.votes - a.votes)
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.props.store.dispatch({type: 'VOTE', id: anecdote.id})}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form>
          <div><input onChange={this.onInput}/></div>
          <button onClick={this.createNew}>create</button> 
        </form>
      </div>
    )
  }
}

export default App
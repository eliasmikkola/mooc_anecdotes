import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'

const Menu = () => {
  
  return (<div class="navbar is-primary">   
        
          <NavLink activeClassName="is-active has-background-white	 navbar-item"  className="navbar-item" exact to="/anecdotes">
            anecdotes
          </NavLink >&nbsp;
        
          <NavLink activeClassName="is-active has-background-white	 navbar-item"  className="navbar-item" exact  to="/create">
            create new
          </NavLink >&nbsp;
        
          <NavLink activeClassName="is-active has-background-white	 navbar-item"  className="navbar-item" exact  to="/about">
            about
          </NavLink >&nbsp;
    </div>
  )
}

const Anecdote = ({anecdote}) => {
  return (
  <div class="box control">
      <h1 class="title">{anecdote.content}</h1>
      <h2 class="subtitle">{anecdote.author}</h2>
      <h4>{anecdote.votes} likes</h4>
      <p>for more link go to <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
)}

const Notification = ({notification}) => {
  return (
  <div  class="notification is-success">
      <p>{notification.message}</p>
  </div>
)}

const AnecdoteList = ({ anecdotes }) => (
  <div class="box control">
    <h2 class="title">Anecdotes</h2>
    
    {anecdotes.map((anecdote, index) => (
      
      <Link class="menu-label" key={index} to={`/anecdotes/${anecdote.id}/`} >
          <a class="panel-block menu">
            <span class="panel-icon">
              <i class="fas fa-book" aria-hidden="true"></i>
            </span>
            {anecdote.content}
          </a>
        </Link>
          )
        )}
  </div>
)

const About = () => (
  <div class="box">
    <h2 class="title">About anecdote app</h2>
    <div class="columns">
      <div class="column is-two-thirds">
        <p>According to Wikipedia:</p>
        
        <em>An anecdote is a brief, revealing account of an individual person or an incident. 
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
          An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>

      </div>
      <div class="column is-one-third">
        <img width="300px" height="auto" src="/turing.jpg"/>
      </div>
    </div>
  </div>
)

const Footer = () => (
  <div class="footer">
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/anecdotes')
  }

  render() {
    return(
      <div class="container">
        <h2 class="title">create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div class="control">
            <a class="label">content </a>
            <input class="input" name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            <a class="label">author</a>
            <input class="input" name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            <a class="label">url for more info</a>
            <input class="input" name='info' value={this.state.info} onChange={this.handleChange} />
          </div> 
          <button class="button is-primary"> create</button>
        </form>
      </div>  
    )

  }
}

const NotificationList = ({notifications}) => (
  <div>
    {
      notifications.map((n, index) => <Notification key={index} notification={n}/>)
    }  
  </div>
  
)

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notifications: []
    } 
  }

  addNew = (anecdote) => {
    const id = (Math.random() * 10000).toFixed(0)
    anecdote.id = id
    
    this.setState(prevState => ({ 
      anecdotes: this.state.anecdotes.concat(anecdote),
      notifications: prevState.notifications.concat({
        message: `New anecdote "${anecdote.content}" added!`,
        id: id
      })
    }))
    setTimeout(() => {
      this.setState(prevState => ({ 
        notifications: [...prevState.notifications.filter(n=>n.id !== id)]
      }))
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    
    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }
  anecdoteById = (id) => this.state.anecdotes.find(anecdote => anecdote.id === id)
  
  render() {
    return (
      <div>
          <h1 class="title">Software anecdotes</h1>
          <NotificationList notifications={this.state.notifications}/>
          <Router>
            <div>
              <Menu />
              <Route exact path="/anecdotes/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
              <Route path="/about" render={() => <About/>} />      
              <Route path="/create" render={({history}) => <CreateNew history={history} addNew={this.addNew}/>} />
              <Route exact path="/anecdotes/:id" render={({match}) =>
                  <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
              />
            </div>
          </Router>
        <Footer />
      </div>
    );
  }
}

export default App;

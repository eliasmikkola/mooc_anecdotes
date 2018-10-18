import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'

const Menu = () => {
  const menuStyle = {
    color: 'white',
    'height': '50px',
    backgroundColor: '#194d33'
  }
  const linkStyle = {
    color: 'white',
    fontWeight: 'bold',
    lineHeight: '50px',
    'height': '50pximportant',
    width: 100,
    marginRight: 10,
    backgroundColor: '#194d33'
  }
  const activeLinkStyle = {
    color: '#194d33',
    fontWeight: 'bold',
    lineHeight: '20px',
    width: 100,
    backgroundColor: 'white'
  }
  return (<div style={menuStyle}>    
      <NavLink exact style={linkStyle} activeStyle={activeLinkStyle} to="/anecdotes">anecdotes</NavLink>&nbsp;
      <NavLink exact style={linkStyle}  activeStyle={activeLinkStyle}  to="/create">create new</NavLink>&nbsp;
      <NavLink exact style={linkStyle}  activeStyle={activeLinkStyle}  to="/about">about</NavLink>&nbsp;
    </div>
  )
}

const Anecdote = ({anecdote}) => {
  console.log("IN ANEC", anecdote);
  return (
  <div>
      <h1>{anecdote.content}</h1>
      <h2>{anecdote.author}</h2>
      <h4>{anecdote.votes} likes</h4>
      <p>for more link go to <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
)}

const Notification = ({notification}) => {
  const style = {
    border: '1px solid green',
    color: 'green',
    padding: 5,
    'border-radius': 5
  }
  return (
  <div  style={style}>
      <p>{notification.message}</p>
  </div>
)}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote, index) => <li key={anecdote.id}>
          <Link key={index} to={`/anecdotes/${anecdote.id}/`} >
            {anecdote.content}
          </Link>
        </li>
        )}
    </ul>  
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    
    <em>An anecdote is a brief, revealing account of an individual person or an incident. 
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
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
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content 
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div> 
          <button>create</button>
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
        <h1>Software anecdotes</h1>
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

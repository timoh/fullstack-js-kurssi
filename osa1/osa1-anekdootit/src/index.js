import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: {}
    }
  }

  indexRandomAnecdote = () => {
    return Math.floor(Math.random() * Math.floor(anecdotes.length-1));
  }

  nextAnecdote = () => {
    const idx = this.indexRandomAnecdote()

    // const newAnecdote = anecdotes[idx]
    // console.log("uusi anekdootti numerolla ",idx," ",newAnecdote)

    this.setState({selected: idx})
  }

  voteCurrentAnecdote = () => {
    const key = this.state.selected

    const uusiVotes = this.state.votes
    if (uusiVotes[key] === undefined) {
        uusiVotes[key] = 1
    } else {
        uusiVotes[key] = uusiVotes[key] + 1
    }
    
    // console.log("päivitetty votes:", uusiVotes)

    this.setState({votes: uusiVotes})
  }

  render() {
      if (this.state.votes[this.state.selected] === undefined){
        return (
            <div>
              <p>{this.props.anecdotes[this.state.selected]}</p>
              <p>has 0 votes</p>
      
              <div>
                <button onClick={this.voteCurrentAnecdote}>vote</button>
                <button onClick={this.nextAnecdote}>next anecdote</button>
              </div>
      
            </div>
          )
      } else {
        return (
            <div>
              <p>{this.props.anecdotes[this.state.selected]}</p>
              <p>has {this.state.votes[this.state.selected]} votes</p>
      
              <div>
                <button onClick={this.voteCurrentAnecdote}>vote</button>
                <button onClick={this.nextAnecdote}>next anecdote</button>
              </div>
      
            </div>      
          )
      }
    
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
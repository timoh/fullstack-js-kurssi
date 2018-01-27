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
    return Math.floor(Math.random() * Math.floor(anecdotes.length - 1));
  }

  nextAnecdote = () => {
    const idx = this.indexRandomAnecdote()

    // const newAnecdote = anecdotes[idx]
    // console.log("uusi anekdootti numerolla ",idx," ",newAnecdote)

    this.setState({ selected: idx })
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

    this.setState({ votes: uusiVotes })
  }

  getIndexWithMostVotes = () => {
    const vots = this.state.votes

    let idx = null
    if (Object.keys(vots).length > 0) { 
      idx = Object.keys(vots).reduce((a, b) => vots[a] > vots[b] ? a : b)
    }

    return idx
    
  }

  render() {

    const MostVotes = () => {

      const ShowVoteCount = () => {

        if (this.state.votes[this.getIndexWithMostVotes()] > 0) {
          return(
            <p>has {this.state.votes[this.getIndexWithMostVotes()]} votes</p>
          )
        } else {
          return(
            <p>no votes yet..</p>
          )
        }

      }

      return (
        <div>
          <h2>anecdote with most votes</h2>

          <p>{this.props.anecdotes[this.getIndexWithMostVotes()]}</p>
          <ShowVoteCount />

        </div>
      )
    }

    const Buttons = () => {
      return (
        <div>
          <button onClick={this.voteCurrentAnecdote}>vote</button>
          <button onClick={this.nextAnecdote}>next anecdote</button>
        </div>
      )
    }

    const Anecdote = () => {
      if (this.state.votes[this.state.selected] === undefined) {
        return (
          <div>
          <p>{this.props.anecdotes[this.state.selected]}</p>
          <p>has 0 votes</p>
          </div>
        )
      } else {
        return (
          <div>
            <p>{this.props.anecdotes[this.state.selected]}</p>
            <p>has {this.state.votes[this.state.selected]} votes</p>
          </div>
        )
      }

    }

    return (
      <div>
        <Anecdote />
        <Buttons />
        <MostVotes />
      </div>
    )
    

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
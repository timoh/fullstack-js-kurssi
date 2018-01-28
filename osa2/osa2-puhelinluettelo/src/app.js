import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  submitForm = (e) => {
    e.preventDefault()

    const newPerson = {name: this.state.newName}

    const persons = this.state.persons.concat(newPerson)

    this.setState({
      persons: persons,
      newName: ''
    })
  }

  nameChange = (e) => {
    this.setState({newName: e.target.value})
  }

  render() {

    const Numerot = () => {
      return(
        <div>
            {this.state.persons.map(person => <p key={person.name}>{person.name}</p>)}
        </div>
      )
    }

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.submitForm}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.nameChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <Numerot />
      </div>
    )
  }
}

export default App
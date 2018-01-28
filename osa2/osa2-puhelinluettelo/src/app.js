import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' }
      ],
      newName: '',
      newNumber: ''
    }
  }

  submitForm = (e) => {
    e.preventDefault()

    const newName = this.state.newName
    const newNumber = this.state.newNumber
    const match = this.state.persons.find(function(element){
      return (newName === element['name'])
    })

    // console.log("match",match)

    if (match) {
      this.setState({
        newName: '',
        newNumber: ''
      })
      alert("Löytyy jo!")
    } else {
      const newPerson = {name: newName, number: newNumber}

      const persons = this.state.persons.concat(newPerson)
  
      this.setState({
        persons: persons,
        newName: '',
        newNumber: ''
      })
    }

  }

  nameChange = (e) => {
    this.setState({newName: e.target.value})
  }

  numberChange = (e) => {
    this.setState({newNumber: e.target.value})
  }

  render() {

    const Numerot = () => {
      return(
        <div>
            <table>
              <tbody>
                {this.state.persons.map(person => <tr key={person.name}><td>{person.name}</td><td>{person.number}</td></tr>)}
              </tbody>
            </table>
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
            numero: <input value={this.state.newNumber} onChange={this.numberChange} />
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
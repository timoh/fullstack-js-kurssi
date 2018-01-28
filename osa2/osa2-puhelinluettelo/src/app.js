import React from 'react';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentWillMount() {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        this.setState({ persons: response.data })
      })
  }

  nameChange = (e) => {
    this.setState({ newName: e.target.value })
  }

  numberChange = (e) => {
    this.setState({ newNumber: e.target.value })
  }

  submitForm = (e) => {
    e.preventDefault()

    const newName = this.state.newName
    const newNumber = this.state.newNumber
    const match = this.state.persons.find(function (element) {
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
      const newPerson = { name: newName, number: newNumber }

      const persons = this.state.persons.concat(newPerson)

      this.setState({
        persons: persons,
        newName: '',
        newNumber: ''
      })
    }

  }

  filterChange = (e) => {
    this.setState({ filter: e.target.value })
  }

  render() {
    return (
      <div>
        <Rajaus filter={this.state.filter} filterChange={this.filterChange} />
        <Lomake state={this.state} submitForm={this.submitForm} nameChange={this.nameChange} numberChange={this.numberChange} />
        <Numerot state={this.state} />
      </div>
    )
  }
}

const Rajaus = (props) => {

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <div>
        rajaa näytettäviä <input value={props.filter} onChange={props.filterChange} />
      </div>
    </div>
  )
}

const Lomake = (props) => {

  return (
    <div>
      <h3>Lisää uusi</h3>
      <form onSubmit={props.submitForm}>
        <div>
          nimi: <input value={props.state.newName} onChange={props.nameChange} />
        </div>
        <div>
          numero: <input value={props.state.newNumber} onChange={props.numberChange} />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
    </div>
  )
}

const Numerot = (props) => {

  const filter = props.state.filter

  if (filter.length > 0) {

    const matcher = new RegExp(filter, "i")

    return (
      <div>
        <h3>Numerot</h3>
        <table>
          <tbody>
            {props.state.persons.filter(person => matcher.test(person.name)).map(person => <tr key={person.number}><td>{person.name}</td><td>{person.number}</td></tr>)}
          </tbody>
        </table>
      </div>
    )

  } else {
    return (
      <div>
        <h3>Numerot</h3>
        <table>
          <tbody>
            {props.state.persons.map(person => <tr key={person.number}><td>{person.name}</td><td>{person.number}</td></tr>)}
          </tbody>
        </table>
      </div>
    )
  }

}

export default App
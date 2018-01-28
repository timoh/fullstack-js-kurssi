import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  nameChange = (e) => {
    console.log("Name change:")
    console.log(this)
    this.state.setState({ newName: e.target.value })
  }

  numberChange = (e) => {
    this.state.setState({ newNumber: e.target.value })
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

      this.state.setState({
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
        <Rajaus filtteri={this.state.filter} />

        <Lomake state={this.state} nameChange={this.nameChange} numberChange={this.numberChange} />

        <h3>Numerot</h3>
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
        rajaa näytettäviä <input value={props.filtteri} onChange={this.filterChange} />
      </div>
    </div>
  )
}

const Lomake = (props) => {

  console.log(props.state)
  console.log(props.nameChange)

  return (
    <div>
      <h3>Lisää uusi</h3>
      <form onSubmit={this.submitForm}>
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
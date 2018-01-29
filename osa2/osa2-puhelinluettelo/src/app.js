import React from 'react';
import personsService from './services/persons'

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
    this.getAllPeople()
  }

  getAllPeople() {
    personsService
    .getAll()
    .then(response => {
      this.setState({ persons: response.data })
    })
  }

  createNewPerson = (newPerson) => {
    personsService
    .create(newPerson)
    .then(response => {
      
      const id = response.data.id
      const newPersonWithId = {...newPerson, id}
      this.updatePersonList(newPersonWithId)
    })
  }

  updatePerson = (updatedPerson) => {
    personsService
    .update(updatedPerson.id, updatedPerson)
    .then(response => {
      this.updatePersonList(updatedPerson)
    })
  }

  updatePersonList = () => {
    this.getAllPeople()
  }

  nameChange = (e) => {
    this.setState({ newName: e.target.value })
  }

  numberChange = (e) => {
    this.setState({ newNumber: e.target.value })
  }

  getPerson = (id) => {
    return personsService.get(id)
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

      if (!newNumber || newNumber.length <= 0) {
        // case: ei numeroa
        alert("Löytyy jo!")
      } else {
        // case: korvataan / lisätään numero

        this.getPerson(match.id).then(response => {
          const oldPerson = response.data

          const newPerson = { name: oldPerson.name, number: newNumber, id: oldPerson.id }

          const message = `Person ${newPerson.name} already exists, do you want to replace their number?`
          const result = window.confirm(message);
          if (result === true) {
            this.updatePerson(newPerson)
            console.log("Updated person ", newPerson.id)
          } else {
            console.log("Not updated, as requested.")
          }        
        })
      }

    } else {
      const newPersonWithoutId = { name: newName, number: newNumber }

      this.createNewPerson(newPersonWithoutId)
    }

    this.setState({
      newName: '',
      newNumber: ''
    })

  }

  filterChange = (e) => {
    this.setState({ filter: e.target.value })
  }

  deletePerson = (id) => {
    personsService
    .del(id)
    .then(response => {
      this.getAllPeople()
    }).catch(error => {
      console.log('Deletion failed..')
    })
  }

  handleDelete = (e) => {
    const id = e.target.id
    const message = `are you sure you want to delete person number ${id}`
    const result = window.confirm(message);
    if (result === true) {
      this.deletePerson(id)
      console.log("Deleted person ", id)
    } else {
      console.log("Not deleted, as requested.")
    }
    
   
  }

  render() {
    return (
      <div>
        <Rajaus filter={this.state.filter} filterChange={this.filterChange} />
        <Lomake state={this.state} submitForm={this.submitForm} nameChange={this.nameChange} numberChange={this.numberChange} />
        <Numerot state={this.state} handleDelete={this.handleDelete} />
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
            {props.state.persons
            .filter(person => 
              matcher.test(person.name))
            .map(person => 
              <tr key={person.number}><td>{person.name}</td><td>{person.number}</td></tr>)}
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
            {props.state.persons
            .map(person => 
              <tr key={person.name}>
                <td>{person.name}</td>
                <td>{person.number}</td>
                <td><button id={person.id} onClick={props.handleDelete}>poista</button></td>
              </tr>)}
          </tbody>
        </table>
      </div>
    )
  }

}

export default App
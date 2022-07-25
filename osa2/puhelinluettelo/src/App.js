import axios from 'axios'
import { useState, useEffect } from 'react'

const Filter = ({ filter, handleChange }) => (
  <div>
    filter shown with <input value={filter} onChange={handleChange} />
  </div>
)

const PersonForm = (props) => (
  <div>
    <h2>Add a new person</h2>
    <form onSubmit={props.addPersonHandler}>
      <div>
        name: <input value={props.newName} onChange={props.nameHandler} /><br />
        number: <input value={props.newNumber} onChange={props.numberHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>
)

const Person = ({ person }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
  </tr>
)

const Persons = ({ persons, filter }) => (
  <div>
    <h2>Numbers</h2>
    <table>
      <thead></thead>
      <tbody>
        {persons.filter((person) => person.name.toLowerCase().includes(filter))
          .map((person) => (
            <Person key={person.name} person={person} />
          ))}
      </tbody>
    </table>
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())
      === undefined) {
      setPersons(persons.concat({ name: newName, number: newNumber }))
    } else {
      alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value.toLowerCase())
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handleChange={handleFilterChange} />
      <PersonForm addPersonHandler={addPerson}
        newName={newName} nameHandler={handleNameChange}
        newNumber={newNumber} numberHandler={handleNumberChange} />
      <Persons persons={persons} filter={newFilter} />
    </div>
  )

}

export default App
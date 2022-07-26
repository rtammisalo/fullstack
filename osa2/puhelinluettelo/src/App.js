import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'

const Filter = ({ filter, handleChange }) => (
  <div>
    filter shown with <input value={filter} onChange={handleChange} />
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personsService
      .getPersons()
      .then(newPersons => { setPersons(newPersons) })
  }, [])

  const updatePerson = (inputPerson) => {
    if (window.confirm(`${inputPerson.name} is already added to the phonebook, \
replace the old number with a new one?`)) {
      personsService
        .updatePerson(inputPerson)
        .then(updatedPerson => {
          setPersons(persons.map(person =>
            person.id === updatedPerson.id ? updatedPerson : person
          ))
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    let inputPerson = { name: newName, number: newNumber }
    let findResult = persons
      .find((person) => person.name.toLowerCase() === newName.toLowerCase())

    if (findResult === undefined) {
      personsService
        .createPerson(inputPerson)
        .then(newPerson => { setPersons(persons.concat(newPerson)) })
    } else {
      inputPerson = { ...findResult, number: inputPerson.number }
      updatePerson(inputPerson)
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (selectedPerson) => {
    if (window.confirm(`Delete ${selectedPerson.name}?`)) {
      personsService.deletePerson(selectedPerson)
        .catch(error => alert('Selected person does not exist'))
      setPersons(persons.filter(person => person.id !== selectedPerson.id))
    }
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
      <Persons persons={persons} filter={newFilter} deletePerson={deletePerson} />
    </div>
  )

}

export default App
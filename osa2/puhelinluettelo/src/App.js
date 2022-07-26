import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'

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
  const [notification, setNotification] = useState('')
  const [notificationSuccess, setNotificationSuccess] = useState(false)

  useEffect(() => {
    personsService
      .getPersons()
      .then(newPersons => { setPersons(newPersons) })
  }, [])

  const notifyUser = (message, success) => {
    setNotification(message)
    setNotificationSuccess(success)
    setTimeout(() => setNotification(''), 5000)
  }

  const personNotFoundMessage = (person) => (`Information of ${person.name} ` +
    `has already been removed from server`)

  const updatePerson = (inputPerson) => {
    if (window.confirm(`${inputPerson.name} is already added to the phonebook, ` +
      `replace the old number with a new one?`)) {
      personsService
        .updatePerson(inputPerson)
        .then(updatedPerson => {
          setPersons(persons.map(person =>
            person.id === updatedPerson.id ? updatedPerson : person
          ))
          notifyUser(`Updated number for ${inputPerson.name}`, true)
        })
        .catch(error => {
          switch (error.request.status) {
            case 404:
              notifyUser(personNotFoundMessage(inputPerson), false)
              setPersons(persons.filter(p => p.id !== inputPerson.id))
              break
            case 400:
              if (error.response) {
                notifyUser(error.response.data, false)
              }
              break
            default:
          }
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
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          notifyUser(`Added ${inputPerson.name}`, true)
        })
        .catch(error => {
          if (error.response) {
            notifyUser(error.response.data, false)
          } else {
            notifyUser('Add failed', false)
          }
        })

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
        .then(data => {
          notifyUser(`Removed ${selectedPerson.name}`, true)
        })
        .catch(error => notifyUser(personNotFoundMessage(selectedPerson), false))
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
      <Notification message={notification} success={notificationSuccess} />
      <Filter filter={newFilter} handleChange={handleFilterChange} />
      <PersonForm addPersonHandler={addPerson}
        newName={newName} nameHandler={handleNameChange}
        newNumber={newNumber} numberHandler={handleNumberChange} />
      <Persons persons={persons} filter={newFilter} deletePerson={deletePerson} />
    </div>
  )

}

export default App

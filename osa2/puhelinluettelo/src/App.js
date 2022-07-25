import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())
      === undefined) {
      setPersons(persons.concat({ name: newName }))
      setNewName('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <thead></thead>
        <tbody>
          {persons.map((person) => (
            <tr key={person.name}>
              <td>{person.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

}

export default App
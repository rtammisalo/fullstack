import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getPersons = () => {
  return (axios
    .get(baseURL)
    .then(response => response.data)
  )
}

const updatePerson = (person) => {
  return (axios
    .put(`${baseURL}/${person.id}`,
      { name: person.name, number: person.number })
    .then(response => response.data)
  )
}

const createPerson = (newPerson) => {
  return (axios
    .post(baseURL, newPerson)
    .then(response => response.data)
  )
}

const deletePerson = (person) => {
  return (axios
    .delete(`${baseURL}/${person.id}`)
  )
}

const personsService = { getPersons, updatePerson, createPerson, deletePerson }

export default personsService
import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getPersons = () => {
  return (axios
    .get(baseURL)
    .then(response => response.data))
}

const updatePerson = (person) => {
  return (axios
    .put(`${baseURL}/${person.id}`, person)
    .then(response => response.data))
}

const createPerson = (newPerson) => {
  return (axios
    .post(baseURL, newPerson)
    .then(response => response.data))
}

const personsService = { getPersons, updatePerson, createPerson }

export default personsService
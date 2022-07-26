const Person = ({ person, deletePerson }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
    <td><button onClick={() => deletePerson(person)}>delete</button></td>
  </tr>
)

const Persons = ({ persons, filter, deletePerson }) => (
  <div>
    <h2>Numbers</h2>
    <table>
      <thead></thead>
      <tbody>
        {persons.filter((person) => person.name.toLowerCase().includes(filter))
          .map((person) => (
            <Person key={person.name} person={person} deletePerson={deletePerson} />
          ))}
      </tbody>
    </table>
  </div>
)

export default Persons
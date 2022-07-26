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

export default Persons
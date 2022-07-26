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

export default PersonForm
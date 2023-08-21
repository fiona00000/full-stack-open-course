const Person = ({ person, remove }) => {
  const deletePerson = () => {
    if (window.confirm(`Delete ${person.name} ?`))
     remove(person.id)
  }
  return (
    <p>{person.name} {person.number} &nbsp;
    <button onClick={deletePerson}>delete</button></p>
  )
}

export default Person
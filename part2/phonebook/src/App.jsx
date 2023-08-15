import { useState } from 'react'

const Person = ({ name }) => {
  return (
    <p>{name}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 }
  ])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const exist = persons.some(person => {
      return JSON.stringify(newName) === JSON.stringify(person.name)
    })
    if (exist)
      alert(`${newName} is already added to phonebook`)
    else {
      const personObject = {
        name: newName,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
      setNewName('')      
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      
      {persons.map(person =>
        ( <Person key={person.id} name={person.name} /> )
      )}
      
    </div>
  )
}

export default App
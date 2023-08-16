import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const  handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
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
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }
  
  const displayPhonebook = search
  ? persons.filter(person => {return person.name.toUpperCase().includes(search.toUpperCase())})
  : persons
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with <input value={search} onChange={handleSearch} />
        </div>
      </form>

      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>

      <h2>Numbers</h2>        
      {displayPhonebook.map(person =>
        ( <Person key={person.id} person={person} /> )
      )}
      
    </div>
  )
}

export default App
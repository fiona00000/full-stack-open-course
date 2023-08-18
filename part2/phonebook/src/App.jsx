import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = ({search, handleSearch}) => {
  return (
    <form>
        <div>
          filter shown with <input value={search} onChange={handleSearch} />
        </div>
    </form>
  )
}

const PersonForm = ({newName, handleNameChange, newNumber, handleNumberChange, addPerson}) => {
  return (
    <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
    </form>
  )
}

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

const Persons = ({ displayPhonebook, remove }) => {
  return (
    <>
    {displayPhonebook.map(person =>
        ( <Person key={person.id} person={person} remove={remove} /> )
      )}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('Effect starting...')
    personService
      .getAll()
      .then(initPersons => {
        console.log('Promise fulfilled')
        setPersons(initPersons)
      })
  },[])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
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

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }  

  const deletePerson = id => {
    const person = persons.find(idx => idx.id === id)

    personService
      .remove(id)
      .then(() => {        
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(err => {
        console.log(err)
        alert(`${person.name} has been deleted from server`)
      })
  }
  
  const displayPhonebook = search
  ? persons.filter(person => {return person.name.toUpperCase().includes(search.toUpperCase())})
  : persons
  
  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter search={search} handleSearch={handleSearch} />
      
      <h3>add a new</h3>
      <PersonForm newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
        addPerson={addPerson} />

      <h3>Numbers</h3>        
      <Persons displayPhonebook={displayPhonebook} remove={deletePerson}/>
      
    </div>
  )
}

export default App
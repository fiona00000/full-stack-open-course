import { useState, useEffect } from 'react'

import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState({message: '', type: null})

  useEffect(() => {
    console.log('Effect starting...')
    personService
      .getAll()
      .then(initPersons => {
        console.log('Promise fulfilled')
        setPersons(initPersons)
      })
  },[])
  

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

    if (exist) {
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      updatePerson(persons.find(person => JSON.stringify(newName) === JSON.stringify(person.name)))
      setNotification({message: `Updated ${newName}`, type: "success"})
    } else {
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
          setNotification({message: `Added ${returnedPerson.name}`, type: "success"})})
    }
    setTimeout(() => {
        setNotification({message: '', type: null})
      }, 5000)
  }  

  const deletePerson = id => {
    personService
      .remove(id)
      .then(() => {        
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(err => {
        console.log(err)
      })
  }

  const updatePerson = personObj => {
    const person = persons.find(person => person.id === personObj.id)
    const updatedPerson = { ...person, "number": newNumber }
    
    personService
      .update(updatedPerson.id, updatedPerson)
      .then(response => {        
        setPersons(persons.map(person => person.id !== response.id ? person : response))
        setNewName('')
        setNewNumber('')
      })
      .catch(err => {
        console.log(err)
        setNotification({ message: `${person.name} was already deleted from server`, type: "error" })
        setTimeout(() => {
        setNotification({message: '', type: null})
      }, 5000)
      })
  }
  
  const displayPhonebook = search
  ? persons.filter(person => {return person.name.toUpperCase().includes(search.toUpperCase())})
  : persons
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
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
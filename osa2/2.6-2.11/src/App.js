import React, { useState, useEffect } from 'react'
import personsService from './services/persons.js'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    personsService.getAll()
    .then(persons => {
      setPersons(persons)
    })

  },[])
  console.log('render', persons.length, 'persons')

  const filteredPersons = persons.filter(person => {
    return person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = { name: newName, number: newNumber }
    personsService.create(newPerson).then(createdPerson => {
      setPersons(persons.concat(createdPerson))
      setNewName('')
      setNewNumber('')
    })
  }
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = id => {
    const desiredPersonToDelete = persons.find(person => person.id === id)
    console.log(`You are about to delete ${desiredPersonToDelete.name}`)
    if (window.confirm(`Delete ${desiredPersonToDelete.name}?`)) {
      personsService.remove(id).then(res => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        alert(
          `Cannot remove '${desiredPersonToDelete.name}' since not found from server`
        )
        setPersons(persons.filter(p => p.id !== id))
      })
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm filter={filter} handleFilterChange={handleFilterChange} />
      
      <h3>Add a new</h3>
      <PersonForm newName={newName} 
                  handleNewName={handleNewName} 
                  newNumber={newNumber} handleNewNumber={handleNewNumber} 
                  handleSubmit={handleSubmit} />
                  
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deleteHandler={handleDelete}/>
    </div>
  )

}

export default App
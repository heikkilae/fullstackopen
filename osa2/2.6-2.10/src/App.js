import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      console.log('response', response)
      setPersons(response.data)
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
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
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
      <Persons persons={filteredPersons}/>
    </div>
  )

}

export default App
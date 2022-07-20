import { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ({newNameSearch, handleNewNameSearchChange}) => {
  return(
    <div>
    filter shown with: <input
                        value={newNameSearch}
                        onChange={handleNewNameSearchChange}
                        />
    </div>
  )
}

const PersonForm = ({addEntry, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return(
    <form onSubmit={addEntry}>
    <div>
      name: <input 
              value={newName}
              onChange={handleNameChange}                
            />
      number: <input 
              value={newNumber}
              onChange={handleNumberChange}
              />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
    </form>
  )
}

const Persons = ({persons}) => {
  return(
    <ul>
      {persons.map(person => <li key={person.name}>{person.name}:  {person.number}</li>)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Enter a new name')
  const [newNumber, setNewNumber] = useState('000-000-0000')
  const [newNameSearch, setNewNameSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response)
        setPersons(response.data)
      })
  }, [])

  const addEntry = (event) => {
    event.preventDefault()    
    if ((persons.find(person => person.name === newName)) === undefined) {
      const personObj = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(personObj))
    }
    else {
      alert(`${newName} is already in your phonebook!`)
    }
    setNewName('')
    setNewNumber('')
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log('handleNumberChange', event.target.value)
    setNewNumber(event.target.value)
  }
  const handleNewNameSearchChange = (event) => {
    setNewNameSearch(event.target.value)
    const newPersonObj = persons.filter(person => person.name.toLowerCase().includes(newNameSearch))
    setPersons(newPersonObj)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newNameSearch={newNameSearch} handleNewNameSearchChange={handleNewNameSearchChange} />

      <h3>Add A New Person:</h3>

      <PersonForm addEntry={addEntry} newName={newName} handleNameChange={handleNameChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      
      <Persons persons={persons} />
    </div>
  )
}

export default App
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      id:1
     }
  ]) 
  const [newName, setNewName] = useState('')

  const newPerson=(event)=>{
    event.preventDefault()
    const newObject={
      name:newName,
      id: persons.length +1
    }
    setPersons(persons.concat(newObject))
    setNewName('')
  }

  const handlePersonChange=(event)=>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const existingName=persons.some(person=>person.name===newName)
if (persons.some(person=>person.name===newName)){
  alert(`${newName} is already added to phonebook`)
  setNewName('')
}
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={newPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handlePersonChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person=>(
          <li key={person.id}>
            {person.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
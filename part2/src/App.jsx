import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number:'050 345 876',
      id:1
     }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber]=useState('')

  const newPerson=(event)=>{
    event.preventDefault()
    const newObject={
      name:newName,
      id: persons.length +1,
      number:newNumber
    }
    setPersons(persons.concat(newObject))
    setNewName('')
    setNewNumber('')
  }

  const handlePersonChange=(event)=>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumbers=(event)=>{
    setNewNumber(event.target.value)
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
          number: <input 
             value={newNumber}
             onChange={handleNumbers} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person=>(
          <li key={person.id}>
            {person.name}  {' '}
            {person.number}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
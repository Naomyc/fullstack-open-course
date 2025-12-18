import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {  name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
     
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber]=useState('')
  const [filter,setFilter]=useState('')

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
  const handleFilterChnage=(event)=>{
    setFilter(event.target.value)
  }
  const personsToShow=persons.filter(person=>person.name.toLowerCase().includes(filter.toLowerCase()))
  const existingName=persons.some(person=>person.name===newName)
if (persons.some(person=>person.name===newName)){
  alert(`${newName} is already added to phonebook`)
  setNewName('')
}
  return (
    <div>
      <div>filter shown with <input value={filter} onChange={handleFilterChnage} /></div>
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
        {personsToShow.map(person=>(
          <li key={person.id}>
            {person.name}-{person.number}
          </li>
        ))}
      </ul>

    </div>
  )
}

export default App
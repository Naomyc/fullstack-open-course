import { useEffect, useState } from "react";
import personsService from './services/persons'


import axios from "axios"

const Filter = (props) => {
  return (
    <div>
      <p>
        filter shown with{" "}
        <input value={props.filter} onChange={props.handleFilterChange} />
      </p>
    </div>
  );
};

const Phonebook = () => {
  return <h2>Phonebook</h2>;
};
const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.newPerson}>
        <div>
          name:{" "}
          <input value={props.newName} onChange={props.handlePersonChange} />
        </div>
        <div>
          number:{" "}
          <input value={props.newNumber} onChange={props.handleNumbers} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};
const Persons = ({personsToShow,handleDelete}) => {
  return (
    <div>
      <ul>
        {personsToShow.map((person) => (
          <li key={person.id}>
            {person.name}-{person.number}
            <button onClick={()=>handleDelete(person.id,person.name)} >delete</button>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
useEffect(()=>{
 personsService
 .getAll()
  .then(initialPersons=>{
  setPersons(initialPersons)
  console.log(initialPersons)
})
},[])
  const newPerson = (event) => {
    event.preventDefault();
    const newObject = {
      name: newName,
      number: newNumber,
    }
    personsService
    .create(newObject)
    .then(returnedPerson=>{setPersons(persons.concat(returnedPerson))
    setNewName("");
    setNewNumber("");
    })
  };
  const personsUpdate=id=>{
    const person= persons.find(p=>p.id===id)
    const changePerson={...person,number:newNumber}
    personsService
    .update(id,changePerson)
    .then(returnedPerson=>{setPersons(persons.map(person=>person.id===id ? returnedPerson:person))})
  }

  const handleDelete=(id,name)=>{
  
  if (window.confirm(`Delete ${name}?`)){
    personsService
    .remove(id)
    .then(()=>{
      setPersons(persons.filter(p=>p.id !==id))
    });
  
}}
  const handlePersonChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumbers = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  const existingName = persons.some((person) => person.name === newName);
  if (persons.some((person) => person.name === newName)) {
    alert(`${newName} is already added to phonebook`);
    setNewName("");
    return;
  }
  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Phonebook />
      <h3>Add a new person</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        newPerson={newPerson}
        handlePersonChange={handlePersonChange}
        handleNumbers={handleNumbers}
      />
      <h3>Numbers</h3>
      <Persons 
      personsToShow={personsToShow}
      handleDelete={handleDelete} />
    </div>
  );
};

export default App;

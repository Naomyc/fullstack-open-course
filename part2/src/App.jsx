import { useEffect, useState } from "react";


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
const Persons = (props) => {
  return (
    <div>
      <ul>
        {props.personsToShow.map((person) => (
          <li key={person.id}>
            {person.name}-{person.number}
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
  axios.get('http://localhost:3001/persons')
  .then(response=>{
  setPersons(response.data)
  console.log(response)
})
},[])
  const newPerson = (event) => {
    event.preventDefault();
    const newObject = {
      name: newName,
      number: newNumber,
    }
    axios
    .post('http://localhost:3001/persons',newObject)
    .then(response=>{setPersons(persons.concat(response.data))
    setNewName("");
    setNewNumber("");
    })
  };

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
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;

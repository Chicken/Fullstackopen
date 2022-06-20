import React from "react"

const Person = ({ person, deletePerson }) => <li key={person.name}>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>Delete</button></li>

export default Person

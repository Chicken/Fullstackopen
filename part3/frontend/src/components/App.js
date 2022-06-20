import React, { useEffect, useState } from "react"
import PhoneBook from "./PhoneBook"
import Search from "./Search"
import NewPerson from "./NewPerson"
import Notification from "./Notification"
import api from "../services/people"

const App = () => {
  const [people, setPeople] = useState([])
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [message, setMessage] = useState({ type: null, text: null })

  useEffect(() => {
    api.getAll()
      .then((data) => setPeople(data))
  }, [])

  const add = (e) => {
    e.preventDefault()
    const found = people.find((p) => p.name === name)
    if (found) {
      if (window.confirm(`${name} is already in the phonebook, replace old number with a new one?`)) {
        api
          .update(found.id, {
            name,
            number
          })
          .then(() => {
            setMessage({
              type: "success",
              text: `Updated ${name}`
            })
            setTimeout(() => setMessage({ type: null, text: null }), 5000)
            const peopleCopy = [...people]
            const index = peopleCopy.findIndex((p) => p.id === found.id)
            peopleCopy[index] = { name, number, id: found.id }
            setPeople(peopleCopy)
            setName("")
            setNumber("")
          })
          .catch((err) => {
            setName("")
            setNumber("")
            setMessage({
              type: "error",
              text: err.response.data.error,
            })
            setTimeout(() => setMessage({ type: null, text: null }), 5000)
          })
      }
    } else {
      api
        .create({
          name,
          number
        })
        .then((data) => {
          setMessage({
            type: "success",
            text: `Added ${name}`
          })
          setTimeout(() => setMessage({ type: null, text: null }), 5000)
          setPeople(people.concat(data))
          setName("")
          setNumber("")
        })
        .catch((err) => {
          setMessage({
            type: "error",
            text: err.response.data.error,
          });
          setTimeout(() => setMessage({ type: null, text: null }), 5000)
        })
    }
  }

  const deletePerson = (id) => {
    const person = people.find((p) => p.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      api
        .deleteNum(id)
        .then(() => {
          setPeople([...people].filter((p) => p.id !== id))
          setMessage({
            type: "success",
            text: `Deleted ${person.name}`
          })
          setTimeout(() => setMessage({ type: null, text: null }), 5000)
        })
        .catch((err) => {
          setMessage({
            type: "error",
            text: err.response.data.error,
          })
          setTimeout(() => setMessage({ type: null, text: null }), 5000)
        })
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={message.text} type={message.type} />
      <Search setFilter={setFilter} />
      <NewPerson name={name} setName={setName} number={number} setNumber={setNumber} add={add} />
      <PhoneBook people={people} filter={filter} deletePerson={deletePerson} />
    </>
  )
}

export default App

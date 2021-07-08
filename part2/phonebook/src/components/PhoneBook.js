import React from "react"
import Person from "./Person"

const PhoneBook = ({ people, filter, deletePerson }) => {
    return (
        <>
            <h2>Numbers</h2>
            <ul>
                {
                    people
                        .filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
                        .map((person) => <Person key={person.name} person={person} deletePerson={deletePerson} />)
                }
            </ul>
        </>
    )
}

export default PhoneBook

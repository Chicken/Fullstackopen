import React from "react"

const NewPerson = ({ name, setName, number, setNumber, add }) => {
    return (
        <>
            <h3>Add a new one</h3>
            <form onSubmit={add}>
                <div>
                    Name: <input required onChange={(e) => setName(e.target.value)} value={name} />
                </div>
                <div>
                    Number: <input required onChange={(e) => setNumber(e.target.value)} value={number} />
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </>
    )
}

export default NewPerson

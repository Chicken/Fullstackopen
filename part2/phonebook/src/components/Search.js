import React from "react"

const Search = ({ setFilter }) => (
    <div>
        Search: <input onChange={(e) => setFilter(e.target.value)} />
    </div>
)

export default Search

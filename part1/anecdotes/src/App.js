import React, { useState } from "react"

const Anecdote = ({ text, votes }) => <p>{text}<br/>Votes: {votes}</p> 

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients"
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const vote = () => {
    const newVotes = [...votes]
    newVotes[selected]++
    setVotes(newVotes)
  }

  const random = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const mostVoted = votes.findIndex((v) => v === Math.max(...votes));

  return (
    <>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={vote}>Vote</button>
      <button onClick={random}>Random anecdote</button>
      <h1>Most voted anecdote</h1>
      <Anecdote text={anecdotes[mostVoted]} votes={votes[mostVoted]} />
    </>
  )
}

export default App

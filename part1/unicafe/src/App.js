import React, { useState } from "react"

const Statistic = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({ good, bad, neutral }) => {
  const count = good + neutral + bad;
  const score = good - bad;

  return (
    <>
      <h2>Statistics</h2>
      {
        count ? (
          <table>
            <tbody>
              <Statistic text="Good" value={good} />
              <Statistic text="Neutral" value={neutral} />
              <Statistic text="Bad" value={bad} />
              <Statistic text="All" value={count} />
              <Statistic text="Average" value={(score / count).toFixed(2)} />
              <Statistic text="Positive" value={(good / count * 100).toFixed(1) + " %"} />
            </tbody>
          </table>
        ) : (
          <p>No feedback given</p>
        )
      }
    </>
  )
}

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="Good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App

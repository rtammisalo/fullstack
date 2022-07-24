import { useState } from 'react'

const Statistics = (props) => {
  const countReviews = () => props.good + props.neutral + props.bad
  const goodValue = 1
  const badValue = -1

  if (countReviews() === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <h1>statistics</h1>
      <p>
        good {props.good}<br />
        neutral {props.neutral}<br />
        bad {props.bad}<br />
        all {countReviews()}<br />
        average {(props.good * goodValue + props.bad * badValue) / countReviews()} <br />
        positive {props.good / countReviews() * 100} %<br />
      </p>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
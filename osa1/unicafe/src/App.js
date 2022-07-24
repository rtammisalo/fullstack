import { useState } from 'react'

const StatisticsLine = ({ text, value }) => (
  <tr><td>{text}</td><td>{value}</td></tr>
)

const Statistics = (props) => {
  const allReviews = props.good + props.neutral + props.bad
  const goodValue = 1
  const badValue = -1
  const averageReview = (props.good * goodValue + props.bad * badValue)
    / allReviews
  const positivePercent = props.good / allReviews * 100

  if (allReviews === 0) {
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
      <table>
        <thead></thead>
        <tbody>
          <StatisticsLine text='good' value={props.good} />
          <StatisticsLine text='neutral' value={props.neutral} />
          <StatisticsLine text='bad' value={props.bad} />
          <StatisticsLine text='all' value={allReviews} />
          <StatisticsLine text='average' value={averageReview} />
          <StatisticsLine text='positive' value={positivePercent + ' %'} />
        </tbody>
      </table>
    </>
  )
}

const Button = ({ handleClick, buttonText }) => (
  <button onClick={handleClick}> {buttonText} </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleClick = (value, setValue) => () => setValue(value + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleClick(good, setGood)} buttonText='good' />
      <Button handleClick={handleClick(neutral, setNeutral)} buttonText='neutral' />
      <Button handleClick={handleClick(bad, setBad)} buttonText='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
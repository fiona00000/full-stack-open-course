import { useState } from 'react'
const Header = ({text}) => {
  return (
    <h2>{text}</h2>
  )
}

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const Statistics = (props) => {
  return (
    <div>
      <StatisticLine text='good' value={props.good} />
      <StatisticLine text='neutral' value={props.neutral} />      
      <StatisticLine text='bad' value={props.bad} />
      <StatisticLine text='all' value={props.all} />
      <StatisticLine text='average' value={props.all == 0 ? 0 : ((props.good - props.bad) / props.all).toFixed(2)} />
      <StatisticLine text='positive' value={(props.all == 0 ? 0 : ((props.good * 100) / props.all).toFixed(2)) + ' %'} />
    </div>
  )
}

const StatisticLine = (props) => {
  return <p>{props.text} {props.value}</p>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1);
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  }

  const handleBad = () => {
    setBad(bad + 1);
  }

  const all = good + bad + neutral

  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />

      <Header text='statistics' />
      {all === 0 ?
        (<p>No feed back given</p>) :
        (
          <Statistics good={good} bad={bad} neutral={neutral} all={all} />
      )}
    </div>
  )
}

export default App
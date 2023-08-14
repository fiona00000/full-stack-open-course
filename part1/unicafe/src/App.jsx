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
          <div>
            <Statistics text='good' value={good} />
            <Statistics text='neutral' value={neutral} />      
            <Statistics text='bad' value={bad} />
            <Statistics text='all' value={all} />
            <Statistics text='average' value={all == 0 ? 0 : ((good - bad) / all).toFixed(2)} />
            <Statistics text='positive' value={(all == 0 ? 0 : ((good * 100) / all).toFixed(2)) + ' %'} />
          </div>
      )}
    </div>
  )
}

export default App
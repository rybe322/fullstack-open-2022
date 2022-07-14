import logo from './logo.svg';
import './App.css';
import { useState } from 'react'



const Header = ( { text } ) => <h1>{text}</h1>

const Button = ( { handleClick, text }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ( { text, num }) => {
  return(
    <tr>
      <td>{text}:</td>  
      <td>{num}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  console.log('good', good, 'neutral', neutral, 'bad', bad)

  const getTotal = function() {
    return good + neutral + bad
  }

  const getAverage = function() {
    return (good - bad) / (good + neutral + bad)
  }

  const getPositive = function() {
    return good/(good + neutral + bad)
  }

  if (good === 0 && bad === 0 && neutral === 0) {
    return <div>No feedback given</div>
  }
  else {  
    return (
      <div>
        <table>
          <tbody>
          <StatisticLine text='good' num={good} />
          <StatisticLine text='neutral' num={neutral} />
          <StatisticLine text='bad' num={bad} />
          <StatisticLine text='total' num={getTotal()} />
          <StatisticLine text='average' num={getAverage()} />
          <StatisticLine text='positive' num={getPositive()} />
        </tbody>
        </table>
      </div>)
  }
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)


  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={handleGoodClick} text={'good'} />
      <Button handleClick={handleNeutralClick} text={'neutral'} />
      <Button handleClick={handleBadClick} text={'bad'} />
      <Header text='statistic' />
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App
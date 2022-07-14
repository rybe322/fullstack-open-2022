import logo from './logo.svg';
import './App.css';
import { useState } from 'react'


function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min);
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Header = ({ text }) => <h1>{text}</h1>

const TextLine = ({ text }) => <>{text}</>

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]  
  
  const [selected, setSelected] = useState(0)
  const [voteCount, setVoteCount] = useState(new Uint8Array(anecdotes.length))
  
  const handleSelectedClick = () => {
    setSelected(getRandomInt(0, anecdotes.length - 1))  
  }
  
  const handleVoteCountClick = () => {
    const temp = [...voteCount]
    temp[selected] += 1
    setVoteCount(temp)
  }

  function getMostVotes() {
    let maxVotesIndex = 0
    for (let i = 1; i < voteCount.length; i++) {
      maxVotesIndex = (voteCount[i] > voteCount[maxVotesIndex]) ? i : maxVotesIndex
    }
    console.log('maxVotesIndex', maxVotesIndex)
    console.log('anedcote and maxVotesIndex', anecdotes[maxVotesIndex])
    return maxVotesIndex
  }

  console.log('anecdotes', anecdotes.length)
  console.log('voteCount', voteCount.length)

  console.log('votecountArray', voteCount)
  
  return (
    <div>
      <Header text='Anecdote of the day' />
      <TextLine text={anecdotes[selected]} />
      <br />
      <TextLine text={'This anecdote has ' + voteCount[selected] + ' votes.'} />
      <br />
      <Button handleClick={handleSelectedClick} text={'Get another anecdote!'} />
      <Button handleClick={handleVoteCountClick} text={'Vote for this anecdote!'} />
      <Header text='Anecdote with most votes' />
      <TextLine text={anecdotes[getMostVotes()] + ' Has ' + voteCount[getMostVotes()] + ' votes.'} />
      
    </div>
  )
}

export default App
import React, { useState } from 'react'

const Button = ({ handleClick, text }) => ( 
  <button onClick={handleClick}> {text}  </button>
)

const Stat = ({ text, value }) => {
  return (
    <p>{text} {value}</p>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodStr = 'good', neutralStr =  'neutral', badStr = 'bad'

  const all = good + neutral + bad
  const goodValue = good * 1, neutralValue = neutral * 0, badValue = bad * -1
  const avg = (goodValue + neutralValue + badValue) / all
  const positive = good / all * 100

  return (
    <div>
      <h1>Give feedback</h1>
      {/* tapahtumankäsittelijäksi on tarkoitus määritellä joko 
          funktio tai viite funktioon. Ei funktiokutsua */}
      <Button text={goodStr} handleClick={() => setGood(good + 1)}/>
      <Button text={neutralStr} handleClick={() => setNeutral(neutral + 1)}/>
      <Button text={badStr} handleClick={() => setBad(bad + 1)}/>

      <h1>Statistics</h1>
      <Stat text={goodStr} value={good}/>
      <Stat text={neutralStr} value={neutral}/>
      <Stat text={badStr} value={bad}/>

      <Stat text='all' value={all} />
      <Stat text='average' value={avg} />
      <Stat text='positive' value={positive + ' %'} />
    </div>
  )
}

export default App
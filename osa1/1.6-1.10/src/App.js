import React, { useState } from 'react'

const Button = ({ handleClick, text }) => ( 
  <button onClick={handleClick}> {text}  </button>
)

const Stat = ({ text, count }) => {
  return (
    <p>{text} {count}</p>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodStr = 'good', neutralStr =  'neutral', badStr = 'bad'

  return (
    <div>
      <h1>Give feedback</h1>
      {/* tapahtumankäsittelijäksi on tarkoitus määritellä joko 
          funktio tai viite funktioon. Ei funktiokutsua */}
      <Button text={goodStr} handleClick={() => setGood(good + 1)}/>
      <Button text={neutralStr} handleClick={() => setNeutral(neutral + 1)}/>
      <Button text={badStr} handleClick={() => setBad(bad + 1)}/>

      <h1>Statistics</h1>
      <Stat text={goodStr} count={good}/>
      <Stat text={neutralStr} count={neutral}/>
      <Stat text={badStr} count={bad}/>
    </div>
  )
}

export default App
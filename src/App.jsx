import React from "react"
import Die from "./Components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = React.useState([])
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    setDice(allNewDice())
  }, [])

  const allNewDice = () => {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  const generateNewDie = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  const diceElements = dice.map(die => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  ))

  const rollDice = () => {
    if (!tenzies) {
      setDice(prevDice =>
        prevDice.map(die => {
          return die.isHeld ? die : generateNewDie()
        })
      )
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }
  

  const holdDice = id => {
    setDice(prevDice =>
      prevDice.map(die => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    )
  }

  React.useEffect(() => {
    if (dice.length > 0) {
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value
      const allSameValue = dice.every(die => die.value === firstValue)
  
      if (allHeld && allSameValue) {
        setTenzies(true)
      }
    }
  }, [dice])

  return (
    <main>
      {tenzies && <Confetti width={window.innerWidth} height={window.innerHeight}/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button onClick={rollDice}>{tenzies ? "Reset" : "Roll"}</button>
    </main>
  )
}

export default App

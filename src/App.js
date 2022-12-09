import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImgs = [
  { src: './img/sword1.png', matched: false },
  // { src: './img/sword2.png' },
  { src: './img/axe.png', matched: false },
  { src: './img/bow.png', matched: false },
  { src: './img/dagger.png', matched: false },
  { src: './img/flail.png', matched: false },
  { src: './img/spear.png', matched: false }
]

function App () {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prev => {
          return prev.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
      } else {
        console.log('no match')
      }
      setTimeout(() => resetTurn(), 500)
    }
  }, [choiceOne, choiceTwo])
  useEffect(() => {
    setChoiceOne(null)
    setChoiceTwo(null)
    shuffle()
  }, [])

  const shuffle = () => {
    const shuffledCards = [...cardImgs, ...cardImgs]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = card => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prev => prev + 1)
    setDisabled(false)
  }

  return (
    <div className='App'>
      <div className='info'>
        <h1>Magic Match</h1>
        <p>Turns: {turns}</p>
        <button onClick={shuffle}>New Game</button>
      </div>
      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  )
}

export default App

import './SingleCard.css'

export default function SingleCard ({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }
  return (
    <div className='card' key={card.id}>
      <div className={flipped ? 'flipped' : ''}>
        <img className='front' src={`../${card.src}`} alt='front card' />
        <img
          className='back'
          src='./img/back.png'
          onClick={handleClick}
          alt='back card'
        />
      </div>
    </div>
  )
}

import './GameOver.css'

const GameOver = ({retry, score}) => {
  return (
    <div>
       <div className="BOX">
        <h1>Fim de jogo</h1>
        <h2>A sua pontuação foi de: <span>{score}</span></h2>
       </div>
      <button onClick={retry}>Resetar jogo</button>
    </div>
  )
}

export default GameOver
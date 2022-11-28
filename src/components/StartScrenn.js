import "./StartScrenn.css"
const StartScrenn = ({startGame}) => {
  return (
    <div className="start">
        <h1>Palavra Secreta</h1>
        <div className="boox">
          <h2>Descubra qual e a palavra secreta</h2>
          <p>Clique no botão para começar a jogar :)</p>
        </div>
        <button onClick={startGame}>Começar a jogar</button>
    </div>
  )
}

export default StartScrenn
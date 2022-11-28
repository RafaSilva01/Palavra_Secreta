import { useState, useRef } from "react";
import "./Game.css";

const Game = ({
  verifyLetter, 
  pickedWord, 
  pickedCategory, 
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {//usando o jsx
  const [letter, setletter] = useState("");
  const letterinpputRef = useRef(null)
  const handleSubmit = (e) =>{
    e.preventDefault();

    verifyLetter(letter)

    setletter("")
    letterinpputRef.current.focus();
  }
  console.log(letter)
return (
    <div className="game">
      <h1>Game</h1>
      <div className="BoxOnGame">
      <p className="point">
        <span>Pontuação: {score}</span>
      </p>
      <h2>Adivinhe a palavra</h2>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s).</p>
      </div>
      <div className="wordContainer">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span className="letter" key={i}>
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>

      <div className="box">
      <div className="letterContainer">
        <p>Tente advinhar uma letra da palavra</p>
        <form onSubmit={handleSubmit}>
          
          <input 
          type="text" 
          name= "letter" 
          maxlegth="1" 
          required 
          onChange={(e) => setletter(e.target.value)}
          value={letter}
          ref={letterinpputRef}
          />
          <button>Jogar</button>
        </form>
        
        
        
        <div className="wrongLettersContainer">
          <p>Letras ja utilizadas: </p>
            {wrongLetters.map((letter, i) => (
              <span key={i}>{letter},</span>
            ))}
        </div>
      </div>
      </div>
    </div>
  )
}

export default Game
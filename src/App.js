//CSS
import './App.css';

//React
import{useCallback, useEffect, useState} from "react";

//data
import { wordsLista } from "./data/words"

//components
import StartScrenn from './components/StartScrenn';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
];
const guessesQty = 5

//====================================================

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name); 
  const [words] = useState(wordsLista)

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState ([]);
  
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLatter] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty); //Chances que a pessoa irar ter
  const [score, setScore] = useState(0);

  const pickedWordAndCategory =useCallback( () =>{
    //pick a random category
    const categories = Object.keys(words);
    const category = 
      categories[Math.floor(Math.random() * Object.keys(categories).length)]
    console.log(category);

    //pick a random word 
    const word = 
      words[category][Math.floor(Math.random() * words[category].length)]
    
      console.log(category, word)

    return {word, category} ;

  }, [words])
  
  //Iniciando o jogo
  const startGame = useCallback(()=>{
    
    clearLetterStates()
    //pick word e pick category
    const {word, category} = pickedWordAndCategory()
    
    //Criando a array das letras
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    console.log(word, category);
    console.log(wordLetters);
  

    //Estatus
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    
    setGameStage(stages[1].name);
  },[pickedWordAndCategory]);
  //processando a letra
  
  const verifyLetter = (letter)=>{
    const normalizedLetter = letter.toLowerCase();

    //validação
    if(guessedLetters.includes(normalizedLetter) || 
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLatter((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ])
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };
  console.log(guessedLetters);
  console.log(wrongLetters);







  const clearLetterStates = () =>{
    setGuessedLetters([])
    setWrongLatter([])
  }
//checando as tratativas
  useEffect(() => {
    if(guesses <= 0) {
      //resetando tudo
      clearLetterStates()

      setGameStage(stages[2].name);
    }
  },[guesses]);
  //checando a condição de vitoria
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];//array de letras unicas
  
    //condição de vitoria
    if(guessedLetters.length === uniqueLetters.length){
      setScore((actualScore) => (actualScore += 100));

      startGame();
    }
    
  }, [guessedLetters, letters, startGame]);

  
  //Jogo resetado 
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);
    
    
    setGameStage(stages[0].name)
  };
 
  return (
    <div className="App">
     {gameStage === 'start' && <StartScrenn startGame={startGame} />}
     {gameStage === 'game' && (
     <Game 
      verifyLetter={verifyLetter}
      pickedWord={pickedWord}
      pickedCategory={pickedCategory}
      letters={letters}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      guesses={guesses}
      score={score}
    />
  )}
     {gameStage === 'end' && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;

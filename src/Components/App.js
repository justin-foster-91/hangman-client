import * as GameLogic from './GameLogic';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [secret, setSecret] = useState(GameLogic.secretTargetWord)
  const [target, setTarget] = useState(GameLogic.targetWord)
  const [guessedLetters, setGuessedLetters] = useState(GameLogic.lettersGuessed)
  const [guessInput, setGuessInput] = useState()
  const [dummy, setDummy] = useState(0)

  console.log('Before useEffect');
  useEffect(() => {
    if(!GameLogic.isGameStarted()){
      GameLogic.startGame();
      GameLogic.updateSecret()
      setSecret(GameLogic.secretTargetWord)
      setTarget(GameLogic.targetWord)
      setGuessedLetters(GameLogic.lettersGuessed)
    }

  })

  const submitGuess = (e) => {
    e.preventDefault()
    GameLogic.playGame(guessInput)
    setSecret(GameLogic.secretTargetWord)
    setGuessedLetters(GameLogic.lettersGuessed.map((l) => l))
    setGuessInput('')

    console.log(secret);
    fetch('http://localhost:8000/play', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lettersGuessed: GameLogic.lettersGuessed,
        secretTarget: GameLogic.secretTargetWord,
        targetWord: GameLogic.targetWord,
      })
    })
      .then(res => res.json)
      .then(json => console.log(json))
  }

  // const loadGame = () => {
  //   fetch('http://localhost:8000/play', {
  //     method: 'GET'
  //   })
  //     .then(res => res.json())
  //     .then(json => {
  //       // console.log(json);
  //       setSecret(json.secretTarget)
  //       setTarget(json.setTarget)
  //       setGuessedLetters(json.lettersGuessed)
  //     })
  // }

  return (
    <>
      Target: {target} <br/>
      Hidden: {secret}
      
      <form onSubmit={(e) => submitGuess(e)}>
        <label htmlFor='guess'>Guess a letter: </label> <br/>
        <input type='text' id='guess' value={guessInput} className='guess' onChange={(change) => {setGuessInput(change.target.value)}}></input><br/>
        {/* Guess input: {guessInput} <br/> */}
        <input type='submit' value='Submit'></input>
      </form>

      Letters Guessed: {guessedLetters}
    </>
  );
}

// Look into blanking out form on submit

export default App;

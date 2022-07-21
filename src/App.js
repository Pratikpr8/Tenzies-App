import React, { useEffect, useState } from "react";
import "./css/app.css";
import Die from "./components/Die";
import { v4 as uuidv4 } from "uuid";
import Confetti from "react-confetti";
import Timer from './components/Timer'

// // react icons
// import { FaDiceOne } from "react-icons/fa";
// import { FaDiceTwo } from "react-icons/fa";
// import { FaDiceThree } from "react-icons/fa";
// import { FaDiceFour } from "react-icons/fa";
// import { FaDiceFive } from "react-icons/fa";
// import { FaDiceSix } from "react-icons/fa";



export default function App() {

  const [dice, setDice] = useState(randomNumbers());
  const [tenzies, setTenzies] = useState(false);
  const [click, setClick] = useState(0);


  
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const singleValue = dice[0].value;
    const allValueSame = dice.every((die) => die.value === singleValue);
    if (allHeld && allValueSame) {
      setTenzies(true);
    }
  }, [dice]);


  function randomNumbers() {
    const numbersArray = [];
    for (let i = 0; i < 10; i++) {
      numbersArray.push({
        value: Math.ceil(Math.random() * 6),
        id: uuidv4(),
        isHeld: false,
      });
    }
    return numbersArray;
  }


  const onRollDice = () => {
    const updatedDice = [...dice].map((die) => {
      if (die.isHeld === true) {
        return die;
      } else {
        return {
          value: Math.ceil(Math.random() * 6),
          id: uuidv4(),
          isHeld: false,
        };
      }
    });
    setDice(updatedDice);
    setClick(prevClick => prevClick + 1);
  };


  const changeColorOnClickDie = (id) => {
    const updatedDice = [...dice].map((die) => {
      if (die.id === id) {
        die.isHeld = !die.isHeld;
      }
      return die;
    });
    setDice(updatedDice);
  };

  const newGame = () => {
    setTenzies(false);
    setClick(0)
    setDice(randomNumbers());
  };



  return (
    <div>
      
      {tenzies && <Confetti />}
      <div className="tenzies--container">
        <h1 className="tenzies--title">Tenzies</h1>
        <p className="tenzies--instruction">
          Roll until all dice are same. Click each die to freeze at its current
          value between rolls. Select all die with same value to win.
        </p>

        <div className="tenzies--grid">
          {dice.map((die) => {
            return (
              <Die
                value={die.value}
                key={die.id}
                isHeld={die.isHeld}
                onClick={() => changeColorOnClickDie(die.id)}
              />
            );
          })}
        </div>

        {tenzies && <p className="tenzies--totRoll">You've won! You took {click} rolls.</p>}

        {tenzies ? (
          <button className="grid--button" onClick={newGame}>
            New Game
          </button>
        ) : (
          <button className="grid--button" onClick={onRollDice}>
            Roll Dice
          </button>
        )}
        <div className="rollNTime--container">
        <p className="tenzies--totRoll">Total Roll :{click}</p>
        <Timer />
        </div>
      </div>
    </div>
  );
}

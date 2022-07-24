import React, { useEffect, useState } from "react";
import "./css/app.css";
import Die from "./components/Die";
import { v4 as uuidv4 } from "uuid";
import Confetti from "react-confetti";
import Timer from './components/Timer'

export default function App() {

  const [dice, setDice] = useState(randomNumbers());
  const [tenzies, setTenzies] = useState(false);
  const [click, setClick] = useState(0);
  const [time,setTime] = useState(0)
  const [timerOn,setTimerOn] = useState(false)




  useEffect(()=>{
      let interval = null

      if(timerOn){
        interval = setInterval(()=>{
            setTime(prevTime => prevTime + 10)
        },10)
      } else{
        clearInterval(interval)
      }
      return function cleanup(){
          clearInterval(interval)
      }

  },[timerOn])

  
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const singleValue = dice[0].value;
    const allValueSame = dice.every((die) => die.value === singleValue);
    if (allHeld && allValueSame) {
      setTenzies(true);
      setTimerOn(false);
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
    setTimerOn(true);
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
    setTime(0);
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

        {tenzies && <p className="tenzies--totRoll">You've won! You took {click} rolls and {
                    <span>
                    <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                    <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
                    </span>
          }s.</p>}

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
        <p className="tenzies--totRoll maxWidth">Total Roll: {click}</p>
        <Timer 
          time={time}
        />
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  // const [timer,setTimer]=useState({seconds:0,minutes:9})


  useEffect(() => {
    
        const time = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1)

        if (seconds === 59) {
            setMinutes((prevMinutes) => prevMinutes + 1)
            setSeconds(0);
        }
        }, 1000);

        return function cleanup() {
        clearInterval(time);
        }    
})

  return (
    <div className="timer--container">
      <span className="tenzies--totRoll">
        Time = {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </span>
    </div>
  );
}

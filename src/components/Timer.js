import React from "react";

export default function Timer({ time }) {
  return (



    <div className="timer--container">
      <span className="tenzies--totRoll maxWidth">
        Time:
        <span> {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
      </span>
    </div>
  );
}

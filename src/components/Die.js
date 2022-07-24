import React from 'react';
// import die1 from '../images/dice-six-faces-one.png'
// import die2 from '../images/dice-six-faces-two.png'
// import die3 from '../images/dice-six-faces-three.png'
// import die4 from '../images/dice-six-faces-four.png'
// import die5 from '../images/dice-six-faces-five.png'
// import die6 from '../images/dice-six-faces-six.png'


export default function Die(props) {

  const styles = {
    backgroundColor: props.isHeld ? "hsl(100,100%,40%)" : "hsl(0,0%,95%)"
  }
  
return(
  <div className='dice--look' 
       style={styles} 
       onClick={props.onClick}
  >
    {/* <img className="die--images" src={die3}  alt="dice images" /> */}
    {/* {props?.value && <img className="die--images" src={die1}  alt="dice images" />} */}

      <h2>{props.value}</h2>

      {/* if(props.value===1){
        <img className="die--images" src={die1}  alt="dice images" />
      }else if (props.value===2) {
        <img className="die--images" src={die2}  alt="dice images" />
      }else if (props.value===3) {
        <img className="die--images" src={die3}  alt="dice images" />
      }else if (props.value===4) {
        <img className="die--images" src={die4}  alt="dice images" />
      }else if (props.value===5) {
        <img className="die--images" src={die5}  alt="dice images" />
      }else (props.value===6) {
        <img className="die--images" src={die6}  alt="dice images" />
      } */}

  </div>
)
}


import React from 'react'

export default function Die(props) {


  const styles = {
    backgroundColor: props.isHeld ? "hsl(100,100%,40%)" : "hsl(0,0%,95%)"
  }


  
return(
  <div className='dice--look' 
       style={styles} 
       onClick={props.onClick}
  >
      <h2>{props.value}</h2>
  </div>
)
}
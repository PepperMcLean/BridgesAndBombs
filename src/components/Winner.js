import React from 'react'

function Winner(props) {
  return (
    <div hidden={props.hidden}>      
      <h2>
        <span className={`cp-${props.color}`}>{props.color} Wins!</span> 
      </h2>
    </div>
  )
}

export default Winner
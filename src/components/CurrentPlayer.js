import React from 'react'

function CurrentPlayer(props) {
  return (
    <div hidden={props.hidden}>
      <h2>
        Current Player: <span className={`cp-${props.color}`}>{props.color}</span>
      </h2>
    </div>
  )
}

export default CurrentPlayer
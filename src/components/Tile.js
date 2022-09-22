import React from 'react'

function Tile(props) {
  return (
    <div 
      className={`tile ${props.color}`}
      onClick={props.handleClick}
    >{props.value}</div>
  )
}

export default Tile
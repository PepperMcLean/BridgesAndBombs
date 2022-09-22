import React from 'react'

function Rules() {
  return (
    <div className='rules'>
      <h2><span className='not-bold'>Game Rules</span></h2>
      <h3><span className='not-bold'>Order of a Turn</span></h3>
      <p> 
        1. The current player clicks an empty (grey) square.<br/>
        2. The clicked square becomes the color of the current player.<br/>
        3. Timers are disabled for neighboring squares of the same color (if any).<br/>
        4. All active timers on the board count down by one.<br/>
        5. For any timer that reaches zero the square "explodes" (clears out itself and its neighbors).<br/>
        6. For any square with a deactivated timer, if it does not have a neighbor square of the same color. It's timer is restarted at 4.<br/>
        7. If the current player has a bridge, they win.<br/>
        8. If there are no empty squares left on the board, the current player wins.<br/>
        9. If the current player did not win, the next player becomes the current player and their turn begins.<br/>
      </p>
      <h3><span className='not-bold'>Definitions</span></h3>
      <h4>Neighbor</h4>
      <p>A neighbor of a square is any other square on the board that shares a side with it.</p>
      <h4>Cluster</h4>
      <p>A cluster is a set of squares of the same color where each square can be reached from any other square in the set by stepping from neighbor to neighbor within the set.</p>
      <h4>Bridge</h4>
      <p>A bridge is a cluster that touchest both sides of the board that match its color.</p>
    </div>
    
  )
}

export default Rules
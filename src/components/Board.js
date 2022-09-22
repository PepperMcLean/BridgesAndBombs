import React from 'react'
import Tile from './Tile';
import CurrentPlayer from './CurrentPlayer';
import Winner from './Winner';
function Board() {
  const [board, setBoard] = React.useState(initBoard());

  const [currentPlayerHidden, setCurrentPlayerHidden] = React.useState(false);
  const [currentWinnerHidden, setCurrentWinnerHidden] = React.useState(true);

  function initObject(){
    return {
      color: "grey",
      value: "",
    }
  }

  function initBoard(){
    let board = [];
    for (let i = 0; i < 9; i++){
      let currentRow = [];
      for (let i = 0; i < 9; i++){
        let x = initObject();
        currentRow.push(x);
      }
      board.push(currentRow);
    }
    return board;
  }

  const [currentPlayer, setCurrentPlayer] = React.useState("black");
  
  const swapPlayer = () => {
    if (currentPlayer === "black") {
      setCurrentPlayer("red");
    } else {
      setCurrentPlayer("black");
    }
  }
  
  const removeTimer = (row, column) => {
    board[row][column].value = "";
  }

  const checkLocations = (row, column) => {
    const checkSameColor = (obj) => {
      return currentPlayer === obj.color;
    }

    if (row-1 >= 0 && checkSameColor(board[row-1][column])) {
      removeTimer(row-1,column);
      removeTimer(row,column);
    }
    if (column-1 >= 0 && checkSameColor(board[row][column-1])) {
      removeTimer(row,column-1);
      removeTimer(row,column);
    }
    if (row+1 <= 8 && checkSameColor(board[row+1][column])) {
      removeTimer(row+1,column);
      removeTimer(row,column);
    }
    if (column+1 <= 8 && checkSameColor(board[row][column+1])){
      removeTimer(row,column+1);
      removeTimer(row,column);
    }
  }

  const explode = (row, column) => {
    board[row][column].value = "";
    board[row][column].color = "grey";
    if (row-1 >= 0){
      board[row-1][column].value = "";
      board[row-1][column].color = "grey";
    }
    if (column-1 >= 0){
      board[row][column-1].value = "";
      board[row][column-1].color = "grey";
    }
    if (row+1 <= 8){
      board[row+1][column].value = "";
      board[row+1][column].color = "grey";
    }
    if (column+1 <= 8){
      board[row][column+1].value = "";
      board[row][column+1].color = "grey";
    }
  }

  const countdown = () => {
    let rowCount = 0;
    board.forEach(row => {
      let colCount = 0;
      row.forEach(obj => {
        if (obj.value === 1){
          explode(rowCount, colCount);
        }
        if (obj.value > 1){
          obj.value -= 1;
        }
        colCount += 1;
      })
      rowCount += 1;
    })
  }

  const checkNearbyColors = (row, column, color) => {
    let hasNearbyColor = false;
    if (row-1 >= 0) {
      if (board[row-1][column].color === color) {
        hasNearbyColor = true;
      }
    }
    if (column-1 >= 0) {
      if (board[row][column-1].color === color) {
        hasNearbyColor = true;
      }
    }
    if (row+1 <= 8) {
      if (board[row+1][column].color === color) {
        hasNearbyColor = true;
      }
    }
    if (column+1 <= 8){
      if (board[row][column+1].color === color) {
        hasNearbyColor = true;
      }
    }
    if (hasNearbyColor === false) {
      board[row][column].value = 4;
    }
  }

  const restartTimers = () => {
    let rowCount = 0;
    board.forEach(row => {
      let colCount = 0;
      row.forEach(obj => {
        if (obj.color !== "grey" && obj.value === ""){
          checkNearbyColors(rowCount, colCount, obj.color);
        }
        colCount += 1;
      })
      rowCount += 1;
    })
  }

  function isNext (tile1, tile2) {
    const rowDiff = Math.abs(tile1.row - tile2.row);
    const colDiff = Math.abs(tile1.col - tile2.col);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
  }

  const getPotentialBridgeTiles = () => {
    let checkerBoard = [];
    let yCount = 0;
    board.forEach(arr => {
      let xCount = 0;
      arr.forEach(obj => {
        if (obj.value === "" && obj.color === currentPlayer){
          let newObj = obj;
          newObj.row = yCount;
          newObj.col = xCount;
          checkerBoard.push(newObj);
        }
        xCount += 1;
      });
      yCount += 1;
    })
    return checkerBoard;
  }

  const checkIfTileIsInThisCluster = (cluster, tile) => {
    for(const newTile of cluster){
      if (isNext(newTile, tile)){
        return true;
      }
    }
    return false;
  }
  
  const getClusterIndex = (arrayOfClusters, tile) => {
    let clustersTilesIn = []
    for (let i = 0; i < arrayOfClusters.length; i++) {
      if (checkIfTileIsInThisCluster(arrayOfClusters[i], tile)) {
        clustersTilesIn.push(i);
      }
    }
    return clustersTilesIn;
  }

  const getClusters = (potentialBridgeTiles) => {
    let arrOfClusters = [];
    potentialBridgeTiles.forEach(tile => {
      if (arrOfClusters.length < 1){
        arrOfClusters.push([tile]);
      } else {
        let clustersTileIn = getClusterIndex(arrOfClusters, tile);
        if (clustersTileIn.length > 1) {
          let mergedCluster = [...arrOfClusters[clustersTileIn[0]], ...arrOfClusters[clustersTileIn[1]], tile];
          arrOfClusters.splice(clustersTileIn[1],1);
          arrOfClusters.splice(clustersTileIn[0],1, mergedCluster);
        } else if (clustersTileIn.length === 1){
          arrOfClusters[clustersTileIn[0]].push(tile)
        } else {
          arrOfClusters.push([tile]);
        }
      }
    })
    console.log(arrOfClusters);
    return arrOfClusters;
  }

  const getCountOfEmptyTiles = () => {
    let count = 0;
    for (let row of board) {
      for (let tile of row) {
        if (tile.color === "grey") {
          count += 1;
        }
      }
    }
    console.log(`count is ${count}`)
    return count;
  }

  const handleWin = () => {
    let newBoard = [...board];
    for (let row of newBoard){
      for (let tile of row){
        if (tile.color === "grey") {
          tile.color = "white";
        }
      }
    }
    setBoard(newBoard);
    setCurrentPlayerHidden(true);
    setCurrentWinnerHidden(false);
  }

  const checkWin = () => {
    let clusters = getClusters(getPotentialBridgeTiles());
    let countOfEmptyTiles = getCountOfEmptyTiles();
    if (currentPlayer === "red"){
      for (const cluster of clusters) {
        if (cluster.some((tile) => tile.row === 0) && cluster.some((tile) => tile.row === 8)){
          handleWin(currentPlayer);
          return true;
        }
      }
    }
    if (currentPlayer === "black"){
      for (const cluster of clusters) {
        if (cluster.some((tile) => tile.col === 0) && cluster.some((tile) => tile.col === 8)){
          handleWin(currentPlayer);
          return true;
        }
      }
    }
    if (countOfEmptyTiles === 0){
      handleWin(currentPlayer);
      return true;
    }
    return false;
  }

  const handleClick = (row, column) => {
    let clickedTile = board[row][column];

    if (clickedTile.color === 'grey'){
      clickedTile.color = currentPlayer;
      clickedTile.value = 5;
      checkLocations(row, column);
      countdown();
      restartTimers();
      if (!checkWin()) {
        swapPlayer();
      };
    }
  };

  return (
    <div>
      <CurrentPlayer color={currentPlayer} key={currentPlayerHidden} hidden={currentPlayerHidden}/>
      <Winner color={currentPlayer} key={currentWinnerHidden} hidden={currentWinnerHidden}/>
      <br/>
      <div className="board">
        {board.map((element, index) => {
          return (
            <div className='row' key={index}> 
              {element.map((object, index1) => {
                return <Tile value={object.value} color={object.color} key={`${index}${index1}`} handleClick={() => {handleClick(index, index1)}}/>
            })}
            </div>
          )
        })}
      </div>
      <br/>
      <button
        onClick={() => {
          setBoard(initBoard);
          setCurrentPlayerHidden(false);
          setCurrentWinnerHidden(true);
          setCurrentPlayer("black");
        }}
        className="button-4"
      >Reset</button>
    </div>
  )
}

export default Board
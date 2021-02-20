// set board size
// fill board randomly
// update each cell state for set number of 'phases'

const board = {
 virtualGrid: [],
 domGrid: [],
 fillBoard() {
  for(let y = 0; y < 5; y++) {
   const newRow = []
   for(let x = 0; x < 5; x++) {
    newRow[x] = Math.round(Math.random())
   }
   this.virtualGrid.push(newRow)
  }
 },
 filterBoard() {
  for(let i = 0; i < 3; i++) {
   
  }
 },
 checkNeighbors() {

 }
}

const app = {
 
}

board.fillBoard()
console.log(board.virtualGrid)
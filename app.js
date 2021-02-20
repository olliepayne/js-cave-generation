const board = {
 width: 5,
 height: 5,
 fillPercent: 0.4,
 generations: 3,
 virtualGrid: [],
 domGrid: [],
 fill() {
  for(let x = 0; x < this.width; x++) {
   const newRow = []
   for(let y = 0; y < this.height; y++) {
    const randomNum = Math.random()
    if(randomNum < this.fillPercent) {
     newRow[y] = 1
    } else {
     newRow[y] = 0
    }
   }
   this.virtualGrid.push(newRow)
  }
 },
 filter() {
  for(let i = 0; i < this.generations; i++) {
   for(let x = 0; x < this.width; x++) {
    for(let y = 0; y < this.height; y++) {
     if(x > 0 && x < this.width - 1 && y > 0 && y < this.height - 1) {
      if(this.virtualGrid[x][y] === 1) {
       const newCoords = this.checkNeighbors({ x, y })
       this.virtualGrid[x][y] = 0
       this.virtualGrid[newCoords.x][newCoords.y] = 1
      }
     }
    }
   }

   console.log(`Generation ${i + 1}:`)
   console.log(board.virtualGrid)
  }
 },
 checkNeighbors(coords) {
  let newCoords = coords

  for(let neighborX = coords.x - 1; neighborX <= coords.x + 1; neighborX++) {
   for(let neighborY = coords.y - 1; neighborY <= coords.y  + 1; neighborY++) {
    if(neighborX === coords.x && neighborY === coords.y) {
     continue
    }

    if(this.virtualGrid[neighborX][neighborY] === 0) {
     newCoords.x = neighborX
     newCoords.y = neighborY
     return newCoords
    }
   }
  }

  return newCoords
 }
}

const app = {
 
}

board.fill()
console.log('Initial:')
console.log(board.virtualGrid)

board.filter()
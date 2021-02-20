const board = {
 width: 5,
 height: 5,
 fillPercent: 0.3,
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
     const neighbors = this.checkNeighbors({ x, y })

     if(this.virtualGrid[x][y] === 1) {
      if(neighbors < 2) this.virtualGrid[x][y] = 0
     } else if(this.virtualGrid[x][y] === 0) {
      if(neighbors > 4) this.virtualGrid[x][y] = 1
     }
    }
   }

   console.log(`Generation ${i + 1}:`)
   console.log(board.virtualGrid)
  }
 },
 checkNeighbors(coords) {
  let neighborCount = 0

  for(let neighborX = coords.x - 1; neighborX <= coords.x + 1; neighborX++) {
   for(let neighborY = coords.y - 1; neighborY <= coords.y  + 1; neighborY++) {
    if(neighborX === coords.x && neighborY === coords.y) {
     continue
    } else if(neighborX < 0 || neighborX === this.width || neighborY < 0 || neighborY === this.height) {
     continue
    } else if(this.virtualGrid[neighborX][neighborY] === 1) {
     neighborCount++
    }
   }
  }

  return neighborCount
 }
}

const app = {
 
}

board.fill()
console.log('Initial:')
console.log(board.virtualGrid)

board.filter()
const gridEl = document.getElementById('grid')

const grid = {
 width: 8,
 height: 8,
 fillPercent: 0.3,
 generations: 3,
 virtualGrid: [],
 fill: function() {
  for(let x = 0; x < this.width; x++) {
   const newRow = []
   for(let y = 0; y < this.height; y++) {
    const randomNum = Math.random()
    if(randomNum < this.fillPercent) {
     newRow.push(1)
    } else {
     newRow.push(0)
    }
   }
   this.virtualGrid.push(newRow)
  }
 },
 getNeighbors: function(x, y) {
  let neighborCount = 0

  for(let neighborX = x - 1; neighborX <= x + 1; neighborX++) {
   for(let neighborY = y - 1; neighborY <= y + 1; neighborY++) {
    if(neighborX !== x && neighborY !== y) {
     if(neighborX > 0 && neighborX < this.width && neighborY > 0 && neighborY < this.height) {
      if(this.virtualGrid[neighborX][neighborY] === 1) neighborCount++
     }
    }
   }
  }

  return neighborCount
 },
 filter: function() {
  for(let x = 0; x < this.height; x++) {
   for(let y = 0; y < this.width; y++) {
    if(this.virtualGrid[x][y] === 0) {
     const neighborCount = this.getNeighbors(x, y)
     if(neighborCount > 3) this.virtualGrid[x][y] = 1
    }
   }
  }
 },
 generate: function() {
  this.fill()
  this.filter()
  console.log(this.virtualGrid)
 }
}

const app = {
 init: function() {
  grid.generate()
 }
}

app.init()
const gridEl = document.getElementById('grid')

const grid = {
 width: 20,
 height: 20,
 fillPercent: 0.45,
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
 getNeighborCount: function(x, y) {
  let neighborCount = 0

  for(let neighborX = x - 2; neighborX <= x + 2; neighborX++) {
   for(let neighborY = y - 2; neighborY <= y + 2; neighborY++) {
    if(neighborX >= 0 && neighborX < this.width && neighborY >= 0 && neighborY < this.height) {
     if(neighborX !== x && neighborY !== y) {
      if(this.virtualGrid[neighborX][neighborY] === 1) neighborCount++
     }
    } else {
     neighborCount++
    }
   }
  }

  return neighborCount
 },
 filter: function() {
  for(let i = 0; i < this.generations; i++) {
   for(let x = 0; x < this.height; x++) {
    for(let y = 0; y < this.width; y++) {
     const neighborCount = this.getNeighborCount(x, y)
     if(neighborCount > 4) {
      this.virtualGrid[x][y] = 0
     } else if(neighborCount < 3) {
      this.virtualGrid[x][y] = 1
     }
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
 render: function() {
  for(let x = 0; x < grid.width; x++) {
   const columnEl = document.createElement('div')
   gridEl.appendChild(columnEl)
   columnEl.className = 'column'
   columnEl.id = `column-${x}`
   for(let y = 0; y < grid.height; y++) {
    const tileEl = document.createElement('div')
    columnEl.appendChild(tileEl)
    tileEl.id = `tile-${x * grid.width + y}`
    if(grid.virtualGrid[x][y] === 1) {
     tileEl.className = 'tile-filled'
    } else {
     tileEl.className = 'tile-empty'
    }
   }
  }
 },
 init: function() {
  grid.generate()
  this.render()
 }
}

app.init()
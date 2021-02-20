const gridEl = document.getElementById('grid')

const grid = {
 width: 10,
 height: 10,
 fillPercent: 0.3,
 generations: 3,
 virtualGrid: [],
 domGrid: [],
 fill() {
  for (let y = 0; y < this.height; y++) {
   const newColumn = []
   for (let x = 0; x < this.width; x++) {
    const randomNum = Math.random()
    if (randomNum < this.fillPercent) {
     newColumn.push(1)
    } else {
     newColumn.push(0)
    }
   }
   this.virtualGrid.push(newColumn)
  }
 },
 filter() {
  for (let i = 0; i < this.generations; i++) {
   const gridInstance = this.virtualGrid.slice()

   for (let y = 0; y < this.height; y++) {
    for (let x = 0; x < this.width; x++) {
     if (gridInstance[x][y] === 0) {
      this.emptyRules({ x, y })
     } else if (gridInstance[x][y] === 1) {
      // this.filledRules({ x, y })
     }
    }
   }
  }
 },
 emptyRules(coords) {
  let filledNeighbors = 0

  for (let neighborX = coords.x - 1; neighborX <= coords.x + 1; neighborX++) {
   for (let neighborY = coords.y - 1; neighborY <= coords.y + 1; neighborY++) {
    if (neighborX === coords.x && neighborY === coords.y) {
     continue
    } else if(neighborX < 0 || neighborX > this.width - 1 || neighborY < 0 || neighborY > this.height - 1) {
     continue
    }

    if (this.virtualGrid[neighborX][neighborY] === 1) {
     filledNeighbors++
    }
   }
  }

  if (filledNeighbors > 4) {
   this.virtualGrid[coords.x][coords.y] = 1
  }
 },
 filledRules(coords) {
  let filledNeighbors = 0

  for (let neighborX = coords.x - 1; neighborX <= coords.x + 1; neighborX++) {
   for (let neighborY = coords.y - 1; neighborY <= coords.y + 1; neighborY++) {
    if (neighborX === coords.x && neighborY === coords.y) {
     continue
    }

    if(this.virtualGrid[neighborX][neighborY] === 1) {
     filledNeighbors++
    }

    if (filledNeighbors < 3) {
     this.virtualGrid[coords.x][coords.y] = 0
    }
   }
  }
 }
}

const app = {
 init() {
  grid.fill()
  grid.filter()
  console.log(grid.virtualGrid)

  this.render()
 },
 render() {
  for (let y = 0; y < grid.height; y++) {
   for (let x = 0; x < grid.width; x++) {
    if (grid.virtualGrid[x][y] === 1) {
     const newTileEl = document.createElement('div')
     newTileEl.className = 'tileFilled'
     newTileEl.id = `tile-${x + (y * grid.width)}`
     gridEl.appendChild(newTileEl)
    } else {
     const newTileEl = document.createElement('div')
     newTileEl.className = 'tileEmpty'
     newTileEl.id = `tile-${x + (y * grid.width)}`
     gridEl.appendChild(newTileEl)
    }
   }
  }
 }
}

app.init()
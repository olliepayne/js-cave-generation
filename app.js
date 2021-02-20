const gridEl = document.getElementById('grid')

const grid = {
 width: 10,
 height: 10,
 fillPercent: 0.3,
 generations: 0,
 virtualGrid: [],
 domGrid: [],
 fill() {
  for (let x = 0; x < this.width; x++) {
   const newColumn = []
   for (let y = 0; y < this.height; y++) {
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

   for (let x = 1; x < this.width - 1; x++) {
    for (let y = 1; y < this.height - 1; y++) {
     if (gridInstance[x][y] === 0) {
      this.emptyRules(gridInstance, { x, y })
     } else if (gridInstance[x][y] === 1) {
      this.filledRules(gridInstance, { x, y })
     }
    }
   }
  }
 },
 emptyRules(gridInstance, coords) {
  let filledNeighbors = 0

  for (let neighborX = coords.x - 1; neighborX <= coords.x + 1; neighborX++) {
   for (let neighborY = coords.y - 1; neighborY <= coords.y + 1; neighborY++) {
    if (neighborX === coords.x && neighborY === coords.y) {
     continue
    }

    if (gridInstance[neighborX][neighborY] === 1) {
     filledNeighbors++
    }
   }
  }

  if (filledNeighbors > 6) {
   this.virtualGrid[coords.x][coords.y] = 1

   return
  }
 },
 filledRules(gridInstance, coords) {
  for (let neighborX = coords.x - 1; neighborX <= coords.x + 1; neighborX++) {
   for (let neighborY = coords.y - 1; neighborY <= coords.y + 1; neighborY++) {
    if (neighborX === coords.x && neighborY === coords.y) {
     continue
    }

    if (gridInstance[neighborX][neighborY] === 0) {
     this.virtualGrid[coords.x][coords.y] = 0
     this.virtualGrid[neighborX][neighborY] = 1

     return
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

  // this.render()
 },
 render() {
  for (let x = 0; x < grid.width; x++) {
   for (let y = 0; y < grid.height; y++) {
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
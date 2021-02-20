const gridEl = document.getElementById('grid')

const grid = {
 width: 10,
 height: 10,
 fillPercent: 0.4,
 generations: 1,
 virtualGrid: [],
 domGrid: [],
 fill() {
  for(let x = 0; x < this.width; x++) {
   const newColumn = []
   for(let y = 0; y < this.height; y++) {
    const randomNum = Math.random()
    if(randomNum < this.fillPercent) {
     newColumn[y] = 1
    } else {
     newColumn[y] = 0
    }
   }
   this.virtualGrid.push(newColumn)
  }

  // console.log('Initial:')
  // console.log(this.virtualGrid)
 },
 filter() {
  for(let i = 0; i < this.generations; i++) {
   const gridInstance = this.virtualGrid.slice()

   for(let x = 1; x < this.width - 1; x++) {
    for(let y = 1; y < this.height - 1; y++) {
     if(gridInstance[x][y] === 0) {
      // this.emptyRules({ x, y })
     } else if(gridInstance[x][y] === 1) {
      this.filledRules(gridInstance, { x, y })
     }
    }
   }

   // console.log(`Generation ${i + 1}:`)
   // console.log(grid.virtualGrid)
  }
 },
 emptyRules(coords) {
  let filledNeighbors = 0

  for(let neighborX = coords.x - 1; neighborX <= coords.x + 1; neighborX++) {
   for(let neighborY = coords.y - 1; neighborY <= coords.y  + 1; neighborY++) {
    if(neighborX === coords.x && neighborY === coords.y) {
     continue
    }

    if(this.virtualGrid[neighborX][neighborY] === 1) {
     filledNeighbors++
    }
   }
  }

  if(filledNeighbors > 3) {
   this.virtualGrid[coords.x][coords.y] = 1
  }
 },
 filledRules(gridInstance, coords) {
  // let emptyNeighborCount = 0

  for(let neighborX = coords.x - 1; neighborX <= coords.x + 1; neighborX++) {
   for(let neighborY = coords.y - 1; neighborY <= coords.y  + 1; neighborY++) {
    if(neighborX === coords.x && neighborY === coords.y) {
     continue
    }

    if(gridInstance[neighborX][neighborY] === 0) {
     this.virtualGrid[coords.x][coords.y] = 0
     this.virtualGrid[neighborX][neighborY] = 1

     return
    }
   }
  }

  // if(emptyNeighborCount < 3) {
  //  this.virtualGrid[coords.x][coords.y] = 0
  // }
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
  for(let x = 0; x < grid.width; x++) {
   const newColumnEl = document.createElement('div')
   newColumnEl.className = 'column' 
   newColumnEl.parentElement = gridEl

   for(let y = 0; y < grid.height; y++) {
    if(grid.virtualGrid[x][y] === 1) {
     const newTile = document.createElement('div')
     newTile.className = 'tile'
     newTile.parentElement = newColumnEl
    }
   }
  }
 }
}

app.init()

// grid.fill()
// console.log('Initial:')
// console.log(grid.virtualGrid)

// grid.filter()
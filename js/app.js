var game

//-------------------------------------------------------//
//   This code is purely for the drag and drop portion   //
function allowDrop(event){
  if (event.target.id.includes("stack")){
    if (game.allowMove(event.target.id)){
      event.preventDefault()
    }
  }
}

function drag(event){
  game.currently_dragged = parseFloat(event.target.id)
}

function drop(event){
  event.preventDefault()
  boardSwap(event)
}
//-------------------------------------------------------//

//Basic setup (solve manually or auto, how long between moves,
//how large is the starting stack?)
function setupSimulation(mode, speed){
  if (game){
    game.clear_stacks()
    game.clear_moves()
    clearMoveHistory()
  }
  $("#counter").text("Move Counter: 0")
  let stack_size = parseFloat($("#size")[0].value)
  game = new Puzzle(stack_size)
  game.delay = speed
  if (mode !== 'human'){
    game.selfSolve()
  }
}

//If the user pauses the simulation, tell the puzzle to act accordingly
function pauseSimulation(){
  game.paused = !game.paused
}

//When the user moves a piece, adjust the board accordingly
function boardSwap(event){
  game.makeMove(event.target.id)
}

//Allow the user to prevent history from overwhelming everything
function clearMoveHistory(){
  $("#moves").empty()
}

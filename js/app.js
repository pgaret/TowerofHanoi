var game

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

function setupSimulation(mode, speed){
  if (game){
    game.clear_stacks()
  }
  let stack_size = parseFloat($("#size")[0].value) + 1
  game = new Puzzle(stack_size)
  game.delay = speed
  if (mode !== 'human'){
    game.selfSolve()
  }

}

function boardSwap(event){
  game.makeMove(event.target.id)
}

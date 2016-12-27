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

//Determines what user input should result in
//Primary questions: is there a game, has height changed, is that game over, is that game paused
function setupSimulation(mode, speed){
  let stack_size = parseFloat($("#size")[0].value)
  // debugger
  if (!!game){
    if (stack_size === game.total){
      if (game.current === game.all_moves.length){
        game.clear_stacks()
        clearMoveHistory()
        game = new Puzzle(stack_size)
      }
      else if (game.paused === true) {
        game.paused = false
        $("#play").css("visibility", "hidden")
        $("#pause").css("visibility", "visible")
        game.playOutGame()
      }
    }
    else{
      game.clear_stacks()
      clearMoveHistory()
      game = new Puzzle(stack_size)
    }
  }
  else {
    game = new Puzzle(stack_size)
  }
  if (mode === 'ai' && game.all_moves.length === 0){
    game.selfSolve()
    $("#pause").css("visibility", "visible")
  }
  game.delay = speed

}

//When the user moves a piece, adjust the board accordingly
function boardSwap(event){
  game.makeMove(event.target.id)
}

//Allow the user to prevent history from overwhelming everything
function clearMoveHistory(){
  $("#moves").empty()
}

//Pauses the sim and displays the play button
function pause(){
  game.paused = true
  $("#play").css("visibility", "visible")
  $("#pause").css("visibility", "hidden")
}

//Restarts the sim and displays the pause button
function play(){
  game.paused = false
  $("#play").css("visibility", "hidden")
  $("#pause").css("visibility", "visible")
  game.playOutGame()
}

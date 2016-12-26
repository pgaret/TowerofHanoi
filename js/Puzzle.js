//Manages the game board as a whole
class Puzzle {
  constructor(num){
    //The board itself, composed of the 3 stacks
    this.board = [new Stack("#stack1"), new Stack("#stack2"), new Stack("#stack3")]
    //Keep track of current timeouts so I can remove them when starting a new puzzle
    this.upcoming_moves = []
    //The total pieces on the board, which determines the win condition
    this.total = num
    //Keeps track of which piece is being dragged, since doing so via events isn't easy
    this.currently_dragged = null
    this.paused = false
    //Keeps track of how many moves have happened, used both for move counter and timing
    this.counter = 1
    //Edge cases
    if (num <= 0 || num > 54 || !num) {
      console.log('Why would you do such a thing.')
    }
    //Creates the initial stack - all but the first are not draggable
    //Using font-size as a convenient visual to replicate the rings
    else {
      this.board[0].current_set.push(1)
      $("#stack1").append("<p draggable='true' style='font-size:12px; border-style: none;' id='1' ondragstart='drag(event)'>1</p>")
      if (num > 1){
        for (let i = 2; i < num+1; i++) {
          this.board[0].current_set.push(i)
          let txt = "<p id="+i+" style='font-size:"+(12+2*(i-1))+"px;' draggable='false' ondragstart='drag(event)'>"+i.toString()+"</p>"
          $("#stack1").append(txt)
        }
      }
    }
  }

  //Before we allow the user to drop a ring, make sure it's a valid spot
  allowMove(toStack){
    return this.find_stack_by_id(toStack).can_be_added(this.currently_dragged) ? true : false
  }

  //Find the stack that's been dropped on by id, then move the dropped item
  makeMove(toStackId) {
    this.moveItem(this.find_stack_by_contents(this.currently_dragged),
        this.find_stack_by_id(toStackId))
  }

  //The recursive algorithm that drives everything else
  //Addressed more thoroughly in the ReadMe
  moveTower(height, fromStack, toStack, withStack){
    if (height >= 1) {
      this.moveTower(height - 1, fromStack, withStack, toStack)
      let counter = JSON.parse(JSON.stringify(this.counter))
      this.upcoming_moves.push(setTimeout(()=>{this.moveItem(fromStack, toStack, counter)}, this.counter*this.delay))
      this.counter += 1
      this.moveTower(height - 1, withStack, toStack, fromStack)
    }
  }

  //If we're not currently paused, move the item
  //This comes in three parts:
  //  1. Add the top fromStack item to toStack then remove it from fromStack
  //  2. Change the first child of fromStack's parent to toStack
  //  3. Update the move counter since a successful move has occurred
  moveItem(fromStack, toStack, thisMoveCounter){
    if (this.paused === true){
      setTimeout(()=>{this.moveItem(fromStack, toStack)}, Math.abs(thisMoveCounter - this.counter)*this.delay)
    }
    else {
      toStack.add_item(fromStack.top_item())
      fromStack.remove_item()
      $(toStack.id).prepend($(fromStack.id).children()[0])
      if (thisMoveCounter) {
        $("#counter").text("Move Counter: "+thisMoveCounter)
      }
      else {
        $("#counter").text("Move Counter: "+this.counter)
        this.counter += 1
      }
      $("#moves").prepend("<div>"+toStack.top_item()+" from "+fromStack.id+" to "+toStack.id+"</div>")
      $(fromStack.id).css("background-color", "white")
      if (toStack.current_set.length === this.total){
        $(toStack.id).css("background-color", "lightgreen")
      }
      else {
        $(toStack.id).css("background-color", "white")
      }
    }
  }

  //Helper method that finds the stack that is tied to a stackID
  find_stack_by_id(id){
    id = "#"+id
    for (let i = 0; i < this.board.length; i++){
      if (this.board[i].id === id){
        return this.board[i]
      }
    }
  }

  //Helper method that finds the stack that includes a given number
  find_stack_by_contents(num){
    for (let i = 0; i < this.board.length; i++){
      if (this.board[i].current_set.includes(num)){
        return this.board[i]
      }
    }
  }

  //Runs the solution algorithm
  selfSolve(){
    this.moveTower(this.board[0].current_set.length, this.board[0], this.board[2], this.board[1])
  }

  //Clears everything - both the DOM stacks and the board stacks
  clear_stacks(){
    this.board.forEach(stack=>{
      $(stack.id).empty().css("background-color", "white")
      stack.empty()
    })
  }

  //Clears out all timeouts
  clear_moves(){
    for (let i = 0; i < this.upcoming_moves.length; i++){
      clearTimeout(this.upcoming_moves[i])
    }
  }
}

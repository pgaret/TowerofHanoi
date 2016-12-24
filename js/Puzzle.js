class Puzzle {
  constructor(num){
    this.board = [new Stack("#stack1"), new Stack("#stack2"), new Stack("#stack3")]
    this.currently_dragged = null
    if (num <= 0) {
      console.log('Why would you do such a thing.')
    }
    else {
      this.board[0].current_set.push(1)
      $("#stack1").append("<span draggable='true' id='1' ondragstart='drag(event)'>1</span>")
      if (num > 1){
        for (let i = 2; i < num; i++) {
          this.board[0].current_set.push(i)
          let txt = "<span id="+i+" draggable='false' ondragstart='drag(event)'> "+i.toString()+" </span>"
          $("#stack1").append(txt)
        }
      }
    }
  }

  allowMove(toStack){
    return this.find_stack_by_id(toStack).can_be_added(this.currently_dragged) ? true : false
  }

  makeMove(toStackId) {
    let toStack = this.find_stack_by_id(toStackId)
    let fromStack = this.find_stack_by_contents(this.currently_dragged)
    this.moveItem(fromStack, toStack)
  }

  moveTower(height, fromStack, toStack, withStack){
    if (height >= 1) {
      this.moveTower(height - 1, fromStack, withStack, toStack)
      this.moveItem(fromStack, toStack)
      this.moveTower(height - 1, withStack, toStack, fromStack)
    }
  }

  moveItem(fromStack, toStack){
    console.log("Moving "+fromStack.top_item()+" from "+fromStack.id+" to "+toStack.id)
    toStack.add_item(fromStack.top_item())
    fromStack.remove_item()
    $(fromStack.id).children()[0].remove()
    let txt = "<span id="+toStack.top_item()+" draggable='true' ondragstart='drag(event)'> "+toStack.top_item().toString()+" </span>"
    $(toStack.id).prepend(txt)
  }

  find_stack_by_id(id){
    id = "#"+id
    for (let i = 0; i < this.board.length; i++){
      if (this.board[i].id === id){
        return this.board[i]
      }
    }
  }

  find_stack_by_contents(num){
    for (let i = 0; i < this.board.length; i++){
      if (this.board[i].current_set.includes(num)){
        return this.board[i]
      }
    }
  }

  selfSolve(){
    // debugger
    this.moveTower(this.board[0].current_set.length, this.board[0], this.board[2], this.board[1])
  }

  clear_stacks(){
    this.board.forEach(stack=>{
      $(stack.id).empty()
      stack.empty()
    })
  }
}

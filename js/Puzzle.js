class Puzzle {
  constructor(num){
    this.board = [new Stack("#stack1"), new Stack("#stack2"), new Stack("#stack3")]
    this.currently_dragged = null
    // this.delay = $("#delay")[0].value
    this.counter = 0
    if (num <= 0 || num > 54) {
      console.log('Why would you do such a thing.')
    }
    else {
      this.board[0].current_set.push(1)
      $("#stack1").append("<p draggable='true' style='font-size:12px' id='1' ondragstart='drag(event)'>1</p>")
      if (num > 1){
        for (let i = 2; i < num; i++) {
          this.board[0].current_set.push(i)
          let txt = "<p id="+i+" style='font-size:"+(12+2*(i-1))+"px' draggable='false' ondragstart='drag(event)'>"+i.toString()+"</p>"
          $("#stack1").append(txt)
        }
      }
    }
  }

  allowMove(toStack){
    return this.find_stack_by_id(toStack).can_be_added(this.currently_dragged) ? true : false
  }

  makeMove(toStackId) {
    this.moveItem(this.find_stack_by_contents(this.currently_dragged),
        this.find_stack_by_id(toStackId))
  }

  moveTower(height, fromStack, toStack, withStack){
    if (height >= 1) {
      this.moveTower(height - 1, fromStack, withStack, toStack)
      setTimeout(()=>{this.moveItem(fromStack, toStack)}, this.counter*this.delay)
      this.counter += 1
      this.moveTower(height - 1, withStack, toStack, fromStack)
    }
  }

  moveItem(fromStack, toStack){
    toStack.add_item(fromStack.top_item())
    fromStack.remove_item()
    // console.log($(fromStack.id).children()[0])
    $(toStack.id).prepend($(fromStack.id).children()[0])
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
    this.moveTower(this.board[0].current_set.length, this.board[0], this.board[2], this.board[1])
  }

  clear_stacks(){
    this.board.forEach(stack=>{
      $(stack.id).empty()
      stack.empty()
    })
  }
}

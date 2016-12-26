//Each stack has a couple unique properties to keep track of
class Stack {
  constructor(id){
    //How we'll keep the Stacks distinct for future reference
    this.id = id
    //Current rings on this stack
    this.current_set = []
  }

  //Check whether a ring is able to to be put on this stack - used when considering
  //whether to allow a user to drop their dragged ring in a given location
  can_be_added(num){
    //Math.min.apply(Math, arr) finds the minimum element of an array
    if (Math.min.apply(Math, this.current_set) > num){
      return true
    }
    else {
      return false
    }
  }

  //Adds an item to the stack
  //Id's of numbers correspond to id's of DOM so we can go ahead and change draggable attrs
  add_item(num){
    this.current_set.unshift(num)
    $("#"+this.current_set[0]).attr("draggable", "true")
    $("#"+this.current_set[1]).attr("draggable", "false")
  }

  //Removes item from the front, sets first element to draggable true
  //Don't have to worry about the lost element, it's taken care of above
  remove_item(){
    this.current_set.splice(0, 1)
    $("#"+this.current_set[0]).attr("draggable", "true")
  }

  //Returns the top item
  //Could have just run this code in Puzzle.js, but this seemed potentially useful in the future
  top_item(){
    return this.current_set[0]
  }

  //Clears the set (does not impact DOM, that's dealt with in clear_stacks in Puzzle.js)
  empty(){
    this.current_set = []
  }
}

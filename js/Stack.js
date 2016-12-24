class Stack {
  constructor(id){
    this.id = id
    this.current_set = []
  }
  can_be_added(num){
    if (Math.min.apply(Math, this.current_set) > num){
      return true
    }
    else {
      return false
    }
  }
  add_item(num){
    this.current_set.unshift(num)
    $("#"+this.current_set[0]).attr("draggable", "true")
    $("#"+this.current_set[1]).attr("draggable", "false")
  }

  remove_item(){
    this.current_set.splice(0, 1)
    $("#"+this.current_set[0]).attr("draggable", "true")
  }

  top_item(){
    return this.current_set[0]
  }

  empty(){
    this.current_set = []
  }
}

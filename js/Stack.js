class Stack {
  constructor(){
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
  }
}

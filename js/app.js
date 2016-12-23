function allowDrop(event){
  if (event.target.id.includes("stack")){
    event.preventDefault()
  }
}

function drag(event){
  event.dataTransfer.setData("text", event.target.id)
}

function drop(event){
  event.preventDefault()
  boardSwap(event)
}

function setupSimulation(){
  let stack_size = parseFloat($("#size")[0].value) + 1
  for (let i = 1; i < stack_size; i++) {
    board[0].push(i)
    let txt = "<span draggable='true' id="+i+" ondragstart='drag(event)'> "+i.toString()+" </span>"
    $("#stack1").append(txt)
  }
}

function boardSwap(event){
  var data = event.dataTransfer.getData("text")
  event.target.appendChild(document.getElementById(data))
  let reduced_stack = board.filter(stack=>{return stack.includes(parseFloat(data))})[0]
  // reduced_stack.splice(reduced_stack.indexOf(parseFloat(data)), 1)
  // board[event.target.id[5] - 1].push(parseFloat(data))
}

function testSim(){
  for (let i = 1; i < 5; i++) {
    board[0].push(i)
    let txt = "<span draggable='true' id="+i+" ondragstart='drag(event)'> "+i.toString()+" </span>"
    $("#stack1").append(txt)
  }
  moveTower(board[0].length, board[0], board[1], board[2])
}

function moveTower(height,fromPole, toPole, withPole){
  if (height >= 1) {
      moveTower(height-1,fromPole,withPole,toPole)
      moveDisk(fromPole,toPole)
      moveTower(height-1,withPole,toPole,fromPole)
  }
}

function moveDisk(fp,tp){

  tp.unshift(fp[0])
  fp.splice(0, 1)
}

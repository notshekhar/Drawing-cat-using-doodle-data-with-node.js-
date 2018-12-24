// setInterval(()=>{
//   let r = new XMLHttpRequest()
//   let canvas = document.querySelector('#canvas')
//   let height = canvas.height
//   let width = canvas.width
//
//   let ctx = canvas.getContext('2d')
//   ctx.strokeStyle = "black"
//   ctx.strokeWeight = "5px"
//   ctx.lineJoin = 'round'
//   ctx.lineCap = 'round'
//   let lastX, lastY
//   let penIndex = 0
//   r.open('GET', 'get')
//   r.send()
//   r.onload=()=>{
//     let d = JSON.parse(r.responseText)
//     let drawing = d.drawing
//     console.log(drawing)
//     for(let j=0; j<drawing.length; j++){
//       let path = drawing[j]
//       let xs = path[0]
//       let ys = path[1]
//       for(let i=0; i<xs.length; i++){
//         let x = xs[i]/1000*width
//         let y = ys[i]/1000*height
//         ctx.beginPath()
//         ctx.moveTo(lastX, lastY)
//         ctx.lineTo(x, y)
//         ctx.stroke()
//         if(i == xs.length-1){
//           lastX = undefined
//           lastY = undefined
//           console.log(lastX, lastY)
//         }else{
//           lastX = x
//           lastY = y
//         }
//       }
//     }
//   }
//
//   ctx.fillStyle = "white"
//   ctx.fillRect(0, 0, canvas.width, canvas.height)
// }, 300)

let button = document.querySelector('.get')
button.onclick = () =>{
  let r = new XMLHttpRequest()
  let canvas = document.querySelector('#canvas')
  let height = canvas.height
  let width = canvas.width
  let ctx = canvas.getContext('2d')
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.strokeStyle = "black"
  ctx.strokeWeight = "5px"
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  let lastX, lastY
  let pathIndex = 0
  let penIndex = 0
  r.open('GET', 'get')
  r.send()
  r.onload=()=>{
    let d = JSON.parse(r.responseText)
    let drawing = d.drawing
    console.log(drawing)
    console.log(drawing[0])
    let draw = setInterval(function(){
      let x = drawing[pathIndex][0][penIndex]/800*width
      let y = drawing[pathIndex][1][penIndex]/800*height
      ctx.beginPath()
      ctx.moveTo(lastX, lastY)
      ctx.lineTo(x, y)
      ctx.stroke()
      lastX = x
      lastY = y
      if(penIndex<drawing[pathIndex][0].length-1){
        penIndex++
      }else{
        if(pathIndex<drawing.length-1){
          pathIndex++
          console.log(drawing[pathIndex])
        }else{
          console.log('cleared')
          clearInterval(draw)
        }
        lastX = undefined
        lastY = undefined
        penIndex = 0
      }
    }, 20)
  }
}

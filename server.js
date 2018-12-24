let express = require('express')
let ndjson = require('ndjson')
let mysql = require('mysql')
let cookies = require('cookies')
let parser = require('body-parser')
let multer = require('multer')
let fs = require('fs')



let data = []
let i = 0

// reading ndjson file
fs.createReadStream('cat.ndjson')
  .pipe(ndjson.parse())
  .on('data', function(obj) {
    data.push(obj)
    console.log(i++)
  })

let upload = multer()
let app = express()
let server = app.listen(3000, ()=>{
  console.log(`Runnging server at port: ${server.address().port}\n Open: http://127.0.0.1:${server.address().port}/`)
})
app.use(parser.json())
app.use(parser.urlencoded({extended: true}))
app.get('/get', (request, response)=>{
  // let cookie = new cookies(request, response)
  // cookie.set('nn', data)
  console.log(`Method: ${request.method}, url: ${request.url}, statusCode: ${request.statusCode}`)
  let r = Math.floor(Math.random()*data.length)
  let d = data[r]
  response.send(d)
})
// app.post('/send', upload.array(), (request, response)=>{
//     let d = request.body
//     response.json(d)
//     console.log(d)
// })
app.use(express.static('public'))

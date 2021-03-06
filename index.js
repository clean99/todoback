const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app =express()
const Note = require('./models/note')
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())//中间件，获取json->js对象
app.use(requestLogger)


app.get('/',(req,res) =>{
    res.send('<h1>hello world</h1>')
})
app.get('/api/notes',(req,res)=>{
    Note.find({}).then(notes=>{
      res.json(notes)
    })
})
//fetching a single resource
app.get('/api/notes/:id',(req,res)=>{
  const id = Number(req.params.id)
  const note = notes.find(note=>note.id===id)
  if(note){
    res.json(note)
  }
  else{
    res.status(404).end()
}
})
app.delete('/api/notes/:id',(req,res)=>{
  const id = Number(req.params.id)
  notes = notes.filter(note=>note.id !== id)
  res.status(204).end()
})
app.post('/api/notes',(req,res)=>{
  const body = req.body
  if(!body.content)
  {
    return res.status(400).json({
      error:'content missing'
    })
  } 
  if(notes.find((note)=>(note.content === body.content)))
  {
    return res.status(400).json({
      error:'name must be unique'
    })
  }
  const maxId = notes.length > 0?Math.max(...notes.map((note)=>note.id)):0//max参数是单独的数字不是数组，用。。。展开
  const note = {
    content:body.content,
    id:maxId+1,
    important:body.important||false,
    date:new Date()
  }
  notes = notes.concat(note)
  console.log(notes)
  res.json(note)
})
const port = 3001
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})

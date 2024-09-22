import { Request,Response } from "express"


const express = require('express')
const cors = require('cors')
const app = express()
const todoRouter = require('./routes/todo')
app.use(cors())
app.use(express.json())
app.use(todoRouter)

const port = 5000


app.get('/', (req: Request, res:Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
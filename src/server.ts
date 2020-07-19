import 'reflect-metadata'
import './database/connect'
import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', routes)

app.listen(3333, () => console.log('Server started at http://localhost:3333'))

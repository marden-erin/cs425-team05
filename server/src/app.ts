import express from 'express'
import bookRouter from './routes/bookRoutes'

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/book', bookRouter)

export default app
import express from 'express'
import bookRouter from './routes/bookRoutes'
import {errorHandler} from './middleware/errorMiddleware'

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(errorHandler)

app.use('/api/book', bookRouter)

export default app
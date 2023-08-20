import express, { Request, Response } from 'express'
import { DB } from './repositories/mongo-db'
import { blogsRouter } from './routes/blogsRouter'
import { postsRouter } from './routes/postsRouter'
import {authRouter} from "./routes/authRouter";
import {usersRouter} from "./routes/usersRouter";

export const app = express()

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.sendStatus(204)
})

app.delete('/testing/all-data', async (req: Request, res: Response) => {
    res.sendStatus(await DB.clear())
})

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/auth', authRouter)
app.use('/users', usersRouter)



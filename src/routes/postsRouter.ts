import { Response, Router } from 'express'
import { admins } from '../repositories/mongo-db'
import {
    TypeOfRequestP,
    TypeOfRequestP_Body,
    PostInputModel,
    TypeOfRequestQuery,
    Paginator,
    PostViewModel,
    APIErrorResult
} from '../types/models'

import basicAuth from 'express-basic-auth'
import { Result, validationResult } from 'express-validator'
import { postVdChain } from '../inputValidation'
import { ErrorMapper } from '../utils/errorMapper'
import { postsService } from '../domain/posts-service'
import { postsQueryRepo } from '../repositories/posts-query-repository'

export const postsRouter = Router({})



postsRouter.post('/', basicAuth({users: admins}), postVdChain, async (req: TypeOfRequestP_Body<{ id: string }, PostInputModel>, res: Response<PostViewModel | APIErrorResult>) => {

    const result: Result = validationResult(req);

    if (result.isEmpty()) {
        res.status(201).json(await postsService.create(req))
    } else {
        res.status(400).json(await ErrorMapper(result))
    }
})



postsRouter.get('/', async (req: TypeOfRequestQuery<{
    searchNameTerm: string,
    sortBy: string,
    sortDirection: string,
    pageNumber: string,
    pageSize: string }>, res: Response<Paginator<PostViewModel | null>>) => {

    res.status(200).json(await postsQueryRepo.getAll(req))
})



postsRouter.get('/:id', async (req: TypeOfRequestP<{ id: string }>, res: Response<PostViewModel | null>) => {

    if (await postsQueryRepo.exists(req.params.id)) {
        res.status(200).json(await postsQueryRepo.get(req.params.id))
    } else {
        res.sendStatus(404)
    }
})



postsRouter.put('/:id', basicAuth({users: admins}), postVdChain, async (req: TypeOfRequestP_Body<{ id: string },
    PostInputModel>, res: Response) => {
    if (await postsQueryRepo.exists(req.params.id)) {

        const result: Result = validationResult(req)

        if (result.isEmpty()) {
            res.sendStatus(await postsService.update(req))
        } else {
            res.status(400).json(await ErrorMapper(result))
        }
    } else {
        res.sendStatus(404)
    }
})



postsRouter.delete('/:id', basicAuth({users: admins}), async (req: TypeOfRequestP<{ id: string }>, res: Response) => {
    res.sendStatus(await postsService.delete(req))
})



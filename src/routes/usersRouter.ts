import { userVdChain } from '../inputValidation'
import {
    Paginator,
    TypeOfRequestBody,
    TypeOfRequestP,
    TypeOfRequestQuery, UserInputModel, UserViewModel
} from '../types/models'
import { Response, Router } from 'express'
import { Result, validationResult } from 'express-validator'
import { ErrorMapper } from '../utils/errorMapper'
import basicAuth from 'express-basic-auth'
import { admins } from '../repositories/mongo-db'
import { usersService } from '../domain/users-service'
import { usersQueryRepo } from '../repositories/users-query-repository'

export const usersRouter = Router({})

usersRouter.post('/', basicAuth({users: admins}), userVdChain, async (req: TypeOfRequestBody<UserInputModel>, res: Response) => {

    const result: Result = validationResult(req)

    if (result.isEmpty()) {
        res.status(201).json(await usersService.create(req))
    } else {
        res.status(400).json(await ErrorMapper(result))
    }
})

usersRouter.get('/', basicAuth({users: admins}), async (req: TypeOfRequestQuery<{
    searchLoginTerm: string,
    searchEmailTerm: string,
    sortBy: string,
    sortDirection: string,
    pageNumber: string,
    pageSize: string }>, res: Response<Paginator<UserViewModel | null>>) => {

    res.status(200).json(await usersQueryRepo.getAll(req))
})

usersRouter.delete('/:id', basicAuth({users: admins}), async (req: TypeOfRequestP<{ id: string }>, res: Response) => {
    res.sendStatus(await usersService.delete(req))
})
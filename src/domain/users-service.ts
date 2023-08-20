import {
    LoginInputModel,
    TypeOfRequestBody,
    TypeOfRequestP, UserDataModel,
    UserInputModel,
    UserViewModel
} from '../types/models'
import { usersRepo } from '../repositories/users-repository'
import bcrypt from 'bcrypt'
import {usersQueryRepo} from "../repositories/users-query-repository";

export const usersService = {

    async create(req: TypeOfRequestBody<UserInputModel>): Promise<UserViewModel> {

        const newEntry: UserDataModel = {
            id: await usersRepo.newID(),
            login: req.body.login,
            password: await bcrypt.hash(req.body.password, 8),
            email: req.body.email,
            createdAt: new Date().toISOString()
        }

        await usersRepo.create({ ...newEntry })
        //exclude certain fields and return rest.
        const { password, ...rest } = newEntry
        return rest as UserViewModel
    },



    async delete(req: TypeOfRequestP<{ id: string }>): Promise<number> {
        return usersRepo.delete(req.params.id)
    },



    async authenticate(req: TypeOfRequestBody<LoginInputModel>): Promise<boolean> {
        const user = await usersQueryRepo.getDataByLoginOrEmail(req.body.loginOrEmail)
        if (user) {
            return await bcrypt.compare(req.body.password, user.password)
        }
        return false
    }

}
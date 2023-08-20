import { DB } from './mongo-db'
import {
    Paginator,
    TypeOfRequestQuery,
    UserDataModel,
    UserViewModel
} from '../types/models'
import { setDefault } from '../utils/setDefault'

export const usersQueryRepo = {

    async getAll(req: TypeOfRequestQuery<{
        searchLoginTerm: string,
        searchEmailTerm: string,
        sortBy: string,
        sortDirection: string,
        pageNumber: string,
        pageSize: string }>): Promise<Paginator<UserViewModel | null>> {

        let loginQuery: object = {}
        let emailQuery: object = {}
        if (req.query.searchLoginTerm !== undefined) { loginQuery = {'login': { '$regex': req.query.searchLoginTerm, '$options': 'i' }} }
        if (req.query.searchEmailTerm !== undefined) { emailQuery = {'email': { '$regex': req.query.searchEmailTerm, '$options': 'i' }} }
        const sortBy = setDefault(req.query.sortBy, 'createdAt')
        const sortDirection = setDefault(req.query.sortDirection, 'desc')
        const pageNumber = parseInt( setDefault(req.query.pageNumber, 1), 10 )
        const pageSize = parseInt( setDefault(req.query.pageSize, 10), 10 )

        const resCount = await DB.countResults('users', {...loginQuery, ...emailQuery})
        const pCount = Math.ceil(resCount / pageSize)
        const S = (pageNumber - 1) * pageSize
        const L = pageSize

        const page: Paginator<UserViewModel | null> = {
            pagesCount: pCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount: resCount,
            items: await DB.getAll('users', {...loginQuery, ...emailQuery}, { password: 0 }, {[sortBy]: sortDirection}, S, L) as Array<UserViewModel | null>
        }

        return page
    },

    async getDataByLoginOrEmail(loginOrEmail: string): Promise<UserDataModel | null> {
        return await DB.getOne('users', { $or: [{ login: loginOrEmail }, { email: loginOrEmail }]}, {}) as UserDataModel | null
    },

    async exists(id: string): Promise<boolean> {
        return DB.exists('users', id)
    }

}



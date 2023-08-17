import { DB } from './mongo-db'
import { BlogViewModel, Paginator, TypeOfRequestQuery } from '../types/models'
import { setDefault } from '../utils/setDefault'

export const blogsQueryRepo = {

    async get(id: string): Promise<BlogViewModel | null> {
        return await DB.getOne('blogs', {id: id}, {}) as BlogViewModel | null
    },

    async getAll(req: TypeOfRequestQuery<{
        searchNameTerm: string,
        sortBy: string,
        sortDirection: string,
        pageNumber: string,
        pageSize: string }>): Promise<Paginator<BlogViewModel | null>> {

        const searchNameTerm = setDefault(req.query.searchNameTerm, '.')
        const sortBy = setDefault(req.query.sortBy, 'createdAt')
        const sortDirection = setDefault(req.query.sortDirection, 'desc')
        const pageNumber = parseInt( setDefault(req.query.pageNumber, 1), 10 )
        const pageSize = parseInt( setDefault(req.query.pageSize, 10), 10 )

        const resCount = await DB.countResults('blogs', {'name': { '$regex': searchNameTerm, '$options': 'i' } })
        const pCount = Math.ceil(resCount / pageSize)
        const S = (pageNumber - 1) * pageSize
        const L = pageSize

        const page: Paginator<BlogViewModel | null> = {
            pagesCount: pCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount: resCount,
            items: await DB.getAll('blogs', {'name': { '$regex': searchNameTerm, '$options': 'i' } },
                {}, {[sortBy]: sortDirection}, S, L) as Array<BlogViewModel | null>
        }

        return page
    },

    async exists(id: string): Promise<boolean> {
        return DB.exists('blogs', id)
    }

}



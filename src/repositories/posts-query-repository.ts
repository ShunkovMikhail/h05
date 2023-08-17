import { DB } from './mongo-db'
import { Paginator, PostViewModel, TypeOfRequestP_Query, TypeOfRequestQuery } from '../types/models'
import { setDefault } from '../utils/setDefault'

export const postsQueryRepo = {

    async get(id: string): Promise<PostViewModel | null> {
        return await DB.getOne('posts', {id: id}, {}) as PostViewModel | null
    },

    async getAll(req: TypeOfRequestQuery<{
        sortBy: string,
        sortDirection: string,
        pageNumber: string,
        pageSize: string }>): Promise<Paginator<PostViewModel | null>> {

        const sortBy = setDefault(req.query.sortBy, 'createdAt')
        const sortDirection = setDefault(req.query.sortDirection, 'desc')
        const pageNumber = parseInt( setDefault(req.query.pageNumber, 1), 10 )
        const pageSize = parseInt( setDefault(req.query.pageSize, 10), 10 )

        const resCount = await DB.countResults('posts', {})
        const pCount = Math.ceil(resCount / pageSize)
        const S = (pageNumber - 1) * pageSize
        const L = pageSize

        const page: Paginator<PostViewModel | null> = {
            pagesCount: pCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount: resCount,
            items: await DB.getAll('posts', {},
                {}, {[sortBy]: sortDirection}, S, L) as Array<PostViewModel | null>
        }

        return page
    },

    async getAllByBlog(req: TypeOfRequestP_Query<{ id: string }, {
        sortBy: string,
        sortDirection: string,
        pageNumber: string,
        pageSize: string }>): Promise<Paginator<PostViewModel | null>> {

        const sortBy = setDefault(req.query.sortBy, 'createdAt')
        const sortDirection = setDefault(req.query.sortDirection, 'desc')
        const pageNumber = parseInt( setDefault(req.query.pageNumber, 1), 10 )
        const pageSize = parseInt( setDefault(req.query.pageSize, 10), 10 )

        const resCount = await DB.countResults('posts', {blogId: req.params.id})
        const pCount = Math.ceil(resCount / pageSize)
        const S = (pageNumber - 1) * pageSize
        const L = pageSize

        const page: Paginator<PostViewModel | null> = {
            pagesCount: pCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount: resCount,
            items: await DB.getAll('posts', {blogId: req.params.id},
                {}, {[sortBy]: sortDirection}, S, L) as Array<PostViewModel | null>
        }

        return page
    },

    async exists(id: string): Promise<boolean> {
        return DB.exists('posts', id)
    }

}



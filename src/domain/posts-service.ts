import {
    BlogPostInputModel,
    PostInputModel,
    PostViewModel,
    TypeOfRequestBody,
    TypeOfRequestP,
    TypeOfRequestP_Body
} from '../types/models'
import { postsRepo } from '../repositories/posts-repository'
import { DB } from '../repositories/mongo-db'
import { setDefault } from '../utils/setDefault'

export const postsService = {

    //if called with id param - sets it as blog id
    async create(req: TypeOfRequestP_Body<{ id: string }, PostInputModel>): Promise<PostViewModel> {

        const newEntry: PostViewModel = {
            id: await postsRepo.newID(),
            blogId: setDefault(req.params.id, req.body.blogId),
            blogName: await DB.getProperty('blogs', req.body.blogId, 'name'),
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            createdAt: new Date().toISOString()
        }

        await postsRepo.create({ ...newEntry })
        return newEntry
    },



    async createByBlog(req: TypeOfRequestBody<BlogPostInputModel>, blogId: string): Promise<PostViewModel> {

        const newEntry: PostViewModel = {
            id: await postsRepo.newID(),
            blogId: blogId,
            blogName: await DB.getProperty('blogs', blogId, 'name'),
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            createdAt: new Date().toISOString()
        }

        await postsRepo.create({ ...newEntry })
        return newEntry
    },



    async update(req: TypeOfRequestP_Body<{ id: string },
        PostInputModel>): Promise<number> {

        const updateEntry: PostInputModel = {
            blogId: req.body.blogId,
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content
        }

        await postsRepo.update(req.params.id, updateEntry)
        return 204
    },



    async delete(req: TypeOfRequestP<{ id: string }>): Promise<number> {
        return postsRepo.delete(req.params.id)
    }

}
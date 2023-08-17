import { blogsRepo } from '../repositories/blogs-repository'
import {BlogInputModel, BlogViewModel, TypeOfRequestBody, TypeOfRequestP, TypeOfRequestP_Body} from '../types/models'

export const blogsService = {

    async create(req: TypeOfRequestBody<BlogInputModel>): Promise<BlogViewModel> {

        const newEntry: BlogViewModel = {
            id: await blogsRepo.newID(),
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }

        await blogsRepo.create({...newEntry})
        return newEntry
    },



    async update(req: TypeOfRequestP_Body<{ id: string },
        BlogInputModel>): Promise<number> {

        const updateEntry: BlogInputModel = {
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl
        }

        await blogsRepo.update(req.params.id, updateEntry)
        return 204
    },



    async delete(req: TypeOfRequestP<{ id: string }>): Promise<number> {
        return blogsRepo.delete(req.params.id)
    }

}
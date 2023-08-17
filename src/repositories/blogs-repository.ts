import { DB } from './mongo-db'
import { BlogInputModel, BlogViewModel } from '../types/models'

export const blogsRepo = {

    async create(input: BlogViewModel) {
        await DB.create('blogs', input)
    },

    async update(id: string, input: BlogInputModel) {
        await DB.update('blogs', id, input)
    },

    async delete(id: string): Promise<number> {
        return DB.delete('blogs', id)
    },

    async newID(): Promise<string> {
        return DB.generateUUID()
    },

}



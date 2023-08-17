import { DB } from './mongo-db'
import { PostInputModel, PostViewModel } from '../types/models'

export const postsRepo = {

    async create(input: PostViewModel) {
        await DB.create('posts', input)
    },

    async update(id: string, input: PostInputModel) {
        await DB.update('posts', id, input)
    },

    async delete(id: string): Promise<number> {
        return DB.delete('posts', id)
    },

    async newID(): Promise<string> {
        return DB.generateUUID()
    },

}



import { DB } from './mongo-db'
import { UserInputModel, UserViewModel } from '../types/models'

export const usersRepo = {

    async create(input: UserViewModel) {
        await DB.create('users', input)
    },

    async update(id: string, input: UserInputModel) {
        await DB.update('users', id, input)
    },

    async delete(id: string): Promise<number> {
        return DB.delete('users', id)
    },

    async newID(): Promise<string> {
        return DB.generateUUID()
    },

}



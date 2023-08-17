import { client } from "./connection"
import { v4 as uuid } from 'uuid'

//------------------ setup -----------------------
const db = client.db('data')
export let admins = { 'admin': 'qwerty' }


export const DB = {

    async create(collection: string, input: object) {
        await db.collection(collection).insertOne(input)
    },

    async getOne(collection: string, query: object, project: object): Promise<object | null> {
        const entry = await db.collection(collection).findOne(query, {projection:{ ...project, _id: 0 }})
        if (entry) {
            return entry
        }
        return null
    },

    async getAll(collection: string, query: object, project: object, sort: object, S: number, L: number): Promise<Array<object | null>> {
        return db.collection(collection).find(query, {projection:{ ...project, _id: 0 }}).sort({ ...sort }).skip(S).limit(L).toArray()
    },

    async getAllUnrestricted(collection: string, query: object, project: object): Promise<Array<object | null>> {
        return db.collection(collection).find(query, {projection:{ ...project, _id: 0 }}).toArray()
    },

    async getProperty(collection: string, id: string, property: string) {
        const entry = await db.collection(collection).findOne({id: id})
        if (entry) {
            // @ts-ignore
            return entry[property]
        }
        return null
    },

    async update(collection: string, id: string, input: object) {
        const entry = await db.collection(collection).findOne({id: id})
        if (entry) {
            await db.collection(collection).updateOne({id: id}, {$set: Object.assign({}, entry, input)})
        }
    },

    async delete(collection: string, id: string): Promise<number> {
        const res = await db.collection(collection).deleteOne({id: id})
        if (res.deletedCount === 1) {
            return 204
        }
        return 404
    },

    async clearColl(collection: string): Promise<number> {
        await db.collection(collection).deleteMany({})
        return 204
    },

    async clear(): Promise<number> {
        await db.collection('blogs').deleteMany({})
        await db.collection('posts').deleteMany({})
        return 204
    },

    async generateUUID(): Promise<string> {
        return uuid()
    },

    async exists(collection: string, id: string): Promise<boolean> {
        const entry = await db.collection(collection).findOne({id: id})
        return !!entry
    },

    async countResults(collection: string, query: object): Promise<number> {
        return db.collection(collection).countDocuments(query)
    }

}



//Takes from database actual value for admins and assign it when it gets resolved
DB.getAllUnrestricted('admins', {}, {}).then((value) => {
    // @ts-ignore
    admins = Object.fromEntries(value.map(e => [e.login, e.password]))
})
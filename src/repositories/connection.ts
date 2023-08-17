import { MongoClient } from 'mongodb'

import dotenv from 'dotenv'
dotenv.config()

const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'

export const client = new MongoClient(mongoURI)

export async function runDb() {
    try {
        await client.connect()
        await client.db('data').command({ ping: 1 })
        console.log('DB: Connected!')
    } catch {
        console.log('DB: Error!')
        await client.close()
    }
}
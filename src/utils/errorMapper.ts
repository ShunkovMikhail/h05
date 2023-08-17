import { Result } from 'express-validator'
import { APIErrorResult } from '../types/models'

//map validation result to proper model
export const ErrorMapper = async (result: Result): Promise<APIErrorResult> => {
    return { errorsMessages: result.array().map(({path, msg}) => ({message: msg, field: path})) }
}
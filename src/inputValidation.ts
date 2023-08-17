import { body } from 'express-validator'
import { DB } from './repositories/mongo-db'

const urlRGX = new RegExp('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$')



const urlRGXValidation = (value: string) => {
    if (!urlRGX.test(value)) {
        throw new Error('Incorrect regex!')
    }
    return true
}



const blogExists = async (id: string) => {
    if (!await DB.exists('blogs', id)) {
        throw new Error('blogId does not exist!')
    }
    return true
}



export const blogVdChain = [

    body('name', 'Incorrect format!')
        .trim()
        .notEmpty()
        .bail()
        .isLength({min: 1, max: 15}).withMessage('Too many characters! (maxLength: 15)'),

    body('description', 'Incorrect format!')
        .trim()
        .notEmpty()
        .bail()
        .isLength({min: 1, max: 500}).withMessage('Too many characters! (maxLength: 500)'),

    body('websiteUrl', 'Incorrect format!')
        .trim()
        .notEmpty()
        .bail()
        .isLength({min: 1, max: 100}).withMessage('Too many characters! (maxLength: 100)')
        .bail()
        .custom(value => urlRGXValidation(value))

]



export const postVdChain = [

    body('blogId', 'Incorrect id!')
        .trim()
        .notEmpty()
        .bail()
        .isLength({min: 1, max: 64})
        .bail()
        .custom(id => blogExists(id)),

    body('title', 'Incorrect format!')
        .trim()
        .notEmpty()
        .bail()
        .isLength({min: 1, max: 30}).withMessage('Too many characters! (maxLength: 30)'),

    body('shortDescription', 'Incorrect format!')
        .trim()
        .notEmpty()
        .bail()
        .isLength({min: 1, max: 100}).withMessage('Too many characters! (maxLength: 100)'),

    body('content', 'Incorrect format!')
        .trim()
        .notEmpty()
        .bail()
        .isLength({min: 1, max: 1000}).withMessage('Too many characters! (maxLength: 1000)')

]



export const blogPostVdChain = [

    body('title', 'Incorrect format!')
        .trim()
        .notEmpty()
        .bail()
        .isLength({min: 1, max: 30}).withMessage('Too many characters! (maxLength: 30)'),

    body('shortDescription', 'Incorrect format!')
        .trim()
        .notEmpty()
        .bail()
        .isLength({min: 1, max: 100}).withMessage('Too many characters! (maxLength: 100)'),

    body('content', 'Incorrect format!')
        .trim()
        .notEmpty()
        .bail()
        .isLength({min: 1, max: 1000}).withMessage('Too many characters! (maxLength: 1000)')

]



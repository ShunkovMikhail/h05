import {loginVdChain, postVdChain} from "../inputValidation";
import {
    APIErrorResult,
    LoginInputModel,
    TypeOfRequestBody
} from "../types/models";
import {Response, Router} from "express";
import {Result, validationResult} from "express-validator";
import {postsService} from "../domain/posts-service";
import {ErrorMapper} from "../utils/errorMapper";
import {usersService} from "../domain/users-service";

export const authRouter = Router({})

authRouter.post('/login', loginVdChain, async (req: TypeOfRequestBody<LoginInputModel>, res: Response) => {

    const result: Result = validationResult(req);

    if (result.isEmpty()) {
        if (await usersService.authenticate(req)) {
            res.sendStatus(200)
        } else {
            res.sendStatus(401)
        }
    } else {
        res.status(400).json(await ErrorMapper(result))
    }
})
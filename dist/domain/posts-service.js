"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsService = void 0;
const posts_repository_1 = require("../repositories/posts-repository");
const mongo_db_1 = require("../repositories/mongo-db");
exports.postsService = {
    create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEntry = {
                id: yield posts_repository_1.postsRepo.newID(),
                blogId: req.body.blogId,
                blogName: yield mongo_db_1.DB.getProperty('blogs', req.body.blogId, 'name'),
                title: req.body.title,
                shortDescription: req.body.shortDescription,
                content: req.body.content,
                createdAt: new Date().toISOString()
            };
            yield posts_repository_1.postsRepo.create(Object.assign({}, newEntry));
            return newEntry;
        });
    },
    createByBlog(req, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEntry = {
                id: yield posts_repository_1.postsRepo.newID(),
                blogId: blogId,
                blogName: yield mongo_db_1.DB.getProperty('blogs', blogId, 'name'),
                title: req.body.title,
                shortDescription: req.body.shortDescription,
                content: req.body.content,
                createdAt: new Date().toISOString()
            };
            yield posts_repository_1.postsRepo.create(Object.assign({}, newEntry));
            return newEntry;
        });
    },
    update(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateEntry = {
                blogId: req.body.blogId,
                title: req.body.title,
                shortDescription: req.body.shortDescription,
                content: req.body.content
            };
            yield posts_repository_1.postsRepo.update(req.params.id, updateEntry);
            return 204;
        });
    },
    delete(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return posts_repository_1.postsRepo.delete(req.params.id);
        });
    }
};

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
exports.blogsService = void 0;
const blogs_repository_1 = require("../repositories/blogs-repository");
exports.blogsService = {
    create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEntry = {
                id: yield blogs_repository_1.blogsRepo.newID(),
                name: req.body.name,
                description: req.body.description,
                websiteUrl: req.body.websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false
            };
            yield blogs_repository_1.blogsRepo.create(Object.assign({}, newEntry));
            return newEntry;
        });
    },
    update(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateEntry = {
                name: req.body.name,
                description: req.body.description,
                websiteUrl: req.body.websiteUrl
            };
            yield blogs_repository_1.blogsRepo.update(req.params.id, updateEntry);
            return 204;
        });
    },
    delete(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return blogs_repository_1.blogsRepo.delete(req.params.id);
        });
    }
};

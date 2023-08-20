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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const mongo_db_1 = require("../repositories/mongo-db");
const express_basic_auth_1 = __importDefault(require("express-basic-auth"));
const express_validator_1 = require("express-validator");
const inputValidation_1 = require("../inputValidation");
const blogs_service_1 = require("../domain/blogs-service");
const errorMapper_1 = require("../utils/errorMapper");
const blogs_query_repository_1 = require("../repositories/blogs-query-repository");
const posts_query_repository_1 = require("../repositories/posts-query-repository");
const posts_service_1 = require("../domain/posts-service");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.post('/', (0, express_basic_auth_1.default)({ users: mongo_db_1.admins }), inputValidation_1.blogVdChain, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(req);
    if (result.isEmpty()) {
        res.status(201).json(yield blogs_service_1.blogsService.create(req));
    }
    else {
        res.status(400).json(yield (0, errorMapper_1.ErrorMapper)(result));
    }
}));
exports.blogsRouter.post('/:id/posts', (0, express_basic_auth_1.default)({ users: mongo_db_1.admins }), inputValidation_1.blogPostVdChain, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(req);
    if (yield blogs_query_repository_1.blogsQueryRepo.exists(req.params.id)) {
        if (result.isEmpty()) {
            res.status(201).json(yield posts_service_1.postsService.createByBlog(req, req.params.id));
        }
        else {
            res.status(400).json(yield (0, errorMapper_1.ErrorMapper)(result));
        }
    }
    else {
        res.sendStatus(404);
    }
}));
exports.blogsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json(yield blogs_query_repository_1.blogsQueryRepo.getAll(req));
}));
exports.blogsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield blogs_query_repository_1.blogsQueryRepo.exists(req.params.id)) {
        res.status(200).json(yield blogs_query_repository_1.blogsQueryRepo.get(req.params.id));
    }
    else {
        res.sendStatus(404);
    }
}));
exports.blogsRouter.get('/:id/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield blogs_query_repository_1.blogsQueryRepo.exists(req.params.id)) {
        res.status(200).json(yield posts_query_repository_1.postsQueryRepo.getAllByBlog(req));
    }
    else {
        res.sendStatus(404);
    }
}));
exports.blogsRouter.put('/:id', (0, express_basic_auth_1.default)({ users: mongo_db_1.admins }), inputValidation_1.blogVdChain, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield blogs_query_repository_1.blogsQueryRepo.exists(req.params.id)) {
        const result = (0, express_validator_1.validationResult)(req);
        if (result.isEmpty()) {
            res.sendStatus(yield blogs_service_1.blogsService.update(req));
        }
        else {
            res.status(400).json(yield (0, errorMapper_1.ErrorMapper)(result));
        }
    }
    else {
        res.sendStatus(404);
    }
}));
exports.blogsRouter.delete('/:id', (0, express_basic_auth_1.default)({ users: mongo_db_1.admins }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.sendStatus(yield blogs_service_1.blogsService.delete(req));
}));

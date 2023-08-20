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
exports.postsRouter = void 0;
const express_1 = require("express");
const mongo_db_1 = require("../repositories/mongo-db");
const express_basic_auth_1 = __importDefault(require("express-basic-auth"));
const express_validator_1 = require("express-validator");
const inputValidation_1 = require("../inputValidation");
const errorMapper_1 = require("../utils/errorMapper");
const posts_service_1 = require("../domain/posts-service");
const posts_query_repository_1 = require("../repositories/posts-query-repository");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter.post('/', (0, express_basic_auth_1.default)({ users: mongo_db_1.admins }), inputValidation_1.postVdChain, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(req);
    if (result.isEmpty()) {
        res.status(201).json(yield posts_service_1.postsService.create(req));
    }
    else {
        res.status(400).json(yield (0, errorMapper_1.ErrorMapper)(result));
    }
}));
exports.postsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json(yield posts_query_repository_1.postsQueryRepo.getAll(req));
}));
exports.postsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield posts_query_repository_1.postsQueryRepo.exists(req.params.id)) {
        res.status(200).json(yield posts_query_repository_1.postsQueryRepo.get(req.params.id));
    }
    else {
        res.sendStatus(404);
    }
}));
exports.postsRouter.put('/:id', (0, express_basic_auth_1.default)({ users: mongo_db_1.admins }), inputValidation_1.postVdChain, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield posts_query_repository_1.postsQueryRepo.exists(req.params.id)) {
        const result = (0, express_validator_1.validationResult)(req);
        if (result.isEmpty()) {
            res.sendStatus(yield posts_service_1.postsService.update(req));
        }
        else {
            res.status(400).json(yield (0, errorMapper_1.ErrorMapper)(result));
        }
    }
    else {
        res.sendStatus(404);
    }
}));
exports.postsRouter.delete('/:id', (0, express_basic_auth_1.default)({ users: mongo_db_1.admins }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.sendStatus(yield posts_service_1.postsService.delete(req));
}));

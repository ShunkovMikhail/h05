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
exports.postsRepo = void 0;
const mongo_db_1 = require("./mongo-db");
exports.postsRepo = {
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongo_db_1.DB.create('posts', input);
        });
    },
    update(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongo_db_1.DB.update('posts', id, input);
        });
    },
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_db_1.DB.delete('posts', id);
        });
    },
    newID() {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_db_1.DB.generateUUID();
        });
    },
};

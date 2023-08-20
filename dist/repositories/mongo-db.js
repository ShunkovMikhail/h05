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
exports.DB = exports.admins = void 0;
const connection_1 = require("./connection");
const uuid_1 = require("uuid");
//------------------ setup -----------------------
const db = connection_1.client.db('data');
exports.admins = { 'admin': 'qwerty' };
exports.DB = {
    create(collection, input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db.collection(collection).insertOne(input);
        });
    },
    getOne(collection, query, project) {
        return __awaiter(this, void 0, void 0, function* () {
            const entry = yield db.collection(collection).findOne(query, { projection: Object.assign(Object.assign({}, project), { _id: 0 }) });
            if (entry) {
                return entry;
            }
            return null;
        });
    },
    getAll(collection, query, project, sort, S, L) {
        return __awaiter(this, void 0, void 0, function* () {
            return db.collection(collection).find(query, { projection: Object.assign(Object.assign({}, project), { _id: 0 }) }).sort(Object.assign({}, sort)).skip(S).limit(L).toArray();
        });
    },
    getAllUnrestricted(collection, query, project) {
        return __awaiter(this, void 0, void 0, function* () {
            return db.collection(collection).find(query, { projection: Object.assign(Object.assign({}, project), { _id: 0 }) }).toArray();
        });
    },
    getProperty(collection, id, property) {
        return __awaiter(this, void 0, void 0, function* () {
            const entry = yield db.collection(collection).findOne({ id: id });
            if (entry) {
                // @ts-ignore
                return entry[property];
            }
            return null;
        });
    },
    update(collection, id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            const entry = yield db.collection(collection).findOne({ id: id });
            if (entry) {
                yield db.collection(collection).updateOne({ id: id }, { $set: Object.assign({}, entry, input) });
            }
        });
    },
    delete(collection, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db.collection(collection).deleteOne({ id: id });
            if (res.deletedCount === 1) {
                return 204;
            }
            return 404;
        });
    },
    clearColl(collection) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db.collection(collection).deleteMany({});
            return 204;
        });
    },
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db.collection('blogs').deleteMany({});
            yield db.collection('posts').deleteMany({});
            return 204;
        });
    },
    generateUUID() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, uuid_1.v4)();
        });
    },
    exists(collection, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const entry = yield db.collection(collection).findOne({ id: id });
            return !!entry;
        });
    },
    countResults(collection, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return db.collection(collection).countDocuments(query);
        });
    }
};
/*
DB.getAllUnrestricted('admins', {}, {}).then((value) => {
    // @ts-ignore
    admins = Object.fromEntries(value.map(e => [e.login, e.password]))
})
*/ 

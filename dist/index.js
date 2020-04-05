"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
let server = null;
server_1.default({})
    .then(newServer => {
    server = newServer;
    return server.start().then(() => {
        const { host, port } = server.info;
        console.log(`Server listening at ${host}:${port}`);
    });
})
    .catch(error => console.log('ERROR: ', error));
//# sourceMappingURL=index.js.map
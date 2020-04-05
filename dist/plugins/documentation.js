"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_swagger_1 = __importDefault(require("hapi-swagger"));
const inert_1 = __importDefault(require("@hapi/inert"));
const vision_1 = __importDefault(require("@hapi/vision"));
const packageInfo = require('../../package'); // eslint-disable-line @typescript-eslint/no-var-requires
const swaggerPlugin = {
    plugin: hapi_swagger_1.default,
    options: {
        info: {
            title: 'Idiomatic Hapi + Typescript server.',
            version: packageInfo.version
        },
        securityDefinitions: {
            jwt: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header'
            }
        }
    }
};
exports.default = {
    name: 'documentation',
    version: packageInfo.version,
    register: (server) => server.register([inert_1.default, vision_1.default, swaggerPlugin])
};
//# sourceMappingURL=documentation.js.map
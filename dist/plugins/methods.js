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
const logger_1 = __importDefault(require("../lib/logger"));
const packageInfo = require('../../package'); // eslint-disable-line @typescript-eslint/no-var-requires
exports.default = {
    name: 'methods',
    version: packageInfo.version,
    register: (server, options) => __awaiter(void 0, void 0, void 0, function* () {
        const config = options.config;
        const logger = options.logger || logger_1.default;
        server.method('logger', (() => logger));
        server.method('projectDatasource', (() => options.projectDatasource));
        server.method('config', (() => config));
    })
};
//# sourceMappingURL=methods.js.map
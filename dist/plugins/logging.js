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
const good_1 = __importDefault(require("@hapi/good"));
const packageInfo = require('../../package'); // eslint-disable-line @typescript-eslint/no-var-requires
exports.default = {
    name: 'logging',
    version: packageInfo.version,
    register: (server, options) => __awaiter(void 0, void 0, void 0, function* () {
        if (!options.serverLogs) {
            return;
        }
        const logging = {
            plugin: good_1.default,
            options: {
                ops: {
                    interval: 1000
                },
                reporters: {
                    logs: [
                        {
                            module: 'good-squeeze',
                            name: 'Squeeze',
                            args: [
                                {
                                    log: '*',
                                    response: {
                                        include: 'api',
                                        exclude: 'status'
                                    }
                                }
                            ]
                        },
                        {
                            module: 'good-console'
                        },
                        'stdout'
                    ],
                    errors: [
                        {
                            module: 'good-squeeze',
                            name: 'Squeeze',
                            args: [{ error: '*' }]
                        },
                        {
                            module: 'good-console'
                        },
                        'stderr'
                    ]
                }
            }
        };
        return server.register(logging);
    })
};
//# sourceMappingURL=logging.js.map
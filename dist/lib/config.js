"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const pick_1 = __importDefault(require("lodash/pick"));
const logger_1 = __importDefault(require("./logger"));
const constants_1 = require("../lib/constants");
function getValidNodeEnv() {
    const nodeEnvs = joi_1.default.string();
    Object.values(constants_1.NodeEnvs).forEach(value => {
        nodeEnvs.valid(value);
    });
    return nodeEnvs;
}
class Config {
    constructor(env) {
        this.env = env;
    }
    /* eslint-enable */
    static init(providedEnv) {
        const toValidate = providedEnv || process.env;
        try {
            const { value } = Config.apiConfigSchema.validate(toValidate, {
                abortEarly: false,
                allowUnknown: true
            });
            return new Config(pick_1.default(value, Object.keys(Config.apiConfigSchema.describe().keys)));
        }
        catch (error) {
            logger_1.default.fatal('Environment variables failed validation', { error });
            throw error;
        }
    }
    has(prop) {
        return !!this.env[prop];
    }
    get(prop) {
        if (!this.env[prop]) {
            throw new Error(`Property "${prop}" does not exist `);
        }
        return this.env[prop];
    }
}
exports.default = Config;
/* eslint-disable */
Config.apiConfigSchema = joi_1.default.object({
    NODE_ENV: getValidNodeEnv(),
    DB_URL: joi_1.default.string().uri()
        .when('NODE_ENV', {
        is: joi_1.default.string().valid('dev', 'docker'),
        then: joi_1.default.required(),
        otherwise: joi_1.default.optional()
    })
});
//# sourceMappingURL=config.js.map
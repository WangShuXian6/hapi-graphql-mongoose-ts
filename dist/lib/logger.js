"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pick_1 = __importDefault(require("lodash/pick"));
const util_1 = __importDefault(require("util"));
const constants_1 = require("./constants");
var LogLevels;
(function (LogLevels) {
    LogLevels["info"] = "INFO";
    LogLevels["warn"] = "WARN";
    LogLevels["error"] = "ERROR";
    LogLevels["fatal"] = "FATAL";
})(LogLevels = exports.LogLevels || (exports.LogLevels = {}));
const commonErrorFields = ['name', 'code', 'stack', 'message'];
function isJoiError(error) {
    return error.isJoi !== undefined;
}
function isBoomError(error) {
    return error.isBoom !== undefined;
}
function serializeError(error) {
    if (isJoiError(error)) {
        return pick_1.default(error, ['name', 'message', 'details']);
    }
    else if (isBoomError(error)) {
        return pick_1.default(error, ['data', 'output']);
    }
    else {
        return pick_1.default(error, commonErrorFields);
    }
}
function assembleLog(level, message, detail) {
    const logData = {
        level,
        time: new Date(),
        message
    };
    // errors don't serialize, pick out common fields to be logged
    if (detail) {
        Object.keys(detail).forEach(key => {
            if (detail[key] instanceof Error) {
                detail[key] = serializeError(detail[key]);
            }
        });
        logData.detail = detail;
    }
    // use util.inspect to log a single line, otherwise each line is a new log event in splunk
    // depth of 5 captures Joi validation error context
    return util_1.default.inspect(logData, { depth: 5, compact: true, breakLength: Infinity });
}
exports.assembleLog = assembleLog;
function log(level, message, detail) {
    if (process.env.NODE_ENV === constants_1.NodeEnvs.DOCKER) {
        console.log(message, detail);
    }
    else {
        const logData = assembleLog(level, message, detail);
        console.log(logData);
    }
}
exports.logger = {
    info: (message, detail) => log(LogLevels.info, message, detail),
    warn: (message, detail) => log(LogLevels.warn, message, detail),
    error: (message, detail) => log(LogLevels.error, message, detail),
    fatal: (message, detail) => log(LogLevels.fatal, message, detail)
};
exports.default = exports.logger;
//# sourceMappingURL=logger.js.map
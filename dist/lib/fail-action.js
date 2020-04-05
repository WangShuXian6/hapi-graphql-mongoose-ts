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
const server_1 = require("../server");
const constants_1 = require("../lib/constants");
function failAction(request, _, error) {
    return __awaiter(this, void 0, void 0, function* () {
        const methods = server_1.serverMethods(request);
        const env = methods.config().get('NODE_ENV');
        if (env === constants_1.NodeEnvs.DEV || env === constants_1.NodeEnvs.DOCKER) {
            const logger = methods.logger();
            logger.error('Validation Error:', error);
        }
        return error;
    });
}
exports.default = failAction;
//# sourceMappingURL=fail-action.js.map
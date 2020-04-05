"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const server_1 = __importDefault(require("../../../server"));
function noop() {
    return;
}
const mockLogger = {
    info: noop,
    warn: noop,
    error: noop,
    fatal: noop
};
describe('/status', () => {
    let server = null;
    beforeAll(() => server_1.default({ providedLogger: mockLogger }).then(srv => {
        server = srv;
    }));
    test(`should respond 'ok' when the service is healthy`, () => server
        .inject({
        method: 'GET',
        url: '/status'
    })
        .then(({ statusCode, result: response }) => {
        expect(statusCode).toEqual(http_status_codes_1.default.OK);
        expect(response).toEqual({ status: 'Ok' });
    }));
});
//# sourceMappingURL=status.js.map
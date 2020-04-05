"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getStatus() {
    return {
        status: 'Ok'
    };
}
const route = {
    method: 'GET',
    path: '/status',
    options: {
        auth: false,
        handler: getStatus,
        description: 'Status',
        notes: 'Returns a positive status if the service is alive and healthy',
        tags: ['api', 'status'],
        plugins: {
            'hapi-swagger': {
                responses: {
                    '200': {
                        description: 'Success'
                    },
                    '500': {
                        description: 'Internal Server Error'
                    }
                }
            }
        }
    }
};
exports.default = route;
//# sourceMappingURL=status.js.map
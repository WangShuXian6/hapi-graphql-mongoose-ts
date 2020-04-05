"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let connection;
//let isConnected: boolean = false;
function default_1(config) {
    console.log("config::", config);
    if (!connection) {
        // if (!config) {
        //   throw new Error(
        //     "connection has not been instantiated, please provide config"
        //   );
        // }
        connection = mongoose_1.connect("mongodb://localhost:27017/task", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then((db) => {
            console.log("Connected Succesfully");
            //isConnected = db.connection.readyState === 1; // 1 for connected
            connection = db.connection;
        })
            .catch((error) => {
            console.log("db error:", error);
            return Promise.reject(error);
        });
    }
    return connection;
}
exports.default = default_1;
//# sourceMappingURL=connection.js.map
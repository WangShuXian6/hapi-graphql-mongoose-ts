"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["USER"] = "USER";
})(Role = exports.Role || (exports.Role = {}));
type_graphql_1.registerEnumType(Role, {
    name: "Role",
    description: "权限",
});
//# sourceMappingURL=role.js.map
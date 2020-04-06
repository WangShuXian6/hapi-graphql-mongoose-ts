"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { Role } from "../interface/role";
// create auth checker function
exports.authChecker = ({ context: { user } }, roles) => {
    if (roles.length === 0) {
        // if `@Authorized()`, check only is user exist
        return user !== undefined;
    }
    // there are some roles defined now
    if (!user) {
        // and if no user, restrict access
        return false;
    }
    if (user.roles.some((role) => roles.includes(role))) {
        // grant access if the roles overlap
        return true;
    }
    // no roles matched, restrict access
    return false;
};
//# sourceMappingURL=auth-checker.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdGenerator = void 0;
var IdGenerator = /** @class */ (function () {
    function IdGenerator() {
    }
    IdGenerator.prototype.generate = function () {
        return Math.random().toString(36).substring(2, 12);
    };
    return IdGenerator;
}());
exports.IdGenerator = IdGenerator;

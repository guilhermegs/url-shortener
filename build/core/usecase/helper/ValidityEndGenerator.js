"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidityEndGenerator = void 0;
var moment_1 = __importDefault(require("moment"));
var ValidityEndGenerator = /** @class */ (function () {
    function ValidityEndGenerator() {
    }
    ValidityEndGenerator.prototype.generate = function () {
        return moment_1.default().add(1, 'days').toDate();
    };
    return ValidityEndGenerator;
}());
exports.ValidityEndGenerator = ValidityEndGenerator;

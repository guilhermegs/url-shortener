"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
var HttpResponse = /** @class */ (function () {
    function HttpResponse(statusCode, body, redirectTo) {
        this.statusCode = statusCode;
        this.body = body;
        this.redirectTo = redirectTo;
    }
    HttpResponse.ok = function (body) {
        return new HttpResponse(200, body);
    };
    HttpResponse.badRequest = function (error) {
        return new HttpResponse(400, { error: error.message });
    };
    HttpResponse.serverError = function (error) {
        return new HttpResponse(500, { error: error.message });
    };
    HttpResponse.redirect = function (redirectTo) {
        return new HttpResponse(301, null, redirectTo);
    };
    HttpResponse.notFound = function (error) {
        return new HttpResponse(404, { error: error.message });
    };
    return HttpResponse;
}());
exports.HttpResponse = HttpResponse;

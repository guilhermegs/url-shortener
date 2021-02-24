"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedirectUrlRouterComposer = void 0;
var RedirectUrlUseCase_1 = require("../../../core/usecase/RedirectUrlUseCase");
var RedirectUrlRouter_1 = require("../../../entrypoint/routers/RedirectUrlRouter");
var database_1 = require("../../../provider/database");
var database_2 = require("../../database");
var RedirectUrlRouterComposer = /** @class */ (function () {
    function RedirectUrlRouterComposer() {
    }
    RedirectUrlRouterComposer.compose = function () {
        var repository = new database_2.Repository();
        var urlService = new database_1.UrlService(repository);
        var redirectUrlUseCase = new RedirectUrlUseCase_1.RedirectUrlUseCase(urlService);
        return new RedirectUrlRouter_1.RedirectUrlRouter(redirectUrlUseCase);
    };
    return RedirectUrlRouterComposer;
}());
exports.RedirectUrlRouterComposer = RedirectUrlRouterComposer;

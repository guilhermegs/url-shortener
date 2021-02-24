"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortenUrlRouterComposer = void 0;
var helper_1 = require("../../../core/usecase/helper");
var ShortenUrlUseCase_1 = require("../../../core/usecase/ShortenUrlUseCase");
var ShortenUrlRouter_1 = require("../../../entrypoint/routers/ShortenUrlRouter");
var database_1 = require("../../../provider/database");
var database_2 = require("../../database");
var ShortenUrlRouterComposer = /** @class */ (function () {
    function ShortenUrlRouterComposer() {
    }
    ShortenUrlRouterComposer.compose = function () {
        var repository = new database_2.Repository();
        var urlService = new database_1.UrlService(repository);
        var idGeneratorService = new helper_1.IdGeneratorService();
        var validityEndGeneratorService = new helper_1.ValidityEndGeneratorService();
        var shortenUrlUseCase = new ShortenUrlUseCase_1.ShortenUrlUseCase(urlService, idGeneratorService, validityEndGeneratorService);
        return new ShortenUrlRouter_1.ShortenUrlRouter(shortenUrlUseCase);
    };
    return ShortenUrlRouterComposer;
}());
exports.ShortenUrlRouterComposer = ShortenUrlRouterComposer;

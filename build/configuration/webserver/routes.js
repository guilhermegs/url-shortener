"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var yamljs_1 = __importDefault(require("yamljs"));
var ShortenUrlRouterComposer_1 = require("./composer/ShortenUrlRouterComposer");
var adapter_1 = require("./adapter");
var RedirectUrlRouterComposer_1 = require("./composer/RedirectUrlRouterComposer");
var swaggerDocument = yamljs_1.default.load('src/configuration/swagger/swagger.yaml');
var router = express_1.Router();
exports.router = router;
router.use('/api-docs', swagger_ui_express_1.default.serve);
router.get('/api-docs', swagger_ui_express_1.default.setup(swaggerDocument));
router.post('/encurtador', adapter_1.RouterAdapter.adapt(ShortenUrlRouterComposer_1.ShortenUrlRouterComposer.compose()));
router.get('/:newUrl', adapter_1.RouterAdapter.adapt(RedirectUrlRouterComposer_1.RedirectUrlRouterComposer.compose()));

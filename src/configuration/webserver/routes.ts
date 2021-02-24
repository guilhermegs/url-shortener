
import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import { ShortenUrlRouterComposer } from './composer/ShortenUrlRouterComposer'
import { RouterAdapter } from './adapter'
import { RedirectUrlRouterComposer } from './composer/RedirectUrlRouterComposer'

const swaggerDocument = YAML.load('src/configuration/swagger/swagger.yaml');

const router = Router()

router.use('/api-docs', function(req, res, next){
    swaggerDocument.host = req.get('host');
    req.swaggerDoc = swaggerDocument;
    next();
}, swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup());

router.post(
    '/encurtador', 
    RouterAdapter.adapt(ShortenUrlRouterComposer.compose())
)

router.get(
    '/:newUrl', 
    RouterAdapter.adapt(RedirectUrlRouterComposer.compose())
)

export { router }
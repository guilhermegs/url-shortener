import { Router } from 'express'
import { ShortenUrlRouterComposer } from './composer/ShortenUrlRouterComposer'
import { ExpressControllerAdapter } from './adapter/ExpressControllerAdapter'

const router = Router()

router.post(
    '/encurtador', 
    ExpressControllerAdapter.adapt(ShortenUrlRouterComposer.compose())
)

export { router }
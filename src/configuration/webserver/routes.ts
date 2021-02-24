import { Router } from 'express'
import { ShortenUrlRouterComposer } from './composer/ShortenUrlRouterComposer'
import { RouterAdapter } from './adapter'
import { RedirectUrlRouterComposer } from './composer/RedirectUrlRouterComposer'

const router = Router()

router.post(
    '/encurtador', 
    RouterAdapter.adapt(ShortenUrlRouterComposer.compose())
)

router.get(
    '/:newUrl', 
    RouterAdapter.adapt(RedirectUrlRouterComposer.compose())
)

export { router }
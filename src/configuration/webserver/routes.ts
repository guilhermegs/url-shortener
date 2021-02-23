import { Router } from 'express'
import { ShortenUrlRouterComposer } from './composer/ShortenUrlRouterComposer'
import { RouterAdapter } from './adapter'

const router = Router()

router.post(
    '/encurtador', 
    RouterAdapter.adapt(ShortenUrlRouterComposer.compose())
)

export { router }
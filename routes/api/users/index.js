import { Router } from 'express'

import fetch from './fetch'
import create from './create'


const router = Router()

fetch(router)
create(router)

export default router

import { Router } from 'express'
import { getAnimeListController } from '../controllers/anime.controler'
const router = Router()

router.get('/', getAnimeListController)

export default router

import fs from 'fs'
import path from 'path'
import { type Anime } from '../../../types/Anime'

const anime: Anime = JSON.parse(fs.readFileSync(path.join(__dirname, '/anime.mock.json'), { encoding: 'utf8' }))
const pageHTML = fs.readFileSync(path.join(__dirname, '/mockPage.html'), { encoding: 'utf8' })

const mocks = {
  anime,
  pageHTML
}
export default mocks

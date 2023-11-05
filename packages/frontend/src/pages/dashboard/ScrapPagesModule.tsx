import { useState } from 'react'
import Icons from '../../Icons'
import useScrapPages from './hooks/useScrapPages'
import './ScrapPagesModule.scss'
import NewScrapPage from './NewScrapPage'
import PageInfo from './PageInfo'

export function ScrapPagesModule() {
  const scrapPages = useScrapPages()
  const [hidden, setHidden] = useState(true)
  const handleNewScrapPage = () => {
    setHidden(false)
  }
  return (
    <div className='scrapPages'>
      <NewScrapPage hidden={hidden} setHidden={setHidden} />
      <div className='dashboardScraping__section'>
        <h2 className='dashboardScraping__section--title'>ScrapPages</h2>
        <button className='button__icon' onClick={handleNewScrapPage}>
          <Icons iconName='Add' />
        </button>
      </div>
      {scrapPages.map((scrapPage, i) => {
        return <PageInfo key={i} scrapPage={scrapPage} />
      })}
    </div>
  )
}

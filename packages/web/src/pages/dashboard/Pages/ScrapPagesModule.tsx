import { useState } from 'react'
import Icons from '../../../Icons'
import './ScrapPagesModule.scss'
import NewScrapPage from './NewScrapPage'
import PageInfo from './PageInfo'
import useFetch from '../../../hooks/useFetchNew'
import { urlApi } from '../../../config'
import { KeysLocalStorage } from '../../../enum'
import AwaitLoad from '../../../components/AwaitLoad'
import type { ScrapPage } from '../../../../../types/ScrapEpisode'
import ErrorComponent from '../../../components/Error'
interface Response {
  newToken: string
  pages: ScrapPage[]
}
export function ScrapPagesModule() {
  const token = window.localStorage.getItem(KeysLocalStorage.token) ?? ''
  const [hidden, setHidden] = useState(true)
  const {
    contents: scrapPages,
    load,
    error,
    errorCode
  } = useFetch<Response>({
    query: { url: `${urlApi}/pages`, method: 'GET', authorization: token },
    deps: []
  })
  const handleNewScrapPage = () => {
    setHidden(false)
  }
  if (load) {
    return (
      <div className='scrapPages'>
        <AwaitLoad />
      </div>
    )
  }
  if (error) {
    return (
      <div className='scrapPages'>
        <ErrorComponent code={errorCode} message={error} />
      </div>
    )
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
      {scrapPages?.pages.map((scrapPage, i) => {
        return <PageInfo key={i} scrapPage={scrapPage} />
      })}
    </div>
  )
}

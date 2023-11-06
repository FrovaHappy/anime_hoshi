import { useState } from 'react'
import type React from 'react'
import Icons from '../../Icons'
import Modal from '../../components/Modal'
import { urlApi } from '../../config'
import useFetch from '../../hooks/useFetchNew'
import './NewScrapPage.scss'
import type { ScrapPage } from '../../../../types/ScrapEpisode'
import { KeysLocalStorage } from '../../enum'
interface Props {
  hidden: boolean
  setHidden: (k: boolean) => void
}
const parseJson = (json: string) => {
  try {
    return JSON.parse(json)
  } catch {
    return null
  }
}
type Data = Omit<ScrapPage, 'validatesResults'>
export default function NewScrapPage({ hidden, setHidden }: Props) {
  const token = window.localStorage.getItem(KeysLocalStorage.token) ?? ''
  const [data, setData] = useState<Data | undefined>(undefined)
  const { error, load } = useFetch({
    query: { url: `${urlApi}/pages`, method: 'POST', body: data, authorization: token },
    deps: [data],
    conditional: !!data
  })
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = Object.fromEntries(new FormData(e.target as HTMLFormElement)) as Record<string, string>
    const dataFormatted = {
      episodePosition: parseInt(form.episodePosition),
      episodeSelector: form.episodeSelector,
      namePage: form.namePage,
      remplaceEpisode: parseJson(form.remplaceEpisode),
      remplaceTitle: parseJson(form.remplaceTitle),
      targetSelectorAll: form.targetSelectorAll,
      titleSelector: form.titleSelector,
      url: form.url,
      urlEpisodeSelector: form.urlEpisodeSelector
    } satisfies Data
    setData(dataFormatted)
    console.log(dataFormatted)
  }
  const handleClose = () => {
    setHidden(!hidden)
  }
  return (
    <Modal hidden={hidden}>
      <div className='newElement'>
        <button className='button__icon newElement__icon' onClick={handleClose}>
          <Icons iconName='Back' />
        </button>
        {load ? <>load</> : null}
        {error ? <>{error} </> : <>success</>}
        <form className='newElement__form' onSubmit={handleSubmit}>
          <label form='url'>Url de la pagina</label>
          <input className='input' type='text' name='url' />
          <label form='namePage'>Nombre de la pagina</label>
          <input className='input' type='text' name='namePage' />
          <label form='targetSelectorAll'>targetSelector</label>
          <input className='input' type='text' name='targetSelectorAll' />
          <label form='episodeSelector'>episodeSelector</label>
          <input className='input' type='text' name='episodeSelector' />
          <label form='episodePosition'>episodePosition</label>
          <input className='input__number' type='number' name='episodePosition' />
          <label form='titleSelector'>titleSelector</label>
          <input className='input' type='text' name='titleSelector' />
          <label form='urlEpisodeSelector'>urlSelector</label>
          <input className='input' type='text' name='urlEpisodeSelector' />
          <label form='remplaceEpisode'>episodeReemplace</label>
          <input className='input newElement__form--center' type='text' name='remplaceEpisode' />
          <label form='remplaceTitle'>titleReemplace</label>
          <input className='input newElement__form--center' type='text' name='remplaceTitle' />
          <div className='newElement__form--center'>
            <button className='button__danger' type='submit'>
              save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

import { useState } from 'react'
import type { ScrapPage } from '../../../../types/ScrapEpisode'
import Icons from '../../Icons'
import StatusLine from './components/StatusLine'
import handleUpdateSubmit from './hooks/handleUpdateSubmit'
import useFetch from '../../hooks/useFetchNew'
import { urlApi } from '../../config'
import { KeysLocalStorage } from '../../enum'

interface Props {
  scrapPage: ScrapPage
}
interface InputTemplateProps {
  checked: boolean
  title: string
  content: string | number
  name: string
}
export function InputTemplate({ content, title, checked, name }: InputTemplateProps) {
  return (
    <div className='scrapPage__input'>
      <Icons iconName={checked ? 'Check' : 'Error'} />
      <p>{title}</p>
      <input className='input' type={typeof content} name={name} defaultValue={content} />
    </div>
  )
}
export default function PageInfo({ scrapPage }: Props) {
  const [data, setData] = useState<Partial<ScrapPage> | undefined>(undefined)
  const token = window.localStorage.getItem(KeysLocalStorage.token) ?? ''
  const { error, load } = useFetch({
    query: { url: `${urlApi}/pages`, method: 'PUT', body: data, authorization: token },
    deps: [data],
    conditional: !!data
  })
  const [isMaximized, setIsMaximized] = useState(false)
  const validateResult = scrapPage.validatesResults[0]
  if (!validateResult) return null
  let status = 'normal'
  if (!validateResult.passHTML || !validateResult.passTargetSelector) status = 'danger'
  if (
    !validateResult.passEpisodePosition ||
    !validateResult.passEpisodeSelector ||
    !validateResult.passTitleSelector ||
    !validateResult.passUrlEpisodeSelector
  ) {
    status = 'warning'
  }
  const percentage =
    (scrapPage.validatesResults.filter(({ passHTML, passTargetSelector }) => passHTML && passTargetSelector).length *
      100) /
    scrapPage.validatesResults.length
  const handledAccordion = () => {
    setIsMaximized(!isMaximized)
  }
  return (
    <section className='scrapPage'>
      <div className='accordion' onClick={handledAccordion}>
        <Icons iconName='IconNew' className={`accordionStatus--${status}`} />
        <h6>{scrapPage.namePage}</h6>
        <p>{Math.round(percentage)}%</p>
        <Icons iconName='IconCaretUp' />
      </div>
      <form
        className={isMaximized ? 'accordion__content' : 'accordion__content--hidden'}
        onSubmit={handleUpdateSubmit(scrapPage, setData)}>
        <StatusLine scrapPage={scrapPage} />
        <div className='scrapPage__html'>
          <Icons iconName={validateResult.passHTML ? 'Check' : 'Error'} />
          <p>html</p>
          <button className='button__danger'>reiniciar</button>
        </div>
        <InputTemplate
          title={'Target Selector (unidad)'}
          name='targetSelectorAll'
          content={scrapPage.targetSelectorAll}
          checked={validateResult.passTargetSelector}
        />
        <InputTemplate
          title={'Episode Selector'}
          name='episodeSelector'
          content={scrapPage.episodeSelector}
          checked={validateResult.passEpisodeSelector}
        />
        <InputTemplate
          title={'Episode Position'}
          name='episodePosition'
          content={scrapPage.episodePosition}
          checked={validateResult.passEpisodePosition}
        />
        <InputTemplate
          title={'TitleSelector'}
          name='titleSelector'
          content={scrapPage.titleSelector}
          checked={validateResult.passTitleSelector}
        />
        <InputTemplate
          title={'Url Selector'}
          name='urlEpisodeSelector'
          content={scrapPage.urlEpisodeSelector}
          checked={validateResult.passUrlEpisodeSelector}
        />
        <div className='scrapPage__reemplace'>
          <p>Reemplace Episode (separar con ; )</p>
          <input
            className='input'
            name='remplaceEpisode'
            type='text'
            defaultValue={scrapPage.remplaceEpisode.join(' ; ') || '[ ]'}
          />
        </div>
        <div className='scrapPage__reemplace'>
          <p>Reemplace title (separar con ; )</p>
          <input
            className='input'
            type='text'
            name='remplaceTitle'
            defaultValue={scrapPage.remplaceTitle.join(' ; ') || '[ ]'}
          />
        </div>
        <p>{load ?? error ? 'error' : 'success'}</p>
        <button type='submit' className='scrapPage__save button__danger'>
          save
        </button>
      </form>
    </section>
  )
}

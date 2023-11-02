import { useState } from 'react'
import Icons from '../../Icons'
import StatusLine from './components/StatusLine'
import useScrapPages from './hooks/useScrapPages'
import './ScrapPagesModule.scss'
interface InputTemplateProps {
  checked: boolean
  title: string
  content: string | number
}

export function InputTemplate({ content, title, checked }: InputTemplateProps) {
  return (
    <div className='scrapPage__input'>
      <Icons iconName={checked ? 'Check' : 'Error'} />
      <p>{title}</p>
      <input className='input' type={typeof content} defaultValue={content} />
    </div>
  )
}
export function ScrapPagesModule() {
  const scrapPages = useScrapPages()

  return (
    <div className='scrapPages'>
      <div className='dashboardScraping__section'>
        <h2 className='dashboardScraping__section--title'>ScrapPages</h2>
        <button className='button__icon'>
          <Icons iconName='Add' />
        </button>
      </div>
      {scrapPages.map((scrapPage, i) => {
        const [isMaximized, setIsMaximized] = useState(false)
        const validateResult = scrapPage.validatesResults[0]
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
          (scrapPage.validatesResults.filter(({ passHTML, passTargetSelector }) => passHTML && passTargetSelector)
            .length *
            100) /
          scrapPage.validatesResults.length
        const handledAccordion = () => {
          setIsMaximized(!isMaximized)
        }
        return (
          <section key={i} className='scrapPage'>
            <div className='accordion' onClick={handledAccordion}>
              <Icons iconName='IconNew' className={`accordionStatus--${status}`} />
              <h6>{scrapPage.namePage}</h6>
              <p>{Math.round(percentage)}%</p>
              <Icons iconName='IconCaretUp' />
            </div>
            <div className={isMaximized ? 'accordion__content' : 'accordion__content--hidden'}>
              <StatusLine scrapPage={scrapPage} />
              <div className='scrapPage__html'>
                <Icons iconName={validateResult.passHTML ? 'Check' : 'Error'} />
                <p>html</p>
                <button className='button__danger'>reiniciar</button>
              </div>
              <InputTemplate
                title={'Target Selector (unidad)'}
                content={scrapPage.targetSelectorAll}
                checked={validateResult.passTargetSelector}
              />
              <InputTemplate
                title={'Episode Selector'}
                content={scrapPage.episodeSelector}
                checked={validateResult.passEpisodeSelector}
              />
              <InputTemplate
                title={'Episode Position'}
                content={scrapPage.episodePosition}
                checked={validateResult.passEpisodePosition}
              />
              <InputTemplate
                title={'TitleSelector'}
                content={scrapPage.titleSelector}
                checked={validateResult.passTitleSelector}
              />
              <InputTemplate
                title={'Url Selector'}
                content={scrapPage.urlEpisodeSelector}
                checked={validateResult.passUrlEpisodeSelector}
              />
              <div className='scrapPage__reemplace'>
                <p>Reemplace Episode (separar con ; )</p>
                <input className='input' type='text' defaultValue={scrapPage.remplaceEpisode.join(' ; ') || '[ ]'} />
              </div>
              <div className='scrapPage__reemplace'>
                <p>Reemplace title (separar con ; )</p>
                <input className='input' type='text' defaultValue={scrapPage.remplaceTitle.join(' ; ') || '[ ]'} />
              </div>
              <button className='scrapPage__save button__danger'>save</button>
            </div>
          </section>
        )
      })}
    </div>
  )
}

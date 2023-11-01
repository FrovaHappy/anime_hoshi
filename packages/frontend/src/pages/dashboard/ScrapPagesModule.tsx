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
      {scrapPages.map((scrapPage, i) => {
        const validateResult = scrapPage.validatesResults[0]
        return (
          <section key={i} className='scrapPage'>
            <StatusLine scrapPage={scrapPage} />
            <div className='scrapPage__html'>
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
          </section>
        )
      })}
    </div>
  )
}

import { useState } from 'react'
import { List } from '../../../../../../types'
import Icons from '../../../../../Icons'
import './SelectPage.scss'
type Props = {
  shortedEpisodesForPages: List
  id: number
}
function SelectPages({ shortedEpisodesForPages, id }: Props) {
  const [oldId, setOldId] = useState(0)
  const pages = Object.keys(shortedEpisodesForPages)
  const [pageSelected, setPageSelected] = useState('none')
  const [renderOptions, setRenderOptions] = useState(false)
  const isNewEpisode = (shortedEpisodesForPages: List, page: string) => {
    const style = {
      display: 'none',
    }
    const pageContent = shortedEpisodesForPages[page]
    if (!pageContent) return style
    const update = pageContent.at(-1)?.update ?? 0
    const difUpdate = Date.now() - update
    const eitghHours = 28_800_000
    return difUpdate <= eitghHours ? undefined : style
  }
  if (oldId !== id) {
    setOldId(id)
    setPageSelected('none')
  }
  const onClickHandler = (page: string) => {
    setPageSelected(page)
    setRenderOptions(false)
  }
  return {
    pageSelected: pageSelected,
    component: (
      <div className="selectPage" onMouseLeave={() => setRenderOptions(false)}>
        <div className="selectPage__selected" onClick={() => setRenderOptions(!renderOptions)}>
          <Icons
            className="itemNewEpisodes selectPage__newEp"
            iconName="IconNew"
            style={isNewEpisode(shortedEpisodesForPages, pageSelected)}
          />
          <p className="selectPage__selected--pageName">
            {pageSelected !== 'none' ? pageSelected : 'selecciona una opcion'}
          </p>{' '}
          ▼
        </div>
        <div className="selectPage__options" style={renderOptions ? undefined : { display: 'none' }}>
          {pages.map((page, i) => {
            return (
              <button className="selectPage__option" key={i} onClick={() => onClickHandler(page)}>
                <Icons
                  className="itemNewEpisodes selectPage__newEp"
                  iconName="IconNew"
                  style={isNewEpisode(shortedEpisodesForPages, page)}
                />
                {page}
              </button>
            )
          })}
        </div>
      </div>
    ),
  }
}

export default SelectPages

import { useState } from 'react'
import { List } from '../../../../../../types'
import Icons from '../../../../../Icons'
type Props = {
  shortedEpisodesForPages: List
  id: number
}
function SelectPages({ shortedEpisodesForPages, id }: Props) {
  const [oldId, setOldId] = useState(0)
  const pages = Object.keys(shortedEpisodesForPages)
  const [pageSelected, setPageSelected] = useState('none')
  const [renderOptions, setRenderOptions] = useState(false)

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
      <div onMouseLeave={() => setRenderOptions(false)}>
        <div onClick={() => setRenderOptions(true)}>
          🔸{pageSelected !== 'none' ? pageSelected : 'selecciona una opcion'} ▼
        </div>
        <div style={renderOptions ? undefined : { display: 'none' }}>
          {pages.map((page, i) => {
            return (
              <button key={i} onClick={() => onClickHandler(page)}>
                <Icons iconName="IconNew" /> {page}
              </button>
            )
          })}
        </div>
      </div>
    ),
  }
}

export default SelectPages

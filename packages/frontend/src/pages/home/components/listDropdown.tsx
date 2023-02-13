import { faCaretDown, faSeedling } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { hours } from '../../../enum'
import renderCondicional, { isVisibly } from '../../../utils/renderCondicional'

type RenderListDropdownType = {
  keyNamePages: string[]
  updateEpisode: number
  listSortedForNamePage: string[]
  activeState: { active: string; setActive: (value: string) => void }
}
function toogleEpisodeSelector(depencies: any[]) {
  const defaultElement = <span className="episodes__option--namePage">Elige una opción</span>
  const [episodeSelect, setEpisodeSelect] = useState<React.ReactElement>(defaultElement)
  useEffect(() => {
    setEpisodeSelect(defaultElement)
  }, depencies)
  return {
    episodeSelect,
    setEpisodeSelect: (element: React.ReactElement) => setEpisodeSelect(element),
  }
}
export default function RenderListDropdown({
  keyNamePages,
  updateEpisode,
  listSortedForNamePage,
  activeState,
}: RenderListDropdownType) {
  const { episodeSelect, setEpisodeSelect } = toogleEpisodeSelector([updateEpisode])
  const [showOptions, setShowOptions] = useState(false)
  return (
    <>
      <div className="episodes episodes__select" onClick={() => setShowOptions(!showOptions)}>
        {episodeSelect}
        <FontAwesomeIcon icon={faCaretDown} />
        <div className="episodes__options" style={isVisibly(showOptions)}>
          {listSortedForNamePage.map((keyNamePage, i) => {
            const renderPoint =
              keyNamePages.some((v) => v == keyNamePage) && renderCondicional.validInsideOf(hours['8h'], updateEpisode)
            const internalComponent = (
              <>
                <FontAwesomeIcon
                  icon={faSeedling}
                  style={isVisibly(renderPoint)}
                  className="itemNewEpisodes episodes__option--newEp"
                />
                <span style={isVisibly(showOptions)}> </span>
                <span className="episodes__option--namePage">{keyNamePage}</span>
              </>
            )
            return (
              <div
                className="episodes__option"
                onClick={() => {
                  setEpisodeSelect(internalComponent)
                  activeState.setActive(keyNamePage)
                }}
                key={i}
              >
                {internalComponent}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

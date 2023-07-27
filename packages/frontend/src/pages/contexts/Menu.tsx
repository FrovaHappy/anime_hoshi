import { createContext, useContext, useState } from 'react'
import Icons from '../../Icons'
import './Menu.scss'
import { UseState } from '../../../types'

const ShowChildrenContext = createContext<UseState<boolean> | undefined>(undefined)
export function useShowChildren() {
  const context = useContext(ShowChildrenContext)
  if (!context) throw new Error('useShowChildren out of context')
  const [showMenu, setShowMenu] = context
  return { showMenu, setShowMenu }
}
function Main({ children }: React.PropsWithChildren) {
  const onClick = () => {
    setShowMenu(!showMenu)
  }
  const [showMenu, setShowMenu] = useState(true)
  const MenuRender = showMenu ? 'menu--show' : ''
  return (
    <ShowChildrenContext.Provider value={[showMenu, setShowMenu]}>
      <div className={`menu ${MenuRender}`}>
        {children}
        <div className="menu__button" onClick={onClick}>
          <Icons iconName="IconBars" className="menu__icon" />
        </div>
      </div>
    </ShowChildrenContext.Provider>
  )
}
export default Main

import './Nav.scss'
import { Link, useLocation } from 'react-router-dom'
import Icon from './Icons'
import { useState } from 'react'

function Nav() {
  const [canRenderMenu, setCanRenderMenu] = useState(false)
  const param = useLocation()
  const isRenderPoint = (clickPath: String) => {
    if (param.pathname === clickPath) return <Icon iconName="IconPointNavActive" className="routes__point" />
    return <Icon iconName="IconPointNav" className="routes__point" />
  }
  const renderMenu = !canRenderMenu ? 'IconBars' : 'IconClose'
  const classNavActive = canRenderMenu ? 'box__nav--active' : ''
  return (
    <div className={`box__nav ${classNavActive}`} onClick={() => setCanRenderMenu(!canRenderMenu)}>
      <div className="nav">
        <div className="separate"></div>
        <Link to={'/'} className="routes">
          <Icon iconName="IconHome" className="routes__icon" />
          <p className="routes__text">Home</p>
          {isRenderPoint('/')}
        </Link>
        <Link to={'/about'} className="routes">
          <Icon iconName="IconCircleInfo" className="routes__icon" />
          <p className="routes__text">Sobre&nbsp;la&nbsp;Aplicacíon</p>
          {isRenderPoint('/about')}
        </Link>
        <Link to={'/report'} className="routes">
          <Icon iconName="IconBug" className="routes__icon" />
          <p className="routes__text">Reportar</p>
          {isRenderPoint('/report')}
        </Link>
        <div className="separate"></div>
        <Link to={'/setting'} className="routes">
          <Icon iconName="IconGear" className="routes__icon" />
          <p className="routes__text">configuración</p>
          {isRenderPoint('/setting')}
        </Link>
        <Link to={'/user'} className="routes">
          <img className="routes__img" src="./user.png" />
          <p className="routes__text">usuario</p>
          {isRenderPoint('/user')}
        </Link>
      </div>
      <Icon iconName={renderMenu} className={`nav__menu`} />
    </div>
  )
}

export default Nav

import { Link } from 'react-router-dom'
import Icons from '../../../../Icons'
import './Loading.scss'

function LoadingComponent() {
  return (
    <div className='default__load'>
      <p className='default__load--text'>Cargando los Recursos...</p>
      <span className='default__load--contentBar'>
        <span className='default__load--bar'></span>
      </span>
    </div>
  )
}

function Main() {
  return (
    <>
      <div className='default__header'>
        <h2 className='default__header--title'>Bienvenido, estos son los animes recientes</h2>
        <Link to='/setting'>
          <Icons iconName='IconGear' className='default__header--setting' />
        </Link>
      </div>

      <div className='default__imgHome' />
      <LoadingComponent />
      <a
        href='https://github.com/FrovaHappy/monorepo-scrapping-anime.git'
        className='default__link'
        target='_blank'
        rel='noreferrer'>
        <Icons iconName='IconGitHub' className='default__link--github' />
        <p>Ayúdanos en GitHub</p>
      </a>
      <a href='https://discord.gg/DSSfHnwMw9' className='default__link' target='_blank' rel='noreferrer'>
        <Icons iconName='IconDiscord' className='default__link--discord' />
        <p>Únete al discord</p>
      </a>
    </>
  )
}

export default Main

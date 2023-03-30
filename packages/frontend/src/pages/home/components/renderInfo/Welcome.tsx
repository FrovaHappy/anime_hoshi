import { Contribute } from '../contribute'
import './welcome.scss'
import main from '../../../../utils/swSubscribe'
type Props = { className: string | undefined }

const HelperItemBackground = ({ className }: Props) => {
  return (
    <svg className={className} viewBox="0 0 60 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M59.0415 18.1925C62.3648 28.5707 56.7676 41.6893 46.5642 49.269C36.3609 56.8486 21.668 58.831 11.9311 52.1259C2.13589 45.4791 -2.58681 30.2033 1.43623 18.7755C5.45927 7.40606 18.3446 -0.115273 30.8802 0.00133692C43.474 0.117947 55.7181 7.75589 59.0415 18.1925Z"
        fill="currentColor"
      />
    </svg>
  )
}
type HelperType = {
  urlImage: string
  numtext: string
  text: string
}
const HelperComponent = (props: HelperType) => {
  const { urlImage, text, numtext } = props

  return (
    <div className="helperRow">
      <div className="helperRow__item">
        <HelperItemBackground className="helper__item--bg" />
        <img className="helperRow__item--img" src={urlImage} alt={`punto ${numtext}`} />
      </div>
      <div className="helperRow__align">
        <p className="helperRow__num">{numtext}</p>
        <p className="helperRow__text">{text}</p>
      </div>
    </div>
  )
}

export const Welcome = () => {
  return (
    <div className="welcome">
      <div>
        <h1 className="welcome__title">Bienvenidos</h1>
        <h2 className="welcome__subtitle">
          Encuentra las ultimas publicaciones de animes de diferentes sitios en un solo lugar.
        </h2>
      </div>
      <div className="welcome__helperRow ">
        <p>Como funciona?</p>
        <HelperComponent
          numtext="1."
          urlImage="./resources/itemSearch.png"
          text="Recopila los últimos capítulos agregados de la paginas."
        />
        <HelperComponent
          numtext="2."
          urlImage="./resources/itemNotify.png"
          text="Notifica al encontrar algún capitulo (no trabajado)."
        />
        <HelperComponent
          numtext="3."
          urlImage="./resources/itemPlay.png"
          text="Elige el anime, después elige la pagina y ve el episodio..."
        />
        <button
          onClick={() => {
            main()
          }}
        >
          {' '}
          notify
        </button>
        <p>... y listo, disfruta de tu anime.</p>
      </div>
      <Contribute />
    </div>
  )
}

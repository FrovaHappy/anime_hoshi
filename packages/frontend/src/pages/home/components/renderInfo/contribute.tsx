import './contribute.scss'
export const Contribute = () => {
  const imgs = [
    '/stikers/1.png',
    '/stikers/2.png',
    '/stikers/3.png',
    '/stikers/4.png',
    '/stikers/5.png',
    '/stikers/6.png',
  ]
  const sentences = [
    'Siempre que puedas, colabora pagando un servicio de stream para consumir tus animes favoritos.',
    'Recuerda que las paginas piratas pueden contener virus, navega bajo tu responsabilidad.',
    'Pasate por nuestro discord y dejanos tus sugerencias.',
  ]
  const indexImg = Math.round(Math.random() * (imgs.length - 1))
  const indexSentences = Math.round(Math.random() * (sentences.length - 1))
  return (
    <div className="contribute">
      <img className="contribute__img" src={imgs[indexImg]} alt="contribute" loading="lazy" />
      <p className="contribute__text">{sentences[indexSentences]}</p>
    </div>
  )
}

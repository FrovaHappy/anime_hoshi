import type React from 'react'
import Icons from '../../Icons'
import slidersData from './sliderData'
import './slider.scss'
import { useEffect, useRef, useState } from 'react'
import { KeysLocalStorage } from '../../enum'

const styleBgGradient = (color: string) => {
  return {
    background: `linear-gradient(90deg, ${color} 0%, #ffffff00 145%)`
  } satisfies React.CSSProperties
}

function Slider() {
  const listRef = useRef<HTMLUListElement>(null)
  const idRef = useRef<number>(0)
  const width = useRef(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sliders, setSliders] = useState(slidersData)
  const filterSliders = (id: number | undefined = undefined) => {
    const cardsHiddenLocalStorage = window.localStorage.getItem(KeysLocalStorage.slidersHidden) ?? '[]'
    const cardsHidden: number[] = JSON.parse(cardsHiddenLocalStorage)
    if (id) cardsHidden.push(id)
    const idsHidden = [...new Set(cardsHidden)]
    const newsSliders: typeof sliders = []
    for (const card of sliders) {
      if (idsHidden.some(idH => idH === card.id)) continue
      newsSliders.push(card)
    }
    setSliders(newsSliders)
    window.localStorage.setItem(KeysLocalStorage.slidersHidden, JSON.stringify(cardsHidden))
  }
  useEffect(() => {
    filterSliders()
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      const listNode = listRef.current
      const cardNode = listNode?.querySelectorAll('.sliderHome')[idRef.current]

      if (idRef.current > sliders.length - 1) {
        idRef.current = 0
      }
      setCurrentIndex(idRef.current)
      if (!cardNode) return
      width.current = cardNode.clientWidth
      idRef.current += 1
    }, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [sliders])

  const pointerPosition = (id: number) => (id === currentIndex ? 'slidersPointer__point--active' : '')
  return (
    <section>
      <div className='slidercontainer'>
        <ul
          className='slidersHome'
          ref={listRef}
          onClick={() => {
            setCurrentIndex(currentIndex + 1)
          }}
          style={{ marginLeft: `-${currentIndex * width.current}px` }}>
          {sliders.map((slider, i) => {
            const { action, canHide, colorPrimary, colorSecondary, description, image, title, id } = slider
            const onClick = canHide
              ? () => {
                  filterSliders(id)
                  idRef.current = 0
                  width.current = 0
                }
              : undefined
            return (
              <li key={i} className='sliderHome'>
                <img src={image} alt={title} className='sliderHome__bg' />
                <span style={styleBgGradient(colorPrimary)} className='sliderHome__bg' />
                <p className='sliderHome__title'>{title}</p>
                <p className='sliderHome__content'>{description}</p>
                <a href={action.url} style={{ background: colorSecondary }} className='sliderHome__action'>
                  <span>{action.title}</span>
                </a>
                {(() => {
                  if (!canHide) return
                  return (
                    <button style={{ color: colorSecondary }} className='sliderHome__icon' onClick={onClick}>
                      <Icons iconName='IconClose' />
                    </button>
                  )
                })()}
              </li>
            )
          })}
        </ul>
      </div>
      <ul className='slidersPointer'>
        {sliders.map((_, id) => {
          return (
            <li
              className={'slidersPointer__point ' + pointerPosition(id)}
              key={id}
              onClick={() => {
                setCurrentIndex(id)
                idRef.current = id
              }}
            />
          )
        })}
      </ul>
    </section>
  )
}

export default Slider

import type React from 'react'
import Icons from '../../Icons'
import slidersData from './sliderData'
import './slider.scss'
import { useEffect, useRef, useState } from 'react'

const styleBgGradient = (color: string) => {
  return {
    background: `linear-gradient(90deg, ${color} 0%, #ffffff00 145%)`
  } satisfies React.CSSProperties
}

function Slider() {
  const listRef = useRef<HTMLUListElement>(null)
  const width = useRef(0)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    let id = 0
    const interval = setInterval(() => {
      const listNode = listRef.current
      if (!listNode) return
      if (id > slidersData.length - 1) {
        id = 0
      }
      width.current = listNode.querySelectorAll('.sliderHome')[id].clientWidth
      setCurrentIndex(id)
      id += 1
    }, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [])

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
          {slidersData.map((slider, i) => {
            const { action, canHide, colorPrimary, colorSecondary, description, image, title } = slider
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
                    <button style={{ color: colorSecondary }} className='sliderHome__icon'>
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
        {slidersData.map((_, id) => {
          return (
            <li
              className={'slidersPointer__point ' + pointerPosition(id)}
              key={id}
              onClick={() => {
                setCurrentIndex(id)
              }}
            />
          )
        })}
      </ul>
    </section>
  )
}

export default Slider

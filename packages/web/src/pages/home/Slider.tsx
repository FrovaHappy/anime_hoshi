/* eslint-disable react/no-unknown-property */
import type React from 'react'
import Icons from '../../Icons'
import slidersData, { type SliderData } from './sliderData'
import './slider.scss'
import { memo, useEffect, useRef, useState } from 'react'
import { KeysLocalStorage } from '../../enum'
import useLazyloadImage from '../../hooks/useLazyload'
import { IMAGE_TRANSPARENT } from '../../utils/const'

const styleBgGradient = (color: string) => {
  return {
    background: `linear-gradient(90deg, ${color} 0%, #ffffff00 100%)`
  } satisfies React.CSSProperties
}
interface SliderTargetProps {
  slider: SliderData
  filterSliders: (k: number) => void
  setForceRender: (k: boolean) => void
  forceRender: boolean
}

function SliderTarget({ slider, filterSliders, forceRender, setForceRender }: SliderTargetProps) {
  const { action, canHide, colorPrimary, colorSecondary, description, image, title, id } = slider
  const [isLoadedPreviewImg, setLoadedPreviewImg] = useState(false)
  const { ref } = useLazyloadImage(image, isLoadedPreviewImg)
  const onClick = canHide
    ? () => {
        filterSliders(id)
        setForceRender(!forceRender)
        idRef = 0
      }
    : undefined
  return (
    <li className='sliderHome'>
      <img
        src={IMAGE_TRANSPARENT}
        alt={title}
        className='sliderHome__bg'
        loading='lazy'
        ref={ref}
        fetchpriority='low'
        decoding='async'
        onLoad={() => {
          setLoadedPreviewImg(true)
        }}
      />
      <span style={styleBgGradient(colorPrimary)} className='sliderHome__bg' />
      <p className='sliderHome__title'>{title}</p>
      <p className='sliderHome__content'>{description}</p>
      <a
        href={action.url}
        style={{ background: colorSecondary }}
        rel='noreferrer'
        target={action.isExternal ? '_blank' : '_self'}
        className='sliderHome__action'>
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
}

let idRef = 0
function Slider() {
  const listRef = useRef<HTMLUListElement>(null)
  const [forceRender, setForceRender] = useState(true)
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
  const dragSlider = () => {
    const listNode = listRef.current
    if (idRef >= sliders.length) {
      idRef = 0
    }
    const cardNode = listNode?.querySelectorAll('.sliderHome')[idRef]
    if (!cardNode) return
    listNode.querySelector('#sliders')?.setAttribute('style', `margin-left: -${idRef * cardNode.clientWidth}px;`)
    const pointers = listNode.querySelectorAll('.slidersPointer__point')
    for (let i = 0; i < pointers.length; i++) {
      const pointer = pointers[i]
      pointer.classList.remove('slidersPointer__point--active')
      if (i === idRef) pointer.classList.add('slidersPointer__point--active')
    }
    idRef += 1
  }
  useEffect(() => {
    filterSliders()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      dragSlider()
    }, 5000)
    dragSlider()
    return () => {
      clearInterval(interval)
    }
  }, [sliders, forceRender])
  return (
    <section ref={listRef}>
      <div className='slidercontainer'>
        <ul
          className='slidersHome'
          id='sliders'
          onClick={() => {
            setForceRender(!forceRender)
          }}>
          {sliders.map((slider, i) => (
            <SliderTarget
              filterSliders={filterSliders}
              forceRender={forceRender}
              setForceRender={setForceRender}
              slider={slider}
              key={i}
            />
          ))}
        </ul>
      </div>
      <ul className='slidersPointer'>
        {sliders.map((_, id) => {
          return (
            <li
              className={'slidersPointer__point'}
              key={id}
              onClick={() => {
                setForceRender(!forceRender)
                idRef = id
              }}
            />
          )
        })}
      </ul>
    </section>
  )
}

export default memo(Slider)

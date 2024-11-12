import type React from 'react'
import './position.scss'
interface Props extends React.PropsWithChildren {
  hidden: boolean
  left: boolean
}
export default function Position({ children, hidden, left }: Props) {
  const isHiddenRight = hidden && !left ? 'position--hiddenRight' : null
  const isHiddenLeft = hidden && left ? 'position--hiddenLeft' : null
  const isLeft = left ? 'position--left' : 'position--right'
  return <div className={`position ${[isHiddenRight, isHiddenLeft, isLeft].filter(f => f).join(' ')}`}>{children}</div>
}

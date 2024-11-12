import type React from 'react'
import './Modal.scss'
interface Props extends React.PropsWithChildren {
  hidden: boolean
}
export default function Modal({ children, hidden }: Props) {
  return <div className={hidden ? 'modal modal--hidden' : 'modal'}>{children}</div>
}

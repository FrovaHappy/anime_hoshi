import type React from 'react'
import './Option.styles.scss'
import '../../../styles/buttons.scss'
function Option({
  title,
  description,
  descriptionAction = undefined,
  actions
}: {
  title: string
  description: string
  descriptionAction: React.ReactNode
  actions: React.ReactNode
}) {
  return (
    <div className='option'>
      <div className='option__info'>
        <h4 className='option__title'>{title}</h4>
        <p className='option__description'>{description}</p>
        {descriptionAction}
      </div>
      <div className='option__actions'>{actions}</div>
    </div>
  )
}

export default Option

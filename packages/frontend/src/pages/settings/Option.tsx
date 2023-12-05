import type React from 'react'
interface Props {
  title: string
  description?: string
  Actions: React.ReactNode
  Status?: React.ReactNode
  ActionsSecondary?: React.ReactNode
}
export default function Option(props: Props) {
  const { title, description, Actions, ActionsSecondary, Status } = props
  return (
    <div className='optionSetting'>
      <div className='optionSetting__content'>
        <h3 className='optionSetting__title'>{title}</h3>
        {Status}
        <p className='optionSetting__description'> {description}</p>
        {ActionsSecondary}
      </div>
      {Actions}
    </div>
  )
}

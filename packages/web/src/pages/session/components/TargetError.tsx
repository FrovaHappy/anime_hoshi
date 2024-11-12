import Icons from '../../../Icons'

export function TargetError({ error }: { error: string | null }) {
  if (!error) return null
  return (
    <div className='signForm__error'>
      <Icons iconName='IconClose' className='signForm__error--icon' />
      <p>{error}</p>
    </div>
  )
}

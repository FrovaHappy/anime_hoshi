import './Error.scss'
interface Props {
  code: number
  message: string
}
export default function ErrorComponent({ code, message }: Props) {
  return (
    <div className='error'>
      <div className='error__texts'>
        <p className='error__title'>
          ERROR <span className='error__code'>{code}</span>
        </p>
        <p className='error__message'>{message}</p>
      </div>
      <span className='error__line' />
      <img className='error__img' src='/resources/error.png' alt='image Error' />
    </div>
  )
}

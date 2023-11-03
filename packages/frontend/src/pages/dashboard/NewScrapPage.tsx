import Icons from '../../Icons'
import Modal from '../../components/Modal'
import './NewScrapPage.scss'
interface Props {
  hidden: boolean
  setHidden: (k: boolean) => void
}
export default function NewScrapPage({ hidden, setHidden }: Props) {
  const handleClose = () => {
    setHidden(!hidden)
  }
  return (
    <Modal hidden={hidden}>
      <div className='newElement'>
        <button className='button__icon newElement__icon' onClick={handleClose}>
          <Icons iconName='Back' />
        </button>
        <form className='newElement__form'>
          <label htmlFor='html'>html</label>
          <input className='input' type='text' name='html' />
          <label htmlFor='targetSelector'>targetSelector</label>
          <input className='input' type='text' name='targetSelector' />
          <label htmlFor='episodeSelector'>episodeSelector</label>
          <input className='input' type='text' name='episodeSelector' />
          <label htmlFor='episodePosition'>episodePosition</label>
          <input className='input__number' type='number' name='episodePosition' />
          <label htmlFor='titleSelector'>titleSelector</label>
          <input className='input' type='text' name='titleSelector' />
          <label htmlFor='urlSelector'>urlSelector</label>
          <input className='input' type='text' name='urlSelector' />
          <label htmlFor='episodeReemplace'>episodeReemplace</label>
          <input className='input newElement__form--center' type='text' name='episodeReemplace' />
          <label htmlFor='titleReemplace'>titleReemplace</label>
          <input className='input newElement__form--center' type='text' name='titleReemplace' />

          <div className='newElement__form--center'>
            <button className='button__danger' type='submit'>
              save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

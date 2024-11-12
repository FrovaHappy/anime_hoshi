import './AwaitLoad.styles.scss'
function AwaitLoad() {
  return (
    <div className='loader'>
      <div className='lds-ripple'>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default AwaitLoad

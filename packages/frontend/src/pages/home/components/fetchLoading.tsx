import './fetchLoading.scss'
import { Welcome } from './Welcome'
export const FetchLoading = () => {
  return (
    <>
      <div className="fetchLoading">
        <img className="fetchLoading__img" src="/resources/loadingFetch.gif" alt="loading api response" />
        <p className="fetchLoading__text"> Ahora mismo estamos pidiendo tu preciada información</p>
      </div>
      <Welcome />
    </>
  )
}

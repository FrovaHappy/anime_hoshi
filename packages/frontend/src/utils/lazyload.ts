export default function lazyLoad(image: HTMLImageElement, cb = (_: string) => undefined) {
  function fn(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    const element = entries[0]?.target
    const source = element.getAttribute('data-src')
    if (entries[0]?.isIntersecting && source) {
      element.setAttribute('src', source)
      element.addEventListener('load', e => {
        element.classList.add('loaded')
        observer.unobserve(e.target as HTMLElement)
        element.removeAttribute('data-src')
        cb(source)
      })
    }
  }

  if ('IntersectionObserver' in window) {
    const InObserver = new IntersectionObserver(fn)
    InObserver.observe(image)
  } else {
    console.error('IntersectionObserver no implemented this browser')
  }
}

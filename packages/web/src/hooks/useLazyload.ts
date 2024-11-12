import { useEffect, useRef, useState } from 'react'
import lazyLoad from '../utils/lazyload'
/**
 * Show an image loader placeholder and replace when it's been loaded
 * @param {String} src The original source url
 * @returns {String} The image url
 */
export default function useLazyloadImage(src: string, isLoadedPreviewImg: boolean) {
  const imgNodeRef = useRef<HTMLImageElement>(null)
  const [loadedResource, setLoadedResource] = useState<string | null>(null)
  useEffect(() => {
    if (imgNodeRef.current && isLoadedPreviewImg) {
      imgNodeRef.current.setAttribute('data-src', src)
      lazyLoad(imgNodeRef.current, url => {
        setLoadedResource(url)
      })
    }
  }, [src, isLoadedPreviewImg])

  return { ref: imgNodeRef, loadedResource }
}

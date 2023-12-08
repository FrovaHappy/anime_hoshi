import { useState, useEffect, useMemo, useCallback } from 'react'

const ITEMS_PER_PAGE = 6

export default function usePagination<T>(
  source = [] as T[],
  itemsPerPage = ITEMS_PER_PAGE,
  page: number = 1,
  preserve = false
) {
  console.log('usePagination')
  if (!Array.isArray(source)) {
    throw new TypeError('The source is not an instance of an array type')
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [previousPages, setPreviousPages] = useState<T[]>([])
  const sourceLength = source.length

  const pages = useMemo(() => {
    return sourceLength > itemsPerPage ? Math.ceil(sourceLength / itemsPerPage) : 1
  }, [sourceLength, itemsPerPage])

  const IS_LARGE_PAGES = useMemo(() => {
    return sourceLength > itemsPerPage
  }, [sourceLength, itemsPerPage])

  const initialIndex = useMemo(() => (currentPage - 1) * itemsPerPage, [currentPage, itemsPerPage])

  const endIndex = useMemo(() => initialIndex + itemsPerPage, [initialIndex, itemsPerPage])

  const nextPage = useCallback(() => {
    if (IS_LARGE_PAGES && currentPage < pages) {
      setCurrentPage(currentPage + 1)
    }
  }, [IS_LARGE_PAGES, currentPage, pages])

  const previousPage = useCallback(() => {
    if (IS_LARGE_PAGES && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }, [IS_LARGE_PAGES, currentPage])

  const data = useMemo(() => {
    const start = initialIndex
    const end = endIndex
    return source.slice(start, end)
  }, [source, initialIndex, endIndex])

  useEffect(() => {
    if (preserve && data?.length > 0) {
      setPreviousPages((prev: T[]) => [...prev, ...data])
    }
  }, [preserve, data])

  useEffect(() => {
    if (Number.isInteger(page) && page >= 1 && page <= pages) {
      setCurrentPage(page)
    }
  }, [page, pages, source])

  return {
    nextPage,
    previousPage,
    data: preserve ? previousPages : data,
    pages,
    currentPage,
    ITEMS_PER_PAGE: itemsPerPage
  }
}

export const getIdLocation = () => {
  const id = new window.URLSearchParams(window.location.search).get('id')
  if (!id || id?.length === 0) return null
  return parseInt(id)
}

export type List = {
  [key: string]:
    | {
        url: string
        update: number
        episode: number
      }[]
    | undefined
}
export type notificationProperty = {
  hasAccept: boolean
  updated?: number
}

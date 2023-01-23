export type List = {
  [key: string]:
    | {
        url: string
        update: number
        episode: number
      }[]
    | undefined
}

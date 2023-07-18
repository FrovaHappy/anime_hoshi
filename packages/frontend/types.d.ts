export type ObjectDynamic<T> = Record<string, T>

export interface notificationProperty {
  hasAccept: boolean
  updated?: number
}
export type UseState<T> = [T, (key: T) => void]

import { JsonResponse } from '../types'

export interface SessionTokenRequest {
  newToken: string
}

export interface ApiGetUser extends SessionTokenRequest {
  username: string
  roles: string[]
}

export interface ApiPutUser extends SessionTokenRequest {
  username: string
  roles: string[]
}
export interface ApiPostUserSingIn extends SessionTokenRequest {}

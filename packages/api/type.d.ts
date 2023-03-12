export interface Iuser {
  username: string
  passwordHash: string
  roles: string[]
}

export interface IuserWithoutPasswordHash {
  username: string
  password: string
}

export interface TempVapidkey {
  publicKey: string
  privateKey: string
}
export interface Subscription extends TempVapidkey{
  subscription: string
}


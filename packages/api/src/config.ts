import 'dotenv/config'

export const configs = {
  MONGODB_HOST: process.env.MONGODB_HOST!,
  PORT: process.env.PORT!,
  TOKEN_KEY: process.env.TOKEN_KEY!,
  CRYPTO_KEY: process.env.CRYPTO_KEY!,
}

# API of [ AnimeHoshi ](https://animehoshi.vercel.app)

## Instalation
use `npm install` for download packages.
## Environment Variables
  create a new file with the extension .env and overwrite the variables.
  ```environment
  TOKEN_KEY = PasswordToken
  MONGODB_HOST = mongodb://127.0.0.1:27017/test-db
  CRYPTO_KEY = PasswordCryptoJS
  ```
## Endpoints
  ### /animes 
    [GET] return a array of animes
  ### /subscription 
    [GET] return a key/value use how publiKey used to sign the Push subscription
    [POST] expect a pushSubscription Object and publicKey. return code 200 if successful subscription webpush service
  ### /user
    (/signin)[POST] expect a username and password value. return code 200 if successful
    (/signup)[POST] expect a username and password value. return code 200 if successful

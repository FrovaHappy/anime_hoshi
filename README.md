# Anime Hoshi
Este proyecto busca solucionar el tema las notificaciones de las paginas de anime a la hora de publicar nuevo capitulos.
## Tecnologias Principales en el Proyecto
* React y ReactRouter 
* express
* got (para el scraping)
* web-push (para el envio de notificaciones)
* zod (pendiente eliminar express-validator)
* mongoose
* bcrypt y jsonwebtoken para el encrpitados
* otros mas de soporte...

## instalacion
```bash
~$ npm install
```
## Comandos de desarrollos
```bash
~$ npm run api:dev
~$ npm run frontend:devlocal // toma el puerto 3000 definido en la api
~$ npm run frontend:devcloud // tomara la url de la api desplegada en produccion (cambiar en packages\frontend\.env-cmdrc.json)
```
## Comandos de Builds
```bash
~$ api:build
~$ frontend:build
```

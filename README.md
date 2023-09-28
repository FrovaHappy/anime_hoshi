# Anime Hoshi

Este proyecto busca solucionar el tema las notificaciones de las paginas de anime a la hora de publicar nuevo capítulos.

# Importante!

Lo único que se almacena en las Base de datos son los links directos a los capítulos de dichas paginas, este proyecto esta pensado de fan para fan y no busca competir con los servicios de streaming, solo servir de atajo a los mismos.

# Links

- [sitio web](https://animehoshi.vercel.app/) (no definitivo)
- [url de la api](https://scraping-api-production.up.railway.app/) (no definitivo)
- [documentación de la API](https://frovahappy.gitbook.io/anime-hoshi-docs/)

## Tecnologías Principales en el Proyecto

- React y ReactRouter
- express
- got (para el scraping)
- web-push (para el envió de notificaciones)
- zod (pendiente eliminar express-validator)
- mongoose
- bcrypt y jsonwebtoken para el encriptados
- otros mas de soporte...

## Instalación

```bash
~$ npm install
```

## Comandos de desarrollos

```bash
~$ npm run api:dev
~$ npm run frontend:devlocal // toma el puerto 3000 definido en la api
~$ npm run frontend:devcloud // tomara la url de la api desplegada en producción (cambiar en packages/frontend/.env-cmdrc.json)
```

## Comandos de Builds

```bash
~$ api:build
~$ frontend:build
```

# Roadmap 🛫

- implementar una pagina de versionado de la aplicación
- filtrar las notificaciones por paginas de animes
- recibir las notificaciones por animes favoritos
- desarrollar un dashboard en condiciones
- cambiar el manejo de log (problemas en el formateo en algunos casos)

# SkCo.Poc.Github.Contigo.Angular

Prueba de concepto: compilar un microfrontend Angular Elements con **GitHub Actions** y guardar los archivos del build (`.js` y `.css`) en **GitHub** en lugar de Azure Blob Storage.

Base: copia de `devengers-front-template` (Angular 18, builder `browser`, `build-script.js` que concatena `runtime + polyfills + main`). El custom element es `<poc-github-contigo>`.

## Pipeline (`.github/workflows/build-release.yml`)

| Disparador | Qué hace |
|---|---|
| push a `main` | build `dev`/`stg`/`prd` → artifacts → **Release `build-<n>`** |
| push de tag `v*` | igual, Release con el nombre del tag |
| manual (`workflow_dispatch`) | build + artifacts (release solo si se lanza sobre `main` o un tag) |

Cada release adjunta:

```
poc-github-contigo.dev.js   poc-github-contigo.dev.css
poc-github-contigo.stg.js   poc-github-contigo.stg.css
poc-github-contigo.prd.js   poc-github-contigo.prd.css
poc-github-contigo-<tag>.zip   (mismos archivos en <env>/poc-github-contigo.{js,css})
SHA256SUMS.txt
```

## Dónde quedan los archivos y para qué sirve cada opción

| Opción | Persistencia | ¿El navegador/Liferay puede cargarlo directo? |
|---|---|---|
| **Artifacts** del workflow | 30 días | No: requieren token. |
| **Releases** | Permanente, versionado | **No.** Se sirven como `application/octet-stream` + `Content-Disposition: attachment`, sin CORS; en repo privado además piden autenticación. Sirven como *almacén de versiones* (fuente para un despliegue), no como CDN. |
| **GitHub Pages** (job `pages`, opcional) | Última versión desplegada | **Sí:** `text/css` / `application/javascript`, `Access-Control-Allow-Origin: *`, CDN con `max-age=600`. En repo privado requiere plan pago, y el sitio es **público** de todas formas. |

URL estable a la última versión de un release (requiere acceso al repo si es privado):
`https://github.com/skcoogilg/SkCo.Poc.Github.Contigo.Angular/releases/latest/download/poc-github-contigo.prd.js`

### Activar GitHub Pages (opcional)

1. Settings → Pages → **Source: GitHub Actions**.
2. Settings → Secrets and variables → Actions → Variables → `PAGES_ENABLED = true`.
3. Push a `main`. Quedará en `https://skcoogilg.github.io/SkCo.Poc.Github.Contigo.Angular/<env>/poc-github-contigo.js`.

## Diferencias con el template

- **Secretos removidos:** `sasKey` de Event Hubs vacío en todos los `environment*.ts`. Si se necesita, inyectarlo en el build desde GitHub Secrets.
- **npm público:** `.npmrc` apunta a `registry.npmjs.org` (GitHub no tiene acceso al feed `Sk.Npm` de Azure Artifacts). El lockfile se reescribió con las mismas versiones.
- **`skandia-authencrypt` 1.7.9** (la única publicada en npm público; la 1.8.x solo está en el feed privado). La API cambia solo de nombre, así que se importa con alias (`CryptoCipherService as CryptoCipherServiceSkLibrary`, `SkLibraryGlobalConfig as GlobalConfigSkLibrary`). Para usar 1.8.x en GitHub Actions habría que registrar un PAT de Azure Artifacts (Packaging: Read) como secret y volver a apuntar el `.npmrc` al feed.
- Sin `azure-pipelines.yml`; `elements/` queda fuera de git (lo genera el build).

## Scripts

```bash
npm ci
npm run build:dev | build:stg | build:prd   # -> elements/poc-github-contigo.{js,css}
npm start                                   # http://localhost:4200
```

# SkCo.Poc.Github.Contigo.Angular

Prueba de concepto: compilar un microfrontend Angular Elements con **GitHub Actions** y guardar los archivos del build (`.js` y `.css`) en **GitHub** en lugar de Azure Blob Storage.

Base: copia de `devengers-front-template` (Angular 18, builder `browser`, `build-script.js` que concatena `runtime + polyfills + main`). El custom element es `<poc-github-contigo>`.

## Pipeline (`.github/workflows/build-release.yml`)

Una versión desplegada por ambiente, cada una en su rama:

| Push a | Build | Release | Servido en |
|---|---|---|---|
| `dev` | `npm run build:dev` | `dev-<n>` (prerelease) | `…/dev/poc-github-contigo.{js,css}` |
| `stg` | `npm run build:stg` | `stg-<n>` (prerelease) | `…/stg/poc-github-contigo.{js,css}` |
| `prd` | `npm run build:prd` | `prd-<n>` (latest) | `…/prd/poc-github-contigo.{js,css}` |

`…` = `https://skcoogilg.github.io/SkCo.Poc.Github.Contigo.Angular`. Cada carpeta trae `version.json` con el release y el commit desplegados.

Flujo: `build` → `release` (guarda `poc-github-contigo.js`, `.css` y `SHA256SUMS.txt`) → `pages`. Como un despliegue de Pages reemplaza el sitio completo, el job `pages` lo rearma con el **último release de cada ambiente**; así un deploy de `dev` no borra lo de `stg` ni `prd`. Los despliegues se serializan (`concurrency: github-pages`). `main` no dispara el pipeline.

Promover: merge `dev` → `stg` → `prd`.

## Dónde quedan los archivos y para qué sirve cada opción

| Opción | Persistencia | ¿El navegador/Liferay puede cargarlo directo? |
|---|---|---|
| **Artifacts** del workflow | 30 días | No: requieren token. |
| **Releases** | Permanente, versionado | **No.** Se sirven como `application/octet-stream` + `Content-Disposition: attachment`, sin CORS; en repo privado además piden autenticación. Sirven como *almacén de versiones* (fuente para un despliegue), no como CDN. |
| **GitHub Pages** (job `pages`, opcional) | Última versión desplegada | **Sí:** `text/css` / `application/javascript`, `Access-Control-Allow-Origin: *`, CDN con `max-age=600`. En repo privado requiere plan pago, y el sitio es **público** de todas formas. |

### Configuración de GitHub Pages

1. Settings → Pages → **Source: GitHub Actions**.
2. Settings → Secrets and variables → Actions → Variables → `PAGES_ENABLED = true`.
3. Settings → Environments → `github-pages` → Deployment branches: permitir `dev`, `stg` y `prd` (por defecto solo deja `main`).

### Uso en el host

```html
<link rel="stylesheet" href="https://skcoogilg.github.io/SkCo.Poc.Github.Contigo.Angular/stg/poc-github-contigo.css">
<script src="https://skcoogilg.github.io/SkCo.Poc.Github.Contigo.Angular/stg/poc-github-contigo.js"></script>
<poc-github-contigo></poc-github-contigo>
```

Pages cachea 10 minutos (`max-age=600`).

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

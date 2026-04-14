# Test instructions

This document describes how to install dependencies, build the workspace packages, and run the demo app and automated tests for this repository.

## Prerequisites

- [Node.js](https://nodejs.org/) and npm (the repo uses npm workspaces; use the npm version that ships with your Node install).

## Install

From the repository root:

```bash
npm install
```

This installs all workspace packages and runs `postinstall` (including `patch-package`).

## Build workspace packages

Library packages resolve to compiled output under each package’s `dist/` directory. Build them **before** running the React test app or expecting imports to resolve, and after any change to source in those packages.

Build in dependency order (each line depends on the ones before it):

```bash
npm run build -w @salik1992/test-app-data
npm run build -w @salik1992/tv-tools
npm run build -w @salik1992/tv-tools-react
npm run build -w @salik1992/test-app-data-tmdb
```

Equivalent one-liner (same order):

```bash
npm run build -w @salik1992/test-app-data -w @salik1992/tv-tools -w @salik1992/tv-tools-react -w @salik1992/test-app-data-tmdb
```

Optional: production bundle of the demo (after the steps above):

```bash
npm run build -w @salik1992/test-app-react
```

During library development you can use `npm run watch -w <package-name>` in a separate terminal for any package that defines a `watch` script (`tv-tools`, `tv-tools-react`, `test-app-data`, `test-app-data-tmdb`).

## Demo app (test-app-react)

The interactive demo is **`packages/test-app-react`**: a React + webpack dev server that exercises `tv-tools`, `tv-tools-react`, and the TMDB-backed test data layer.

### TMDB API token

The demo loads catalog data from [The Movie Database (TMDB)](https://www.themoviedb.org/) API. You need a TMDB **access token** (Bearer token from TMDB API settings).

1. Copy the env template:

   ```bash
   cp packages/test-app-react/.env.template packages/test-app-react/.env
   ```

2. Edit `packages/test-app-react/.env` and set:

   ```bash
   TMDB_ACCESS_TOKEN=<your-tmdb-access-token>
   ```

### Run the dev server

From the repository root (recommended so paths stay consistent):

```bash
npm run dev -w @salik1992/test-app-react
```

Or from `packages/test-app-react`:

```bash
cd packages/test-app-react
npm run dev
```

Webpack dev server prints the local URL (default is typically [http://localhost:8080](http://localhost:8080); use the URL shown in the terminal if it differs).

## Automated tests

Jest is configured at the **repository root** (`jest.config.js`). Unit tests live alongside packages (for example under `packages/tv-tools`, `packages/tv-tools-react`, etc.).

From the repository root:

```bash
npm test
```

With coverage:

```bash
npm run test:coverage
```

## Other checks (optional)

From the repository root:

- **Lint:** `npm run lintcheck`
- **Typecheck all workspaces:** `npm run typecheck`

Individual workspaces also expose `lintcheck`, `test`, and `typecheck` where applicable; run them with `npm run <script> -w <workspace-name>`.

## Package overview

| Package | Role |
|--------|------|
| `tv-tools` | Core TV/navigation library (VanillaTS). |
| `tv-tools-react` | React bindings for `tv-tools`. |
| `test-app-data` | Shared data types and provider abstraction for test apps. |
| `test-app-data-tmdb` | TMDB implementation of that data layer. |
| `test-app-react` | Demo OTT-style app (webpack + dev server). |

Further background is in the [project README](README.md) and the [wiki](https://github.com/DNA-inc/tv-tools/wiki).

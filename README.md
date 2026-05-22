# ФОРУМ 360 — Vite + React

Лендинг на Vite, React 19 и TypeScript.

## Локальная разработка

```bash
npm install
npm run dev
```

Перед `dev` / `build` ассеты копируются в `public/assets/` (логотип, кейсы, фото команды).

## Деплой на хостинг

На сервер или в GitHub Pages загружается **только папка `dist/`** после сборки:

```bash
npm install
npm run build
```

Содержимое `dist/` (включая `index.html`, `assets/`, `nojekyll` для GitHub Pages) — это готовый статический сайт.

Локальная проверка сборки:

```bash
npm run preview
```

Сайт на GitHub Pages: https://yuriygarmashov.github.io/forum360-site/

Исходники в ветке `main`. При push в `main` workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) собирает проект и публикует `dist/` в ветку `gh-pages` (`VITE_BASE=/forum360-site/`).

## Исходники ассетов (в репозитории)

| Путь | Назначение |
|------|------------|
| `Лого-07.svg` | Исходник логотипа → `assets/logo.svg` |
| `assets/` | SVG логотипа и круга команды |
| `Фото для кейсов/` | WebP галерей кейсов |
| `Элементы круга/png/` | Фото в модалках команды |

## Тесты (опционально)

```bash
npx playwright install
npm run test:e2e
```

# Asis Safaris UI Service

Modern travel marketplace front-end for the Asis Safaris ecosystem. Built with React + Vite + TypeScript, themed with a shared design system that bridges MUI and Ant Design, and wired for data fetching via Axios, React Query, and mock APIs powered by MSW.

## Getting started

```bash
pnpm install
pnpm dev
```

The app runs on <http://localhost:5173>. Mock APIs start automatically when `VITE_ENABLE_MSW=true` (default). Configure environment values in `.env` using `.env.example` as a guide.

## Tech stack

- **Runtime**: React 19, React Router 7, TypeScript 5, Vite 7
- **Data layer**: Axios + React Query, Zustand for client session state
- **Design system**: MUI 6 + Ant Design 5 with shared tokens, custom brand components
- **Internationalisation**: i18next with English, French, German resources
- **Mocking**: MSW handlers mirroring the backend API contract

## Project layout

```
src/
├─ app/            # cross-cutting config, providers, router
├─ design-system/  # tokens, brand components, global styles
├─ features/       # vertical slices (catalog, checkout, admin, ...)
├─ hooks/          # reusable hooks (auth, tenant, debounce)
├─ layouts/        # shared page layouts
├─ mocks/          # MSW browser worker + handlers
├─ shared/         # shared UI primitives (hero, map, etc.)
└─ utils/          # formatting, analytics, accessibility helpers
```

## Scripts

- `pnpm dev` – run the app with Vite + MSW
- `pnpm build` – type-check and create a production build
- `pnpm lint` – run ESLint with TypeScript awareness
- `pnpm preview` – preview the production build locally

## Next steps

- Hook the API layer to the real `asis-safari-service`
- Extend MSW fixtures as the contract evolves
- Layer in unit/E2E coverage once endpoints stabilise

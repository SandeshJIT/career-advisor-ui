# Career Advisor — Frontend (career-advisor-ui)

This is the frontend UI for the Career Advisor application. It connects to the FastAPI backend (RAG + LLM) which handles resume parsing, embeddings, and question-answering.

Backend repository: https://github.com/SandeshJIT/career-advisor-backend

---

## What this project contains

- A Vite + React + TypeScript frontend.
- Organized components under `src/components/` (UserTypeSelector, ResumeUpload, QuestionSection, HealthStatus, etc.).
- API calls centralized in `src/services/resumeService.ts` and API configuration in `src/config/api.config.ts`.
- A custom SVG favicon at `public/icon.svg`.

---

## Prerequisites

- Node.js (v18+ recommended)
- npm (comes with Node)
- For the backend, see the linked backend repo. It requires Python 3.13+, Ollama, Qdrant and Docker (when using docker setup).

---

## Frontend: Install and run (Windows PowerShell)

1. Install dependencies

```powershell
cd "c:\Users\hssan\OneDrive\Desktop\mini-projects\Resume_Analyzer\career-advisor-ui"
npm install
```

2. Start the dev server

```powershell
npm run dev
```

Open the URL printed by Vite (e.g. http://localhost:5173).

3. Build for production

```powershell
npm run build
# Optionally preview the production build
npm run preview
```

---

## Backend: link and quick start

Repository: https://github.com/SandeshJIT/career-advisor-backend

This frontend expects the backend API to be available at `http://localhost:8000` by default. The backend repo provides both Docker and local steps. Summary:

Run with Docker (recommended):

```powershell
# from a directory where you want to clone the backend
git clone https://github.com/SandeshJIT/career-advisor-backend.git
cd career-advisor-backend
# Start services with docker-compose (builds Qdrant, backend, etc.)
docker-compose up --build
```

Run locally (Python virtualenv):

```powershell
git clone https://github.com/SandeshJIT/career-advisor-backend.git
cd career-advisor-backend
python -m venv venv
.\venv\Scripts\Activate.ps1  # PowerShell activation
# install application using pip
pip install .
# Start the FastAPI app
# using uv (recommended when available):
uv run uvicorn main:app --reload
# or using uvicorn directly:
uvicorn main:app --reload
```

Qdrant (vector DB) is required. The backend README suggests running Qdrant in Docker. Example (Linux/macOS):

```bash
# Pull Qdrant image
docker pull qdrant/qdrant
# Run Qdrant
docker run -p 6333:6333 -p 6334:6334 -v $(pwd)/qdrant_storage:/qdrant/storage qdrant/qdrant
```

On Windows PowerShell, map the path with `${PWD}` instead of `$(pwd)`:

```powershell
docker run -p 6333:6333 -p 6334:6334 -v ${PWD}\qdrant_storage:/qdrant/storage qdrant/qdrant
```

When the backend is running (docker-compose or uvicorn), the API will be available at:

```
http://localhost:8000
```

Refer to the backend README for environment variables such as `OLLAMA_URL`, `QDRANT_URL`, `EMBED_MODEL`, and `CHAT_MODEL` when running in Docker or production.

---

## Configuring the frontend to point to the backend

The frontend reads the backend base URL from `src/config/api.config.ts`:

```ts
export const API_CONFIG = {
  BASE_URL: "http://localhost:8000"
};
```

If your backend is at a different address, update `BASE_URL` or replace this file with logic to read an environment variable (for Vite, use `import.meta.env.VITE_API_BASE_URL`).

Example change using env variable (optional):

1. Replace `src/config/api.config.ts` with:

```ts
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
};
```

2. Start the frontend with a custom URL:

```powershell
$env:VITE_API_BASE_URL = 'http://your-backend:8000'; npm run dev
```

(Or add to an `.env` file at project root: `VITE_API_BASE_URL=http://your-backend:8000`)

---

## Features & components

- Upload resume (PDF/DOCX/TXT) — handled in `src/components/ResumeUpload/`.
- Ask questions about an uploaded resume — handled in `src/components/QuestionSection/`.
- Small context panel and user-type selector.
- Central service `src/services/resumeService.ts` for all API calls.

---

## Notable edits made in this repo

- API calls moved to `src/services/resumeService.ts` (singleton service).
- Components organized under `src/components/*` with per-component CSS files.
- Custom SVG favicon added at `public/icon.svg`.
- Fixed modal visibility for the "Thinking..." state (see `QuestionSection.css`).

---

## Troubleshooting

- Favicon not updating? Browsers cache favicons—clear cache or open a private window.
- CORS or network errors when calling backend? Make sure the backend is running at `BASE_URL` and not blocked by firewall. If backend is running in Docker, `http://localhost:8000` should be reachable from the host.
- If uploads fail, check backend logs for errors and verify `uploads/` directory permissions in the backend.

---

## Contributing

If you want to contribute, please fork and open a PR. For backend changes, see the linked backend repository.

---

## License

This frontend is provided as-is; check the backend repo for its license. If you want a specific license, add a `LICENSE` file.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

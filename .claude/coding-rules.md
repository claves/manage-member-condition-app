# Coding Standards

## Introduction
This coding standard is based not only on the Next.js documentation but also on [Next.js Principles](https://zenn.dev/akfm/books/nextjs-basic-principle/viewer/intro). It is recommended to read through it.

## Common
-  Utilize routing features and Suspense to perform appropriate code splitting.
-  Leverage the concepts of slots and the Composition Pattern to reduce the size of the Client Module Graph and the JavaScript bundles sent to the client (move code that can be moved into RSCs, and aim to enlarge the Server Module Graph).
-  Since this project uses [React Compiler](https://ja.react.dev/learn/react-compiler), hooks such as `useMemo` and `useCallback` for memoization are generally unnecessary.
-  Before submitting a PR, the implementer should run `bun run build:clean` to ensure the build completes successfully.
-  The `"use client"` directive should only be written at boundary points (even if used on the client side, do not use it recklessly).

## Naming Conventions
-  Use kebab-case for file and folder names (excluding dynamic routes).
-  Use camelCase for variable and function names.

## Define Type
- Use type alias so mustn't use interface
- Use utilities of TypeScript as possible as we can

### Regarding Function Definitions
-  Use function declarations to ensure consistency across individual implementations (e.g., `export default async function sample() {}`).

### Component and Directory Strategy
-  Follow [AHA Programming](https://kentcdodds.com/blog/aha-programming) for component design, avoiding hasty abstractions.
-  Implement directory structure according to [bulletproof-react](https://github.com/alan2207/bulletproof-react).
  - *Note: The specific directory structure is described in the "Directory Structure" section.*

### Data Fetching
-  Use RequestMemoization, parallel fetch, and preload to avoid waterfall data fetching.
-  Perform data fetching in leaf components following data colocation principles.

### Cache Management
-  Use cache mechanisms such as React.cache and Next.js cache tags to manage cache appropriately.
-  In principle, specify `cache: 'force-cache'` or tags in fetch calls (SSR uses default options, so explicit specification is unnecessary).

### Server Actions
-  Use only for mutation processing.
  - *Never use server actions as a replacement for fetch in Client Components. If implementing such, use [tanstack-query](https://tanstack.com/query/latest).*

### Testing
-  Implement end-to-end tests using Playwright.

## Directory Structure
Follow the structure of [bulletproof-react](https://github.com/alan2207/bulletproof-react) as below:

```
/manage-member-condition-app
  ├ public : Assets such as images
  ├ src
  |  ├ app: Routing definitions
  |  |  ├ layout.tsx : Root layout
  |  |  ├ page.tsx : Root page component
  |  |  ├ loading.tsx : Root loading UI
  |  |  ├ error.tsx : Global error page
  |  |  ├ not-found.tsx : 404 page
  |  |  ├ unauthorized.tsx : 401 page
  |  |  ├ globals.css : Global styles
  |  |  ├ favicon.ico : Favicon
  |  |  └ sample-route (Sample routing) *The "sample" part is replaced with the actual path name for each page
  |  |     ├ layout.tsx : Shared layout for this route
  |  |     ├ loading.tsx : Loading UI for this route
  |  |     ├ error.tsx : Error page for this route
  |  |     └ page.tsx : Page component for this route
  |  ├ components : Components used throughout the app
  |  |  ├ providers : Providers used throughout the app
  |  |  |  ├ query-provider.tsx : Provides tanstack-query's QueryClient
  |  |  |  └ *-provider.tsx : Other optional providers
  |  |  └ ui
  |  |     ├ header.tsx : Application-wide Header
  |  |     ├ app-sidebar.tsx : Application-wide Sidebar
  |  |     └ shadcn : IntentUI components
  |  |       ├ button.tsx : IntentUI Button
  |  |       ├ input.tsx : IntentUI Input
  |  |       ├ card.tsx : IntentUI Card (name)
  |  |       └ *** : Other IntentUI components
  |  ├ features : Functionality implementations for specific routes (organized by domain)
  |  |  ├ users : Parent directory grouping user-related features
  |  |  |   ├ actions : Server actions (one file/module per function)
  |  |  |   |  ├ user-search.ts : Server action for user search
  |  |  |   |  └ *.ts : Other server actions
  |  |  |   ├ api : API-related logic
  |  |  |   |  └ route.ts : API implementation
  |  |  |   ├ components : Components used within this feature
  |  |  |   |  ├ user-list.ts : Fetch and display user list
  |  |  |   |  └ *.ts : Other components
  |  |  |   ├ hooks : Hooks used within this feature
  |  |  |   |  ├ use-user-search.ts : Hook for user search
  |  |  |   |  └ *.ts : Other constants
  |  |  |   ├ types : Type definitions for this feature
  |  |  |   |  ├ schema : Zod schemas
  |  |  |   |  |  ├ user-search-schema.ts : Zod schema for user search
  |  |  |   |  |  └ *.ts : Other schemas
  |  |  |   |  ├ search-params : Search parameter type definitions
  |  |  |   |  |  ├ user-search-params.ts : Search params for user search
  |  |  |   |  |  └ *.ts : Other search param types
  |  |  |   |  ├ user.ts : User-related type definitions
  |  |  |   |  └ *.ts : Other type files
  |  |  |   └ utils : Utility definitions for this feature
  |  |  └ * : Other feature directories
  |  ├ hooks : Custom hooks used app-wide (use-***.ts)
  |  ├ middleware.ts : Middleware implementation
  ├  ├ types : Global type definitions
  |   └ *.ts : Arbitrary type definitions
  ├  ├ constants : Global constants
  ├  ├ utils : Utility functions used app-wide
  ├  └ lib : Shared library configurations and helper functions
  ├ tests : End-to-end test code
  |  ├ screenshots : Screenshots from tests (for Visual Regression Testing)
  |  |   └ *.png : Screenshots of screens or elements
  |  └ *.spec.ts : Test scripts for each page
  ├ .env.* : Environment variable files
  ├ biome.jsonc : Linter and formatter configuration
  ├ components.json : IntentUI configuration
  ├ next.config.ts : Next.js configuration
  ├ package.json : Package manager configuration
  ├ playwright.config.ts : Playwright configuration
  ├ postcss.config.mjs : PostCSS configuration (mainly Tailwind CSS plugin settings)
  └ tsconfig.json : TypeScript configuration
```
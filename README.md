## Project Overview

This is a Next.js 15 project for managing member condition data, built with React 19, TypeScript, and Supabase. The project uses modern tooling including Biome for linting/formatting, shadcn/ui components, and Tailwind CSS v4.


### Development Rules (High Priority)
1. Consider steering: Run `/kiro:steering-init` before major development (optional for new features)
2. Follow the 3-phase approval workflow: Requirements → Design → Tasks → Implementation
3. Manual approval required: Each phase must be explicitly approved by human review
4. No skipping phases: Design requires approved requirements; Tasks require approved design
5. Update task status: Mark tasks as completed when working on them
6. Keep steering current: Run `/kiro:steering-update` after significant changes
7. Check spec compliance: Use `/kiro:spec-status` to verify alignment

### Automation Features
This project uses Claude Code hooks to:
- Automatically track task progress in tasks.md
- Check spec compliance
- Preserve context during compaction
- Detect steering drift

#### Task Progress Tracking
1. **Manual tracking**: Update tasks.md checkboxes manually as you complete tasks
2. **Progress monitoring**: Use `/kiro:spec-status` to view current completion status
3. **TodoWrite integration**: Use TodoWrite tool to track active work items
4. **Status visibility**: Checkbox parsing shows completion percentage

### Getting Started
1. Initialize steering documents: `/kiro:steering-init`
2. Create your first spec: `/kiro:spec-init [your-feature-name]`
3. Follow the workflow through requirements, design, and tasks

### Kiro Steering Details
Kiro-style steering provides persistent project knowledge through markdown files.

#### Core Steering Documents
- **product.md**: Product overview, features, use cases, value proposition
- **tech.md**: Architecture, tech stack, dev environment, commands, ports
- **structure.md**: Directory organization, code patterns, naming conventions

#### Custom Steering
Create specialized steering documents for:
- API standards
- Testing approaches
- Code style guidelines
- Security policies
- Database conventions
- Performance standards
- Deployment workflows

#### Inclusion Modes
- **Always Included**: Loaded in every interaction (default)
- **Conditional**: Loaded for specific file patterns (e.g., `*.test.js`)
- **Manual**: Loaded on-demand with #filename reference

## Commands

- `bun dev` - Start development server with Turbopack
- `bun build` - Build for production 
- `bun build:clean` - Clean build (removes .next directory first)
- `bun start` - Start production server
- `bun lint` - Run Biome linter with auto-fix
- `bun format` - Run Biome formatter and linter with auto-fix
- `bun check` - Run Biome check on src directory with auto-fix
- `bun test:unit` - Run Vitest for unit tests
- `bun test:e2e` - Run Playwright for unit tests

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **React**: v19 with React Compiler enabled
- **Database**: Supabase (configured via env.ts)
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **State Management**: nuqs for URL state management
- **Environment**: @t3-oss/env-nextjs for type-safe environment variables
- **Linting/Formatting**: Biome (configured in biome.jsonc)
- **Development**: React Scan for performance monitoring

### Remark
If there are shadcn/ui components to need, you must run the command and install components from shadcn/ui
You can check what there are components on shadcn/ui if you use Context7 MCP.

`bunx --bun shadcn@latest add component-name`


### Project Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/components/shadcn/` - shadcn/ui components
- `src/lib/` - Shared utilities (includes cn() for className merging)
- `src/types/` - TypeScript type definitions (includes Next.js page/layout props)
- `src/env.ts` - Environment variable validation with Zod

### Key Configurations
- **Biome**: Configured for 100 character line width, single quotes, and custom rules for React/Next.js
- **shadcn/ui**: Configured with New York style, neutral base color, and path aliases
- **Next.js**: Experimental features enabled (React Compiler, auth interrupts, browser debug info)
- **Environment**: Supabase URL and anonymous key required (client-side variables)

### Code Conventions
- Use arrow functions (enforced by Biome)
- Single quotes for JavaScript, double quotes for JSX
- 2-space indentation
- Tailwind classes should be sorted (enforced by Biome)
- Import organization handled automatically by Biome
- Type imports preferred over regular imports where applicable

### Directory Structure by Bulletproof React
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

## Additional Information Files
- `.claude/request/request.md` - Project requirements document
- `.claude/coding-rules.md` - Project coding conventions, directory structure, prohibitions

## AI Assistant Instructions (High Priority)

1. **Test-Driven Development (TDD)**: Perform TDD whenever possible
   - Test cases will be provided by users
   - Test cases are written in `/tests` directory as `*.spec.ts`
   - Test cases to be developed are communicated by users to AI
   - Follow test cases and develop through try & error until tests succeed

2. **TypeScript Type Safety**: Prioritize TypeScript type safety
3. **Security Best Practices**: Follow security best practices
4. **Performance Consideration**: Always consider performance
5. **Code Comments**: Write code comments in English
6. **Design Confirmation**: Always confirm design before implementation

## Prohibited Items (Highest Priority)
- Excessive use of `any` type (use TypeScript Utility types whenever possible)
- Leaving `console.log` in production environment
- Committing untested code
- Direct writing of security keys
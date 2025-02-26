# Project Guide for Claude

## Commands
- **Frontend**:
  - `cd frontend && pnpm dev` - Start Next.js dev server
  - `cd frontend && pnpm lint` - Run ESLint
  - `cd frontend && pnpm build` - Build for production

- **Backend**:
  - `cd backend && pnpm start:dev` - Start NestJS dev server
  - `cd backend && pnpm lint` - Run ESLint
  - `cd backend && pnpm test` - Run all tests
  - `cd backend && pnpm test -- -t "test name"` - Run specific test
  - `cd backend && pnpm test:e2e` - Run e2e tests

## Code Style
- **Naming**: PascalCase for components/classes, camelCase for methods/variables, snake_case for some DB entities
- **Types**: Always use TypeScript types/interfaces for function parameters, return values and data models
- **Imports**: Group imports by external libraries, then internal modules
- **Error Handling**: Use try/catch with specific error messages and appropriate HTTP status codes
- **Components**: React functional components with hooks, explicit typing with Next.js Route types
- **API Structure**: NestJS controllers with explicit DTOs for request/response, TypeORM for DB interactions
- **Documentation**: Include JSDoc comments for public APIs and complex functions
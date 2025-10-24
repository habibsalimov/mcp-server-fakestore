# 🤝 Contributing Guide

Thank you for considering contributing to MCP Server for Fake Store API! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and beginners
- Focus on constructive feedback
- Help others learn and grow

## How to Contribute

### 1. Report Bugs

Found a bug? Please create an issue with:

- Clear bug description
- Steps to reproduce
- Expected vs actual behavior
- Your environment (OS, Node.js version, etc.)
- Screenshots if applicable

### 2. Suggest Features

Have an idea? Create an issue with:

- Feature description
- Use case and benefits
- Possible implementation approach
- Examples if applicable

### 3. Submit Pull Requests

#### Setup Development Environment

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/mcp-server-fakestore.git
cd mcp-server-fakestore

# Install dependencies
npm install

# Create a branch
git checkout -b feature/your-feature-name
```

#### Development Workflow

```bash
# Make changes
# ...

# Lint and format
npm run lint:fix
npm run format

# Run tests
npm test

# Build
npm run build
```

#### Commit Guidelines

Follow conventional commits:

```
feat: add new product search tool
fix: resolve caching issue
docs: update README examples
test: add cart tool tests
chore: update dependencies
```

#### Submit PR

1. Push your branch: `git push origin feature/your-feature-name`
2. Create Pull Request on GitHub
3. Fill out the PR template
4. Wait for review

## Project Structure

```
src/
├── api/          # API client and endpoints
├── tools/        # MCP tools (add new tools here)
├── types/        # TypeScript types
├── utils/        # Utilities (logging, errors, validation)
├── server.ts     # MCP server setup
└── index.ts      # Entry point

tests/            # Test files (mirror src/ structure)
docs/             # Documentation
examples/         # Usage examples
```

## Adding a New Tool

### 1. Create Tool File

```typescript
// src/tools/newfeature.ts
import { z } from 'zod';
import { logger } from '../utils/logger.js';

export const newFeatureTool = {
  name: 'fakestore_new_feature',
  description: 'Description of what this tool does',
  inputSchema: z.object({
    param: z.string().describe('Parameter description'),
  }),
  async execute(args: { param: string }) {
    try {
      logger.info('Executing new feature', args);
      // Implementation
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error: any) {
      logger.error('Error in new feature:', error);
      throw new Error(`Failed: ${error.message}`);
    }
  },
};
```

### 2. Export from Index

```typescript
// src/tools/index.ts
export * from './newfeature.js';
```

### 3. Register in Server

```typescript
// src/server.ts
import { newFeatureTool } from './tools/index.js';

const tools = [
  // ... existing tools
  newFeatureTool,
];
```

### 4. Add Tests

```typescript
// tests/newfeature.test.ts
import { newFeatureTool } from '../src/tools/newfeature';

describe('New Feature Tool', () => {
  test('should execute successfully', async () => {
    const result = await newFeatureTool.execute({ param: 'test' });
    expect(result).toHaveProperty('content');
  });
});
```

### 5. Update Documentation

- Add tool to README.md table
- Add usage examples to docs/USAGE.md

## Testing Guidelines

### Unit Tests

- Test each function independently
- Mock external dependencies
- Aim for >80% coverage

### Integration Tests

- Test API endpoints
- Test tool execution end-to-end
- Use real API calls (Fake Store API)

### Running Tests

```bash
# All tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

## Code Style

### TypeScript

- Use strict mode
- Provide type annotations
- Avoid `any` when possible
- Use interfaces for complex types

### Naming Conventions

- Files: `kebab-case.ts`
- Functions: `camelCase`
- Classes: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`

### Comments

- JSDoc for functions
- Inline comments for complex logic
- Module-level comments

```typescript
/**
 * Function description
 * @param param - Parameter description
 * @returns Return value description
 */
function example(param: string): string {
  // Complex logic explanation
  return result;
}
```

## Documentation

- Keep README.md up to date
- Update relevant docs/ files
- Add JSDoc comments
- Include code examples

## Questions?

- 💬 [GitHub Discussions](https://github.com/habibsalimov/mcp-server-fakestore/discussions)
- 🐛 [GitHub Issues](https://github.com/habibsalimov/mcp-server-fakestore/issues)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉

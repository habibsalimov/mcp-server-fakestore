# 🏗️ Architecture

This document explains the technical architecture of the MCP Server for Fake Store API.

## Overview

The server follows a layered architecture pattern:

```
┌─────────────────────────────────────┐
│        Claude Desktop / MCP Client   │
└─────────────────┬───────────────────┘
                  │ MCP Protocol
┌─────────────────▼───────────────────┐
│          MCP Server Layer            │
│    (server.ts - Tool Registration)   │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│          Tools Layer                 │
│  (products, carts, users tools)      │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│        API Client Layer              │
│  (endpoints, caching, retry logic)   │
└─────────────────┬───────────────────┘
                  │ HTTPS
┌─────────────────▼───────────────────┐
│       Fake Store API                 │
│    (fakestoreapi.com)                │
└─────────────────────────────────────┘
```

## Layer Details

### 1. MCP Server Layer (`src/server.ts`)

**Responsibilities:**
- Initialize MCP server with SDK
- Register all available tools
- Handle `list_tools` requests
- Handle `call_tool` requests
- Error handling and logging

**Key Components:**
- `createServer()`: Creates and configures MCP server instance
- `startServer()`: Connects server to stdio transport
- Tool registry: Array of all available tools

**MCP Protocol:**
- Uses `@modelcontextprotocol/sdk`
- Communicates via stdio (standard input/output)
- Supports tool listing and execution

### 2. Tools Layer (`src/tools/`)

**Responsibilities:**
- Define tool schemas with Zod
- Validate input parameters
- Execute tool logic
- Format responses
- Error handling

**Tool Structure:**
```typescript
{
  name: string           // Unique tool identifier
  description: string    // What the tool does
  inputSchema: ZodSchema // Parameter validation
  execute: async (args) => Result
}
```

**Categories:**
- **Products Tools** (`products.ts`): 4 tools for product operations
- **Carts Tools** (`carts.ts`): 3 tools for cart operations
- **Users Tools** (`users.ts`): 2 tools for user operations

### 3. API Client Layer (`src/api/`)

**Components:**

#### `client.ts` - Axios Configuration
- Base URL: `https://fakestoreapi.com`
- Timeout: 30 seconds
- Retry logic: 3 attempts with exponential backoff
- Request/response interceptors for logging

#### `cache.ts` - Response Caching
- In-memory cache using Map
- TTL: 5 minutes
- Cache key generation based on endpoint + params
- Automatic expiration

#### `endpoints.ts` - API Functions
- Organized by resource (products, carts, users)
- Wraps Axios calls
- Integrates caching
- Type-safe responses

### 4. Utilities (`src/utils/`)

#### `logger.ts` - Winston Logger
- Console transport with colors
- File transport (error.log, combined.log)
- Configurable log levels
- Structured logging

#### `errors.ts` - Custom Errors
- `APIError`: General API errors
- `ValidationError`: Input validation errors
- `NotFoundError`: Resource not found
- `RateLimitError`: Rate limit exceeded

#### `validation.ts` - Zod Schemas
- Parameter validation schemas
- Type inference from schemas
- Validation helper functions

### 5. Type Definitions (`src/types/`)

**Files:**
- `product.ts`: Product, Category, Rating types
- `cart.ts`: Cart, CartItem types
- `user.ts`: User, Address, Name types
- `index.ts`: Exports all types

**Benefits:**
- IntelliSense support
- Compile-time type checking
- Self-documenting code

## Data Flow

### Tool Execution Flow

```
1. Claude sends tool call request
   ↓
2. MCP Server receives request
   ↓
3. Server finds matching tool
   ↓
4. Tool validates input with Zod
   ↓
5. Tool calls API endpoint
   ↓
6. API client checks cache
   ↓
7. If cache miss, makes HTTP request
   ↓
8. Response cached and returned
   ↓
9. Tool formats response
   ↓
10. MCP Server sends response to Claude
```

### Error Handling Flow

```
Error occurs
   ↓
Caught by tool.execute try/catch
   ↓
Logged by Winston logger
   ↓
Formatted as error response
   ↓
Returned to MCP client
   ↓
Displayed to user in Claude
```

## Performance Optimizations

### 1. Response Caching

- **What**: Cache API responses in memory
- **Duration**: 5 minutes TTL
- **Benefit**: Reduces API calls, faster responses
- **Trade-off**: Stale data possible

### 2. Request Retry

- **Retries**: 3 attempts
- **Backoff**: Exponential (1s, 2s, 4s)
- **Benefit**: Resilient to transient failures

### 3. TypeScript Compilation

- **Target**: ES2022
- **Module**: Node16
- **Benefit**: Modern features, smaller bundle

## Security Considerations

### ✅ Implemented

- Input validation with Zod
- Error message sanitization
- Type safety with TypeScript
- HTTPS for API calls

### ⚠️ Limitations

- No authentication (public API)
- No rate limiting (API has no limits)
- No sensitive data (fake data)

## Extensibility

### Adding New Tools

1. Create tool in `src/tools/newtool.ts`
2. Export from `src/tools/index.ts`
3. Add to tools array in `src/server.ts`
4. Add tests in `tests/newtool.test.ts`

### Adding New API Endpoints

1. Add function to `src/api/endpoints.ts`
2. Add types to `src/types/`
3. Use in tool implementations

### Custom Caching Strategy

1. Modify `src/api/cache.ts`
2. Change TTL or implement Redis
3. Add cache invalidation logic

## Testing Strategy

### Unit Tests

- Individual functions
- Mock external dependencies
- Fast execution

### Integration Tests

- API endpoint calls
- Tool execution
- Real HTTP requests

### Coverage Goals

- Branches: >80%
- Functions: >80%
- Lines: >80%
- Statements: >80%

## Build and Deployment

### Build Process

```bash
npm run build
```

Compiles TypeScript to JavaScript in `dist/` folder:
- Source maps for debugging
- Type declarations (.d.ts)
- ES modules

### Package Structure

```
mcp-server-fakestore/
├── dist/           # Compiled code
├── src/            # Source code
├── tests/          # Tests (not included in package)
└── package.json    # Entry point: dist/index.js
```

### NPM Publishing

```bash
npm publish
```

Publishes:
- dist/ folder
- README.md
- LICENSE
- package.json

## Monitoring and Logging

### Log Levels

- **error**: Failures and exceptions
- **warn**: Potential issues
- **info**: General information (default)
- **debug**: Detailed debugging

### Log Output

- Console: Colorized, human-readable
- error.log: Error level only
- combined.log: All levels

### Example Logs

```
2025-10-24 18:30:00 [info]: Starting MCP Server...
2025-10-24 18:30:01 [debug]: API Request: GET /products
2025-10-24 18:30:02 [debug]: Cache hit: products_all_none
2025-10-24 18:30:02 [info]: Tool executed: fakestore_get_products
```

## Future Improvements

- [ ] Add Redis caching
- [ ] GraphQL support
- [ ] WebSocket for real-time updates
- [ ] Performance metrics dashboard
- [ ] Multi-API support
- [ ] Request batching

---

Questions? Open an issue or discussion on GitHub!

# 🛍️ MCP Server for Fake Store API

[![npm version](https://badge.fury.io/js/%40habibsalimov%2Fmcp-server-fakestore.svg)](https://www.npmjs.com/package/@habibsalimov/mcp-server-fakestore)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)

A beginner-friendly **Model Context Protocol (MCP)** server that provides seamless access to the [Fake Store API](https://fakestoreapi.com). Perfect for learning MCP development and building AI applications with e-commerce data.

## ✨ Features

- 🚀 **Easy to Use**: Simple setup and configuration
- 🔧 **10 MCP Tools**: Complete access to products, carts, and users
- 📦 **TypeScript**: Full type safety and IntelliSense support
- ⚡ **Response Caching**: Built-in caching for better performance
- 📝 **Comprehensive Logging**: Winston-powered logging system
- ✅ **Well Tested**: Jest test suite with high coverage
- 📖 **Well Documented**: Extensive documentation and examples

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

## 🚀 Quick Start

### Installation

```bash
npm install -g @habibsalimov/mcp-server-fakestore
```

### Usage with Claude Desktop

Add the server configuration to your Claude Desktop config file:

**MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "fakestore": {
      "command": "npx",
      "args": ["-y", "@habibsalimov/mcp-server-fakestore"]
    }
  }
}
```

Restart Claude Desktop, and you're ready to go!

## 🛠️ Available Tools

### Products (4 tools)

| Tool Name | Description | Parameters |
|-----------|-------------|------------|
| `fakestore_get_products` | Get all products | `limit?`, `sort?` |
| `fakestore_get_product` | Get single product by ID | `id` |
| `fakestore_get_categories` | Get all categories | - |
| `fakestore_get_products_by_category` | Get products by category | `category` |

### Carts (3 tools)

| Tool Name | Description | Parameters |
|-----------|-------------|------------|
| `fakestore_get_carts` | Get all shopping carts | `limit?`, `sort?` |
| `fakestore_get_cart` | Get single cart by ID | `id` |
| `fakestore_get_user_carts` | Get carts for a user | `userId` |

### Users (2 tools)

| Tool Name | Description | Parameters |
|-----------|-------------|------------|
| `fakestore_get_users` | Get all users | `limit?` |
| `fakestore_get_user` | Get single user by ID | `id` |

## 💡 Example Usage with Claude

```
You: "Show me all electronics products"
Claude: *Uses fakestore_get_products_by_category with category="electronics"*

You: "What's in user 1's shopping cart?"
Claude: *Uses fakestore_get_user_carts with userId=1*

You: "Get details for product ID 5"
Claude: *Uses fakestore_get_product with id=5*
```

## 🏗️ Development

### Clone and Install

```bash
git clone https://github.com/habibsalimov/mcp-server-fakestore.git
cd mcp-server-fakestore
npm install
```

### Build

```bash
npm run build
```

### Run Tests

```bash
npm test
npm run test:coverage
```

### Lint and Format

```bash
npm run lint
npm run format
```

### Development Mode

```bash
npm run dev
```

## 📁 Project Structure

```
mcp-server-fakestore/
├── src/
│   ├── api/              # API client and endpoints
│   ├── tools/            # MCP tools implementation
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── server.ts         # MCP server setup
│   └── index.ts          # Entry point
├── tests/                # Jest tests
├── docs/                 # Documentation
├── examples/             # Usage examples
└── dist/                 # Compiled output
```

## 📚 Documentation

- [Setup Guide](docs/SETUP.md) - Detailed installation and configuration
- [Usage Guide](docs/USAGE.md) - Examples and use cases
- [Contributing](docs/CONTRIBUTING.md) - How to contribute
- [Architecture](docs/ARCHITECTURE.md) - Technical architecture

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](docs/CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Fake Store API](https://fakestoreapi.com) for providing the e-commerce data
- [Model Context Protocol](https://modelcontextprotocol.io/) by Anthropic
- [Claude](https://claude.ai) by Anthropic

## 📧 Support

- 🐛 [Report a Bug](https://github.com/habibsalimov/mcp-server-fakestore/issues)
- 💡 [Request a Feature](https://github.com/habibsalimov/mcp-server-fakestore/issues)
- 💬 [Discussions](https://github.com/habibsalimov/mcp-server-fakestore/discussions)

---

Made with ❤️ by [Habib Salimov](https://github.com/habibsalimov)

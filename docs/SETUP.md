# 🚀 Setup Guide

This guide will walk you through setting up the MCP Server for Fake Store API.

## Installation Methods

### Method 1: Global Installation (Recommended)

Install the package globally via npm:

```bash
npm install -g @habibsalimov/mcp-server-fakestore
```

Verify the installation:

```bash
npx @habibsalimov/mcp-server-fakestore --version
```

### Method 2: Local Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/habibsalimov/mcp-server-fakestore.git
cd mcp-server-fakestore
npm install
npm run build
```

## Claude Desktop Configuration

### Step 1: Locate Configuration File

- **MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

### Step 2: Add Server Configuration

Open the configuration file and add the following:

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

If you have other MCP servers, add it to the existing configuration:

```json
{
  "mcpServers": {
    "existing-server": {
      "command": "existing-command"
    },
    "fakestore": {
      "command": "npx",
      "args": ["-y", "@habibsalimov/mcp-server-fakestore"]
    }
  }
}
```

### Step 3: Restart Claude Desktop

Close and reopen Claude Desktop to load the new server.

### Step 4: Verify Installation

In Claude Desktop, try asking:

> "What MCP tools are available?"

You should see the Fake Store API tools listed.

## Environment Variables (Optional)

You can customize logging behavior:

```bash
export LOG_LEVEL=debug  # Options: error, warn, info, debug
```

## Troubleshooting

### Server Not Showing Up

1. Check the configuration file path
2. Verify JSON syntax (use a JSON validator)
3. Ensure the command is accessible in your PATH
4. Check Claude Desktop logs

### Connection Errors

1. Verify internet connection (API requires internet)
2. Check firewall settings
3. Ensure no proxy is blocking requests

### Build Errors

1. Ensure Node.js >= 18.0.0
2. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
3. Clear build output: `rm -rf dist && npm run build`

## Next Steps

- Read the [Usage Guide](USAGE.md) for examples
- Explore [Contributing Guide](CONTRIBUTING.md) to contribute
- Check [Architecture](ARCHITECTURE.md) for technical details

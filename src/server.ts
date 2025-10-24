/**
 * MCP Server implementation for Fake Store API
 * @module server
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { logger } from './utils/logger.js';
import {
  getProductsTool,
  getProductTool,
  getCategoriesTool,
  getProductsByCategoryTool,
  getCartsTool,
  getCartTool,
  getUserCartsTool,
  getUsersTool,
  getUserTool,
} from './tools/index.js';

/**
 * All available MCP tools
 */
const tools = [
  // Products tools
  getProductsTool,
  getProductTool,
  getCategoriesTool,
  getProductsByCategoryTool,
  // Carts tools
  getCartsTool,
  getCartTool,
  getUserCartsTool,
  // Users tools
  getUsersTool,
  getUserTool,
];

/**
 * Create and configure MCP server
 */
export function createServer() {
  const server = new Server(
    {
      name: 'mcp-server-fakestore',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  /**
   * List all available tools
   */
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    logger.info('Listing all tools');
    return {
      tools: tools.map((tool) => {
        // Convert Zod schema to JSON Schema and remove $schema metadata
        const { $schema, ...schema } = zodToJsonSchema(tool.inputSchema);
        return {
          name: tool.name,
          description: tool.description,
          inputSchema: schema,
        };
      }),
    };
  });

  /**
   * Handle tool execution
   */
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    logger.info(`Tool called: ${name}`, args);

    const tool = tools.find((t) => t.name === name);

    if (!tool) {
      logger.error(`Tool not found: ${name}`);
      throw new Error(`Unknown tool: ${name}`);
    }

    try {
      // Validate and execute tool (handle null/undefined arguments)
      const validatedArgs = tool.inputSchema.parse(args || {});
      const result = await tool.execute(validatedArgs as any);
      logger.info(`Tool executed successfully: ${name}`);
      return result;
    } catch (error: any) {
      logger.error(`Tool execution failed: ${name}`, error);
      // Let MCP SDK handle error formatting
      throw error;
    }
  });

  return server;
}

/**
 * Start the MCP server
 */
export async function startServer() {
  const server = createServer();
  const transport = new StdioServerTransport();

  logger.info('Starting MCP Server for Fake Store API...');

  await server.connect(transport);

  logger.info('MCP Server started successfully');
  logger.info(`Available tools: ${tools.map((t) => t.name).join(', ')}`);
}

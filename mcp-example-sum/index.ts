import { Server } from "@modelcontextprotocol/sdk/server/index.js";

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";


// Schema for the sum tool input
const sumInputSchema = z.object({
  a: z.number().min(0).max(100),
  b: z.number().min(0).max(100),
});

const server = new Server(
  {
    name: "ExampleS MCP Server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "sum",
        description: "Suma dos números",
        inputSchema: {
          type: "object",
          properties: {
            a: {
              type: "number",
              description: "Primer número a sumar",
              minimum: 0,
              maximum: 100
            },
            b: {
              type: "number",
              description: "Segundo número a sumar",
              minimum: 0,
              maximum: 100
            },
          },
          required: ["a", "b"],
        }
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  console.error(`Received request to call tool: ${name} with args:`, args);
  if (name === "sum") {
    try {
      // Validar datos con Zod
      const validatedInput = sumInputSchema.parse(args);
      const { a, b } = validatedInput;
      
      return {
        content: [
          {
            type: "text",
            text: `La suma de ${a} y ${b} es ${a + b}.`,
          },
        ],
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          content: [
            {
              type: "text",
              text: `Error de validación: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`,
            },
          ],
          isError: true
        };
      }
      throw error;
    }
  }

  throw new Error(`Tool ${name} not found`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Error starting server:", error);
});

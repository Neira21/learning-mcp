import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";


// 1 Create Server
// It's the main iterface with protocol MCP. Manages communication between the client and the server

const server = new McpServer({
  name: "Demo",
  version: "1.0.0",
});


server.tool( 
  "fetch-weather",  
  "Get weather data for a city. Pass city parameter.",
  {
    city: z.string().describe("city name")
  },
  async ({city}) => {
    return {
      content: [
        { 
          type: "text", 
          text: `Weather data for a ${city} is sunny`
        }
      ]
    };
  }
);

// 3. Listen the conections of clients

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("MCP server is running...");
}

main().catch((error) => {
  console.error("Server error:", error);
});


// npx -y tsx main.ts 

// 4. Start the server with command for inspector
// npx -y @modelcontextprotocol/inspector npx -y tsx main.ts


import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from 'zod';


const server = new McpServer({
  name: 'Weather Server',
  version: '1.0.0',
})


server.tool(
  'get-weather',
  'Fetch weather data for a given city',
  {
    city: z.string().describe('Name of the city to fetch weather data for'),
  },
  async ({ city }) => {
    return {
      content: [
        {
          type: 'text',
          text: `Fetching weather data for ${city} is snowwing!`,
        }
        
      ]
    }
  }
)

const transport = new StdioServerTransport();
server.connect(transport)



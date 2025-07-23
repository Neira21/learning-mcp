import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
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
    city: z.string().describe("city name"),
  },

  async ({ city }) => {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`
    );

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `No weather data found for ${city}`,
          },
        ],
      };
    }

    const { latitude, longitude } = data.results[0];

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,precipitation,is_day,rain&forecast_days=1`
    );

    const wheatherData = await weatherResponse.json();

    const { current } = wheatherData;

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(current, null, 2),
        },
      ],
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

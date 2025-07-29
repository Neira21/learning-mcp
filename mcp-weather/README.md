# MCP Weather Server

- npx -y @modelcontextprotocol/inspector npx -y tsx main.ts

## Code Structure

``` typescript


// Creates MCP server with weather tool
const server = new McpServer({
  name: "Weather Server",
  version: "1.0.0"
});

// Defines the get-weather tool
server.tool('get-weather', 'Tool to get the weather of a city', ...);

// Connects via stdio transport
const transport = new StdioServerTransport();
server.connect(transport);
```

## Dependencies

- @modelcontextprotocol/sdk - MCP server framework
- zod - Schema validation
- tsx - TypeScript execution (for development)

## API Used
- Open-Meteo - Free weather API with no authentication required
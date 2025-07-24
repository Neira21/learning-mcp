import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

interface Saludo {
  name: string;
}

interface TimeRequest {
  format?: string;
  timezone?: string;
}

const server = new Server(
  {
    name: "mcp",
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
        name: "saludo",
        description: "Saluda a alguien",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "El nombre de la persona a saludar",
            },
          },
          required: ["name"],
        }
      },
      {
        name: "get_current_time",
        description: "Obtiene la fecha y hora actual",
        inputSchema: {
          type: "object",
          properties: {
            format: {
              type: "string",
              description: "Formato de salida: 'iso', 'locale', 'custom'",
              enum: ["iso", "locale", "custom"]
            },
            timezone: {
              type: "string",
              description: "Zona horaria (opcional)"
            }
          }
        }
      },
      {
        name: "format_date",
        description: "Formatea una fecha específica",
        inputSchema: {
          type: "object",
          properties: {
            date: {
              type: "string",
              description: "Fecha en formato ISO"
            },
            format: {
              type: "string",
              description: "Formato de salida"
            }
          },
          required: ["date"]
        }
      }
    ]
  }
})


server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: arg } = request.params;

  if (name === "saludo") {
    const { name: personName } = arg as unknown as Saludo;
    return {
      content: [
        {
          type: "text",
          text: `¡Hola, ${personName}! Bienvenido al mundo de MCP.`,
        },
      ],
    };
  }

  if (name === "get_current_time") {
    const { format = "iso", timezone } = arg as unknown as TimeRequest;
    const now = new Date();
    
    let timeString;
    switch (format) {
      case "iso":
        timeString = now.toISOString();
        break;
      case "locale":
        timeString = now.toLocaleString();
        break;
      case "custom":
        timeString = now.toString();
        break;
      default:
        timeString = now.toISOString();
    }

    return {
      content: [
        {
          type: "text",
          text: `Hora actual: ${timeString}`,
        },
      ],
    };
  }

  if (name === "format_date") {
    const { date, format = "iso" } = arg as any;
    const dateObj = new Date(date);
    
    let formatted;
    switch (format) {
      case "iso":
        formatted = dateObj.toISOString();
        break;
      case "locale":
        formatted = dateObj.toLocaleString();
        break;
      case "custom":
        formatted = dateObj.toString();
        break;
      default:
        formatted = dateObj.toISOString();
    }

    return {
      content: [
        {
          type: "text",
          text: `Fecha formateada: ${formatted}`,
        },
      ],
    };
  }

  throw new Error(`Tool ${name} not found`);
});

async function main(){
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("Server started and listening on stdin/stdout");
}

main().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});
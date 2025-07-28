# MPC - Model Context Protocol

En este repositorio sigo la documentación oficial de Model Context Protocol (MPC) para realizar las pruebas y ejemplos necesarios para entender su funcionamiento, el uso de los servidores y la implementación en TypeScript.

## Documentación Oficial
La documentación oficial de Model Context Protocol (MPC) se encuentra en el siguiente enlace:
https://modelcontextprotocol.org/docs/

Además, puedes encontrar ejemplos de servidores que implementan el protocolo en el siguiente enlace:
https://github.com/modelcontextprotocol/servers


## Ejemplos en TypeScript
Siguiendo la documentación oficial de Model Context Protocol (MPC), aquí hay algunos ejemplos de cómo usar MPC en TypeScript:
https://github.com/modelcontextprotocol/typescript-sdk



En la una carpeta .vscode se encuentra el archivo `mcp.json` que contiene la configuración del servidor MPC. Este archivo es utilizado por Visual Studio Code para interactuar con el servidor MPC.

```json
{
	"servers": {
		"weather-server": {
			"type": "stdio",
			"command": "node",
			"args": [
        "c:\\Users\\Alvaro\\Desktop\\learning-mcp\\mcp-introduction\\main.js"
      ]
		},
	},
	"inputs": []
}

```

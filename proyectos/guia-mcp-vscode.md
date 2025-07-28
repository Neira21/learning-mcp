# Guía Completa: MCP y Agentes en VS Code

## ¿Qué es MCP (Model Context Protocol)?

El Model Context Protocol (MCP) es un protocolo estándar que permite a los modelos de IA acceder a recursos externos de forma segura y controlada. Facilita la integración entre modelos de lenguaje y herramientas, bases de datos, APIs y otros sistemas externos.

## Requisitos Previos

- VS Code instalado (versión más reciente recomendada)
- Node.js 18+ instalado
- Conocimientos básicos de programación
- Cuenta en GitHub (para usar GitHub Copilot)

## Configuración de MCP en VS Code

### Paso 1: Instalación de Extensiones

1. **GitHub Copilot**:
   - Abre VS Code
   - Ve a Extensions (Ctrl+Shift+X)
   - Busca "GitHub Copilot"
   - Instala la extensión oficial de GitHub

2. **Extensiones de MCP** (si están disponibles):
   - Busca extensiones relacionadas con MCP
   - Instala las extensiones oficiales recomendadas

### Paso 2: Configuración de GitHub Copilot

1. **Autenticación**:
   ```bash
   # Desde la paleta de comandos (Ctrl+Shift+P)
   > GitHub Copilot: Sign In
   ```

2. **Configuración básica**:
   - Accede a Settings (Ctrl+,)
   - Busca "GitHub Copilot"
   - Configura las preferencias según tus necesidades

## Usando el Agente de VS Code

### GitHub Copilot Chat

El agente principal en VS Code es GitHub Copilot Chat, que proporciona asistencia inteligente de código.

#### Activación y Uso Básico

1. **Abrir Copilot Chat**:
   - Atajo: `Ctrl+Shift+I`
   - O desde la paleta de comandos: `> GitHub Copilot: Open Chat`

2. **Comandos básicos en el chat**:
   ```
   @workspace Explica este proyecto
   @vscode Cómo abrir el terminal
   @terminal Ejecuta npm install
   /explain Explica este código
   /fix Corrige este error
   /tests Genera tests para esta función
   /doc Documenta este código
   ```

#### Agentes Específicos

1. **@workspace**: Contexto del proyecto completo
   ```
   @workspace ¿Cuál es la estructura de este proyecto?
   @workspace Crea un README para este proyecto
   ```

2. **@vscode**: Funcionalidades de VS Code
   ```
   @vscode Cómo cambiar el tema
   @vscode Instala extensión para Python
   ```

3. **@terminal**: Comandos de terminal
   ```
   @terminal Instala dependencias
   @terminal Ejecuta tests
   ```

### Funciones Avanzadas del Agente

#### 1. Generación de Código Contextual

```javascript
// Ejemplo: El agente puede generar código basado en el contexto
function calcularPromedio(numeros) {
    // Copilot sugerirá automáticamente la implementación
}
```

#### 2. Refactorización Inteligente

- Selecciona código y usa `Ctrl+Shift+P > GitHub Copilot: Refactor`
- El agente sugerirá mejoras y optimizaciones

#### 3. Explicaciones de Código

- Selecciona código complejo
- Usa `/explain` en el chat para obtener explicaciones detalladas

## Configuración Avanzada de MCP

### Archivo de Configuración MCP

Crea un archivo `mcp-config.json` en tu proyecto:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "path/to/directory"],
      "env": {}
    },
    "database": {
      "command": "mcp-server-database",
      "args": ["--connection-string", "sqlite:///path/to/db.sqlite"],
      "env": {}
    }
  }
}
```

### Servidores MCP Populares

1. **Servidor de Sistema de Archivos**:
   ```bash
   npm install -g @modelcontextprotocol/server-filesystem
   ```

2. **Servidor de Base de Datos**:
   ```bash
   npm install -g @modelcontextprotocol/server-sqlite
   ```

3. **Servidor de Git**:
   ```bash
   npm install -g @modelcontextprotocol/server-git
   ```

## Casos de Uso Prácticos

### 1. Desarrollo Web con MCP

```javascript
// El agente puede ayudar a crear una aplicación completa
// Ejemplo: Aplicación React con backend Node.js

// Frontend React
function App() {
  // Copilot sugerirá componentes basados en el contexto
}

// Backend Express
const express = require('express');
// Copilot sugerirá rutas y middleware apropiados
```

### 2. Análisis de Datos

```python
import pandas as pd

# El agente puede sugerir análisis basado en los datos
def analizar_ventas(datos):
    # Copilot sugerirá operaciones de pandas apropiadas
    pass
```

### 3. Automatización de Tareas

```bash
#!/bin/bash
# El agente puede ayudar a crear scripts de automatización
# basados en la estructura del proyecto
```

## Mejores Prácticas

### 1. Comunicación Efectiva con el Agente

- **Sé específico**: "Crea una función que valide emails con regex"
- **Proporciona contexto**: Menciona el lenguaje y framework
- **Usa comandos slash**: `/explain`, `/fix`, `/tests`

### 2. Aprovecha los Agentes Contextuales

```
@workspace Revisa todo el proyecto y sugiere mejoras de arquitectura
@vscode Configura debugging para este proyecto Node.js
@terminal Prepara el entorno de desarrollo
```

### 3. Iteración y Refinamiento

- Comienza con solicitudes simples
- Refina gradualmente con más detalles
- Usa el historial de chat para mantener contexto

## Solución de Problemas Comunes

### Error de Autenticación

```bash
# Reautenticar GitHub Copilot
> GitHub Copilot: Sign Out
> GitHub Copilot: Sign In
```

### El Agente No Responde

1. Verifica la conexión a internet
2. Reinicia VS Code
3. Verifica el estado del servicio GitHub

### Sugerencias Incorrectas

- Proporciona más contexto en tus solicitudes
- Usa comentarios descriptivos en el código
- Especifica el framework o biblioteca que usas

## Recursos Adicionales

### Documentación Oficial

- [GitHub Copilot Docs](https://docs.github.com/copilot)
- [VS Code AI Features](https://code.visualstudio.com/docs/editor/artificial-intelligence)
- [MCP Specification](https://modelcontextprotocol.io/)

### Comunidad y Soporte

- Foros de GitHub Copilot
- Discord de VS Code
- Stack Overflow con tag `github-copilot`

### Ejemplos de Proyectos

```
proyectos/
├── web-app-mcp/          # Ejemplo de aplicación web con MCP
├── data-analysis/        # Análisis de datos con agente
├── automation-scripts/   # Scripts automatizados
└── api-integration/      # Integración con APIs externas
```

## Conclusión

La combinación de MCP y los agentes de VS Code proporciona un entorno de desarrollo potente y inteligente. Aprovecha estas herramientas para acelerar tu flujo de trabajo, mejorar la calidad del código y aprender nuevas técnicas de programación.

Recuerda que los agentes están diseñados para asistir, no reemplazar, tu experiencia como desarrollador. Úsalos como herramientas para potenciar tu creatividad y productividad.

---

*Última actualización: Julio 2025*
*Versión: 1.0*
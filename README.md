# MCP-Wait
[![smithery badge](https://smithery.ai/badge/@automation-ai-labs/mcp-wait)](https://smithery.ai/server/@automation-ai-labs/mcp-wait)

A simple MCP server that provides waiting functionality to pause until other tasks finish.

## Features

- Wait for a specified number of seconds
- Progress reporting during waiting
- Simple to use via CLI or as an HTTP server with SSE

## Integration with Claude Desktop/Cursor/Chatwise

To use with Claude Desktop, add the following to your configuration:

```json
{
  "mcpServers": {
    "mcp-wait": {
      "command": "npx",
      "args": [
        "-y",
        "@automation-ai-labs/mcp-wait"
      ],
      "env": {
        "TRANSPORT_TYPE": "stdio"
      }
    }
  }
}
```

## Installation

### Installing via Smithery

To install Wait for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@automation-ai-labs/mcp-wait):

```bash
npx -y @smithery/cli install @automation-ai-labs/mcp-wait --client claude
```

### Manual Installation
```bash
npm install
```

## Usage

### CLI Testing

Test the server directly using the FastMCP CLI:

```bash
npm run dev
```

This will start the server and let you interact with it through the CLI.

### Inspect with MCP Inspector

Inspect the server using the MCP Inspector web UI:

```bash
npm run inspect
```

### Start as SSE Server

Start the server with SSE support for integrating with other applications:

```bash
TRANSPORT_TYPE=sse PORT=8080 npm start
```

## Wait Tool

The server provides a simple `wait` tool that accepts a `seconds` parameter:

- `seconds`: The number of seconds to wait (0-30000)

Example:
```json
{
  "seconds": 5
}
```

This will wait for 5 seconds and report progress during the wait.


#!/usr/bin/env node

import { FastMCP } from "fastmcp";
import { z } from "zod";
// Explicitly import Node.js process module
import * as process from "process";

// Create the MCP server
const server = new FastMCP({
  name: "MCP-Wait",
  version: "1.0.0",
  // FastMCP doesn't support description in ServerOptions
});

// Helper function for waiting
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Add the wait tool
server.addTool({
  name: "wait",
  description: "Wait for a specified number of seconds, useful for waiting for other tasks to finish",
  parameters: z.object({
    seconds: z.number().min(0).max(30000).describe("The number of seconds to wait (0-30000)"),
  }),
  execute: async (args, { reportProgress }) => {
    const { seconds } = args;
    const ms = seconds * 1000;

    console.log(`Waiting for ${seconds} seconds...`);

    // Report progress in 10% increments
    const interval = ms / 10;

    for (let i = 0; i < 10; i++) {
      await sleep(interval);
      reportProgress({
        progress: (i + 1) * 10,
        total: 100,
      });
    }

    return `Waited for ${seconds} seconds successfully.`;
  },
});

// Start the server with different transport options based on environment
const transportType = process.env.TRANSPORT_TYPE || "stdio";

if (transportType === "sse") {
  // Start the server with SSE support if specified
  server.start({
    transportType: "sse",
    sse: {
      endpoint: "/sse",
      port: parseInt(process.env.PORT || "8080"),
    },
  });

  console.log(`MCP-Wait server started with SSE on port ${process.env.PORT || "8080"}`);
} else {
  // Default to stdio for CLI usage
  server.start({
    transportType: "stdio",
  });

  console.log("MCP-Wait server started with stdio transport");
} 
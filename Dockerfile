# Generated by https://smithery.ai. See: https://smithery.ai/docs/config#dockerfile
FROM node:lts-alpine

# Create app directory
WORKDIR /app

# Copy package files and tsconfig
COPY package.json package-lock.json tsconfig.json ./

# Install dependencies (ignore scripts to avoid auto-run of any prestart scripts)
RUN npm install --ignore-scripts

# Copy source code
COPY src ./src
COPY README.md ./

# Build the project
RUN npm run build

# Expose port if using SSE
EXPOSE 8080

# Default command will be overridden by the startCommand in Smithery config
CMD [ "node", "dist/index.js" ]

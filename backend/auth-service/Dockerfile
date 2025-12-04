FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies including devDependencies for build
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build TypeScript using npx to avoid permission issues
RUN npx tsc

# Expose port (Render will set PORT env var)
EXPOSE 3001

# Start the built app
CMD ["node", "dist/main.js"]

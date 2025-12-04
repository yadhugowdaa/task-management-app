FROM node:18

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Expose port (Render will set PORT env var)
EXPOSE 3001

# Start with ts-node directly (no build step needed)
CMD ["npx", "ts-node", "src/main.ts"]

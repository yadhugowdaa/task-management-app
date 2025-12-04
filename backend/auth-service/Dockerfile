FROM node:18

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm install --legacy-peer-deps

# Install ts-node globally
RUN npm install -g ts-node typescript

# Copy source code
COPY . .

# Expose port (Render will set PORT env var)
EXPOSE 3001

# Start with globally installed ts-node
CMD ["ts-node", "src/main.ts"]

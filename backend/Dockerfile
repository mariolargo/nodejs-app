# Choose a minimal base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy application files
COPY ./src/dist ./dist

# Expose required port and define start command
EXPOSE 3000

CMD ["npm", "start"]

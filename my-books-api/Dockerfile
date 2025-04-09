# Use Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Install global dependencies
RUN npm install -g nodemon

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire application code
COPY . .

# Set up working directories for frontend & backend
WORKDIR /app/frontend
RUN npm install

WORKDIR /app

# Expose backend and frontend ports
EXPOSE 4000 5173

# Start backend and frontend with live reloading
CMD ["sh", "-c", "cd frontend && npm run dev & cd /app && nodemon server.js"]

# Use the official Node.js image with Alpine as the base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if you have it) into the container
COPY package*.json ./

# Install the app dependencies inside the container
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Expose the port your app will run on (typically 3000 for Express)
EXPOSE 3001

# Run the app when the container starts
CMD ["npm", "start"]
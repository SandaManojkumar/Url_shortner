# frontend/Dockerfile
FROM node:18
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY public ./public
COPY src ./src
RUN npm install
EXPOSE 3000
CMD ["npm", "start", "--", "--host", "0.0.0.0"]

FROM node:22-alpine

WORKDIR /client

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 5173

CMD ["npx", "vite" ]
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --silent --no-optional

COPY . .

RUN npm run build



FROM node:22-alpine AS runner

WORKDIR /app

COPY package*.json ./

RUN npm ci --production --silent --no-optional && npm i -g pm2@latest

COPY --from=builder /app/dist ./dist

COPY ./ecosystem.config.js ./

ENTRYPOINT [ "pm2-runtime", "start", "ecosystem.config.js", "--env", "production" ]

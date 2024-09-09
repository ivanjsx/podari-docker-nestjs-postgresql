FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm i -g npm@latest && npm ci --silent --no-optional

COPY . .

RUN npm run build



FROM node:22-alpine AS runner

WORKDIR /app

COPY package*.json ./

RUN npm i -g npm@latest pm2@latest && npm ci --production --silent --no-optional

COPY --from=builder /app/dist ./dist

COPY ./ecosystem.config.js ./

ENTRYPOINT [ "pm2-runtime", "start", "ecosystem.config.js", "--env", "production" ]

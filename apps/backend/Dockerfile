FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY apps/backend/package.json apps/backend/package.json
RUN npm install --workspace @teamhub/backend

COPY apps/backend apps/backend
RUN npm run prisma:generate --workspace @teamhub/backend
RUN npm run build --workspace @teamhub/backend

FROM node:20-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
COPY apps/backend/package.json apps/backend/package.json
RUN npm install --omit=dev --workspace @teamhub/backend

COPY --from=build /app/apps/backend/dist apps/backend/dist
COPY --from=build /app/apps/backend/prisma apps/backend/prisma
RUN npm run prisma:generate --workspace @teamhub/backend

WORKDIR /app/apps/backend

EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]

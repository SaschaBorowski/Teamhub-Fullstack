FROM node:20-alpine AS build

WORKDIR /app

ARG VITE_GRAPHQL_URL=http://localhost:4000/graphql
ENV VITE_GRAPHQL_URL=$VITE_GRAPHQL_URL

COPY package*.json ./
COPY apps/frontend/package.json apps/frontend/package.json
RUN npm install --workspace @teamhub/frontend

COPY apps/frontend apps/frontend
RUN npm run build --workspace @teamhub/frontend

FROM nginx:1.27-alpine

COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/frontend/dist /usr/share/nginx/html

EXPOSE 80

# Base Stage
FROM node:20-slim AS base
ENV NPM_HOME="/npm"
ENV PATH="$NPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

# Install Dependencies
FROM base AS dependencies
RUN npm install --frozen-lockfile

# Build Stage
FROM dependencies AS build
RUN npm run build

# Production Image
FROM gcr.io/distroless/nodejs20-debian11

WORKDIR /app
COPY --from=dependencies /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/package.json

ENV PORT=8000
EXPOSE 8000

CMD ["node", "dist/index.js"]

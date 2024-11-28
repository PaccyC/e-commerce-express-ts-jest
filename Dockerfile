FROM node:20-slim as base
ENV NPM_HOME="/npm"
ENV PATH="$NPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS build
RUN --mount=type=cache,id=npm,target=/npm/store npm install --frozen-lockfile
RUN npm run build


FROM gcr.io/distroless/nodejs20-debian11

COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/package.json

WORKDIR /app

ENV PORT=5000
EXPOSE 5000

CMD [ "dist/index.js"]

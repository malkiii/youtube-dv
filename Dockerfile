FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

FROM base AS prod
COPY pnpm-lock.yaml /app

WORKDIR /app

RUN pnpm fetch --prod
COPY . /app

RUN pnpm build

FROM base
COPY --from=prod /app/node_modules /app/node_modules
COPY --from=prod /app/dist /app/dist

EXPOSE 5173

CMD ["pnpm", "start"]
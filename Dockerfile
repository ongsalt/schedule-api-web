FROM node:18

WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

COPY . .
RUN npm install
ENV DATABASE_URL="postgresql://postgres:Gaythai@postgres/schedule-api-v2"
ENV AUTH_SECRET="TeeTuanmuan"
RUN npm run build
CMD [ "node", ".output/server/index.mjs" ]
EXPOSE 3000
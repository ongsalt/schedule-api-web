FROM node:18

WORKDIR /usr/src/app

COPY . .
RUN npm install
ENV DATABASE_URL="postgresql://postgres:Gaythai@postgres/schedule-api-v2"
ENV AUTH_SECRET="TeeTuanmuan"
RUN npm run build
CMD [ "node", ".output/server/index.mjs" ]
EXPOSE 3000
FROM node:18

WORKDIR /usr/src/app

COPY . .
RUN npm install
ENV DATABASE_URL=file:./dev.db
ENV AUTH_SECRET="TeeTuanmuan"
RUN npm run build
# CMD [ "node", ".output/server/index.mjs" ]
CMD [ "npm", "run", "dev" ]
# RUN npm run dev
EXPOSE 3000
EXPOSE 5555
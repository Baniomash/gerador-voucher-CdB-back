FROM node:21-alpine3.17 as BUILD_IMAGE
WORKDIR /usr/src/api/

COPY . .

RUN npm install --quiet -no-optional --no-fund --loglevel=error

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start:prod" ]
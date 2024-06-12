FROM node:18-alpine AS builder

WORKDIR /usr/backend

COPY src/package*.json .

RUN npm install

COPY ./src .

FROM node:18-alpine

RUN apk --no-cache add tini

WORKDIR /usr/app/src

COPY --from=builder /usr/backend .

EXPOSE 80

CMD [ "npm", "run", "start:dev"]

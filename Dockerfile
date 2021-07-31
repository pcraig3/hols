FROM node:14-alpine
LABEL maintainer="paul@pcraig3.ca"

ARG GITHUB_SHA_ARG
ENV GITHUB_SHA=$GITHUB_SHA_ARG

WORKDIR /app
COPY . .

RUN apk --no-cache --virtual build-dependencies add \
        python \
        make \
        g++
RUN npm install --production --silent
RUN npm install -g workbox-cli
RUN apk del build-dependencies

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]

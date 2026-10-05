FROM node:lts-alpine
LABEL maintainer="paul@pcraig.ca"

ARG GITHUB_SHA_ARG
ENV GITHUB_SHA=$GITHUB_SHA_ARG

WORKDIR /app
COPY . .

RUN apk add --no-cache --virtual .build-deps \
      build-base \
      python3 \
      py3-setuptools \
  && npm ci --omit=dev \
  && apk del .build-deps

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]

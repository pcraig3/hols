FROM node:14-slim
LABEL maintainer="paul@pcraig3.ca"

ARG GITHUB_SHA_ARG
ENV GITHUB_SHA=$GITHUB_SHA_ARG

WORKDIR /app
COPY . .

RUN apt-get update || : && apt-get install -y \
        python \
        build-essential
RUN npm install --production --silent
RUN npm install -g workbox-cli
RUN apt-get remove build-essential -y

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]

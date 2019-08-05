# hols

This is an [htm](https://github.com/developit/htm) server-rendered app to be a frontend and backend for holidays.

## Getting started

### [Install `npm`](https://www.npmjs.com/get-npm)

`npm` is a javascript package manager. It downloads project dependencies and runs node applications.

You'll need node version `v10.15.0` or higher to run the app.

### [Install `docker`](https://docs.docker.com/install/)

A docker container allows a developer to package up an application and all of its parts. This means we can build an app in any language, in any stack, and then run it anywhere — whether locally or on a server.

## Build and run with npm

Guess what? There is **no build step**. Just install the dependencies and run it.

Pretty slick. 😎

```bash
# install dependencies
npm install

# run application in 'dev' mode
# (ie, the server restarts when you save a file)
npm run dev

# run application in 'prod' mode
npm start
```

The app should be running at [http://localhost:3000/](http://localhost:3000/).

On a Mac, press `Control` + `C` to quit the running application.

### Run tests with npm

```bash
# run unit tests
npm test

# run linting
npm run lint
```

#### unit tests

Since we are still using components as interface, this makes testing really easily. On the server, we render out our components as strings that we send to the browser, but when we run tests, we want to do a bit more than that. Looking for values in big strings is pretty ugly.

Instead, using [`cheerio`](https://cheerio.js.org/), we can load in a string like `"<main><p>hello</p></main>"` and then traverse it using jQuery selector syntax. So we can write assertions against stuff like `$('main > p').text()`, which is far better than string testing.

## Build and run as a Docker container

```bash
# build an image locally
docker build -t pcraig3/hols .

# run the container
docker run -it -p 3000:3000 pcraig3/hols
```

The container should be running at [http://localhost:3000/](http://localhost:3000/).

On a Mac, press `Control` + `C` to quit the running docker container.

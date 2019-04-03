# az-htm

This is a tiny [htm](https://github.com/developit/htm) server-rendered app to trial server-side components.

Components are a great way to build interface, but the client-side-only bit raises a11y and perf problems that you need lots of tooling + expertise to mitigate.

So can we write our HTML as components that get rendered on the server? The answer is yes. But can we write something we would productionize?

That's still a maybe for me. But for prototypes, this thing is great.

This an attempt to get more "production-y" parts of a service to work.

- ✅ 1 page ([express](https://expressjs.com/))
- ✅ 1 class component ([htm](https://github.com/developit/htm) + [preact](https://github.com/developit/preact) + [preact-render-to-string](https://github.com/developit/preact-render-to-string))
- ✅ inline CSS
- ✅ unit tests ([jest](https://jestjs.io/) + [cheerio](https://cheerio.js.org/))
- ✅ i18n ([node-polyglot](http://airbnb.io/polyglot.js/))
- ✅ reload on save ([nodemon](https://nodemon.io/))
- ✅ a CSS library ([emotion](https://emotion.sh/docs/introduction))
- ✅ linting (sort of, using [eslint](https://eslint.org/))
- ✅ Dockerfile

Might add to this list in future.

**Shout out to [@timarney](https://twitter.com/timarney), whose [htm-ssr-demo](https://github.com/timarney/htm-ssr-demo) was the inspiration for this.**


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

### using the app

The root url `/` will redirect to [`/index`](http://localhost:3000/index), which is rendered out by the `Page` component in [`src/pages/Page.js`](https://github.com/pcraig3/az-htm/blob/master/src/pages/Page.js). It accepts a variable, has some minimal styling, and you can switch the language to French. 

You can change between English and French by adding `?locale=en` or `?locale=fr` to any URL.

#### forms

To trial form / session stuff, I've set up a few routes.

- [`/login`](http://localhost:3000/login): to enter a string into a form
- [`/dashboard`](http://localhost:3000/dashboard): to see the saved string
- [`/logout`](http://localhost:3000/logout): to clear the session data

You can't enter an empty string, but there's no other validation.

If you visit [`/dashboard`](http://localhost:3000/dashboard) without entering a name, you will be redirected back to `/login`.

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
docker build -t cdssnc/az-htm .

# run the container
docker run -it -p 3000:3000 cdssnc/az-htm
```

The container should be running at [http://localhost:3000/](http://localhost:3000/).

On a Mac, press `Control` + `C` to quit the running docker container.

# az-htm

This is a tiny [htm](https://github.com/developit/htm) server-rendered app to trial server-side components.

Components are a great way to build interface, but the client-side only bit raises a11y and perf problems that you need lots of tooling to mitigate.

So can we write our HTML as components that get rendered on the server? The answer is yes. But can we write something we would productionize?

That's still a maybe for me.

This an attempt to get more "production-y" parts of a service to work.

- ✅ 1 page ([express](https://expressjs.com/))
- ✅ 1 class component ([htm](https://github.com/developit/htm) + [preact](https://github.com/developit/preact) + [preact-render-to-string](https://github.com/developit/preact-render-to-string))
- ✅ inline CSS
- ✅ unit tests ([jest](https://jestjs.io/) + [cheerio](https://cheerio.js.org/))
- ✅ i18n ([node-polyglot](http://airbnb.io/polyglot.js/))
- ✅ rebuilds on save ([nodemon](https://nodemon.io/))
- ✅ a CSS library ([emotion](https://emotion.sh/docs/introduction))
- ✅ linting (sort of, using [eslint](https://eslint.org/))

Might add to this list in future.

**Shout out to [@timarney](https://twitter.com/timarney), whose [htm-ssr-demo](https://github.com/timarney/htm-ssr-demo) was the inspiration for this.**


## Getting started

### [Install `npm`](https://www.npmjs.com/get-npm)

`npm` is a javascript package manager. It downloads project dependencies and runs node applications.

You'll need node version `v10.15.0` or higher to run the app.


## Build and run with npm

Guess what? There is **no build step**. Just install the dependencies and run it.

Pretty slick. 😎

```bash
# install dependencies
npm install

# run application
npm start
```

The app should be running at [http://localhost:3000/](http://localhost:3000/).

You can change the language by visiting:

- `en`: [http://localhost:3000/locale/en](http://localhost:3000/locale/en)
- `fr`: [http://localhost:3000/locale/fr](http://localhost:3000/locale/fr)

On a Mac, press `Control` + `C` to quit the running application.

(That said, the server restarts when you make changes to files, so you don't have to stop running to see updates.)

### Run tests with npm

```bash
# run unit tests
npm test

# run linting
npm run lint
```

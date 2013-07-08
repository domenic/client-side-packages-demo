# A Client-Side Packages and Grunt Demo

This is a demo application built using npm packages plus browserify, as part of my
[“Client-Side Package Management”](http://www.slideshare.net/domenicdenicola/client-side-packages)
talk for HTML5DevConf. It's been expanded to use Grunt as the build tool, illustrating some best practices there.

## How to Use

You should have a recent-ish version of Node.js installed; [go press the big “Install” button](http://nodejs.org/).
Then, inside this directory, run

```bash
$ npm install
```

which will pull down both the application dependencies (`"dependencies"` in [package.json](package.json)) and the
development dependencies (`"devDependencies"`).

It exposes the following "scripts," run with `npm run <scriptName>`, which are implemented behind the scenes using
Grunt but exposed to the outside world using the `"scripts"` field in package.json. I feel that this is the best way
to communicate the things you can do with a project to the outside world, since Grunt has no notion of "exposed" vs.
"internal" tasks.

* `npm run lint`: simply runs JSHint. Useful for putting in your pre-commit hooks or similar.
* `npm run dev`: does a one-time dev build, concurrently compiling all Stylus and CSS files in `styles/` into
  `www/bundle.css`, while using Browserify to compile the JS files in `lib/` into `www/bundle.js`, while running
  JSHint on those files in `lib/`.
* `npm run dist`: does a one-time distribution build, concurrently compiling Stylus into CSS and Browserifying JS, then
  minifying the resulting Browserify bundle with UglifyJS.
* `npm run watch`: watches all appropriate JS files and packages; if they change, concurrently runs JSHint and
  Browserify. At the same time, watches all CSS and Stylus files; if they change, runs Stylus.

Your day-to-day workflow will involve `npm run watch` most of the time; the CI server will run `npm run dist`.

Oh, and to view the page, just open `www/index.html`!

## Packages Used

The following npm packages are used, but completely client-side!

* [handlebars](https://npmjs.org/package/handlebars) for templating: see `templates.js` and `addHandlebarsHelpers.js`.
* [jquery-browserify](https://npmjs.org/package/jquery-browserify) for Ajax and some DOM: although the 2.0 release of
  jQuery [will be published](http://blog.jquery.com/2013/03/01/jquery-2-0-beta-2-released/) directly to npm, and
  [use the CommonJS module format](https://github.com/jquery/jquery/pull/1103), until then we need a hacked CommonJS
  version.
* [q](https://npmjs.org/package/q) for doing asynchronous operations using promises (in particular, assimilating
  jQuery's broken promises).
* [underscore](https://npmjs.org/package/underscore) for some basic helpers like `_.extend`, `_.has`, and `_.debounce`.
* [vague-time](https://npmjs.org/package/vague-time) for rendering times like “55 minutes ago.”

At development time, many more packages are used, mainly through Grunt plugins that wrap them.

## Still TODO

* Add tests, of course! And integrate them into the appropriate places in the Grunt pipeline.
* Separate out templates into individual files, and use [hbsfy](https://npmjs.org/package/hbsfy) to precompile them,
  instead of inlining them into `index.html`.
* The [github.js](lib/github.js) module is starting to look like it should become its own npm package, isolated from
  the rest of the app behind a concern boundary. Maybe even the template rendering could be factored out into its
  own package, with a public API that consumes GitHub API objects and outputs HTML strings. This would have the
  benefit of making Handlebars an implementation detail, so that such a package would be usable even for people who
  don't care for Handlebars as their templating engine.
* Add a simple (Node-based) server that will block on requests until the watch is done running: this would avoid the
  always-frustrating phenomenom of reloading the page only to find the watch hasn't quite run yet.
* Keep bugging @rwldrn until jQuery 2.0 finally ends up on npm.

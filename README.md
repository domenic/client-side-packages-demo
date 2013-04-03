# A Client-Side Packages Demo

This is a demo application built using npm packages plus browserify, as part of my “Client-Side Package Management”
talk for HTML5DevConf. It shows the last few commits to npm, by accessing the GitHub API over XMLHttpRequest.

## How to Use

You should have a recent-ish version of Node.js installed; [go press the big “Install” button](http://nodejs.org/). 
Then, inside this directory, run

```bash
$ npm install
```

which will pull down both the application dependencies (`"dependencies"` in [package.json](package.json)) and the
development dependencies (`"devDependencies"`).

To lint, build, and run the app, do

```bash
$ npm run dev
```

## Packages Used

The following npm packages are used, but completely client-side!

* [handlebars](https://npmjs.org/package/handlebars) for templating: see `templates.js` and `addHandlebarsHelpers.js`.
* [jquery-browserify](https://npmjs.org/package/jquery-browserify) for Ajax: although the 2.0 release of jQuery
  [will be published](http://blog.jquery.com/2013/03/01/jquery-2-0-beta-2-released/) directly to npm, and
  [use the CommonJS module format](https://github.com/jquery/jquery/pull/1103), until then we need a hacked CommonJS
  version.
* [q](https://npmjs.org/package/q) for doing asynchronous operations using promises (in particular, assimilating
  jQuery's broken promises).
* [underscore](https://npmjs.org/package/underscore) for some basic helpers like `_.extend` and `_.has`.
* [vague-time](https://npmjs.org/package/vague-time) for rendering times like “55 minutes ago.”

At development time, this app also uses [stylus](https://npmjs.org/package/stylus), [jshint](https://npmjs.org/package/jshint), [opener](https://npmjs.org/package/opener), and of course [browserify](https://npmjs.org/package/browserify).

## Not-So-Best Practices

Since this is meant to be a demo of client-side package management using npm and browserify, there are a few things I
did not do “nicely”—that is, that I would do differently when writing a real app. In that case:

* I would separate out my templates into individual files, and use [hbsfy](https://npmjs.org/package/hbsfy) to
  precompile them, instead of inlining them into `index.html`.
* I would use [Grunt](http://gruntjs.com/) as a build system, instead of just hacking things together in
  `package.json`'s `"scripts"` section. This would give me almost automatic
  [file watching capabilities](https://npmjs.org/package/grunt-contrib-watch), for one.
* The [github.js](lib/github.js) module is starting to look like it should become its own npm package, isolated from
  the rest of the app behind a concern boundary. Maybe even the template rendering could be factored out into its
  own package, with a public API that consumes GitHub API objects and outputs HTML strings. This would have the
  benefit of making Handlebars an implementation detail, so that such a package would be usable even for people who
  don't care for Handlebars as their templating engine.

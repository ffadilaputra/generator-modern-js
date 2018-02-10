# <%= repoName %> [![NPM version][npm-image]][npm-url] [![Build Status][build-status]][build-url] [![codecov][codecov]][codecov-url] [![dependencies Status][dependencies-status]][dependencies-url] [![devDependencies Status][devDependencies-status]][devDependencies-url]<%if (gitterActivated) { %> [![Gitter Support][gitter-image]][gitter-url]<% } %>

> <%= moduleDescription %>

## Features

## Installation

```
npm install <% moduleName %>
```

## Usage

## API

## Contribution

1. git clone https://github.com/<%= githubUsername %>/<%= repoName %>.
1. Run `npm run watch`.
1. Build out `README.md` to be clear about capabilities.
1. Build [walking skeleton].
    1. Add code in `./src/<file>.js` as if library works.
    1. Add integration test in `./test/<file>.test.js`, see it failing.
    1. Add JsDoc (e.g. in vim with [:JsDoc]) tags.
    1. Write unit tests for modules and its functions.
1. Implement functions.
1. When stopping watch (`<CTRL><C>`), check test coverage = 100%?.
1. Run `npm run docs`.
1. Run `npm run lint`.
1. Commit files to git.

## License

MIT © [<%= name %>](<%= website %>)

[npm-image]: https://badge.fury.io/js/<%= repoName %>.svg
[npm-url]: https://npmjs.org/package/<%= repoName %>
[build-status]: https://travis-ci.org/<%= githubUsername %>/<%= repoName %>.svg?branch=master
[build-url]: https://travis-ci.org/<%= githubUsername %>/<%= repoName %>
[codecov]: https://codecov.io/gh/<%= githubUsername %>/<%= repoName %>/badge.svg?branch=master
[codecov-url]: https://codecov.io/gh/<%= githubUsername %>/<%= repoName %>?branch=master
[devDependencies-status]: https://david-dm.org/<%= githubUsername %>/<%= repoName %>/dev-status.svg
[dependencies-status]: https://david-dm.org/<%= githubUsername %>/<%= repoName %>/status.svg
[dependencies-url]: https://david-dm.org/<%= githubUsername %>/<%= repoName %>
[devDependencies-url]: https://david-dm.org/<%= githubUsername %>/<%= repoName %>?type=dev
<%if (gitterActivated) { %>[gitter-image]: https://badges.gitter.im/<%= githubUsername %>/<%= repoName %>.png
[gitter-url]: https://gitter.im/<%= githubUsername %>/<%= repoName %><% } %>
[walking skeleton]: https://codeclimate.com/blog/kickstart-your-next-project-with-a-walking-skeleton
[:JsDoc]: https://github.com/heavenshell/vim-jsdoc

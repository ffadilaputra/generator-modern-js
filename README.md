TODO: rename to ModernJS
TODO: npx codecov & travis
TODO: add david-dm-dev
TODO: add screenshots
TODO: add screenshots to WIKI
TODO: add develop section in README
TODO: change goo.gl links
TODO: do not create local yo-rc.json
TODO: add downloads https://github.com/IndigoUnited/node-cross-spawn
TODO: add https://blog.fossasia.org/getting-code-coverage-in-a-nodejs-project-using-travis-and-codecov/
TODO: upload to npm
# generator-modern-js [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![DevDependencies Status][daviddm-dev-image]][daviddm-dev-url] [![Build Status][build-status]][build-url] [![Gitter Support][gitter-image]][gitter-url]

Scaffold out a working, well-documented, modern Node.js module, made for team collaboration:

* Babel
* ESLint
* ES6 / ES2015
* Flow
* Mocha
* Chai
* Sinon
* Istanbul
* Travis
* Tern support for (Neo)Vim
* Basic README.md
* documentation.js
* CI with Travis
* GitHub updates sent to Slack
* Travis test results sent to Slack
* Codecov report sent to Slack
* Codecov badge
* daviddm badge
* Gitter support channel

## Installation

First, install [Yeoman](http://yeoman.io) and generator-babel-node-starter-kit using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-modern-js
```

Then generate your new project:

```bash
yo generator-modern-js
```

TODO: remove recommendation
## Workflow recommendation

1. Build out `README.md` to be clear about capabilities
1. Scaffold `./src/index.js` as if library works
1. Develop integration test in `./test/index.js`
1. Start flow with `npm run flow`
1. Run `npm test` and see tests failing
1. Build [walking skeleton]
1. Document signatures using `:JsDoc`in (Neo)Vim
1. Write unit tests for modules and its functions
1. Build documentation with `npm run docs`
TODO: how to upload documentation
1. Upload package to GitHub
1. Implement one function after the other

## License

MIT © [georgschlenkhoff](https://github.com/georgschlenkhoff)

[npm-image]: https://badge.fury.io/js/generator-babel-node-starter-kit.svg
[npm-url]: https://npmjs.org/package/generator-babel-node-starter-kit
[daviddm-image]: https://david-dm.org/georgschlenkhoff/generator-babel-node-starter-kit.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/georgschlenkhoff/generator-babel-node-starter-kit
[daviddm-dev-image]: https://david-dm.org/georgschlenkhoff/generator-babel-node-starter-kit/dev-status.svg
[daviddm-dev-url]: https://david-dm.org/georgschlenkhoff/generator-babel-node-starter-kit?type=dev
[build-status]: https://travis-ci.org/georgschlenkhoff/generator-modern-js.svg?branch=master
[build-url]: https://travis-ci.org/georgschlenkhoff/generator-modern-js
[gitter-image]: https://badges.gitter.im/generator-modern-js.png
[gitter-url]: https://gitter.im/generator-modern-js/support
[walking skeleton]: https://codeclimate.com/blog/kickstart-your-next-project-with-a-walking-skeleton

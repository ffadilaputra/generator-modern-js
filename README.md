# generator-babel-node-starter-kit [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]

Scaffold out a Node.js module using:

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

## Installation

First, install [Yeoman](http://yeoman.io) and generator-babel-node-starter-kit using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-babel-node-starter-kit
```

Then generate your new project:

```bash
yo babel-node-starter-kit
```
## Usage
### Create new module

Babel Node Satrter Kit makes it easy to create a new module with test files. Just run the generator with the name paramter:

```
yo create module --name myModule
```

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
1. Upload package to GitHub
1. Implement one function after the other

## License

MIT © [georgschlenkhoff](https://github.com/georgschlenkhoff)

[npm-image]: https://badge.fury.io/js/generator-babel-node-starter-kit.svg
[npm-url]: https://npmjs.org/package/generator-babel-node-starter-kit
[daviddm-image]: https://david-dm.org/georgschlenkhoff/generator-babel-node-starter-kit.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/georgschlenkhoff/generator-babel-node-starter-kit
[walking skeleton]: https://codeclimate.com/blog/kickstart-your-next-project-with-a-walking-skeleton

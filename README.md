![Logo]

[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![DevDependencies Status][daviddm-dev-image]][daviddm-dev-url] [![Build Status][build-status]][build-url] [![Gitter Support][gitter-image]][gitter-url]

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
* Auto-deployement on EC2 with Docker
* GitHub updates sent to Slack
* Travis test results sent to Slack
* Codecov report sent to Slack
* Codecov badge
* daviddm badge
* Gitter support channel

## Demo

![Demo][demo-image]

## Installation

First, install [Yeoman](http://yeoman.io) and generator-modern-js using [npm](https://www.npmjs.com/).

```bash
npm install -g yo
npm install -g generator-modern-js
```

## Dependencies
### Required dependencies
* [Git](https://github.com/georgschlenkhoff/generator-modern-js/wiki/1.-Installing-dependencies#git)

### Optional dependencies

If you want to use Slack with Travis and/or Codecov, or create the GitHub repo automatically, you need to install these dependencies:

* [The Travis Client](https://github.com/georgschlenkhoff/generator-modern-js/wiki/1.-Installing-dependencies#travis)
* [hub](https://github.com/georgschlenkhoff/generator-modern-js/wiki/1.-Installing-dependencies#hub)
* [GitHub integration for Slack](https://github.com/georgschlenkhoff/generator-modern-js/wiki/2.-Slack-token-for-GitHub)
* [Travis integration for Slack](https://github.com/georgschlenkhoff/generator-modern-js/wiki/4.-Slack-Webhook-for-Travis)

## Usage

Then generate your new project:

```bash
yo generator-modern-js
```

## Help

For help visit the [Wiki] or go to the [Gitter support channel][gitter-url]

## License

MIT © [georgschlenkhoff](https://github.com/georgschlenkhoff)

[Logo]: https://raw.githubusercontent.com/georgschlenkhoff/generator-modern-js/master/logo.png
[Wiki]: https://github.com/georgschlenkhoff/generator-modern-js/wiki
[demo-image]: demo.gif
[npm-image]: https://badge.fury.io/js/generator-modern-js.svg
[npm-url]: https://npmjs.org/package/generator-modern-js
[daviddm-image]: https://david-dm.org/georgschlenkhoff/generator-modern-js.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/georgschlenkhoff/generator-modern-js
[daviddm-dev-image]: https://david-dm.org/georgschlenkhoff/generator-modern-js/dev-status.svg
[daviddm-dev-url]: https://david-dm.org/georgschlenkhoff/generator-modern-js?type=dev
[build-status]: https://travis-ci.org/georgschlenkhoff/generator-modern-js.svg?branch=master
[build-url]: https://travis-ci.org/georgschlenkhoff/generator-modern-js
[gitter-image]: https://badges.gitter.im/generator-modern-js.png
[gitter-url]: https://gitter.im/generator-modern-js/support

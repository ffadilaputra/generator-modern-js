const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  install() {
    this.npmInstall([
      'chai',
      'documentation',
      'eslint',
      'eslint-plugin-flowtype',
      'mocha',
      'nyc',
      'sinon'
    ], { 'save-dev': true })
  }
}

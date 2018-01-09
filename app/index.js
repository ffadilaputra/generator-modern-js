const Generator = require('yeoman-generator')
const superb = require('superb')
const _s = require('underscore.string')
const humanizedUrl = require('humanize-url')

module.exports = class extends Generator {

  init() {
    return this.prompt([{
      name: 'moduleName',
      message: 'Your project name',
      default: this.appname // Default to current folder name
    }, {
      name: 'moduleDescription',
      message: 'What is your module description?',
      default: `My ${superb()} module`

    }, {
      name: 'githubUsername',
      message: 'What is your  GitHub username?',
      store: true,
      validate: x => x.length > 0 ? true : 'You have to provide a username'
    }, {
      name: 'repoName',
      message: 'What is your repository name?',
      default: _s.slugify(this.appname)
    }, {
      name: 'name',
      // TODO: correct prompt
      message: 'What is your module description?',
      default: `My ${superb()} module`

    }, {
      name: 'email',
      // TODO: correct prompt
      message: 'What is your module description?',
      default: `My ${superb()} module`
    }, {
      name: 'website',
      // TODO: correct prompt
      message: 'What is your module description?',
      default: `My ${superb()} module`
    }]).then((answers) => {
      const tpl = {
        moduleName: answers.moduleName,
        moduleDescription: answers.moduleDescription,
        githubUsername: answers.githubUsername,
        repoName: answers.repoName,
        name: answers.name,
        email: answers.email,
        humanizedWebsite: humanizedUrl(answers.website)
        
      }
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        tpl
      )
    })
  }

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

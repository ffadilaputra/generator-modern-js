const Generator = require('yeoman-generator')
const superb = require('superb')
const _s = require('underscore.string')
const humanizedUrl = require('humanize-url')
const normalizeUrl = require('normalize-url')
const utils = require('./utils')
const githubService = utils.githubService
var tpl

module.exports = class extends Generator {
  constructor(a, b) {
    super(a, b)

    /*
    this.option('travis-slack', {
      alias: 'travisSlack',
      type: 'Boolean',
      desc: 'Post Travis CI status to Slack?'
    })
    */

  }

  prompting() {
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
      name: 'travis-slack',
      message: 'Do you want to post Travis CI status messages to Slack?',
      type: 'confirm',
      default: false
    }, {
      name: 'travisSlackSecret',
      type: 'password',
      store: true,
      message: 'Provide your integration token, found at https://goo.gl/3ZwS3o',
      validate: x => x.length > 0 ? true : 'You have to provide a secret',
      when: x => x['travis-slack']
    }, {
      name: 'travis-codecov',
      type: 'confirm',
      default: false,
      message: 'Do you want to post Codecov status messages to Slack?'
    }, {
      name: 'codecovToken',
      type: 'secret',
      message: x => 'What is your Codecov token found at '
        + `http://codecov.io/account/gh/${x.githubUsername}/access`,
      validate: x => x.length > 0 ? true : 'You have to provide a token',
      when: x => x['travis-codecov']
    }, {
      name: 'slackWebhook',
      type: 'input',
      store: true,
      message: 'What is your Slack Webhook, found at https://goo.gl/UeiyQi',
      when: x => x['travis-codecov']
    }, {
      name: 'repoName',
      message: 'What is your repository name?',
      default: _s.slugify(this.appname)
    }, {
      name: 'createRepo',
      message: 'Do you want me to create the GitHub repository?',
      type: 'confirm',
      default: true
    }, {
      name: 'getRepo',
      message: 'What is the GitHub repository url?',
      type: 'input',
      default: x => `https://github.com/${x.githubUsername}/${x.repoName}`,
      when: x => !x.createRepo
    }, {
      name: 'website',
      message: 'What is the URL of your website?',
      store: true, validate: x => x.length > 0 ? true : 'You have to provide a website URL', filter: x => normalizeUrl(x) }]).then((answers) => {
      tpl = {
        createRepo: answers.createRepo,
        moduleName: answers.moduleName,
        moduleDescription: answers.moduleDescription,
        githubUsername: answers.githubUsername,
        repoName: answers.repoName,
        name: this.user.git.name(),
        email: this.user.git.email(),
        humanizedWebsite: humanizedUrl(answers.website),
        website: answers.website,
        travisSlackSecret: answers.travisSlackSecret,
        travisCodecov: answers['travis-codecov'],
        slackWebhook: answers.slackWebhook,
        codecovToken: answers.codecovToken
      }
    })
  }

  createGitHubRepo() {
    // Create repo if not existing
    if (tpl.createRepo) {
      var done = this.async()
      githubService.init().then(() => { githubService.create(
        tpl.repoName, tpl.moduleDescription, tpl.website)
      }).then(() => { done() })
        .catch((err) => { done(err) })
    }
  }

  encryptCodecovToken() {
    // Encrypt token with Codecov API
    if (tpl.travisCodecov) {
      utils.encryptCodecovValue(tpl.slackWebhook, { repo: tpl.repoName,
        token: tpl.codecovToken, user: tpl.githubUsername })
        .then((encryptedWebhook) => {
          tpl.encryptedWebhook = encryptedWebhook
        })
    }
  }

  writing() {
    const mv = (from, to) => {
      this.fs.move(this.destinationPath(from), this.destinationPath(to))
    }

    var path = [`${this.templatePath()}/**`]
    !tpl.travisCodecov ? path.push(`!${this.templatePath()}/_codecov.yml`) : ''
    this.fs.copyTpl(path, this.destinationPath(), tpl)

    mv('_package.json', './package.json')
    mv('index.test.js', './test/index.test.js')
    mv('eslintrc.json', './.eslintrc.json')
    mv('babelrc', './.babelrc')
    mv('_flowconfig', './src/.flowconfig')
    mv('_README.md', './README.md')
    mv('_gitignore', './.gitignore')
    mv('index.js', './src/index.js')
    mv('npmrc', './.npmrc')
    mv('_travis.yml', './.travis.yml')
  }
    /*
    }).then((encryptedCodecovToken) => {
 encryptCodecovValue(this.options['slackWebhook'], {
          user: this.options['githubUsername'],
          repo: this.options['moduleName'],
          token: token
        })



    })
    */
  //}

  install() {
    this.npmInstall([
      'babel-cli',
      'babel-eslint',
      'babel-preset-env',
      'chai',
      'codecov',
      'documentation',
      'eslint',
      'eslint-plugin-flowtype',
      'flow-bin',
      'mocha',
      'nyc',
      'sinon'
    ], { 'save-dev': true })
  }

  git() {
    if (!this.options['skip-install']) {
      this.spawnCommandSync('git', ['init'])
    }
  }

  end() {
    if (this.options['travis-slack']) {
      const gitCommit = (msg) => {
        this.spawnCommandSync('git', ['add', '.'])
        this.spawnCommandSync('git', ['commit', '-m', msg])
      }

      gitCommit('initial commit')
      this.spawnCommandSync('hub', ['create'])

      this.prompt([{
        name: 'slackActivated',
        type: 'confirm',
        default: false,
        message: 'Have you activated the repo at https://goo.gl/m3CYpR',
      }]).then(answers => { 
        if (answers.slackActivated) {
          const gitPush = () => {
            this.spawnCommandSync('git', ['push', 'origin', 'master'])
          }

          gitPush()

          this.spawnCommandSync('travis', ['enable', '-r', `${tpl.githubUsername}/${tpl.repoName}`])
          this.spawnCommandSync('travis', ['encrypt', tpl.travisSlackSecret, '--add', 'notifications.slack'], { cwd: this.destinationRoot() })

          /* Add codecov support
           * curl -X POST -d 'value=https://hooks.slack.com/services/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' https://codecov.io/api/encode/gh/georgschlenkhoff/testapp8?access_token=0fcab84b6b0f481198a64eae941da8f4
           */

          gitCommit('add Slack notifications')
          gitPush()
        }
      })
    }
  }
}

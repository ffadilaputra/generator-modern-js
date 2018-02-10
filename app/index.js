const Generator = require('yeoman-generator')
const superb = require('superb')
const _s = require('underscore.string')
const humanizedUrl = require('humanize-url')
const normalizeUrl = require('normalize-url')
const utils = require('./utils')
const githubService = utils.githubService
var codecovService = utils.codecovService
var tpl

module.exports = class extends Generator {
  constructor(a, b) {
    super(a, b)

    /*
    this.option('travis-slack', {
      alias: 'travisSlack',
      type: 'Boolean',
      desc: 'Post Travis CI status to Slack?',
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
      name: 'slackUsername',
      message: 'What is your Slack username?',
      type: 'text',
      default: x => x.githubUsername,
      validate: x => x.length > 0 ? true : 'You have to provide a username',
      when: x => x['travis-slack']
    }, {
      name: 'travisSlackSecret',
      type: 'password',
      store: true,
      message: x => `Provide your integration token, found at https://${x.slackUsername}.slack.com/apps/A0F81FP4N-travis-ci?page=1`,
      validate: x => x.length > 0 ? true : 'You have to provide a secret',
      when: x => x['travis-slack']
    }, {
      name: 'travis-codecov',
      type: 'confirm',
      default: false,
      message: 'Do you want to post Codecov status messages to Slack?'
    }, {
      name: 'codecovToken',
      type: 'password',
      message: x => 'What is your Codecov token found at '
        + `https://codecov.io/account/gh/${x.githubUsername}/access`,
      store: true,
      validate: x => x.length > 0 ? true : 'You have to provide a token',
      when: x => x['travis-codecov']
    }, {
      name: 'slackWebhook',
      type: 'password',
      store: true,
      message: x => `What is your Slack Webhook, found at https://${x.slackUsername}.slack.com/services/B8SHSGN5B`,
      when: x => x['travis-codecov']
    }, {
      name: 'createRepo',
      message: 'Do you want me to create the GitHub repository?',
      type: 'confirm',
      default: true
    }, {
      name: 'repoName',
      message: 'What is your repository name?',
      default: _s.slugify(this.appname),
      when: x => x.createRepo,
      validate: function(repo, ans) {
        var done = this.async()
        githubService.init().then(() => { githubService.create(
          repo, ans.moduleDescription, ans.githubUsername).then(() => {
          done(null, true); return
        })})
      }
    }, {
      name: 'getRepo',
      message: 'What is the GitHub repository url?',
      type: 'input',
      default: x => `https://github.com/${x.githubUsername}/${x.repoName}`,
      when: x => !x.createRepo
    }, {
      name: 'slackActivated',
      type: 'input',
      default: 'y/N',
      message: x => `Have you activated the repo at https://${x.slackUsername}.slack.com/apps/A0F7YS2SX-github`,
      validate: x => x === ('y' ||'yes'||'Yes'||'Y'||'ja')
        ? true : 'You must activate the repo',
      when: x => x['travis-slack'] ||x['travis-codecov']
    }, {
      name: 'dockerEnabled',
      message: 'Do you want to create a Dockerfile for Node?',
      type: 'confirm',
      default: false
    }, {
      name: 'autoDeploy',
      message: 'Do you want to auto-deploy to Amazon ECR?',
      type: 'confirm',
      default: false,
      when: x => x.dockerEnabled
    }, {
      name: 'awsAccessKeyId',
      message: 'Please provide the AWS Access Key ID of an IAM user with \'AmazonEC2ContainerRegistryFullAcces\', found at https://console.aws.amazon.com/iam/home#/users',
      store: true,
      type: 'password',
      validate: x => x.length > 0 ? true : 'You have to provide an access key id',
      when: x => x.autoDeploy
    }, {
      name: 'awsSecretAccessKey',
      message: 'Please provide the AWS Secret Access Key',
      store: true,
      type: 'password',
      validate: x => x.length > 0 ? true : 'You have to provide a secret access key',
      when: x => x.autoDeploy
    }, {
      name: 'gitterActivated',
      type: 'confirm',
      default: false,
      message: 'Do you want to use Gitter support channel',
    }, {
      name: 'gitterRoomEnabled',
      type: 'confirm',
      default: false,
      message: 'Have you enabled the Gitter room at https://gitter.im/home#createcommunity',
      when: x => x['gitterActivated']
    }, {
      name: 'website',
      message: 'What is the URL of your website?',
      store: true, validate: x => x.length > 0 ? true : 'You have to provide a website URL', filter: x => normalizeUrl(x) }]).then((answers) => {
      tpl = {
        awsAccessKeyId: answers.awsAccessKeyId,
        awsSecretAccessKey: answers.awsSecretAccessKey,
        createRepo: answers.createRepo,
        dockerEnabled: answers.dockerEnabled,
        moduleName: answers.moduleName,
        moduleDescription: answers.moduleDescription,
        githubUsername: answers.githubUsername,
        gitterActivated: answers.gitterActivated,
        repoName: answers.repoName,
        name: this.user.git.name(),
        email: this.user.git.email(),
        humanizedWebsite: humanizedUrl(answers.website),
        website: answers.website,
        travisSlack: answers['travis-slack'],
        slackUsername: answers.slackUsername,
        travisSlackSecret: answers.travisSlackSecret,
        travisCodecov: answers['travis-codecov'],
        slackWebhook: answers.slackWebhook,
        codecovToken: answers.codecovToken
      }
    })
  }

  enableCodecov() {
    // Activate the GitHub repository on Codecov
    if (tpl.travisCodecov) {
      const config = { user: tpl.githubUsername, token: tpl.codecovToken,
        repo: tpl.repoName }
      var done = this.async()

      this.log(`Activating Codecov repository ${tpl.githubUsername}/`
        + `${tpl.repoName}`)
      codecovService.setConfig(config)
      codecovService.activateCodecovRepo().then(() => {
        return codecovService.encryptCodecovValue(tpl.slackWebhook)
      }).then((encryptedWebhook) => {
        tpl.encryptedWebhook = encryptedWebhook
        done(null, true); return
      }).catch((err) => { this.log(err); done(err); return })
    }
  }

  enableDocker() {
    if (tpl.dockerEnabled) {
      this.log(`Creating AWS ECR repo ${tpl.githubUsername}/${tpl.repoName}.`)
      const { spawnSync } = require('child_process')
      process.env['AWS_ACCESS_KEY_ID'] = tpl.awsAccessKeyId
      process.env['AWS_SECRET_ACCESS_KEY'] = tpl.awsSecretAccessKey
      try {
        const result = spawnSync('/usr/local/bin/aws', ['ecr', 'create-repository',
          '--repository-name', `${tpl.githubUsername}/${tpl.repoName}`])
        tpl.awsRepositoryUri = JSON.parse(result.stdout).repository.repositoryUri
      } catch(e) { this.log('Could not create AWS ECR repo: ' + e) }
    }
  }

  writing() {
    const mv = (from, to) => {
      this.fs.move(this.destinationPath(from), this.destinationPath(to))
    }
    const mkdir = require('mkdirp')

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
    mv('_Dockerfile', './Dockerfile')
    mv('_travis.yml', './.travis.yml')
    tpl.travisCodecov ? mv('_codecov.yml', './.codecov.yml') : ''
    mkdir(`${this.destinationPath('lib')}`)
  }

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
      'npx',
      'nyc',
      'sinon'
    ], { 'save-dev': true })
  }

  end() {
    if (tpl.travisSlack || tpl.dockerEnabled) {
      const done = this.async()
      this.spawnCommandSync('travis', ['enable', '--no-explode',
        '--no-interactive', '-r', `${tpl.githubUsername}/${tpl.repoName}`])
      if (tpl.dockerEnabled) {
        this.spawnCommandSync('travis', ['env', 'set', 'AWS_ACCESS_KEY_ID',
          `${tpl.awsAccessKeyId}`, '--private'])
        this.spawnCommandSync('travis', ['env', 'set',
          'AWS_SECRET_ACCESS_KEY', `${tpl.awsSecretAccessKey}`, '--private'])
      }
      this.log(`Pushing ${tpl.githubUsername}/${tpl.repoName} to GitHub`)
      githubService.commitPush('bootstrap with ModernJS').then(() => {
        if (tpl.travisSlack) {
          this.log('Please run this command if Slack messages are not working')
          this.log(`travis encrypt "${tpl.slackUsername}:`
            + `${tpl.travisSlackSecret}" --add notifications.slack -r`
            + `${tpl.githubUsername}/${tpl.repoName}`)
          this.spawnCommandSync('travis', ['encrypt', `"${tpl.slackUsername}:`
            + `${tpl.travisSlackSecret}"`, '--add', 'notifications.slack',
          '-r', `${tpl.githubUsername}/${tpl.repoName}`],
          { cwd: this.destinationRoot() })
          return githubService.commitPush('add Slack notifications').then(done).catch(done)
        }

      }).catch(done)
    }
  }
}

'use strict'

class CodecovService {
  constructor() {
    this.httpsService = new HttpsService()
    this.host = 'codecov.io'
  }

  /**
   * Sets the config for CodecovService
   *
   * @name setConfig
   * @function
   * @param {Object}config - The config object
   * @param {string}config.user - GitHub username
   * @param {string}config.repo - GitHub appname
   * @param {string}config.token - Codecov access token
   */
  setConfig(config) {
    this.user = config.user
    this.repo = config.repo
    this.token = config.token
  }

  /**
   * Encrypts a value with Codecov's API. See
   * {@link https://gitter.im/codecov/support/archives/2016/04/27 API hints}
   *
   * @name encryptCodecovValue
   * @function
   * @param value
   * @returns {Promise}
   */
  encryptCodecovValue(value) {
    return new Promise((resolve, reject) => {
      const path = `/api/encode/gh/${this.user}/${this.repo}?`
        + `access_token=${this.token}`
      value = `value=${value}`
      this.httpsService.post(this.host, path, value).then((resp) => {
        if (resp.error) return reject(`Codecov error: ${resp.error.reason}`)
        resolve(resp.encoded)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  /**
   * Activates a GitHub repository on Codecov
   *
   * @name activateCodecovRepo
   * @function
   * @returns {Promise}
   */
  activateCodecovRepo() {
    return new Promise((resolve, reject) => {
      const path = `/gh/${this.user}/${this.repo}?access_token=${this.token}`
      this.httpsService.get(this.host, path).then((resp) => {
        if (resp.error) return reject(resp.error.reason)
        resolve()
      }).catch((err) => {
        reject(err)
      })
    })
  }
}

class HttpsService {
  constructor() {
    this.httpsService = require('https')
  }

  post(host, path, payload) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: host,
        path: path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(payload)
        }
      }

      const req = this.httpsService.request(options, (res) => {
        var response = ''
        res.setEncoding('utf8')
        res.on('data', (chunk) => {
          response += chunk
        })
        res.on('end', () => {
          resolve(JSON.parse(response))
        })
      })

      req.on('error', (e) => {
        reject(e.message)
      })

      req.write(payload)
      req.end()
    })
  }

  get(host, path) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: host,
        path: path,
        method: 'GET'
      }

      const req = this.httpsService.request(options, (res) => {
        var response = ''
        res.setEncoding('utf8')
        res.on('data', (chunk) => {
          response += chunk
        })
        res.on('end', () => {
          resolve(response)
        })
      })

      req.on('error', (e) => {
        reject(e.message)
      })

      req.end()
    })
  }
}

// TODO: replace git spawn commands with https://github.com/nodegit/nodegit/
// TODO: replace spawnSycn with https://github.com/IndigoUnited/node-cross-spawn
class GithubService {
  constructor() {
    this.spawn = require('child_process').spawnSync
  }

  _exec(cmd) {
    return new Promise((resolve, reject) => {
      if (cmd.status !== 0) {
        const error = (cmd.error) 
          ? `${cmd.args[0]} process failed: ${cmd.error.code}` 
          : `${cmd.args[0]} process failed ${cmd.stderr}`
        return reject(new Error(error))
      }
      resolve()
    })
  }

  /**
   * Execute 'git add --all && git commit -m 'initial commit' && \
   * git commit push origin master' in pwd
   *
   * @name commitPush
   * @function
   * @returns {Promise}
   */
  commitPush(msg) {
    return this._exec(this.spawn('git', ['add', '--all'])).then(() => {
      return this._exec(this.spawn('git', ['commit', '-m',`'${msg}'`]))
        .then(() => { return this._exec(this.spawn('git', ['push', 'origin',
          'master']))})})
  }

  /**
   * Execute hub create -d 'description' -h 'http://somelink.com' in pwd
   *
   * @name create
   * @function
   * @param {string}repoName - The name of the GitHub repository
   * @param {string}description - The description for the GitHub repository
   * @param {string}homepage - The homepage of the author
   * @returns {Promise}
   */
  create(repoName, description, userName) { return this._exec(
    this.spawn('hub', ['create', '-d', description, '-h', `https://${userName}.github.io/${repoName}`, repoName])
  )}

  /**
   *
   * Execute git init in pwd
   *
   * @name init
   * @function
   * @returns {Promise}
   */
  init() { return this._exec(this.spawn('git', ['init'])) }

  /**
   * Executes 'git push origin master' in pwd
   *
   * @name push
   * @function
   * @returns {Promise}
   */

}


module.exports.httpsService = new HttpsService()
module.exports.codecovService = new CodecovService()
module.exports.githubService = new GithubService()

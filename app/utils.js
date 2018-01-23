'use strict'

/**
 * Encrypts a value with Codecov's API. See
 * {@link https://gitter.im/codecov/support/archives/2016/04/27 API hints}
 *
 * @name encryptCodecovValue
 * @function
 * @param value
 * @param {Object}config - The config object
 * @param {string}config.user - GitHub username
 * @param {string}config.repo - GitHub appname
 * @param {string}config.token - Codecov access token
 * @returns {Promise}
 */
const encryptCodecovValue = (value, config) => {
  return new Promise((resolve, reject) => {
    const host = 'codecov.io'
    const path = `/api/encode/gh/${config.user}/${config.repo}?`
      + `access_token=${config.token}`
    value = `value=${value}`
    const httpsService = new HttpsService()
    httpsService.post(host, path, value).then((resp) => {
      if (resp.error) return reject(resp.error.reason)
      resolve(resp.encoded)
    }).catch((err) => {
      reject(err)
    })
  })
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
}

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
   * Execute git add --all && git commit -m 'initial commit' in pwd
   *
   * @name addCommit
   * @function
   * @returns {Promise}
   */
  addCommit() {
    this._exec(this.spawn('git', ['add', '--all'])).then(() => {
      this._exec(this.spawn('git', ['commit', '-m', '\'initial commit\'']))
    })
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
  create(repoName, description, homepage) { return this._exec(
    this.spawn('hub', ['create', '-d', description, '-h', homepage, repoName])
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

}


module.exports.httpsService = new HttpsService()
module.exports.encryptCodecovValue = encryptCodecovValue
module.exports.githubService = new GithubService()

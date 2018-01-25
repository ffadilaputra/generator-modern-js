'use strict'
var chai = require('chai')
const assert = chai.assert
const chaiAsPromised = require('chai-as-promised')
const utils = require('../app/utils')
const sinon = require('sinon')

chai.use(chaiAsPromised)

describe('utils', () => {
  var codecovService
  before(() => {
    codecovService = utils.codecovService
    sinon.stub(codecovService, 'encryptCodecovValue').resolves()
    sinon.stub(codecovService, 'activateCodecovRepo').resolves()
  })

  describe('codecovService', () => {
    describe('encryptedWebhook()', () => {
      it('encrypts a value with Codecov API', () => {
        it('returns a promise', () => {
          return assert.eventually.typeOf(
            codecovService.encryptCodecovValue('some'), 'string')
        })
      })
    })

    describe('activateCodecovRepo()', () => {
      it('activates a Codecov repo', () => {
        return assert.eventually.typeOf(
          codecovService.activateCodecovRepo(), 'undefined')
      })
    })
  })

  describe('httpsService', () => {
    const httpsService = utils.httpsService
    const httpStub = sinon.stub(httpsService, 'post')
    const path = '/api/action'
    const payload = 'payload'

    describe('post()', () => {
      it('returns a promise', () => {
        httpStub.resolves({})
        const host = 'codecov.io'
        return assert.eventually.typeOf(
          httpsService.post(host, path, payload), 'object')
      })

      it('throws an error if failed', () => {
        const message = 'getaddrinfo ENOTFOUND wrong'
        httpStub.rejects(new Error(message))
        const wrongHost = 'wrong'
        return assert.isRejected(httpsService.post(
          wrongHost, path, payload),
        /getaddrinfo ENOTFOUND wrong/)
      })
    })
  })

  describe('github', () => {
    var gitInitAddCommit
    const githubService = utils.githubService
    sinon.stub(githubService, 'init').resolves()
    sinon.stub(githubService, 'commitPush').resolves()
    sinon.stub(githubService, 'create').resolves()

    before(() => {
      gitInitAddCommit = githubService.init().then(() => {
        githubService.commitPush()
      })
    })

    describe('create()', () => {
      it('creates a GitHub repository', () => {
        const repoName = 'some'
        const description = 'description'
        const homepage = 'http://homepage'
        return assert.isFulfilled(
          githubService.create(repoName, description, homepage)
        )
      })
    })

    describe('init()', () => {
      it('initiates a new repository', () => {
        assert.isFulfilled(gitInitAddCommit)
      })
    })

    describe('addCommit()', () => {
      it('adds all files and commits', () => {
        assert.isFulfilled(gitInitAddCommit)
      })
    })
  })
})

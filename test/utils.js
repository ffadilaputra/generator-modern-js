'use strict'
var chai = require('chai')
const assert = chai.assert
const chaiAsPromised = require('chai-as-promised')
const utils = require('../app/utils')
const httpsService = utils.httpsService
const githubService = utils.githubService
const sinon = require('sinon')

chai.use(chaiAsPromised)
describe('utils', () => {
  describe('encryptCodecovValue()', () => {
    sinon.stub(utils, 'encryptCodecovValue').resolves('12345')
    const config = { token: 'token', user: 'someuser', repo: 'somerepo' }
    const value = 'somevalue'
    it('returns a promise', () => {
      return assert.eventually.typeOf(
        utils.encryptCodecovValue(value, config), 'string')
    })
  })

  describe('httpsService.post()', () => {
    const httpStub = sinon.stub(httpsService, 'post')
    const path = '/api/action'
    const payload = 'payload'

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

  describe('utils.github', () => {
    var gitInitAddCommit
    sinon.stub(githubService, 'init').resolves()
    sinon.stub(githubService, 'addCommit').resolves()
    sinon.stub(githubService, 'create').resolves()

    before(() => {
      gitInitAddCommit = githubService.init().then(() => {
        githubService.addCommit()
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

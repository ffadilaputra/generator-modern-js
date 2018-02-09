const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const path = require('path')

beforeEach(() => {
  return helpers.run(path.join(__dirname, '../app'))
    .withPrompts({
      website: 'http://example.com',
      codecovToken: '1234',
      repoName: 'someName',
      'travis-codecov': true
    })
})

describe('babel-node-starter-kit', () => {

  it('creates a Node project', () => {
    assert.file('./package.json')
  })

  it('creates a test file', () => {
    assert.file('./test/index.test.js')
  })

  it('creates a .eslintrc.json file', () => {
    assert.file('./.eslintrc.json')
  })

  it('creates a .babelrc file', () => {
    assert.file('./.babelrc')
  })

  it('creates a .flowconfig file', () => {
    assert.file('./src/.flowconfig')
  })

  it('creates a README.md file', () => {
    assert.file('./README.md')
  })

  it('creates an index.js file', () => {
    assert.file('./src/index.js')
  })

  it('creates a .gitignore file', () => {
    assert.file('./.gitignore')
  })

  it('creates a .npmrc file', () => {
    assert.file('./.npmrc')
  })

  it('creates a .travis.yml file', () => {
    assert.file('./.travis.yml')
  })

  it('creates a Dockerfile', () => {
    assert.file('./Dockerfile')
  })

  it('creates a ./lib directory', () => {
    assert.file('./lib')
  })

})

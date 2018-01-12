const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const path = require('path')

beforeEach(function () {
  return helpers.run(path.join(__dirname, '../app'))
    .withOptions({ foo: 'bar' })    // Mock options passed in
    .withArguments(['name-x'])      // Mock the arguments
    .withPrompts({ website: 'http://example.com' })    // Mock prompts passed in
})

describe('babel-node-starter-kit', function () {

  it('creates a Node project', function () {
    assert.file('./package.json')
  })

  it('creates a test file', function () {
    assert.file('./test/index.test.js')
  })

  it('creates a .eslintrc.json file', function () {
    assert.file('./.eslintrc.json')
  })

  it('creates a .babelrc file', function () {
    assert.file('./.babelrc')
  })

  it('creates a .flowconfig file', function () {
    assert.file('./src/.flowconfig')
  })

  it('creates a README.md file', function () {
    assert.file('./README.md')
  })

  it('creates an index.js file', function () {
    assert.file('./src/index.js')
  })

  it('creates a .gitignore file', function () {
    assert.file('./.gitignore')
  })

  it('creates a .npmrc file', function () {
    assert.file('./.npmrc')
  })

})

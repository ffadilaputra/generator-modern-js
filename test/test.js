const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const path = require('path')

beforeEach(function () {
  return helpers.run(path.join(__dirname, '../app'))
    .withOptions({ foo: 'bar' })    // Mock options passed in
    .withArguments(['name-x'])      // Mock the arguments
    .withPrompts({ coffee: false }) // Mock the prompt answers
})

describe('babel-node-starter-kit', function () {
  it('creates a Node project', function () {
    assert.file('.package.json')
  })
})

'use strict'
const <%= moduleName %> = require('../src/index')
const expect = require('chai').expect

describe('<%= moduleName %>\'s ', () => {

  describe('method', () => {
    it('fulfills a function', () => {
      expect(<%= moduleName %>).to.respondTo('myFn')
    })
  })

  describe('async method', () => {
    it('fulfills an async function', async () => {
      expect(null).to.be.a('null')
    })
  })

})

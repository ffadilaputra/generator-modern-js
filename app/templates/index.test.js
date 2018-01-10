'use strict'
const <%= moduleName %> = require('../src/index')
const expect = require('chai').expect

describe(<%= moduleName %>, () => {

  describe('an method', () => {
    it('fulfills a function', () => {
      expect(null).to.be.a('null')
    })
  })

  describe('an async method', () => {
    it('fulfills an async function', async () => {
      expect(null).to.be.a('null')
    })
  })

})

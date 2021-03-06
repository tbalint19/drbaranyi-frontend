const { startMockServer, shutdownMockServer, mockServer, response } = require('../mock-server')
const { timeout } = require('../helper/timeout')
const { loadHomePage } = require('./first-journey')

/*
  User starts to filter on the homepage
  The number of cards changes accordingly
*/
module.exports = {
  '@disabled': true,

  before() {
    mockServer
      .onGet('/api/packages')
      .replyOnce(response({
        status: 200,
        body: [ { name: "Samsung 10" } ],
        delay: timeout(5)
      }))
    startMockServer()
  },

  beforeEach(browser) {
    browser
      .init()
    loadHomePage(browser)
  },

  'filterOffers': browser => {
    browser.expect.elements('.offer-card').count.to.equal(1)

    browser
      .pause(timeout(5))
      .click('#filter')
      .pause(timeout(0.5))
      .keys('a')

    browser.expect.elements('.offer-card').count.to.equal(0)

    browser
      .pause(timeout(3))

    browser
      .keys(browser.Keys.BACK_SPACE)

    browser.expect.elements('.offer-card').count.to.equal(1)
  },

  afterEach(browser) {
    browser
      .pause(timeout(10))
      .end()
  },

  after() {
    shutdownMockServer()
  }
}

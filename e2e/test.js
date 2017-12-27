/* global browser */

const expect = require('chai').expect;
const conf = require('../src/config.json');

describe('Test proper rendering', () => {
  it('checks title content when timer is not working', () => {
    browser.url('/');
    expect(browser.getTitle()).to.equal(conf.textContent);
  });
});

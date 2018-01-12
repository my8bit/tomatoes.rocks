/* global browser */

const expect = require('chai').expect;
const pageobj = require('./pageobj');
const {
  SELECTOR: {$ACTION_BUTTON, $TIME}, TEXT: {TITLE, TIME, ACTION_BUTTON_START}
} = pageobj;

describe('Test initial rendering', () => {
  it('checks initial title, time and button state', () => {
    browser.url('/');
    expect(browser.getTitle()).to.equal(TITLE);
    expect(browser.getText($TIME)).to.equal(TIME);
    expect(browser.getText($ACTION_BUTTON)).to.equal(ACTION_BUTTON_START);
  });
});

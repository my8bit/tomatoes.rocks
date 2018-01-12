/* global browser */

const expect = require('chai').expect;

// BUG! add new property; add value; sign in - all old properties cleared
const pageobj = require('./pageobj');
const {
  SELECTOR: {$ACTION_BUTTON, $TIME, $SETTINS_MENU},
  TEXT: {TITLE, TIME, ACTION_BUTTON_START, ACTION_BUTTON_STOP}
} = pageobj;

describe('Test start and stop functionality works', () => {
  it('checks timer triggered and stopped properly', () => {
    browser.url('/');
    expect(browser.getTitle()).to.equal(TITLE);
    browser.click($ACTION_BUTTON);
    expect(browser.getText($TIME)).to.equal('00:04');
    browser.waitUntil(() => {
      if (browser.getText($TIME) === '00:03') {
        browser.click($ACTION_BUTTON);
        expect(browser.getText($TIME)).to.equal(TIME);
        return true;
      }
    }, 3000, 'expected text to be different after 3s');
  });
  it('checks that timer stopeed when user is on settings page', () => {
    browser.url('/');
    browser.click($ACTION_BUTTON);
    browser.click($SETTINS_MENU);
    expect(browser.getTitle()).to.equal('00:04');
    browser.waitUntil(() => {
      if (browser.getTitle() === '00:02') {
        expect(browser.getTitle()).to.equal('00:02');
        return true;
      }
    }, 7000, 'expected text to be different after 7s');
  });
  it('checks that timer triggered when user on settings page', () => {
    browser.url('/');
    expect(browser.getTitle()).to.equal(TITLE);
    browser.click($ACTION_BUTTON);
    expect(browser.getText($TIME)).to.equal('00:04');
    expect(browser.getText($ACTION_BUTTON)).to.equal(ACTION_BUTTON_STOP);
    browser.waitUntil(() => {
      if (browser.getText($ACTION_BUTTON) === ACTION_BUTTON_START) {
        expect(browser.getText($TIME)).to.equal('00:02');
        expect(browser.getText($ACTION_BUTTON)).to.equal(ACTION_BUTTON_START);
        return true;
      }
    }, 7000, 'expected text to be different after 7s');
  });
});

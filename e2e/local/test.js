/* global browser */

const expect = require('chai').expect;
const conf = require('../src/config.json');

const START = 'button.button';
const TIME = '#countdown';

const SETTINS_MENU = 'a[href="/settings"]';
const COLOR_TOMATO = 'input[value="#ff6347"]';

describe('Test initial rendering', () => {
  it('checks initial title, time and button state', () => {
    browser.url('/');
    expect(browser.getTitle()).to.equal(conf.textContent);
    expect(browser.getText(TIME)).to.equal('00:05');
    expect(browser.getText(START)).to.equal('START');
  });
});

describe('Test start and stop functionality works', () => {
  it('checks timer triggered and stopped properly', () => {
    browser.url('/');
    expect(browser.getTitle()).to.equal(conf.textContent);
    browser.click(START);
    expect(browser.getText(TIME)).to.equal('00:04');
    browser.waitUntil(() => {
      if (browser.getText(TIME) === '00:03') {
          browser.click(START);
          expect(browser.getText(TIME)).to.equal('00:05');
          return true;
      }
    }, 3000, 'expected text to be different after 3s');
  });

  it('checks that timer triggered when user on settings page', () => {
    browser.url('/');
    expect(browser.getTitle()).to.equal(conf.textContent);
    browser.click(START);
    expect(browser.getText(TIME)).to.equal('00:04');
    browser.waitUntil(() => {
      if (browser.getText(START) === 'START') {
        expect(browser.getText(TIME)).to.equal('00:02');
        expect(browser.getText(START)).to.equal('START');
        return true;
      }
    }, 7000, 'expected text to be different after 7s');
  });


  it('checks that timer stopeed when user is on settings page', () => {
    browser.url('/');
    browser.click(START);
    browser.click(SETTINS_MENU);
    expect(browser.getTitle()).to.equal('00:04');
    browser.waitUntil(() => {
      if (browser.getTitle() === '00:02') {
        expect(browser.getTitle()).to.equal('00:02');
        return true;
      }
    }, 7000, 'expected text to be different after 7s');
   });
});

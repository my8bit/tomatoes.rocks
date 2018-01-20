/* global browser */

const expect = require('chai').expect;
const conf = require('../src/config.json');
const pageobj = require('./pageobj');
const {
  SELECTOR: {$ACTION_BUTTON, $TIME, $SETTINS_MENU},
  TEXT: {TITLE, TIME, ACTION_BUTTON_START, ACTION_BUTTON_STOP}
} = pageobj;

describe('Test srttings', () => {
  xit('checks title content when timer is not working', () => {
    browser.url('/');
    browser.click($SETTINS_MENU);
    // TODO Check at first simple scenario
    // check settings for anonymus uer
    // Login chck ettings fro logged in user is changed
    // Logout check that settings for logged out user is returned back
    // Then expand scenarious to
    // Change user settings
    // Reload check if it's there
    // Login
    // Check if they are different from anonymus
    // edit
    // Reload - chech if it stored
    // Logout
    // check that recent edited settings ar in place
    // edit
    // Reload
    // Check if edited settings was stored
    // login
    // check authienticated user settings that are the same after last editing
  });
});

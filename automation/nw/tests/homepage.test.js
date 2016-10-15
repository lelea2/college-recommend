module.exports = {
    'Checking button on home page': (browser) => {
        browser.resizeWindow(1100, 600); //make sure mobile size
        browser
            .init()
            .waitForElementVisible('body', 5000);

    browser.expect.element('.row .item').to.be.present;
    browser.expect.element('.filter-collection').to.be.present;
  }

};

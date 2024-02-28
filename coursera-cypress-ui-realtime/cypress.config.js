const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    excludeSpecPattern: ["**/1-*/**", "**/2-*/**"],
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

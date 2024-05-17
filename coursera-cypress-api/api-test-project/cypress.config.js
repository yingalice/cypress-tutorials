module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportFilename: "[name]-[datetime].xml",
      quiet: true
    }
  },
};
const { defineConfig } = require("cypress");
const _ = require('lodash')
const fs = require('fs')

module.exports = defineConfig({
  e2e: {
    video: true,
    reporter: 'cypress-mochawesome-reporter',  // for HTML reports
    reporterOptions: {
      reportFilename: "[status]_[datetime]-[name]-report",
      videoOnFailOnly: true,
      overwrite: false,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on)
      on('after:spec', (spec, results) => {
        if(results.video) {
          const failures = _.some(results.tests, (test) => {
            return test.state == 'failed'
          })
          if (!failures) {
            fs.unlinkSync(results.video)  // Delete video if all tests pass
          }
        }
      })
    },
  },
});

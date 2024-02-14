import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    retries: { "runMode": 0, "openMode": 0 },
    video: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

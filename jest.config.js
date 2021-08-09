module.exports = {
  preset: 'jest-puppeteer',
  testTimeout: 30000,
  reporters: [
    "default",
    ["jest-html-reporters", {
      "publicPath": "./html-report",
      "filename": "Aviatortestreport.html",
      "expand": true
    }]
  ]
}
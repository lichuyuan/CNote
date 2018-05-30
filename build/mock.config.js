const fs = require('fs')
const path = require('path')

const mockBaseUrl = 'http://localhost:3000'
const realBaseUrl = 'http://note-server.hunger-valley.com'

exports.isDev = function(isDev = true) {
  let f = `
    module.exports = {
      baseUrl: '${isDev ? mockBaseUrl : realBaseUrl}'
    }
  `
  fs.writeFileSync(path.join(__dirname, '../src/utils/config-baseUrl.js'), f)
}

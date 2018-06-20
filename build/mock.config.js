const fs = require('fs')
const path = require('path')

const mockBaseUrl = 'http://localhost:5000/api/v1'
const realBaseUrl = 'http://111.231.93.141:5000/api/v1'

exports.isDev = function(isDev = true) {
  let f = `
    module.exports = {
      baseUrl: '${isDev ? mockBaseUrl : realBaseUrl}'
    }
  `
  fs.writeFileSync(path.join(__dirname, '../src/helpers/config-baseUrl.js'), f)
}

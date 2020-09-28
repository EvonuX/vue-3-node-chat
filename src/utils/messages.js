const { randomBytes } = require('crypto')

const generateMessage = (username, text) => {
  return {
    id: randomBytes(6).toString('hex'),
    username,
    text,
    createdAt: new Date()
  }
}

module.exports = { generateMessage }

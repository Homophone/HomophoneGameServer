const http = require('http')
const wordSet = require('../db/models').word_sets

/* eslint-disable no-console */

const getPage = (pageNum, cb) => {
  http.get(`http://www.homophone.com/search.json?page=${pageNum}`, (res) => {
    const { statusCode } = res
    const contentType = res.headers['content-type']

    let error
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
        `Status Code: ${statusCode}`)
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n' +
        `Expected application/json but received ${contentType}`)
    }
    if (error) {
      console.error(error.message)
      // consume response data to free up memory
      res.resume()
      return
    }

    res.setEncoding('utf8')
    let rawData = ''
    res.on('data', (chunk) => { rawData += chunk })
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData)
        console.log(parsedData)
        cb(parsedData)
      } catch (e) {
        console.error(e.message)
      }
    })
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`)
  })
}

const formatResponse = (array) => (
  array.map((wordSet) => ({
    words: wordSet.words.map((word) => ({
      word: word.text
    }))
  }))
)

for (let i = 1; i < 85; i++) {
  getPage(i, (data) => {
    const formatedData = formatResponse(data)

    wordSet.bulkCreate(formatedData)
    .then((created) => console.log(created))
    .catch((err) => console.log(err))
  })
}

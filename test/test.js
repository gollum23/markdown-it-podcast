const path = require('path')
const generate = require('markdown-it-testgen')

describe('markdown-it-podcast', () => {
  const md = require('markdown-it')({
    html: true,
    linkify: true,
    typography: true
  }).use(require('../'))

  generate(path.join(__dirname, 'fixtures/podcast.txt'), md)
})
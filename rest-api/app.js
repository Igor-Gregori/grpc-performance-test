const express = require('express')

const app = express()
const port = 3001

const githubInfo = require('../common/github-info-igor.json')
const randomPersonInfo = require('../common/random-person-info.json')
const nasaMeteoriteData = require('../common/nasa-meteorite-data.json')

app.get('/low-payload', (req, res) => {
  res.status(200).json(githubInfo)
})

app.get('/medium-payload', (req, res) => {
  res.status(200).json(randomPersonInfo)
})

app.get('/high-payload', (req, res) => {
  res.status(200).json(nasaMeteoriteData)
})

app.listen(port, () => {
  console.log(`🚀 REST api listening on port ${port}`)
})

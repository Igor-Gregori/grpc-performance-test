const express = require('express')

const app = express()
const port = 3001

const githubInfo = require('../common/github-info-igor.json')
const randomPersonInfo = require('../common/random-person-info.json')
const nasaMeteoriteData = require('../common/nasa-meteorite-data.json')

app.get('/read/low-payload', (req, res) => {
  res.status(200).json(githubInfo)
})

app.get('/read/medium-payload', (req, res) => {
  res.status(200).json(randomPersonInfo)
})

app.get('/read/high-payload', (req, res) => {
  res.status(200).json(nasaMeteoriteData)
})

app.post('/write/low-payload', (req, res) => {
  res.status(200).end()
})

app.post('/write/medium-payload', (req, res) => {
  res.status(200).end()
})

app.post('/write/high-payload', (req, res) => {
  res.status(200).end()
})

app.listen(port, () => {
  console.log(`🚀 REST api listening on port ${port}`)
})

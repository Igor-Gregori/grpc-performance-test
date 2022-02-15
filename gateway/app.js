const express = require('express')
const path = require('path')
const axios = require('axios').default

const app = express()
const port = 3000

const apiExpressUrl = 'http://localhost:3001'
const apiGrpcUrl = '0.0.0.0:3002'

const PROTO_PATH = path.resolve(__dirname, 'proto', 'perf-test.proto')
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

const perfTestProto = grpc.loadPackageDefinition(packageDefinition).perfTest
const clientGRPC = new perfTestProto.PerformanceTest(apiGrpcUrl, grpc.credentials.createInsecure())

const githubInfo = require('../common/github-info-igor.json')
const randomPersonInfo = require('../common/random-person-info.json')
const nasaMeteoriteData = require('../common/nasa-meteorite-data.json')

app.get('/healthcheck', (req, res) => {
  res.status(200).send(`I'm alive!`)
})

app.get('/express/read/low-payload', async (req, res) => {
  const result = await axios.get(`${apiExpressUrl}/read/low-payload`)
  res.status(200).send(result.data)
})

app.get('/express/read/medium-payload', async (req, res) => {
  const result = await axios.get(`${apiExpressUrl}/read/medium-payload`)
  res.status(200).send(result.data)
})

app.get('/express/read/high-payload', async (req, res) => {
  const result = await axios.get(`${apiExpressUrl}/read/high-payload`)
  res.status(200).send(result.data)
})

app.get('/express/write/low-payload', async (req, res) => {
  await axios.post(`${apiExpressUrl}/write/low-payload`, { githubInfo })
  res.status(200).end()
})

app.get('/express/write/medium-payload', async (req, res) => {
  await axios.post(`${apiExpressUrl}/write/medium-payload`, { randomPersonInfo })
  res.status(200).end()
})

app.get('/express/write/high-payload', async (req, res) => {
  await axios.post(`${apiExpressUrl}/write/high-payload`, { nasaMeteoriteData })
  res.status(200).end()
})

app.get('/grpc/read/low-payload', async (req, res) => {
  const result = await callAsync(clientGRPC, 'readLowPayload', null)
  res.status(200).send(result)
})

app.get('/grpc/read/medium-payload', async (req, res) => {
  const result = await callAsync(clientGRPC, 'readMediumPayload', null)
  res.status(200).send(result)
})

app.get('/grpc/read/high-payload', async (req, res) => {
  const result = await callAsync(clientGRPC, 'readHighPayload', null)
  res.status(200).send(result)
})

app.get('/grpc/write/low-payload', async (req, res) => {
  await callAsync(clientGRPC, 'writeLowPayload', githubInfo)
  res.status(200).end()
})

app.get('/grpc/write/medium-payload', async (req, res) => {
  await callAsync(clientGRPC, 'writeMediumPayload', { randomPersonInfo })
  res.status(200).end()
})

app.get('/grpc/write/high-payload', async (req, res) => {
  await callAsync(clientGRPC, 'writeHighPayload', { nasaMeteoriteData })
  res.status(200).end()
})

function callAsync(client, method, parameters) {
  return new Promise((resolve, reject) => {
    client[method](parameters, (err, res) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

app.listen(port, () => {
  console.log(`🚀 Gateway api listening on port ${port}`)
})

const express = require('express')
const path = require('path')
const axios = require('axios').default

const app = express()
const port = 3000

const apiRestUrl = 'http://localhost:3001'
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

app.get('/healthcheck', (req, res) => {
  res.status(200).send(`I'm alive!`)
})

app.get('/rest/low-payload', async (req, res) => {
  const result = await axios.get(`${apiRestUrl}/low-payload`)
  res.status(200).send(result.data)
})

app.get('/rest/medium-payload', async (req, res) => {
  const result = await axios.get(`${apiRestUrl}/medium-payload`)
  res.status(200).send(result.data)
})

app.get('/rest/high-payload', async (req, res) => {
  const result = await axios.get(`${apiRestUrl}/high-payload`)
  res.status(200).send(result.data)
})

app.get('/grpc/low-payload', async (req, res) => {
  const result = await callAsync(clientGRPC, 'lowPayload', null)
  res.status(200).send(result)
})

app.get('/grpc/medium-payload', async (req, res) => {
  const result = await callAsync(clientGRPC, 'mediumPayload', null)
  res.status(200).send(result)
})

app.get('/grpc/high-payload', async (req, res) => {
  const result = await callAsync(clientGRPC, 'highPayload', null)
  res.status(200).send(result)
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

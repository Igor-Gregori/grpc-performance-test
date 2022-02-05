const express = require('express')
const path = require('path')
const util = require('util');
const axios = require('axios').default

const app = express()
const port = 3000

const apiRest = 'http://localhost:3001'
const apiGrpc = '0.0.0.0:3002'


const PROTO_PATH = path.resolve(__dirname, 'proto', 'mult.proto')
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const multProto = grpc.loadPackageDefinition(packageDefinition).mult;


app.get('/healthcheck', (req, res) => {
  res.send('Hello World!')
})

app.get('/rest/:number', async (req, res) => {
  const { number } = req.params
  const result = await axios.get(`${apiRest}/mult/${number}`)
  res.status(200).send(result.data)
})

app.get('/grpc/:number', async (req, res) => {
  const { number } = req.params
  const client = new multProto.Multiplier(apiGrpc, grpc.credentials.createInsecure())
  const result = await callAsync(client, 'genMultTable', { number })
  res.status(200).send(result)
})

function callAsync (client, method, parameters) {
  return new Promise((resolve, reject) => {
    client[method](parameters, (err, response) => {
      if (err) reject(err)
      resolve(response)
    })
  })
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
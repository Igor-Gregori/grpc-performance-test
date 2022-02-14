const path = require('path')
const PROTO_PATH = path.resolve(__dirname, 'proto', 'perf-test.proto')

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const multProto = grpc.loadPackageDefinition(packageDefinition).perfTest;

const githubInfo = require('../common/github-info-igor.json')
const randomPersonInfo = require('../common/random-person-info.json')
const nasaMeteoriteData = require('../common/nasa-meteorite-data.json')

function readLowPayload(call, callback) {
  callback(null, githubInfo)
}

function readMediumPayload(call, callback) {
  callback(null, { randomPersonInfo })
}

function readHighPayload(call, callback) {
  callback(null, { nasaMeteoriteData })
}

function writeLowPayload(call, callback) {
  callback(null, null)
}

function writeMediumPayload(call, callback) {
  callback(null, null)
}

function writeHighPayload(call, callback) {
  callback(null, null)
}

function app() {
  const port = 3002;
  var server = new grpc.Server();
  server.addService(multProto.PerformanceTest.service, {
    readLowPayload: readLowPayload,
    readMediumPayload: readMediumPayload,
    readHighPayload: readHighPayload,
    writeLowPayload: writeLowPayload,
    writeMediumPayload: writeMediumPayload,
    writeHighPayload: writeHighPayload
  });
  server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`🚀 gRPC api listening on port ${port}`)
    server.start();
  });
}

app();
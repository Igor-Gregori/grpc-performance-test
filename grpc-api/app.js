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

function lowPayload(call, callback) {
  callback(null, githubInfo)
}

function mediumPayload(call, callback) {
  callback(null, { randomPersonInfo })
}

function highPayload(call, callback) {
  callback(null, { nasaMeteoriteData })
}

function app() {
  const port = 3002;
  var server = new grpc.Server();
  server.addService(multProto.PerformanceTest.service, {
    lowPayload: lowPayload,
    mediumPayload: mediumPayload,
    highPayload: highPayload
  });
  server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`🚀 gRPC api listening on port ${port}`)
    server.start();
  });
}

app();
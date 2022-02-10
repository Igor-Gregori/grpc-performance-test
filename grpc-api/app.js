const path = require('path')
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

function genMultTable(call, callback) {
  const { number } = call.request
  callback(null, {
    multByOne: 1 * number,
    multByTwo: 2 * number,
    multByThree: 3 * number,
    multByFour: 4 * number,
    multByFive: 5 * number,
    multBySix: 6 * number,
    multBySeven: 7 * number,
    multByEight: 8 * number,
    multByNine: 9 * number,
    multByTen: 10 * number,
  })
}

function app() {
  const port = 3002
  var server = new grpc.Server();
  server.addService(multProto.Multiplier.service, { genMultTable: genMultTable });
  server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`🚀 GRPC api listening on port ${port}`)
    server.start();
  });
}

app();
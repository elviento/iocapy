var awsIot = require('/usr/local/lib/node_modules/aws-iot-device-sdk');

//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourAWSRegion>'
// with a unique client identifier and the AWS region you created your
// certificate in (e.g. 'us-east-1').  NOTE: client identifiers must be
// unique within your AWS account; if a client attempts to connect with a
// client identifier which is already in use, the existing connection will
// be terminated.
//
var device = awsIot.device({
   keyPath: "/Users/wfabella/projects/Gitter/iocapy/iocapy-private/privateKey.pem",
  certPath: "/Users/wfabella/projects/Gitter/iocapy/iocapy-private/cert.pem",
    caPath: "/Users/wfabella/projects/Gitter/iocapy/iocapy-private/rootCA.pem",
  clientId: "awsiot-iocapy",
    region: "us-east-1" 
});

// var device = awsIot.device({
//   "host": "A3MC7BINU6AKAE.iot.us-east-1.amazonaws.com",
//   "port": 8883,
//   "clientId": "awsiot-iocapy",
//   "thingName": "awsiot-iocapy",
//   "caCert": "/Users/wfabella/projects/Gitter/iocapy/iocapy-private/rootCA.pem",
//   "clientCert": "/Users/wfabella/Downloads/dd2eae91f2-certificate.pem.crt",
//   "privateKey": "/Users/wfabella/Downloads/dd2eae91f2-private.pem.key",
//   "region": "us-east-1"
// });

//
// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.
//
device
  .on('connect', function() {
    console.log('connect');
    device.subscribe('topic_1');
    device.publish('topic/topic_2', JSON.stringify({ test_data: 1}));
    });

device
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
  });
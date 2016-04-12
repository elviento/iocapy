var awsIot = require('/usr/local/lib/node_modules/aws-iot-device-sdk');

//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourAWSRegion>'
// with a unique client identifier and the AWS region you created your
// certificate in (e.g. 'us-east-1').  NOTE: client identifiers must be
// unique within your AWS account; if a client attempts to connect with a
// client identifier which is already in use, the existing connection will
// be terminated.
//
var dir = process.env.HOME + '/iot-keys';

var device = awsIot.device({
   keyPath: dir + '/thing-privkey.pem',
  certPath: dir + '/thing-cert.pem',
    caPath: dir + '/rootCA.pem',
  clientId: "thing1",
    region: "us-east-1" 
});

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
var awsIot = require('/usr/local/lib/node_modules/aws-iot-device-sdk');

//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourAWSRegion>'
// with a unique client identifier and the AWS region you created your
// certificate in (e.g. 'us-east-1').  NOTE: client identifiers must be
// unique within your AWS account; if a client attempts to connect with a
// client identifier which is already in use, the existing connection will
// be terminated.
//
var thingShadows = awsIot.thingShadow({
   keyPath: "/Users/wfabella/projects/Gitter/iocapy/iocapy-private/privateKey.pem",
  certPath: "/Users/wfabella/projects/Gitter/iocapy/iocapy-private/cert.pem",
    caPath: "/Users/wfabella/projects/Gitter/iocapy/iocapy-private/rootCA.pem",
  clientId: "awsiot-iocapy",
    region: "us-east-1" 
});

// var thingShadows = awsIot.thingShadow({
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
// Client token value returned from thingShadows.update() operation
//
var clientTokenUpdate;

//
// Simulated device values
//
var rval = 187;
var gval = 199;
var bval = 299;

thingShadows.on('connect', function() {
//
// After connecting to the AWS IoT platform, register interest in the
// Thing Shadow named 'RGBLedLamp'.
//
    thingShadows.register( 'awsiot-iocapy' );
//
// 5 seconds after registering, update the Thing Shadow named 
// 'RGBLedLamp' with the latest device state and save the clientToken
// so that we can correlate it with status or timeout events.
//
// Note that the delay is not required for subsequent updates; only
// the first update after a Thing Shadow registration using default
// parameters requires a delay.  See API documentation for the update
// method for more details.
//
    setTimeout( function() {
//
// Thing shadow state
//
       var rgbLedLampState = {"state":{"desired":{"red":rval,"green":gval,"blue":bval}}};

       clientTokenUpdate = thingShadows.update('awsiot-iocapy', rgbLedLampState  );
//
// The update method returns a clientToken; if non-null, this value will
// be sent in a 'status' event when the operation completes, allowing you
// to know whether or not the update was successful.  If the update method
// returns null, it's because another operation is currently in progress and
// you'll need to wait until it completes (or times out) before updating the 
// shadow.
//
       if (clientTokenUpdate === null)
       {
          console.log('update shadow failed, operation still in progress');
       }
       }, 5000 );
    });

thingShadows.on('status', 
    function(thingName, stat, clientToken, stateObject) {
       console.log('received '+stat+' on '+thingName+': '+
                   JSON.stringify(stateObject));
//
// These events report the status of update(), get(), and delete() 
// calls.  The clientToken value associated with the event will have
// the same value which was returned in an earlier call to get(),
// update(), or delete().  Use status events to keep track of the
// status of shadow operations.
//
    });

thingShadows.on('delta', 
    function(thingName, stateObject) {
       console.log('received delta on '+thingName+': '+
                   JSON.stringify(stateObject));
    });

thingShadows.on('timeout',
    function(thingName, clientToken) {
       console.log('received timeout on '+thingName+
                   ' with token: '+ clientToken);
//
// In the event that a shadow operation times out, you'll receive
// one of these events.  The clientToken value associated with the
// event will have the same value which was returned in an earlier
// call to get(), update(), or delete().
//
    });
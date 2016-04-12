var AWS = require("/usr/local/lib/node_modules/aws-sdk");
var iot = require("./iocapy-things");

// aws iot endpoint
AWS.config.update({
    region: "us-east-1",
    endpoint: "https://iot.us-east-1.amazonaws.com"
});

console.log('Go Things Go!');

console.log('1. Creating Thing and Atributes');
iot.createThing("thing1", "dexterindustries", "raspberrypi", "gopigo2");

console.log('2. Creating Secrets');
iot.createSecrets();

console.log('Fin. Setup complete, IoT device configured for AWS cloud!');


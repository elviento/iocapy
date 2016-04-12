var AWS = require("/usr/local/lib/node_modules/aws-sdk");
var iot = require("./iocapy-things");

// aws iot endpoint
AWS.config.update({
    region: "us-east-1",
    endpoint: "https://iot.us-east-1.amazonaws.com"
});

iot.createThing("thing1", "dexterindustries", "raspberrypi", "gopigo2");

iot.createSecrets();


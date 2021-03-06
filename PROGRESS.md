# Progress Log 
Tracker for AWS IoT Project

# Log 2016-04-10
* Decided to shift from aws-cli to aws-sdk (nodejs) to configure things
 1. SDK ref: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Iot.html
 2. Keep code base more generic and automate thing creation, including IoT iam role, key and cert, and rule policy

# Log 2016-04-09
* Time to connect GoPiGo2, Subscribe device
 1. GoPiGo2 
  - Install Nodejs on Raspberry Pi, ref: http://weworkweplay.com/play/raspberry-pi-nodejs
  - AWS IoT Nodejs, ref: http://docs.aws.amazon.com/iot/latest/developerguide/iot-device-sdk-node.html
 2. pip install aws-cli
 3. npm install -g aws-sdk aws-iot-device-sdk
 4. sanity check, get pubsub working!

# Log 2016-04-08

* Blank Canvas, need to get IoT sending Data to AWS.  Build a proto-type (w/o-device)
 1. Created Iot Thing (proto) configured IAM and created DDB/Lambda Rules
 2. Configured MQTT.fx to Publish to Iot Topic triggering Rule (DDB table item, Lambda function)

# Log 2016-03-18

* Built GoPiGo2 
 - Ref: http://www.dexterindustries.com/gopigo2-tutorials-documentation

* Explore GoPiGo2 
 - Development Options : How to get sensor data into JSON format or batch writes to DDB
 - Code Base : Javascript (more community support i've seen when integrating cloud services)

* Story 1: As a maker enthusiast, I want to track all metrics of my Iot device so that I can display stats on my Iot fan page
 1. Explore potential sensor data to consider metric (look at some examples, learn code base)
 2. Create DDB Table "GoPiGo2" with 10 R/W of provisioned throughput (determine unique partition and sort key)
 3. Develop rudimentary UI to display updated settings (txt,csv,json format, later UI will read from DDB Table)
 4. Deploy code and run on GoPiGo2 device, stand-up web server (later this is going to Elasticsearch or D3JS)

* SWAG <Estimate>
 - X weeks to complete considering the few hours a week I can devote to this project

* Other Details
 - Follow this project on Gitter (https://gitter.im/elviento/iocapy)
 - Google+ (https://plus.google.com/+WesleyFabella)
 - Github (https://github.com/elviento/iocapy) 
 - LinkedIn (http://www.linkedin.com/in/wesleyfabella)

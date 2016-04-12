var AWS = require("/usr/local/lib/node_modules/aws-sdk");
var fs = require('fs');
var curl = require('/usr/local/lib/node_modules/curlrequest');

// aws iot endpoint
AWS.config.update({
    region: "us-east-1",
    endpoint: "https://iot.us-east-1.amazonaws.com"
});

var iot = new AWS.Iot();

// create iot thing
exports.createThing = function(name, man, type, device){

	// retrieve arguments as array
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    }

    // first argument is the error object
    // shift() removes the first item from the
    // array and returns it
    name = args.shift();

    // if args still holds items, these are
    // your optional items which you could
    // retrieve one by one like this:
    if (args.length > 0) mfg = args.shift(); else mfg = null;
    if (args.length > 0) type = args.shift(); else type = null;
    if (args.length > 0) device = args.shift(); else device = null;

    // continue as usual: check for errors
    //if (err) return callback(err);

    // for tutorial purposes, log the optional parameters
    console.log('mfg:', mfg);
    console.log('type:', type);
    console.log('device:', device);


	var params = {
	  thingName: name, /* required */
	  attributePayload: {
	    attributes: {
	      manufacturer: mfg,
	      type: type,
	      device: device
	    }
	  }
	};	

	iot.createThing(params, function(err, data) {
	  if (err) console.log(err, err.stack); // an error occurred
	  else     console.log(data);           // successful response
	});

}

// create keypair, certificate, and download rootCA
exports.createSecrets = function(){
	var params = {
  		setAsActive: true
	};

	iot.createKeysAndCertificate(params, function(err, data) {
	  if (err) console.log(err, err.stack); // an error occurred
	  else     //console.log(data);           // successful response
	  	//console.log("Writing CertArn, Keypairs, and Client Cert to files");

	  	var certArn = data.certificateArn; 

	  	var certPem = data.certificatePem;

	  	var pubkey = data.keyPair.PublicKey;

	  	var privkey = data.keyPair.PrivateKey;

	  	//console.log(certArn + "\n" + certPem + "\n" + pubkey + "\n" + privkey);

	  // create directory to store thing keys
	  var dir = process.env.HOME + '/iot-keys';
	  if (!fs.existsSync(dir)){
	    fs.mkdirSync(dir, 0766, function(err){
	       if(err){ 
	         console.log(err);
	         response.send("ERROR! Can't make the directory! \n");    // echo the result back
	       }
	     });  
	  }

	  // write keypairs and certificate to iot-keys folder
		fs.writeFile(dir+"/certArn.txt", certArn, function(err) {
		if(err) {
		    return console.log(err);
		}});

	  fs.writeFile(dir+"/thing-cert.pem", certPem, function(err) {
	  if(err) {
	      return console.log(err);
	  }});

	  fs.writeFile(dir+"/thing-pubkey.pem", pubkey, function(err) {
	  if(err) {
	      return console.log(err);
	  }});

	  fs.writeFile(dir+"/thing-privkey.pem", privkey, function(err) {
	  if(err) {
	      return console.log(err);
	  }});

	  console.log("The keypair, certification, and rootCA were saved in " + dir + " used to connect IoT to AWS");

	  // get rootCA certificate and store in dir
	  var options = { 
	    url: 'https://www.symantec.com/content/en/us/enterprise/verisign/roots/VeriSign-Class%203-Public-Primary-Certification-Authority-G5.pem', 
	    include: false
	  };

	  curl.request(options, function (err, parts) {
	    parts = parts.split('\r\n\r\n');
	    var data = parts.pop(), head = parts.pop();
	    //console.log(data);

	    // write to dir
	    fs.writeFile(dir+"/rootCA.pem", data, function(err) {
	      if(err) {
	          return console.log(err);
	    }});

	  });

	  // list contents of dir
	  // fs.readdir(dir, function(err, items) {
	  //   console.log(items);
	 
	  //   // for (var i=0; i<items.length; i++) {
	  //   //     console.log(items[i]);
	  //   // }
	  // });

});
}

/*eslint no-console: 0*/
"use strict";

var http = require("http");
var port = process.env.PORT || 3000;
const callDestination = require('sap-cf-destination');

http.createServer(function (req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});
  callDestination({
		http_verb: 'GET',
		// url to call on proxied server
		url: '/sap/opu/odata/sap/ZACT_PC_2_SRV/ZACT_PC_2Results?$format=json',
		// name of the CF connectivity service instance
		connectivity_instance: 'connectivity-demo-lite',
		// name of the CF xsuaa service instance
		uaa_instance: 'xsuaa-demo',
		// name of the CF destination service instance
		destination_instance: 'destination-demo-lite',
			// name of the configured destination
		destination_name: 'bw4backend',
		//add scc loc id
		scc_name: 'akuscf'
	})
	.then(response => {
		// do sth clever from the response
		// of $server_behind_destination_'my_destination'/api/json
		var rs = JSON.parse(response);
		console.log("It worked: \n"+rs.d.results[0]["ID"]);
		let op = {
		"replies": [{
			"type": "text",
			"content": "response from bw query: "+rs.d.results[0]["A0PROFIT_CTR"]
                                }],
		"conversation": {
		    "language": "en",
			"memory":
			{ }
			
		}
		
	};
		res.writeHead(200,{
			'Content-Type':'application/json'
		});
		res.end(JSON.stringify(op));
	})
	.catch(err => {
		// oh no 
		console.log("It did not work: \n"+err.toString());
		res.end(err.toString());
	});
  //res.end("Hello World\n");
}).listen(port);

console.log("Server listening on port %d", port);

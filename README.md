# docker-host-ip

Node module to retrieve the Docker Host IP from within a Docker container

[![codebeat badge](https://codebeat.co/badges/f6bf4c59-1c9c-45c6-9aa8-b2eeabcebfa6)](https://codebeat.co/projects/github-com-steadyequipment-node-docker-host-ip)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6da4127e935f46b69b9235b50e0b421d)](https://www.codacy.com/app/Steadyequipment/node-docker-host-ip?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=steadyequipment/node-docker-host-ip&amp;utm_campaign=Badge_Grade)
[![dependancies](https://david-dm.org/steadyequipment/node-docker-host-ip.svg)](https://david-dm.org/steadyequipment/node-docker-host-ip)

## Usage

The module is a function that expects to be passed a callback as the only parameter. The callback's parameters should be in standard Node format: `(error, result)`

__Example__

``` javascript
import dockerHostIp from 'docker-host-ip';

dockerHostIp( (error, result) => {
	
	if (result) {
		
		console.log("Awesome, we're within a Docker container with Host IP:", result);
	} else if (error) {
		
		console.log("Awww, we got an error. We're probably not in a Docker container...to be safe the error is:", error);
	}
});

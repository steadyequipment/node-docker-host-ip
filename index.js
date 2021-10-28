import childProcess from 'child_process';
import isString from 'lodash.isstring';

const handleIpRouteResults = (callback) => (error, stdout, stderr) => {
    
    if (stdout && isString(stdout)) {

        const output = stdout;

        const match = output.match(/default via ((?:[0-9]{1,3}\.){3}[0-9]{1,3}) dev eth0/);

        let ip = undefined;
        if (Array.isArray(match) && match.length >= 2) {
            ip = match[1];
        }

        if (ip) {
            callback(undefined, ip);
        } else {
            const error = new Error("Unable to find ip, perhaps call while not within a Docker container");
            error.code = "DOCKER_IP_NO_RESOLVE";
            callback(error, undefined);
        }        
    } else if (error) {
        
        callback(error, undefined);
    } else if (stderr) {

        const error = new Error(stderr);
        error.code = "DOCKER_IP_STDERR";
        callback(error, undefined);
    } else {

        const error = new Error("No results or feedback given");
        error.code = "DOCKER_IP_EMPTY";
        callback(error, undefined);
    }
};

export default function(callback) {
    try {
        
        childProcess.execFile("/sbin/ip", ["route"], handleIpRouteResults(callback));                    
    } catch(error) {

        if (callback) {
            callback(error, undefined);
        }
    }
}
#!/bin/bash
COUNTER=253
IPSTART=192.168.1.
while [ $COUNTER -gt 246 ]; do
	IPADDRESS=$IPSTART$COUNTER
	echo Starting app on $IPADDRESS
	ssh pi@$IPADDRESS "node /home/pi/pi-cluster-api/app.js &" &
	let COUNTER=COUNTER-1
done

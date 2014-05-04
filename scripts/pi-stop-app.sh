#!/bin/bash
COUNTER=253
IPSTART=192.168.1.
while [ $COUNTER -gt 246 ]; do
	IPADDRESS=$IPSTART$COUNTER
	echo Stopping app on $IPADDRESS
	ssh pi@$IPADDRESS "sudo killall node"
	let COUNTER=COUNTER-1
done

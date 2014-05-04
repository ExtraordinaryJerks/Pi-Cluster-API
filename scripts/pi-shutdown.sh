#!/bin/bash
COUNTER=254
IPSTART=192.168.1.
while [  $COUNTER -gt 245 ]; do
	IPADDRESS=$IPSTART$COUNTER
	echo The counter is $IPADDRESS
	ssh pi@$IPADDRESS "sudo shutdown -h -P now"
	let COUNTER=COUNTER-1
done

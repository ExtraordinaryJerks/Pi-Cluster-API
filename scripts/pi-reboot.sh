#!/bin/bash
COUNTER=254
IPSTART=192.168.1.
#IPADDRESS=192.168.1.1
while [  $COUNTER -gt 247 ]; do
	IPADDRESS=$IPSTART$COUNTER
	echo The counter is $IPADDRESS
	ssh pi@$IPADDRESS "sudo reboot"
	let COUNTER=COUNTER-1
done

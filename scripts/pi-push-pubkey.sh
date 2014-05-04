#!/bin/bash
COUNTER=254
IPSTART=192.168.1.
while [  $COUNTER -gt 245 ]; do
	IPADDRESS=$IPSTART$COUNTER
	echo The counter is $IPADDRESS
	cat ~/.ssh/id_rsa.pub | ssh pi@$IPADDRESS "mkdir -p /home/pi/.ssh; cat >> /home/pi/.ssh/authorized_keys"
	let COUNTER=COUNTER-1
done
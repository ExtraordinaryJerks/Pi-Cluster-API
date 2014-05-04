#!/bin/bash
COUNTER=253
IPSTART=192.168.1.
cd ..
git pull

while [ $COUNTER -gt 246 ]; do
	IPADDRESS=$IPSTART$COUNTER
	echo Deploying to $IPADDRESS
	ssh pi@$IPADDRESS "rm -rf /home/pi/pi-cluster-api/"
	scp -r ../Pi-Cluster-API pi@$IPADDRESS:/home/pi/pi-cluster-api/
	let COUNTER=COUNTER-1
done

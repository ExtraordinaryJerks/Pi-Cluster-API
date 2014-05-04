#!/bin/bash
COUNTER=253
IPSTART=192.168.1.
cd ..
git pull
rm ../deployment.tar.gz
tar -czf ../deployment.tar.gz *

while [ $COUNTER -gt 246 ]; do
	IPADDRESS=$IPSTART$COUNTER
	echo Deploying to $IPADDRESS
	ssh pi@$IPADDRESS "rm -rf /home/pi/pi-cluster-api/"
	#scp -r ../Pi-Cluster-API pi@$IPADDRESS:/home/pi/pi-cluster-api/
	scp -r ../deployment.tar.gz pi@$IPADDRESS:/home/pi/deployment.tar.gz
	ssh pi@$IPADDRESS "mkdir /home/pi/pi-cluster-api/"
	ssh pi@$IPADDRESS "tar -zxvf /home/pi/deployment.tar.gz -C /home/pi/pi-cluster-api/"
	ssh pi@$IPADDRESS "rm /home/pi/deployment.tar.gz"
	let COUNTER=COUNTER-1
done
rm ../deployment.tar.gz

#!/bin/bash

#give permission for everything in the express-app directory
sudo chmod -R 777 /home/ubuntu/file/be-cnpm

#navigate into our working directory where we have all our github files
cd /home/ubuntu/file/be-cnpm

# Install yarn
yarn

# Build docker image
echo "build docker image..."
sudo docker build -t lambiengcode/be-cnpm:latest .

# Run docker container
sudo docker run -d --name be-cnpm -p 3000:3000 --env-file .env lambiengcode/be-cnpm:latest
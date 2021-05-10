#create our working directory if it doesnt exist
DIR="/home/ubuntu/file/be-cnpm"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  sudo mkdir ${DIR}
fi

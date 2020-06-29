work_path=$(dirname $(readlink -f $0))

echo '设置源'
bash ${work_path}/setMirror.sh

echo '安装依赖'
apt-get update -y
apt-get install libaio1 -y
apt-get install p7zip p7zip-full

echo '解压驱动'
cd ${work_path}/../../lib/oracle/linux
7za x instantclient.7z -y
cd ${work_path}/../../lib/oracle/linux/instantclient
ln -s libclntsh.so.12.1 libclntsh.so
cd ${work_path}/../..

echo '安装npm依赖'
npm i

echo '设置npm'
npm run pm2_setlog
npm run web_build
npm run service_build

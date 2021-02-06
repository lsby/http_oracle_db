work_path=$(dirname $(readlink -f $0))

echo '设置源'
echo '
deb http://mirrors.163.com/debian/ stretch main non-free contrib
deb http://mirrors.163.com/debian/ stretch-updates main non-free contrib
deb http://mirrors.163.com/debian/ stretch-backports main non-free contrib
deb-src http://mirrors.163.com/debian/ stretch main non-free contrib
deb-src http://mirrors.163.com/debian/ stretch-updates main non-free contrib
deb-src http://mirrors.163.com/debian/ stretch-backports main non-free contrib
deb http://mirrors.163.com/debian-security/ stretch/updates main non-free contrib
deb-src http://mirrors.163.com/debian-security/ stretch/updates main non-free contrib
' > /etc/apt/sources.list

echo '安装依赖'
apt-get update -y
apt-get install libaio1 -y
apt-get install p7zip p7zip-full

echo '解压驱动'
chmod -R 777 ${work_path}/../lib/oracle/linux/*
npm run unzip_linux
cd ${work_path}/../lib/oracle/linux/instantclient
ln -s libclntsh.so.12.1 libclntsh.so
cd ${work_path}

echo '安装npm依赖'
npm i --verbose

echo '设置日志'
npm run pm2_setlog

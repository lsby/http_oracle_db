work_path=$(dirname $(readlink -f $0))
source ${work_path}/../linux/set.sh
npm run pm2_start
npm run pm2_log

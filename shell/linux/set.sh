work_path=$(dirname $(readlink -f $0))

export LD_LIBRARY_PATH=${work_path}/../../lib/oracle/linux/instantclient:$LD_LIBRARY_PATH
export OCI_LIB_DIR=${work_path}/../../lib/oracle/linux/instantclient
export OCI_INC_DIR=${work_path}/../../lib/oracle/linux/instantclient/sdk/include

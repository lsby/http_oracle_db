set LD_LIBRARY_PATH=%~dp0\instantclient:$LD_LIBRARY_PATH
set OCI_LIB_DIR=%~dp0\instantclient
set OCI_INC_DIR=%~dp0\instantclient\sdk\include
set PATH=%~dp0\instantclient;%PATH%

node %cd%/bin/www.mjs

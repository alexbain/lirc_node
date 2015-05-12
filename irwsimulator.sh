#!/bin/bash
sleep 0.5

# $1 - the repeat counter Eg. 00, 01, 02
# $2 - the key pressed Eg. KEY_OK, KEY_UP
# $3 - the remote name Eg. my_remote
output() {
    local n="$(printf "%02d" $1)"
    echo "0000000000000000 $n $2 $3"
}

case "$1" in
remoteAndKeyTest)
    output 0 KEY_OK remote1
    sleep 0.2
    output 0 KEY_LEFT remote1
    sleep 0.2
    output 0 KEY_OK remote2
    sleep 0.2
    output 0 KEY_LEFT remote2
    sleep 0.2
    output 0 KEY_DONE remote1
    ;;
dataTest)
    output 0 KEY_HOME remote42
    ;;
*)
    for i in `seq 0 39`; do
        output $i KEY_OK remote1
        sleep 0.1
    done
    output 0 KEY_DONE remote1

esac
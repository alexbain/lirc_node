import pexpect
import os
import sys
from time import sleep

try:
    os.system("sudo cp /home/pi/lirc_web/node_modules/lirc_node/irrecord/lircd.conf /etc/lirc/lircd.conf")
except OSError:
    pass

sleep(1)

try:
    os.system("sudo /etc/init.d/lirc restart")
except OSError:
    pass
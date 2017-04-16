import pexpect
import os
import sys
from time import sleep

try:
    os.system("sudo /etc/init.d/lirc stop")
except OSError:
    pass

sleep(2)
child = pexpect.spawn ('sudo irrecord -d /dev/lirc0 /home/pi/lirc_web/node_modules/lirc_node/irrecord/lircdlearn.conf')
child.logfile = sys.stdout
child.expect ('Press RETURN to continue.')
child.sendline ('')
child.expect ('Please enter the name for the next button')
child.sendline ('KEY_UP')
child.expect ('Please enter the name for the next button')
child.sendline ('')

sleep(1)

try:
    os.system("sudo /etc/init.d/lirc start")
except OSError:
    pass
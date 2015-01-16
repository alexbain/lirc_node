#sudo irrecord -f -d /dev/lirc0 /home/pi/lirc_web/node_modules/lirc_node/irrecord/lircdlearn1.conf
import pexpect
import os
import sys
from time import sleep

try:
    os.remove('/home/pi/lirc_web/node_modules/lirc_node/irrecord/lircdlearn.conf')
except OSError:
    pass

try:
    os.system("sudo /etc/init.d/lirc stop")
except OSError:
    pass

sleep(4)
child = pexpect.spawn ('sudo irrecord -f -d /dev/lirc0 /home/pi/lirc_web/node_modules/lirc_node/irrecord/lircdlearn.conf')
child.logfile = sys.stdout
child.expect ('Press RETURN to continue.')
child.sendline ('')
child.expect ('Press RETURN now to start recording.')
print "\nStart Pressing!"
child.sendline ('')
child.expect ('Now enter the names for the buttons.')
child.sendline ('')
sleep(2)
try:
    os.system("sudo /etc/init.d/lirc start")
except OSError:
    pass
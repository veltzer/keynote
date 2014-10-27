#!/usr/bin/python3

# this scripts retuns the tagname for the build

import subprocess # for check_output, DEVNULL

def get_version():
	try:
		ver=subprocess.check_output(["git", "describe"],stderr=subprocess.DEVNULL).rstrip()
		return ver
	except:
		return "test"

print get_version()

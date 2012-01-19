#!/usr/bin/python

"""
This is a wrapper for running the present tool.

TODO:
- parse the class file from the .classpath and not hardcode it here.
"""

import sys
import subprocess
import glob

files=glob.glob("lib/*.jar")
files=':'.join(files)
#print(files)
args=[
	'java',
	'-classpath','bin:'+files,
	'org.meta.present.Main',
]
# give all command line args passed to the wrapper excluding the first (the program name)
args.extend(sys.argv[1:])
subprocess.check_call(args)

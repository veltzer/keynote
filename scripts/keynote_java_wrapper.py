#!/usr/bin/python3

'''
This is a wrapper for running the keynote java pdf convertor tool.

TODO:
- parse the class path from the .classpath and not hardcode it here.
'''

import sys # for argv, exit
import subprocess # for check_call
import glob # for glob

files=glob.glob('lib/*.jar')
files=':'.join(files)
args=[
	'java',
	'-classpath','bin:'+files,
	'org.meta.keynote.Main',
]
# give all command line args passed to the wrapper excluding the first (the program name)
args.extend(sys.argv[1:])
sys.exit(subprocess.call(args))

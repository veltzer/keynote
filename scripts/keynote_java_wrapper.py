#!/usr/bin/python3

'''
This is a wrapper for running the keynote java pdf convertor tool.

TODO:
- parse the class path from the .classpath and not hardcode it here.
'''

import glob  # for glob
import subprocess  # for call
import sys  # for argv, exit

CLASSPATH = ':'.join(glob.glob('lib/*.jar'))
args=[
    'java',
    '-classpath','out/bin:'+CLASSPATH,
    'org.meta.keynote.Main',
]
# give all command line args passed to the wrapper excluding the first (the program name)
args.extend(sys.argv[1:])
sys.exit(subprocess.call(args))

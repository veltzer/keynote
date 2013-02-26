#!/usr/bin/python

"""
Print the classpath for this project
"""

import sys
import subprocess
import glob

files=glob.glob("lib/*.jar")
files=':'.join(files)
print(files)

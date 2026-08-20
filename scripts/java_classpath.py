#!/usr/bin/python3

'''
Print the classpath for this project
'''

import glob  # for glob

CLASSPATH = ':'.join(glob.glob("lib/*.jar"))
print(CLASSPATH)

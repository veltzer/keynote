#!/usr/bin/python3

'''
Print the classpath for this project
'''

import glob # for glob

files=glob.glob("lib/*.jar")
files=':'.join(files)
print(files)

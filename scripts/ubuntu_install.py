#!/usr/bin/python

# this script will install all the required packages that you need on
# ubuntu to compile and work with this package.

import subprocess
packs=[
	'libitext5-java',
	'libitext5-java-doc',
	'libargs4j-java',
	'libargs4j-java-doc',
]
args=['sudo','apt-get','install']
args.extend(packs)
subprocess.check_call(args)

#!/usr/bin/python3

# this script will install all the required packages that you need on
# ubuntu to compile and work with this package.

import subprocess # for check_call

packs=[
	'libitext5-java',
	'libitext5-java-doc',
	'libargs4j-java',
	'libargs4j-java-doc',
	'libxml2-utils', # for xmllint command line tool for validating the presentations
	'aspell', # aspell tool for spell checking the xml files
	'aspell-en', # english dictionary for aspell
	'aspell-he', # hebrew dictionary for aspell
	'closure-linter',
]
args=['sudo','apt-get','install','--assume-yes']
args.extend(packs)
subprocess.check_call(args)

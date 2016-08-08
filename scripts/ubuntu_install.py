#!/usr/bin/python3

'''
this script will install all the required packages that you need on
ubuntu to compile and work with this package.
'''

###########
# imports #
###########
import subprocess # for check_call
import os # for mkdir
import os.path # for isdir

##############
# parameters #
##############
tools='tools'
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

	# my own
	'templar', # for make_helper

	# to bring dependencies
	'ivy',
	'ivy-doc',

	# for ant(1)
	'ant',

	# for javac(1)
	'openjdk-8-jdk-headless',
]

#############
# functions #
#############
def install_jsl():
	print('installing tool [{0}]'.format('jsl'))
	if not os.path.isdir(tools):
		os.mkdir(tools)
	#os.system('wget -qO- http://www.javascriptlint.com/download/jsl-0.3.0-src.tar.gz | (cd tools; tar zxf -)')
	#os.system('cd tools; python setup.py build')
	os.system('cd tools; svn -q co https://javascriptlint.svn.sourceforge.net/svnroot/javascriptlint/trunk jsl')
	os.system('cd tools/jsl; python setup.py build > /dev/null')

def install_closure():
	print('installing tool [{0}]'.format('closure'))
	if not os.path.isdir(tools):
		os.mkdir(tools)
	#jar_name='compiler.jar'
	jar_name='closure-compiler-v20160713'
	os.system('wget -qO- https://dl.google.com/closure-compiler/compiler-latest.zip | (cd tools; bsdtar -xf- {jar_name}.jar)'.format(jar_name=jar_name))
	os.chmod('tools/{jar_name}.jar'.format(jar_name=jar_name), 0o0775)

########
# code #
########
args=['sudo','apt-get','install','--assume-yes']
args.extend(packs)
subprocess.check_call(args)
install_jsl()
install_closure()

print('installing node packages...')
subprocess.check_call([
	'npm',
	'install',
], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

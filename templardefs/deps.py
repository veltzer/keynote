'''
dependencies for this project
'''

def populate(d):
    d.tools=[
        'jsl',
        'closure',
    ]
    d.packs=[
        'libitext5-java',
        'libitext5-java-doc',
        'libargs4j-java',
        'libargs4j-java-doc',
        # for xmllint command line tool for validating the presentations
        'libxml2-utils',
        # aspell tool for spell checking the xml files
        'aspell',
        # english dictionary for aspell
        'aspell-en',
        # hebrew dictionary for aspell
        'aspell-he',
        'closure-linter',
        # to bring dependencies
        'ivy',
        'ivy-doc',
        # for ant(1)
        'ant',
        # for javac(1)
        'openjdk-8-jdk-headless',
    ]

def get_deps():
    return [
        __file__, # myself
    ]

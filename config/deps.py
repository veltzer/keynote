"""
os level dependencies for this project
"""

packages=[
    "libitext5-java",
    "libargs4j-java",
    # for xmllint command line tool for validating the presentations
    "libxml2-utils",
    # aspell tool for spell checking the xml files
    "aspell",
    # english dictionary for aspell
    "aspell-en",
    # hebrew dictionary for aspell
    "aspell-he",
    # closure linter is not available now
    # "closure-linter",
    # to bring dependencies
    "ivy",
    "ivy-doc",
    # for ant(1)
    "ant",
    # for javac(1)
    "openjdk-8-jdk-headless",
]

tools=[
    "jsl",
    "closure",
]

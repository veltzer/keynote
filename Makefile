##############
# parameters #
##############
# do you want to show the commands executed ?
# Since we are using ?= for assignment it means that you can just
# set this from the command line and avoid changing the makefile...
DO_MKDBG?=0
# do you want dependency on the makefile itself ?!?
DO_ALL_DEP:=1
# what is the version number ?
VER:=$(shell scripts/tagname.py)

# what is the xml source folder ?
XML_SRC_DIR:=presentations

# what is the java source folder ?
JAVA_SRC_DIR:=src
# what is the java target folder ?
JAVA_OUT_DIR:=bin
# what is the java compile stamp file ?
JAVA_COMPILE_STAMP:=java_compile.stamp

# what is the web dir for this project ?
WEB_DIR:=/var/www/keynote
# what is the local web folder ?
WEB_FOLDER:=web

# what is the js folder ?
JS_SRC_DIR:=keynotejs/src
# where is the out folder ?
JS_OUT_FOLDER:=jsout
# what is the project name ?
JS_PROJECT_NAME:=keynotejs
# what is the check file ?
JS_CHECK_STAMP:=js_check.stamp
# what is the out full file ?
JS_FULL:=$(JS_OUT_FOLDER)/$(JS_PROJECT_NAME)-$(VER).js
# what is the minified file name ?
JS_MIN:=$(JS_OUT_FOLDER)/$(JS_PROJECT_NAME)-$(VER).min.js

#####################
# end of parameters #
#####################
XML_SRC:=$(shell find $(XML_SRC_DIR) -name "*.xml")
JS_SRC:=$(shell find $(JS_SRC_DIR) -name "*.js")
JAVA_SRC:=$(shell find $(JAVA_SRC_DIR) -name "*.java")
JAVA_CLASSPATH:=$(shell scripts/java_classpath.py)
XML_PDF:=$(addsuffix .pdf,$(basename $(XML_SRC)))
ALL:=$(XML_PDF) $(JS_CHECK_STAMP) $(JS_MIN)

# silent stuff
ifeq ($(DO_MKDBG),1)
Q:=
# we are not silent in this branch
else # DO_MKDBG
Q:=@
#.SILENT:
endif # DO_MKDBG

# dependency on the makefile itself
ifeq ($(DO_ALL_DEP),1)
ALL_DEP:=Makefile
else
ALL_DEP:=
endif

###########
# targets #
###########

.PHONY: all
all: $(ALL) $(ALL_DEP)

$(JS_CHECK_STAMP): $(JS_SRC) $(ALL_DEP)
	$(info doing [$@])
	$(Q)~/install/jsl/jsl --conf=support/jsl.conf --quiet --nologo --nosummary --nofilelisting $(JS_SRC)
	$(Q)scripts/wrapper.py gjslint --flagfile support/gjslint.cfg $(JS_SRC)
	$(Q)mkdir -p $(dir $@)
	$(Q)touch $(JS_CHECK_STAMP)
$(JS_FULL): $(JS_SRC) $(ALL_DEP)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)cat `cat support/order.txt` > $@
$(JS_MIN): $(JS_FULL) $(ALL_DEP)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)#jsmin < $< > $@
	$(Q)#yui-compressor $< -o $@
	$(Q)~/install/bin/compiler.jar $< --js_output_file $@
$(JAVA_COMPILE_STAMP): $(JAVA_SRC) $(ALL_DEP)
	$(info doing [$@])
	$(Q)mkdir -p $(JAVA_OUT_DIR)
	$(Q)javac -sourcepath $(JAVA_SRC_DIR) -d $(JAVA_OUT_DIR) $(JAVA_SRC) -classpath $(JAVA_CLASSPATH)
	$(Q)touch $@

.PHONY: debug
debug:
	$(info ALL_DEP is $(ALL_DEP))
	$(info VER is $(VER))
	$(info WEB_DIR is $(WEB_DIR))
	$(info WEB_FOLDER is $(WEB_FOLDER))
	$(info XML_SRC_DIR is $(XML_SRC_DIR))
	$(info XML_SRC is $(XML_SRC))
	$(info XML_PDF is $(XML_PDF))
	$(info JAVA_SRC_DIR is $(JAVA_SRC_DIR))
	$(info JAVA_OUT_DIR is $(JAVA_OUT_DIR))
	$(info JAVA_SRC is $(JAVA_SRC))
	$(info JAVA_CLASSPATH is $(JAVA_CLASSPATH))
	$(info JS_SRC_DIR is $(JS_SRC_DIR))
	$(info JS_SRC is $(JS_SRC))
	$(info JS_OUT_FOLDER is $(JS_OUT_FOLDER))
	$(info JS_PROJECT_NAME is $(JS_PROJECT_NAME))
	$(info JS_CHECK_STAMP is $(JS_CHECK_STAMP))
	$(info JS_FULL is $(JS_FULL))
	$(info JS_MIN is $(JS_MIN))

.PHONY: clean
clean:
	$(info doing [$@])
	$(Q)rm -rf $(PDF) $(JS_OUT_FOLDER) $(JS_CHECK_STAMP) $(JAVA_COMPILE_STAMP) $(JAVA_OUT_FOLDER)

.PHONY: install
install: $(ALL) $(ALL_DEP)
	$(info doing [$@])
	$(Q)sudo rm -rf $(WEB_DIR)
	$(Q)sudo mkdir $(WEB_DIR)
	$(Q)sudo cp -r index.html $(XML_SRC_DIR) $(JS_SRC_DIR) $(WEB_FOLDER) $(WEB_DIR)

.PHONY: java_compile
java_compile: $(JAVA_COMPILE_STAMP)

#########
# rules #
#########
$(XML_PDF): %.pdf: %.xml $(ALL_DEP) $(JAVA_COMPILE_STAMP)
	$(info doing [$@])
	$(Q)scripts/keynote_xml_to_pdf.py --input $< --output $@

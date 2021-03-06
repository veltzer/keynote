##############
# parameters #
##############
# do you want to show the commands executed ?
DO_MKDBG:=0
# do you want dependency on the makefile itself ?!?
DO_ALL_DEP:=1
# what is the version number ?
VER:=$(shell scripts/tagname.py)

# what is the output folder?
OUT:=out

# what is the xml source folder ?
XML_SRC_DIR:=presentations

# what is the java source folder ?
JAVA_SRC_DIR:=src
# what is the java target folder ?
JAVA_OUT_DIR:=$(OUT)/bin
# what is the java compile stamp file ?
JAVA_COMPILE_STAMP:=$(OUT)/java_compile.stamp
# what is the java stamp file?
IVY_STAMP:=$(OUT)/ivy.stamp
# what is the checkstyle stamp file?
CHECKSTYLE_STAMP:=$(OUT)/checkstyle.stamp

# what is the local web folder ?
WEB_LOCAL:=web
# what is the web dir for this project ?
WEB_DIR:=~/public_html/public/keynote

# what is the js folder ?
JS_DIR:=jssrc
# what is our source folder ?
JS_SRC_DIR:=$(JS_DIR)/src
# where is the out folder ?
JS_OUT_DIR:=$(OUT)/js
# what is the project name ?
JS_PROJECT_NAME:=keynotejs
# what is the check file ?
JS_CHECK_STAMP:=$(OUT)/js_check.stamp
# what is the out full file ?
JS_FULL:=$(JS_OUT_DIR)/$(JS_PROJECT_NAME)-$(VER).js
# what is the minified file name ?
JS_MIN:=$(JS_OUT_DIR)/$(JS_PROJECT_NAME)-$(VER).min.js
# where to put javascript documentation ?
JS_DOC_DIR:=$(OUT)/jsdoc
# what file to check for modifications ?
JS_DOC_STAMP:=$(OUT)/js_doc.stamp
# what is the xsd folder ?
XSD_DIR:=xsd

# tools
TOOL_JSL:=tools/jsl/jsl
TOOL_GJSLINT:=gjslint

#####################
# end of parameters #
#####################
XML_SRC:=$(shell find $(XML_SRC_DIR) -name "*.xml")
JS_SRC:=$(shell find $(JS_SRC_DIR) -name "*.js")
JAVA_SRC:=$(shell find $(JAVA_SRC_DIR) -name "*.java")
XML_PDF:=$(addprefix $(OUT)/,$(addsuffix .pdf,$(basename $(XML_SRC))))
XML_STAMP:=$(addprefix $(OUT)/,$(addsuffix .stamp,$(basename $(XML_SRC))))
ALL:=$(CHECKSTYLE_STAMP) $(XML_STAMP) $(XML_PDF) $(JS_CHECK_STAMP) $(JS_MIN) $(JS_DOC_STAMP)

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
endif # DO_ALL_DEP

###########
# targets #
###########

.PHONY: all
all: $(ALL) $(ALL_DEP)

# phony js targets
.PHONY: jsdoc
jsdoc: $(JS_DOC_STAMP) $(ALL_DEP)
	$(info doing [$@])
.PHONY: jscheck
jscheck: $(JS_CHECK_STAMP) $(ALL_DEP)
	$(info doing [$@])
.PHONY: check_veltzer_https
check_veltzer_https:
	$(info doing [$@])
	$(Q)pymakehelper only_print_on_error git grep "http:\/\/veltzer.net"
.PHONY: check_all
check_all: check_veltzer_https

# real js targets
$(JS_CHECK_STAMP): $(JS_SRC) $(ALL_DEP)
	$(info doing [$@])
	$(Q)$(TOOL_JSL) --conf=support/jsl.conf --quiet --nologo --nosummary --nofilelisting $(JS_SRC)
	$(Q)pymakehelper only_print_on_error $(TOOL_GJSLINT) --flagfile support/gjslint.cfg $(JS_SRC)
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
	$(Q)tools/closure.jar $< --js_output_file $@
$(JS_DOC_STAMP): $(JS_SRC) $(ALL_DEP)
	$(info doing [$@])
	$(Q)-rm -rf $(JS_DOC_DIR)
	$(Q)mkdir -p $(dir $@)
	$(Q)pymakehelper only_print_on_error node_modules/jsdoc/jsdoc.js -d $(JS_DOC_DIR) $(JS_SRC_DIR)
	$(Q)# 2.4 (ubuntu default) jsdoc
	$(Q)#pymakehelper only_print_on_error jsdoc -d=$(JS_DOC_DIR) $(JS_SRC_DIR)
	$(Q)touch $(JS_DOC_STAMP)
$(CHECKSTYLE_STAMP): $(IVY_STAMP) $(JAVA_SRC) support/checkstyle_config.xml $(ALL_DEP)
	$(info doing [$@])
	$(Q)pymakehelper only_print_on_error ant checkstyle
	$(Q)mkdir -p $(dir $@)
	$(Q)touch $@
$(IVY_STAMP): $(ALL_DEP)
	$(info doing [$@])
	$(Q)pymakehelper only_print_on_error ant ivy_retrieve_local
	$(Q)mkdir -p $(dir $@)
	$(Q)touch $@
$(JAVA_COMPILE_STAMP): $(JAVA_SRC) $(IVY_STAMP) $(ALL_DEP)
	$(info doing [$@])
	$(Q)mkdir -p $(JAVA_OUT_DIR)
	$(Q)javac -proc:none -Xlint:all -Xlint:-path -Werror -sourcepath $(JAVA_SRC_DIR) -d $(JAVA_OUT_DIR) $(JAVA_SRC) -classpath `scripts/java_classpath.py`
	$(Q)mkdir -p $(dir $@)
	$(Q)touch $@

.PHONY: debug_me
debug_me:
	$(info ALL_DEP is $(ALL_DEP))
	$(info VER is $(VER))
	$(info WEB_LOCAL is $(WEB_LOCAL))
	$(info WEB_DIR is $(WEB_DIR))
	$(info XML_SRC_DIR is $(XML_SRC_DIR))
	$(info XML_SRC is $(XML_SRC))
	$(info XML_PDF is $(XML_PDF))
	$(info XML_STAMP is $(XML_STAMP))
	$(info JAVA_SRC_DIR is $(JAVA_SRC_DIR))
	$(info JAVA_OUT_DIR is $(JAVA_OUT_DIR))
	$(info JAVA_SRC is $(JAVA_SRC))
	$(info JS_SRC_DIR is $(JS_SRC_DIR))
	$(info JS_SRC is $(JS_SRC))
	$(info JS_OUT_DIR is $(JS_OUT_DIR))
	$(info JS_PROJECT_NAME is $(JS_PROJECT_NAME))
	$(info JS_CHECK_STAMP is $(JS_CHECK_STAMP))
	$(info JS_FULL is $(JS_FULL))
	$(info JS_MIN is $(JS_MIN))
	$(info JS_DOC_DIR is $(JS_DOC_DIR))
	$(info JS_DOC_STAMP is $(JS_DOC_STAMP))

.PHONY: clean_soft
clean_soft:
	$(info doing [$@])
	$(Q)rm -rf $(XML_STAMP) $(XML_PDF) $(JS_OUT_DIR) $(JS_CHECK_STAMP) $(JS_DOC_STAMP) $(JAVA_COMPILE_STAMP) $(JAVA_OUT_DIR) $(JS_DOC_DIR)
	
.PHONY: clean_me
clean_me:
	$(info doing [$@])
	$(Q)git clean -qffxd

.PHONY: validate
validate:
	$(info doing [$@])

.PHONY: install
install: $(ALL) $(ALL_DEP)
	$(info doing [$@])
	$(Q)rm -rf $(WEB_DIR)
	$(Q)mkdir $(WEB_DIR)
	$(Q)cp -r index.html $(XSD_DIR) $(XML_SRC_DIR) $(JS_DIR) $(JS_OUT_DIR) $(JS_DOC_DIR) $(WEB_LOCAL) $(WEB_DIR)
	$(Q)chmod -R go+rx $(WEB_DIR)

.PHONY: install_xsd
install_xsd:
	$(info doing [$@])
	$(Q)mkdir -p $(WEB_DIR)
	$(Q)cp -r $(XSD_DIR) $(WEB_DIR)
	$(Q)chmod -R go+rx $(WEB_DIR)

.PHONY: java_compile
java_compile: $(JAVA_COMPILE_STAMP)

#########
# rules #
#########
$(XML_STAMP): $(OUT)/%.stamp: %.xml $(ALL_DEP)
	$(info doing [$@])
	$(Q)pymakehelper only_print_on_error xmllint --noout --schema xsd/keynote.xsd $<
	$(Q)aspell --dont-backup --mode=sgml --check $< --lang=en
	$(Q)mkdir -p $(dir $@)
	$(Q)touch $@
$(XML_PDF): $(OUT)/%.pdf: %.xml $(ALL_DEP) $(JAVA_COMPILE_STAMP)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)scripts/keynote_java_wrapper.py process --input $< --output $@

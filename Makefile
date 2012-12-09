##############
# parameters #
##############
# do you want to show the commands executed ?
# Since we are using ?= for assignment it means that you can just
# set this from the command line and avoid changing the makefile...
DO_MKDBG?=0
# what is the source folder ?
SRC_DIR:=presentations
# do you want dependency on the makefile itself ?!?
DO_ALL_DEPS:=1
# what is the web dir for this project ?
WEB_DIR:=/var/www/keynote
# what is the local web folder ?
WEB_FOLDER:=web
# what is the js folder ?
JS_FOLDER:=keynotejs

#####################
# end of parameters #
#####################
SRC:=$(shell find $(SRC_DIR) -name "*.xml")
PDF:=$(addsuffix .pdf,$(basename $(SRC)))
ALL:=$(PDF)

# silent stuff
ifeq ($(DO_MKDBG),1)
Q:=
# we are not silent in this branch
else # DO_MKDBG
Q:=@
#.SILENT:
endif # DO_MKDBG

# dependency on the makefile itself
ifeq ($(DO_ALL_DEPS),1)
ALL_DEPS:=Makefile
else
ALL_DEPS:=
endif

###########
# targets #
###########

.PHONY: all
all: $(ALL)

.PHONY: debug
debug:
	$(info SRC is $(SRC))
	$(info PDF is $(PDF))
	$(info SRC_DIR is $(SRC_DIR))
	$(info WEB_DIR is $(WEB_DIR))
	$(info WEB_FOLDER is $(WEB_FOLDER))
	$(info JS_FOLDER is $(JS_FOLDER))

.PHONY: clean
clean:
	$(info doing [$@])
	$(Q)rm -f $(PDF)

.PHONY: install
install: $(ALL_DEPS)
	$(info doing [$@])
	$(Q)sudo rm -rf $(WEB_DIR)
	$(Q)sudo mkdir $(WEB_DIR)
	$(Q)sudo cp -r index.html $(SRC_DIR) $(JS_FOLDER) $(WEB_FOLDER) $(WEB_DIR)

#########
# rules #
#########
$(PDF): %.pdf: %.xml $(ALL_DEPS)
	$(info doing [$@])
	$(Q)./scripts/keynote.py --input $< --output $@

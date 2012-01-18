##############
# parameters #
##############
# do you want to show the commands executed ?
# Since we are using ?= for assignment it means that you can just
# set this from the command line and avoid changing the makefile...
DO_MKDBG?=0
# what is the source folder ?
SRC_DIR:=xml
# do you want dependency on the makefile itself ?!?
DO_ALL_DEPS:=1

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

.PHONY: clean
clean:
	$(info doing [$@])
	$(Q)rm -f $(PDF)


#########
# rules #
#########
$(PDF): %.pdf: %.xml $(ALL_DEPS)
	$(info doing [$@])
	$(Q)./scripts/present.py --input $< --output $@
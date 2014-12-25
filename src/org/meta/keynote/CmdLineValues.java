package org.meta.keynote;

import org.kohsuke.args4j.Argument;
import org.kohsuke.args4j.Option;

public class CmdLineValues {

	public static enum Operation {
		printfonts,
		convert,
	}

	@Argument(required = true, index = 0, usage = "type of operation")
	private Operation operation;
	@Option(required = false, name = "--input", metaVar = "FILE", usage = "name of input xml file")
	private String inputFile;
	@Option(required = false, name = "--output", metaVar = "FILE", usage = "name of output pdf file")
	private String outputFile;
	@Option(required = false, name = "--help", aliases = {"-h"}, metaVar = "VALUE", usage = "show command line usage")
	private boolean help;

	public boolean isHelp() {
		return help;
	}
	public void setHelp(boolean ihelp) {
		help = ihelp;
	}
	public Operation getOperation() {
		return operation;
	}
	public void setOperation(Operation ioperation) {
		operation = ioperation;
	}
	public String getInputFile() {
		return inputFile;
	}
	public void setInputFile(String iinputFile) {
		inputFile = iinputFile;
	}
	public String getOutputFile() {
		return outputFile;
	}
	public void setOutputFile(String ioutputFile) {
		outputFile = ioutputFile;
	}
}

package org.meta.keynote;

import org.kohsuke.args4j.Option;

public class CmdLineValues {

	@Option(required = true, name = "--i", aliases = {"--input"}, metaVar = "FILE", usage = "name of input xml file")
	private String inputFile;
	@Option(required = true, name = "--o", aliases = {"--output"}, metaVar = "FILE", usage = "name of output pdf file")
	private String outputFile;

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

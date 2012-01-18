package org.meta.present;

import org.kohsuke.args4j.Option;

public class CmdLineValues {

	@Option(required = true, name="--i", aliases={"--input"}, metaVar="FILE", usage = "name of input xml file")
    private String input_file;
	@Option(required = true, name="--o", aliases={"--output"}, metaVar="FILE", usage = "name of output pdf file")
    private String output_file;
	public String getInput_file() {
		return input_file;
	}
	public void setInput_file(String input_file) {
		this.input_file = input_file;
	}
	public String getOutput_file() {
		return output_file;
	}
	public void setOutput_file(String output_file) {
		this.output_file = output_file;
	}
}

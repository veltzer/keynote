package org.meta.keynote;

import org.kohsuke.args4j.CmdLineException;
import org.kohsuke.args4j.CmdLineParser;

abstract class Main {
	public static void main(String[] args) {
		CmdLineValues values = new CmdLineValues();
		CmdLineParser parser = new CmdLineParser(values);
		//parser.setUsageWidth(80);
		try {
			parser.parseArgument(args);
		} catch (CmdLineException e) {
			System.err.print(e.getMessage());
			parser.printUsage(System.err);
			return;
		}
		Config config = new Config();
		Creator creator = new Creator(values.getOutputFile(), config);
		Emitter e = new Emitter(values.getInputFile(), config, creator);
		e.parse();
	}
}

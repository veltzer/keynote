package org.meta.present;

import org.kohsuke.args4j.CmdLineException;
import org.kohsuke.args4j.CmdLineParser;

public class Main {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
        CmdLineValues values=new CmdLineValues();
		CmdLineParser parser = new CmdLineParser(values);
        parser.setUsageWidth(80);
        try {
			parser.parseArgument(args);
		} catch (CmdLineException e) {
            System.err.print(e.getMessage());
            parser.printUsage(System.err);
            return;
		}
        Config config=new Config();
        Creator creator=new Creator(values.getOutput_file(),config);
        Emitter e=new Emitter(values.getInput_file(),config,creator);
        e.parse();
	}
}
